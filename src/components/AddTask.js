import React, { useState } from 'react'
import { Button, HStack, Input, Select, Stack } from '@chakra-ui/react';
import { supabase } from '../supabase';

function AddTask() {
  const [text, setText] = useState('');
  const [prio, setPrio] = useState('');

  const prios = [ 'high', 'medium', 'low'];

  async function handleSubmit(e) {
    e.preventDefault();

    const { data: { user } } = await supabase.auth.getUser();
    const { data, error } = await supabase.from('todos').insert([{ text: text, owner_id: user.id, done: false, prio: prio}]);
    console.log(data)
    setText('');
    window.location.reload();
  }

  return (
    <form onSubmit={handleSubmit}>
      <Stack
       spacing={4}
       direction='row'
      >
        <HStack my="10" h="45">
          <Input
          h="100%"
          variant="filled"
          placeholder='Do the laundry'
          value={text}
          onChange={e => setText(e.target.value)}
          />
          <Select isRequired={true} onChange={e => setPrio(e.target.value)}>
            {
              prios.map(prio => (
                <option value={prio}>{prio}</option>
              ))
            }
          </Select>
          <Button 
          colorScheme="blue"
          px="10" h="100%" 
          type="submit"
          > 
            Add
          </Button>
        </HStack>
        </Stack>
    </form>
  )
}

export default AddTask
