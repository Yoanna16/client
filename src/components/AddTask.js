import React, { useState } from 'react';
import {
  Button,
  HStack,
  Input,
  Slider,
  SliderFilledTrack,
  SliderTrack,
  Tooltip,
  SliderThumb,
} from '@chakra-ui/react';
import { supabase } from '../supabase';

function AddTask() {
  const [text, setText] = useState('');
  const [difficulty, setDifficulty] = useState('');
  const [showTooltip, setShowTooltip] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();

  
    const { data, error } = await supabase
      .from('todos')
      .insert([
        {
          text: text,
          done: false,
          prio: '',
          difficulty: difficulty ? difficulty : 10,
        },
      ]);
    console.log(data);
    setText('');
    window.location.reload();
  }


  return (
    <form onSubmit={handleSubmit}>
      <HStack
        my="10"
        h="45"
        spacing={8}
        direction="row"
        justifyContent="space-between"
      >
        <Input
          h="100%"
          variant="filled"
          placeholder="Do the laundry"
          value={text}
          onChange={e => setText(e.target.value)}
        />
        </HStack>
        <HStack
        my="10"
        h="45"
        spacing={8}
        direction="column"
        justifyContent="space-between">
        <Slider
          id="slider"
          defaultValue={5}
          min={0}
          max={100}
          size="lg"
          colorScheme="blue"
          onChange={v => setDifficulty(v)}
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
            label={`${difficulty}%`}
          >
            <SliderThumb />
          </Tooltip>
        </Slider>
        <Button colorScheme="blue" px="10" h="100%" type="submit">
          Add
        </Button>
      </HStack>
    </form>
  );
}

export default AddTask;
