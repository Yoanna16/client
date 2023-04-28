import React, { useState } from 'react'
import { IconButton, useToast } from '@chakra-ui/react'
import { supabase } from '../supabase'

function DeleteTask({id}) {

  const [loading, setLoading] = useState(false)
  const toast = useToast();

  async function handleDelete() {
    try {
      setLoading(true);
      const { data, error } = await supabase.from('todos').delete().eq('id', id)
      setLoading(false);

  
      toast({
        title: error || 'Task deleted!',
        position: 'top',
        status: error ? 'error' : 'success',
        duration: 2000,
        isClosable: true,
      })
      window.location.reload();
    } catch(err) {
      alert(err.message)
    }
  }
  return (
  <IconButton
    isRound="true"
    onClick={handleDelete}
    isLoading={loading}
  />
  );
}

export default DeleteTask
