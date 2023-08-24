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

const Details = ({ details, title }) => {

  const { isOpen, onOpen, onClose } = useDisclosure()

  return (
      <>
      <Button mr={'20px'}variant={'link'} onClick={onOpen} colorScheme="blue">Details</Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{title}</ModalHeader>
          <ModalCloseButton />
          <ModalBody whiteSpace={'break-spaces'}>
            {details}
          </ModalBody>
        </ModalContent>
      </Modal>
      </>     
  )
}

export default Details
