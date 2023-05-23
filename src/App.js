import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Heading, VStack, Button, Slider, SliderMark, SliderTrack, SliderFilledTrack, Tooltip, SliderThumb } from '@chakra-ui/react';
import TaskList from './components/TaskList';
import AddTask from './components/AddTask';
import { supabase } from './supabase';
import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';
import axios  from 'axios';
import { requestBody } from './dataManager';
import DefineStress from './components/DefineStress';

function App() {
  const [session, setSession] = useState(null)
  const [token, setToken] = useState()


  async function googleSignIn() {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        scopes: 'https://www.googleapis.com/auth/fitness.heart_rate.read',
      }
    });

    if(error) {
      alert("Error logging in to Google provider with Supabase");
      console.log(error);
    }
    console.log(data.session)
    setToken(data.session.provider_token) // use to access provider API
  }

  const fetchHeartRateData = async () => {
    const response = await axios.post('https://www.googleapis.com/fitness/v1/users/me/dataset:aggregate', requestBody,
      {  params: {
        'key': process.env.API_KEY
      },
      headers: {
          Authorization: `Bearer ${session.provider_token}`,
        },
      }
    ).then((resp) => console.log(resp.data.bucket));
  }

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

  useEffect(() => {
    fetchHeartRateData();
  }, session)

  if (!session) {
    return (<>
    <Button onClick={() => googleSignIn()}>Sign In With Google</Button>
     <button onClick={() => googleSignIn()}>Sign In With Google</button>
    </>)
  }

  return (
    <>
    <VStack p={2} minH="100vh">
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
      <DefineStress />  
      <AddTask/>        
      <TaskList/>
    </VStack>
    </>
    
  );
}

export default App;
