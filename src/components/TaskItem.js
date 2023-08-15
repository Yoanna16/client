import React, { useState } from 'react';
import {
  HStack,
  Text,
  Checkbox,
  Badge,
  Select,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Lorem,
} from '@chakra-ui/react'
import { useDisclosure } from '@chakra-ui/react'
import { supabase } from '../supabase';
import { renderColorBadge } from '../helpers';


const TaskItem = ({ id, text, done, prio, difficulty, details }) => {
  const difficulties = [0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60, 65, 70, 75, 80, 85, 90, 95, 100];

  const { isOpen, onOpen, onClose } = useDisclosure()


  async function handleOnChange(e) {
    const value = e.target.checked;
    const { data, error } = await supabase
      .from('todos')
      .update({ done: value, done_time: new Date() })
      .eq('id', id)
  }

  async function handleChange(e) {
    const value = e.target.value;
    const { data } = await supabase
      .from('todos')
      .update({ difficulty: value })
      .eq('id', id)
    window.location.reload();
  }

  return (
    <HStack key={id} spacing={4} bgColor={"yellow.200"}>
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
        <Badge colorScheme={renderColorBadge(prio)}>
          {prio}
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
          <Select isRequired={true} onChange={handleChange} placeholder='Define difficulty'>
            {difficulties.map(diff => (
              <option value={diff}>{diff}</option>
            ))}
          </Select>
      }

      <Checkbox onChange={handleOnChange} defaultChecked={done}></Checkbox>
    </HStack>
  )
}

export default TaskItem
