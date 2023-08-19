import React, { useState, useEffect } from 'react';
import {
  HStack,
  Text,
  Checkbox,
  Badge,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Slider,
  SliderFilledTrack,
  SliderTrack,
  Tooltip,
  SliderThumb,
} from '@chakra-ui/react'
import { supabase } from '../supabase';

const RecommendTask = () => {

    const [tasks, setTasks] = useState([]);
    const [baseline_1, setBaseline_1] = useState();
    const [baseline_2, setBaseline_2] = useState();
    const [hrv, setHrv] = useState();
    const [recommended, setRecommended] = useState();

    async function fetchTask() {
        let { data: tasks, error } = await supabase.from('todos').select('*');
        setTasks(tasks);
    }

    async function fetchBaseline_1() {
        let { data: baseline_1, error } = await supabase.from('baseline_1').select('hrv_value');
        setBaseline_1(baseline_1);
    }

    async function fetchBaseline_2() {
        let { data: baseline_2, error } = await supabase.from('baseline_2').select('hrv_value');
        setBaseline_2(baseline_2);
    }

    async function fetchHrv() {
        let { data: hrv_data, error } = await supabase.from('hrv_data').select('hrv_value');
        setHrv(hrv_data[hrv_data.length -1].hrv_value)
        console.log(hrv)
    }


  async function handleChange() {
    fetchTask()
    fetchBaseline_1()
    fetchBaseline_2()
    fetchHrv()
  }

  return (
    <HStack spacing={4}>
      <Button colorScheme={'blue'} onClick={handleChange}>
        Recommend Task
      </Button>
    </HStack>
  )
}

export default RecommendTask
