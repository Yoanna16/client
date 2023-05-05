import React, { useState } from 'react'
import { Button, HStack, Input } from '@chakra-ui/react';
import { supabase } from '../supabase';

function AddTask() {
  const [text, setText] = useState('');

  async function handleSubmit(e) {
    e.preventDefault();

    const { data: { user } } = await supabase.auth.getUser();
    const { data, error } = await supabase.from('todos').insert([{ text: text, owner_id: user.id }]);
    console.log(data)
    setText('');
    window.location.reload();
  }

  return (
    <form onSubmit={handleSubmit}>
        <HStack my="4" h="45">
          <Input
          h="100%"
          variant="filled"
          placeholder='Do the laundry'
          value={text}
          onChange={e => setText(e.target.value)}
          />
          <Button 
          colorScheme="blue"
          px="10" h="100%" 
          type="submit"
          > 
            Add
          </Button>
        </HStack>
    </form>
  )
}

export default AddTask
