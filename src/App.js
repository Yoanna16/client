import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Heading, VStack } from '@chakra-ui/react';
import TaskList from './components/TaskList';
import AddTask from './components/AddTask';
import { supabase } from './supabase';
import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';

function App() {
  const [session, setSession] = useState(null)

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
    })

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })
    
    return () => subscription.unsubscribe()
  }, [])


  if (!session) {
    return (<Auth supabaseClient={supabase} appearance={{ theme: ThemeSupa }} providers={["google"]} />)
  }

  return (
    <>
    <VStack p={4} minH="100vh">
      <Heading
      mt="20"
      p="5"
      fontWeight="extrabold"
      size="xl"
      bgGradient="linear(to-l, teal.300, blue.500)"
      bgClip="text"
      >
        Todo List
      </Heading>      
      <AddTask/>        
      <TaskList/>
    </VStack>
    </>
    
  );
}

export default App;
