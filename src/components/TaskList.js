import React, { useEffect, useState } from 'react'
import { HStack, StackDivider, VStack, Text, Button, IconButton } from '@chakra-ui/react'
import { CheckIcon } from '@chakra-ui/icons'
import TaskItem from './TaskItem';
import { handleSortDiff, handleSortPrio, handleSortDone } from '../helpers';
import { getBaselineValues, getMeasuredStress, getIdealDifficulty, calculateAbsoluteDifferencesDifficulty, calculateTaskScores, recommendTask, getRandomIndex } from '../helper_baseline';
import { supabase } from '../supabase';

function TaskList() {
    // we get values about baseline 1 and 2
    // also already the first HRV
    // then the user musts set the difficulties by their own choice
    // after that we can recommend a task to the user
    // always show one recommendation at a time?

    const [tasks, setTasks] = useState([]);

    // ECG DATA
    const [baseline_1, setBaseline_1] = useState();
    const [baseline_2, setBaseline_2] = useState();
    const [hrv, setHrv] = useState();
    /* const [recommId, setRecommendedId] = useState(0);
    const [isInitiliazed, setIsInitialized] = useState(false); */

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
            if (item.done === false && item.recommended === false && item.difficulty !== null) {
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
            if (item.done === false && item.recommended === false && item.difficulty !== null) {
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
            if (item.done === false && item.recommended === false && item.difficulty !== null) {
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
        setHrv(hrv_Value)
        console.log('hrvvvv', hrv)
    }

    async function removeRecommendations() {
        const { data: fetchedId } = await supabase.from('todos').select('id')
        fetchedId.forEach(async id => {
            await supabase.from('todos').update({ recommended: false }).eq('id', id.id)
        })
        const { data: updated } = await supabase.from('todos').select('*')
        console.log('updated', updated)
    }

    async function addToRecTime(id) {
        const { data: todos } = await supabase.from('todos').select('recommended_time').eq('id', id)
        const arrDoneTime = todos[0].recommended_time
        console.log('rec', arrDoneTime)
        await supabase.from('todos').update({ recommended_time: [...arrDoneTime, new Date()] }).eq('id', id)
    }

    async function getRecommendedItemId() {
        await removeRecommendations()

        var fetchedBaseline_1 = await fetchBaseline_1();
        setBaseline_1(fetchedBaseline_1);
        var fetchedBaseline_2 = await fetchBaseline_2();
        setBaseline_2(fetchedBaseline_2);

        var thresholds = getBaselineValues(baseline_1, baseline_2);

        var prios1 = await fetchDataPrio();
        console.log('prios', prios1)
        var differences = await fetchDataDiff();
        console.log('diff', differences)
        var ids1 = await fetchDataIds();


        // this will change probably
        var measuredStress = getMeasuredStress(hrv, thresholds);
        var idealDiff = getIdealDifficulty(measuredStress);


        if (differences.every(element => element !== null)) {
            var difficultyDifferences = calculateAbsoluteDifferencesDifficulty(idealDiff, differences);
            var taskScores = calculateTaskScores(difficultyDifferences, prios1);
            var indexOfMinScore = recommendTask(taskScores);
            var randomInd = getRandomIndex(indexOfMinScore);
            var id = ids1[randomInd];
            addToRecTime(id)
        }

        return id;
    }

    const onRecommendedChange = async () => {
        const itemId = await getRecommendedItemId();
        await supabase.from('todos').update({ recommended: true }).eq('id', itemId)
        const tasks = await fetchData();
        setTasks(tasks)
    }

    const onDifficultyChange = async () => {
        var differences = await fetchDataDiff();
        if (differences.every(element => element !== null) && differences.length === 9) {
            const itemId = await getRecommendedItemId();
            await supabase.from('todos').update({ recommended: true }).eq('id', itemId)
        }
        const tasks1 = await fetchData();
        setTasks(tasks1)
    }

    useEffect(() => {
        console.log('USE EFFECT')

        //the hrv will change every 15 sek
        const intervalHrv = setInterval(() => {
            fetchHrv(); // <-- (3) invoke in interval callback
        }, 30000);
        fetchHrv()

        async function fetchAndSetRec() {
            const itemId = await getRecommendedItemId();
            await supabase.from('todos').update({ recommended: true }).eq('id', itemId)
            const tasks = await fetchData();
            setTasks(tasks)
        }
        fetchAndSetRec();
        console.log('HRV fetched', hrv)


        return () => clearInterval(intervalHrv);

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
                {tasks &&
                    tasks?.map(task => {
                        return <TaskItem id={task.id} text={task.text} done={task.done} prio={task.prio} difficulty={task.difficulty} details={task.details} recommended={task.recommended} onRecommendedChange={onRecommendedChange} onDifficultyChange={onDifficultyChange}></TaskItem>
                    })}
            </VStack>
        </>
    )
}

export default TaskList
