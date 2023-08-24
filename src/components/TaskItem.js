import React from 'react';
import {
  HStack,
  Text,
  Checkbox,
} from '@chakra-ui/react'
import { supabase } from '../supabase';
import Details from './Details';
import Difficulty from './Difficulty';
import Prio from './Prio';


const TaskItem = ({ id, text, done, prio, difficulty, details, recommended, onRecommendedChange, onDifficultyChange }) => {

  let newPrio = '';
  if (prio === 1) {
    newPrio = 'low'
  } else if (prio === 2) {
    newPrio = 'medium'
  } else if (prio === 3) {
    newPrio = 'high'
  }

  async function handleOnChange(e) {
    const value = e.target.checked;
    const { data: todos } = await supabase
            .from('todos')
            .select('done_time')
            .eq('id', id)
    const arrDoneTime = todos[0].done_time
    const { data: recommended } = await supabase.from('todos').select('recommended').eq('id', id)
    const rec = recommended[0].recommended
    if (rec === true) {
      const { data, error } = await supabase
      .from('todos')
      .update({ done: value, done_time: [...arrDoneTime, new Date()], recommended: false})
      .eq('id', id)
    } else {
      const { data, error } = await supabase
      .from('todos')
      .update({ done: value, done_time: [...arrDoneTime, new Date()]})
      .eq('id', id)
    }
    onRecommendedChange()
  }

  return (
    <HStack key={id} spacing={4} borderRadius={recommended && !done ? '10px' : 'none'} bgColor={recommended && !done ? 'yellow.100' : 'white'}>
      <Text w="100%" p="5px" borderRadius="lg">
        {text}
      </Text>

      <Details details={details} />

      <Prio prio={prio} />

      <Difficulty difficulty={difficulty} id={id} onDifficultyChange={onDifficultyChange} />

      <Checkbox onChange={(e) => handleOnChange(e)} defaultChecked={done}></Checkbox>

    </HStack>
  )
}

export default TaskItem
