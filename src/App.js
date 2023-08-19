import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Heading, VStack, Button, Slider, SliderMark, SliderTrack, SliderFilledTrack, Tooltip, SliderThumb } from '@chakra-ui/react';
import TaskList from './components/TaskList';
import AddTask from './components/AddTask';
import { supabase } from './supabase';
import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';
import axios  from 'axios';
import RecommendTask from './components/Recommended_Task';

function App() {
  return (
    <>
    <VStack>
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
      <RecommendTask />
      <TaskList/>
    </VStack>
    </>
    
  );
}

export default App;
