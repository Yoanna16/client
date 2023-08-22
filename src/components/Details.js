import React from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Button

} from '@chakra-ui/react'
import { useDisclosure } from '@chakra-ui/react'

const Details = ({ details }) => {

  const { isOpen, onOpen, onClose } = useDisclosure()

  return (
      <>
      <Button mr={'20px'}variant={'link'} onClick={onOpen} colorScheme="blue">Details</Button>
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
  )
}

export default Details
