import React, { useEffect, useState } from 'react'
import { HStack, StackDivider, VStack, Text, Button, IconButton } from '@chakra-ui/react'
import { CheckIcon } from '@chakra-ui/icons'
import TaskItem from './TaskItem';
import { handleSortDiff, handleSortPrio, handleSortDone } from '../helpers';
import { getBaselineValues, getMeasuredStress, getIdealDifficulty, calculateAbsoluteDifferencesDifficulty, calculateTaskScores, recommendTask, getRandomIndex } from '../helper_baseline';
import { supabase } from '../supabase';

function TaskList() {

    const [tasks, setTasks] = useState([]);
    const [prios, setPrios] = useState([]);
    const [difficulties, setDiff] = useState([]);
    const [ids, setIds] = useState([]);
    const [recommended, setRecommended] = useState([]);

    // ECG DATA
    const [baseline_1, setBaseline_1] = useState();
    const [baseline_2, setBaseline_2] = useState();
    const [hrv, setHrv] = useState();

    //Sorting
    const [sortType, setSortType] = useState('ascending');
    const [sortDiff, setSortDiff] = useState('ascending');
    const [sortDone, setSortDone] = useState('false');

    async function fetchData() {
        let { data: tasks, error } = await supabase.from('todos').select('*');
        tasks.sort((a, b) => a.done - b.done);
        tasks.sort((a, b) => b.recommended - a.recommended)
        return tasks;
    }

    async function fetchDataPrio() {
        let { data: tasks, error } = await supabase.from('todos').select('*');
        tasks.sort((a, b) => a.done - b.done);
        tasks.sort((a, b) => b.recommended - a.recommended)
        const prioValues = [];
        tasks.forEach(item => {
            if (item.done === false && item.done_time.length === 1 && item.recommended === null) {
                prioValues.push(item.prio)
            }
        })
        return prioValues;
    }


    async function fetchDataDiff() {
        let { data: tasks, error } = await supabase.from('todos').select('*');
        tasks.sort((a, b) => a.done - b.done);
        tasks.sort((a, b) => b.recommended - a.recommended)
        const diffValues = [];
        tasks.forEach(item => {
            if (item.done === false && item.done_time.length === 1 && item.recommended === null) {
                diffValues.push(item.difficulty)
            }
        })
        return diffValues;
    }

    async function fetchDataIds() {
        let { data: tasks, error } = await supabase.from('todos').select('*');
        tasks.sort((a, b) => a.done - b.done);
        tasks.sort((a, b) => b.recommended - a.recommended)
        const ids = [];
        tasks.forEach(item => {
            if (item.done === false && item.done_time.length === 1 && item.recommended === null) {
                ids.push(item.id)
            }
        })
        return ids;
    }

    async function fetchBaseline_1() {
        let { data: baseline_1, error } = await supabase.from('baseline_1').select('hrv_value')
        let hrv_Value_baseline = baseline_1[baseline_1.length - 1].hrv_value
        return hrv_Value_baseline;
    }

    async function fetchBaseline_2() {
        let { data: baseline_2, error } = await supabase.from('baseline_2').select('hrv_value');
        let hrv_base2_value = baseline_2[baseline_2.length - 1].hrv_value
        return hrv_base2_value;
    }

    async function fetchHrv() {
        let { data: hrv_data, error } = await supabase.from('hrv_data').select('hrv_value');
        let hrv_Value = hrv_data[hrv_data.length - 1].hrv_value
        return hrv_Value
    }

    useEffect(() => {
        async function fetchDataAndCalculate() {

            const fetchedTasks = await fetchData();

            // the baselines will never change so I can keep them as state values useMemo or useCallback 
            const fetchedBaseline_1 = await fetchBaseline_1();
            const fetchedBaseline_2 = await fetchBaseline_2();

            // the hrv will change every 15 sek
            const fetchedHrv = await fetchHrv();

            const prios1 = await fetchDataPrio();
            const diffValues = await fetchDataDiff();
            const ids1 = await fetchDataIds();

            // thresholds are always the same 
            const thresholds = getBaselineValues(fetchedBaseline_1, fetchedBaseline_2);

            // this will change probably
            const measuredStress = getMeasuredStress(fetchedHrv, thresholds);
            const idealDiff = getIdealDifficulty(measuredStress);

            const difficultyDifferences = calculateAbsoluteDifferencesDifficulty(idealDiff, diffValues);
            const taskScores = calculateTaskScores(difficultyDifferences, prios1);
            const indexOfMinScore = recommendTask(taskScores);
            const randomInd = getRandomIndex(indexOfMinScore)

            const id = ids1[randomInd];
            console.log(id)
            async function addRecommendation(id) {
                const { data } = await supabase
                    .from('todos')
                    .update({ recommended: true })
                    .eq('id', id)
            }
            setTasks(fetchedTasks);
            addRecommendation(id)
        }
        fetchDataAndCalculate();

    }, []);

    return (
        <>
            <VStack
                divider={<StackDivider />}
                borderColor="gray.100"
                borderWidth="2px"
                p="2"
                borderRadius="lg"
                w="max"
                maxW={{ base: '90vw', sm: '80vw', lg: '50vw', xl: '30vw' }}
                minW={{ base: '80vw' }}
                alignItems="stretch"
                shouldWrapChildren={true}
            >
                <HStack spacing={4}>
                    <Text w="120%" p="8px" borderRadius="lg"></Text>
                    <Button m='0px' minW={'-webkit-min-content'} variant={'link'} colorScheme="blue" margin-right={5} onClick={() => handleSortPrio(tasks, setTasks, sortType, setSortType)}>Prio</Button>
                    <Button minW={'-webkit-min-content'} variant={'link'} colorScheme="blue" margin-right={5} onClick={() => handleSortDiff(tasks, setTasks, sortDiff, setSortDiff)}>Difficulty</Button>
                    <IconButton minW={'-webkit-min-content'} variant={'link'} colorScheme="blue" icon={<CheckIcon />} onClick={() => handleSortDone(tasks, setTasks, sortDone, setSortDone)}></IconButton>
                </HStack>
                {tasks.map(task => {
                    return <TaskItem id={task.id} text={task.text} done={task.done} prio={task.prio} difficulty={task.difficulty} details={task.details} recommended={task.recommended}></TaskItem>
                })}
            </VStack>
        </>
    )
}

export default TaskList
