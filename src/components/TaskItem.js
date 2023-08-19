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


const TaskItem = ({ id, text, done, prio, difficulty, details }) => {

  const [showTooltip, setShowTooltip] = useState(false);
  let newPrio = '';
  if ( prio === 1) {
    newPrio = 'low'
  } else if (prio === 2) {
    newPrio = 'medium'
  } else if (prio === 3) {
    newPrio = 'high'
  }

  async function handleOnChange(e) {
    const value = e.target.checked;
    const { data, error } = await supabase
      .from('todos')
      .update({ done: value, done_time: new Date() })
      .eq('id', id)
  }

  async function handleChange(value) {
    const { data } = await supabase
      .from('todos')
      .update({ difficulty: value })
      .eq('id', id)
    window.location.reload();
  }

  return (
    <HStack key={id} spacing={4}>
      <Text w="100%" p="5px" borderRadius="lg">
        {text}
      </Text>
      <Details details={details}/>
      <>
        <Badge colorScheme={renderColorBadge(newPrio)}>
          {newPrio}
        </Badge>
      </>
      <Difficulty difficulty={difficulty} id={id} />
      <Checkbox onChange={handleOnChange} defaultChecked={done}></Checkbox>
    </HStack>
  )
}

export default TaskItem
