import React from 'react';
import { HStack, StackDivider, VStack, Text, Box, Image, Radio, Checkbox, Badge, color } from '@chakra-ui/react'
import { supabase } from '../supabase';


const TaskItem = ({ id, text, done, prio, badgeColor }) => {

  async function handleOnChange(e) {
    const value = e.target.checked;
    const { data: { user } } = await supabase.auth.getUser();
    const { data, error } = await supabase
      .from('todos')
      .update({ done: value })
      .match({ owner_id: user.id })
  }

  const colorScheme = { 
    'low': 'yellow', 
    'high': 'red', 
    'medium': 'green',
  }


  return (
    <HStack key={id}>
      <Text w="100%" p="8px" borderRadius="lg">
        {text}
      </Text>
      <Badge colorScheme={colorScheme.prio}>
        {prio}
      </Badge>
      <Checkbox onChange={handleOnChange} defaultChecked={done}></Checkbox>
    </HStack>
  )
}

export default TaskItem
