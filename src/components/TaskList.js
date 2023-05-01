import React, { useEffect, useState } from 'react'
import { HStack, StackDivider, VStack, Text, Box, Image } from '@chakra-ui/react'
import ClearTasks from './ClearTasks';
import DeleteTask from './DeleteTask';
import img from '../images/empty.svg';
import { supabase } from '../supabase';

function TaskList({ user }) {

    const [tasks, setTasks] = useState([]);

    async function fetchData() {
        let { data: tasks, error } = await supabase.from('todos').select('*');
        console.log(tasks)
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
                w="100%"
                maxW={{ base: '90vw', sm: '80vw', lg: '50vw', xl: '30vw' }}
                alignItems="stretch"
            >
                {tasks.map(task => (
                    <HStack key={task.id}>
                        <Text w="100%" p="8px" borderRadius="lg">
                            {task.text}
                        </Text>
                        <DeleteTask id={task.id}  />
                    </HStack>
                ))}
            </VStack>
            <ClearTasks />
        </>
    )
}

export default TaskList
