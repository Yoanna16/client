import React, { useState } from 'react';
import {
  HStack,
  Text,
  Checkbox,
  Badge,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Slider,
  SliderFilledTrack,
  SliderTrack,
  Tooltip,
  SliderThumb,
} from '@chakra-ui/react'
import { useDisclosure } from '@chakra-ui/react'
import { supabase } from '../supabase';
import { renderColorBadge } from '../helpers';
import Details from './Details';
import Difficulty from './Difficulty';
import Prio from './Prio';


const TaskItem = ({ id, text, done, prio, difficulty, details }) => {

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
    const { data, error } = await supabase
      .from('todos')
      .update({ done: value, done_time: [...arrDoneTime, new Date()]})
      .eq('id', id)
  }

  return (
    <HStack key={id} spacing={4}>
      <Text w="100%" p="5px" borderRadius="lg">
        {text}
      </Text>

      <Details details={details} />

      <Prio prio={prio} />

      <Difficulty difficulty={difficulty} id={id} />

      <Checkbox onChange={handleOnChange} defaultChecked={done}></Checkbox>

    </HStack>
  )
}

export default TaskItem
