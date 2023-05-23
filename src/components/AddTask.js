import React, { useState } from 'react';
import {
  Button,
  HStack,
  Input,
  Select,
  Stack,
  Slider,
  SliderMark,
  SliderFilledTrack,
  SliderTrack,
  Tooltip,
  SliderThumb,
} from '@chakra-ui/react';
import { supabase } from '../supabase';

function AddTask() {
  const [text, setText] = useState('');
  const [prio, setPrio] = useState('');
  const [difficulty, setDifficulty] = useState('');
  const [showTooltip, setShowTooltip] = useState(false);

  const prios = ['high', 'medium', 'low'];

  async function handleSubmit(e) {
    e.preventDefault();

    const {
      data: { user },
    } = await supabase.auth.getUser();
    const { data, error } = await supabase
      .from('todos')
      .insert([
        {
          text: text,
          owner_id: user.id,
          done: false,
          prio: prio,
          difficulty: difficulty,
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
        <Select isRequired={true} onChange={e => setPrio(e.target.value)}>
          {prios.map(prio => (
            <option value={prio}>{prio}</option>
          ))}
        </Select>
        </HStack>
        <HStack
        my="10"
        h="45"
        spacing={8}
        direction="row"
        justifyContent="space-between">
        <Slider
          id="slider"
          defaultValue={5}
          min={0}
          max={100}
          colorScheme="teal"
          onChange={v => setDifficulty(v)}
          onMouseEnter={() => setShowTooltip(true)}
          onMouseLeave={() => setShowTooltip(false)}
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
