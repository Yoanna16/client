import React, { useEffect, useState } from 'react'
import { HStack, StackDivider, VStack, Text, Box, Image, Radio, Checkbox } from '@chakra-ui/react'
import TaskItem from './TaskItem';
import img from '../images/empty.svg';
import { supabase } from '../supabase';

function TaskList() {

    const [tasks, setTasks] = useState([]);


    async function fetchData() {
        let { data: tasks, error } = await supabase.from('todos').select('*');
        setTasks(tasks);
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

    if (!tasks.length) {
        return (<Box align="center">
            <Image src={img} mt="30px" maxW="95%" />
        </Box>)
    }
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
                {tasks.map(task => {
                    return <TaskItem id={task.id} text={task.text} done={task.done} prio={task.prio} difficulty={task.difficulty} details={task.details}></TaskItem>
                })}
            </VStack>
        </>
    )
}

export default TaskList
