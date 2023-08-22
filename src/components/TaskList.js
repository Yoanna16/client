import React, { useEffect, useState } from 'react'
import { HStack, StackDivider, VStack, Text, Button, IconButton } from '@chakra-ui/react'
import { CheckIcon } from '@chakra-ui/icons'
import TaskItem from './TaskItem';
import { handleSortDiff, handleSortPrio, handleSortDone } from '../helpers';
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
                <Button m='0px'minW={'-webkit-min-content'}variant={'link'} colorScheme="blue" margin-right={5} onClick={() => handleSortPrio(tasks, setTasks, sortType, setSortType)}>Prio</Button>
                <Button minW={'-webkit-min-content'}variant={'link'}  colorScheme="blue"margin-right={5} onClick={() => handleSortDiff(tasks, setTasks, sortDiff, setSortDiff)}>Difficulty</Button>
                <IconButton minW={'-webkit-min-content'}variant={'link'}  colorScheme="blue" icon={<CheckIcon />} onClick={() => handleSortDone(tasks, setTasks, sortDone, setSortDone)}></IconButton>
                </HStack>
                {tasks.map(task => {
                    return <TaskItem id={task.id} text={task.text} done={task.done} prio={task.prio} difficulty={task.difficulty} details={task.details} recommended={task.recommended}></TaskItem>
                })}
            </VStack>
        </>
    )
}

export default TaskList
