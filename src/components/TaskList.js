import React, { useEffect, useState } from 'react'
import { HStack, StackDivider, VStack, Text, Box, Image, Radio, Checkbox, Button, IconButton } from '@chakra-ui/react'
import { CheckIcon } from '@chakra-ui/icons'
import TaskItem from './TaskItem';
import { sortFunctionPrio, sortFunctionDifficulty, sortFunctionDone } from '../helpers';
import { supabase } from '../supabase';

function TaskList() {

    const [tasks, setTasks] = useState([]);
    const [sortType, setSortType] = useState('ascending');
    const [sortDiff, setSortDiff] = useState('ascending');
    const [sortDone, setSortDone] = useState('false');

    async function fetchData() {
        let { data: tasks, error } = await supabase.from('todos').select('*');
        const recommendFirst = tasks.sort((a, b) => b.recommended - a.recommended);
        setTasks(recommendFirst);
    }

    function handleSortPrio() {
        if(sortType === 'ascending') {
            sortFunctionPrio(tasks, 'ascending')
            setTasks(tasks)
            setSortType('descending')
        } else if (sortType === 'descending') {
            sortFunctionPrio(tasks, 'descending')
            setTasks(tasks)
            setSortType('ascending')
        }
    }

    function handleSortDiff() {
        if(sortDiff === 'ascending') {
            sortFunctionDifficulty(tasks, 'ascending')
            setTasks(tasks)
            setSortDiff('descending')
        } else if (sortDiff === 'descending') {
            sortFunctionDifficulty(tasks, 'descending')
            setTasks(tasks)
            setSortDiff('ascending')
        }
    }

    function handleSortDone() {
        if(sortDone === 'false') {
            sortFunctionDone(tasks, 'false')
            setTasks(tasks);
            setSortDone('true')
        } else if (sortDone === 'true') {
            sortFunctionDone(tasks, 'true')
            setTasks(tasks)
            setSortDone('false')
        }
    }

    useEffect(() => {
        const tasks = supabase.channel('custom-all-channel')
            .on(
                'postgres_changes',
                { event: '*', schema: 'public', table: 'todos' },
                (payload) => {
                    console.log('Change received!', payload)
                }
            )
            .subscribe()
        fetchData();
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
                minW={{base: '80vw'}}
                alignItems="stretch"
                shouldWrapChildren={true}
            >
                <HStack spacing={4}>
                <Text w="120%" p="8px" borderRadius="lg"></Text>
                <Button m='0px'minW={'-webkit-min-content'}variant={'link'} colorScheme="blue" margin-right={5} onClick={handleSortPrio}>Prio</Button>
                <Button minW={'-webkit-min-content'}variant={'link'}  colorScheme="blue"margin-right={5} onClick={handleSortDiff}>Difficulty</Button>
                <IconButton minW={'-webkit-min-content'}variant={'link'}  colorScheme="blue" icon={<CheckIcon />} onClick={handleSortDone}></IconButton>
                </HStack>
                {tasks.map(task => {
                    return <TaskItem id={task.id} text={task.text} done={task.done} prio={task.prio} difficulty={task.difficulty} details={task.details} recommended={task.recommended}></TaskItem>
                })}
            </VStack>
        </>
    )
}

export default TaskList
