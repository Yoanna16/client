import React from 'react';
import { Slider, SliderMark, SliderTrack, SliderFilledTrack, Tooltip, SliderThumb, HStack, Button } from '@chakra-ui/react';


const DefineStress = () => {
  return (
    <div>
    <HStack
    my="10"
    h="45"
    spacing={8}
    direction="row"
    justifyContent="space-between"
    >
        <Slider
          id="slider"
          defaultValue={5}
          min={0}
          max={100}
          colorScheme="teal"
          size="lg"
        >
          <SliderMark value={25} mt="1" ml="-2.5" fontSize="sm">
            25%
          </SliderMark>
          <SliderMark value={50} mt="1" ml="-2.5" fontSize="sm">
            50%
          </SliderMark>
          <SliderMark value={75} mt="1" ml="-2.5" fontSize="sm">
            75%
          </SliderMark>
          <SliderTrack>
            <SliderFilledTrack />
          </SliderTrack>
          <Tooltip
            hasArrow
            bg="teal.500"
            color="white"
            placement="top"
          >
            <SliderThumb />
          </Tooltip>
        </Slider> 
        </HStack>
        <HStack 
    my="10"
    h="45"
    spacing={8}
    direction="row"
    justifyContent="space-between">
        <Button colorScheme="blue" px="10" h="100%" type="submit">
          Add Stress
        </Button>     
    </HStack>
    </div>
  )
}

export default DefineStress
