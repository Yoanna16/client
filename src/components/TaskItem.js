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


const TaskItem = ({ id, text, done, prio, difficulty, details }) => {

  const { isOpen, onOpen, onClose } = useDisclosure()

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
      <Text w="100%" p="8px" borderRadius="lg">
        {text}
      </Text>
      { details ?
      <>
      <>
      <Button right="10px"variant={'link'} onClick={onOpen} colorScheme="blue">Details</Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Modal Title</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {details}
          </ModalBody>
        </ModalContent>
      </Modal>
      </>
      <>
        <Badge colorScheme={renderColorBadge(newPrio)}>
          {newPrio}
        </Badge>
      </>
      </>
      :
      <></>
    }
      {
        difficulty ?
          <>
            <Badge variant='outline' colorScheme='green'>
              Difficulty: {difficulty}
            </Badge>
          </>

          :
          <Slider
          id="slider"
          defaultValue={5}
          min={0}
          max={100}
          size="lg"
          colorScheme="blue"
          onChangeEnd={handleChange}
          onMouseEnter={() => setShowTooltip(true)}
          onMouseLeave={() => setShowTooltip(false)} 
        >
          <SliderTrack>
            <SliderFilledTrack />
          </SliderTrack>
           <Tooltip
            hasArrow
            bg="blue.500"
            color="white"
            placement="top"
            isOpen={showTooltip}
          >
            <SliderThumb />
          </Tooltip> 
        </Slider>
      }

      <Checkbox onChange={handleOnChange} defaultChecked={done}></Checkbox>
    </HStack>
  )
}

export default TaskItem
