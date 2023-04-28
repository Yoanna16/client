import React from 'react'
import { HStack, StackDivider, VStack, Text, Box, Image } from '@chakra-ui/react'
import ClearTasks from './ClearTasks';
import DeleteTask from './DeleteTask';
import img from '../images/empty';

function TaskList() {

    const noTasks = () => {
        return (      <Box align="center">
        <Image src={img} mt="30px" maxW="95%" />
      </Box> )
    }
  return (
    <>
      <VStack
      divider={<StackDivider />}
      borderColor="gray.100"
      borderWidth="2px"
      p="2"
      borderRadius="lg"
      w="100%"
      maxW={{ base: '90vw', sm: '80vw', lg: '50vw', xl: '30vw' }}
      alignItems="stretch"
      >
{/*         <HStack>
            <Text w="100%" p="8px" borderRadius="lg">
                Wash the dishes
            </Text>
            <DeleteTask />
        </HStack> */}
      </VStack>
      <ClearTasks />
    </>
  )
}

export default TaskList
