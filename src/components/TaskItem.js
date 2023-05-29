import React, { useState } from 'react';
import { HStack, StackDivider, VStack, Text, Box, Image, Radio, Checkbox, Badge, color, Select } from '@chakra-ui/react'
import { supabase } from '../supabase';
import { renderColorBadge } from '../helpers';


const TaskItem = ({ id, text, done, prio, difficulty }) => {
  const prios = ['high', 'medium', 'low'];

  async function handleOnChange(e) {
    const value = e.target.checked;
    const { data, error } = await supabase
      .from('todos')
      .update({ done: value, done_time: new Date()})
      .eq('id', id)
  }

  async function handleChange(e) {
    const value = e.target.value;
    const { data } = await supabase
    .from('todos')
    .update({prio: value})
    .eq('id', id)
    window.location.reload();
  }

  return (
    <HStack key={id}>
      <Text w="100%" p="8px" borderRadius="lg">
        {text}
      </Text>
      {
        prio ?
      <>
      <Badge colorScheme={renderColorBadge(prio)}>
        {prio}
      </Badge> 
      </>      
 
      : 
      <Select isRequired={true} onChange={handleChange} placeholder='Select prio'>
          {prios.map(prio => (
            <option value={prio}>{prio}</option>
          ))}
      </Select>
      }
      
    
      <Badge variant='outline' colorScheme='green'>
        Difficulty: {difficulty}
     </Badge>
     
      <Checkbox onChange={handleOnChange} defaultChecked={done}></Checkbox>
    </HStack>
  )
}

export default TaskItem
