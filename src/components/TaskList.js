import React, { useEffect, useState } from 'react'
import { HStack, StackDivider, VStack, Text, Box, Image, Radio, Checkbox } from '@chakra-ui/react'
import DeleteTask from './DeleteTask';
import img from '../images/empty.svg';
import { supabase } from '../supabase';

function TaskList() {

    const [tasks, setTasks] = useState([]);
    const [doneValue, setDoneValue] = useState(false);
    

    async function fetchData() {
        const { data: { user } } = await supabase.auth.getUser();
        let { data: tasks, error } = await supabase.from('todos').select('*').eq('owner_id', user.id);
        console.log(tasks)
        setTasks(tasks);
    }

    async function handleOnChange(e) {
        const value = e.target.checked;
        setDoneValue(value);
        const { data: { user } } = await supabase.auth.getUser();
        const { data, error } = await supabase
        .from('todos')
        .update({ done: value })
        .match({ owner_id: user.id })
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
                        <Checkbox onChange={handleOnChange} defaultChecked={task.done}></Checkbox>
                    </HStack>
                ))}
            </VStack>
        </>
    )
}

export default TaskList
