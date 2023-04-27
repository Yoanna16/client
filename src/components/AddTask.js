import React from 'react'
import { Button, HStack, Input } from '@chakra-ui/react';

function AddTask() {
  return (
    <form>
        <HStack my="4" h="45">
          <Input h="100%" variant="filled" placeholder='Do the laundry' />
          <Button colorScheme="blue" px="10" h="100%" type="submit"> 
            Add
          </Button>
        </HStack>
    </form>
  )
}

export default AddTask
