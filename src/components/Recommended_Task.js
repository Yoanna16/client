import React, { useState, useEffect } from 'react';
import {
  HStack,
  Button,
} from '@chakra-ui/react'
import { supabase } from '../supabase';
import { getBaselineValues, getMeasuredStress, getIdealDifficulty, calculateAbsoluteDifferencesDifficulty, calculateTaskScores, recommendTask } from '../helper_baseline';

const RecommendTask = () => {

  const [prios, setPrios] = useState([]);
  const [difficulties, setDiff] = useState([]);
  const [ids, setIds] = useState([]);
  const [baseline, setBaseline_1] = useState();
  const [baseline_2, setBaseline_2] = useState();
  const [hrv, setHrv] = useState();
  const [recommended, setRecommended] = useState();

  const [tasks, setTasks] = useState([]);

  async function fetchTasks(){
    let { data: tsk, error } = await supabase
    .from('todos')
    .select('*')
    const tasks = [];
    const ids = [];
    const prioValues = [];
    const diffValues = [];
    tsk.forEach(item => {
      if(item.done === false && item.recommended == null) {
        tasks.push(item);
        ids.push(item.id);
        prioValues.push(item.prio)
        diffValues.push(item.difficulty)
      }
    })
    setTasks(tasks)
    setIds(ids)
    setPrios(prioValues);
    setDiff(diffValues);
  }

/*   async function fetchIds() {
    let { data: ids, error } = await supabase
      .from('todos')
      .select('id')
    const idValues = [];
    ids.forEach(id => {
      idValues.push(id.id);
    })
    setIds(idValues);
  } */

/*   async function fetchDataPrio() {
    let { data: prios, error } = await supabase.from('todos').select('prio');
    const prioValues = []
    prios.forEach(element => {
      prioValues.push(element.prio)
    });
    setPrios(prioValues);
  } */

/*   async function fetchDataDiff() {
    let { data: diff, error } = await supabase.from('todos').select('difficulty');
    const diffValue = []
    diff.forEach(element => {
      diffValue.push(element.difficulty)
    });
    setDiff(diffValue);
  } */

  async function fetchBaseline_1() {
    let { data: baseline_1, error } = await supabase
      .from('baseline_1')
      .select('hrv_value')
    let hrv_Value_baseline = baseline_1[baseline_1.length - 1].hrv_value
    setBaseline_1(hrv_Value_baseline);
  }

  async function fetchBaseline_2() {
    let { data: baseline_2, error } = await supabase.from('baseline_2').select('hrv_value');
    let hrv_base2_value = baseline_2[baseline_2.length - 1].hrv_value
    setBaseline_2(hrv_base2_value);
  }

  async function fetchHrv() {
    let { data: hrv_data, error } = await supabase.from('hrv_data').select('hrv_value');
    let hrv_Value = hrv_data[hrv_data.length - 1].hrv_value
    setHrv(hrv_Value)
  }


  async function handleChange() {
    fetchTasks()
    fetchBaseline_1()
    fetchBaseline_2()
    fetchHrv()

    const thresholds = getBaselineValues(baseline, baseline_2);
    const measuredStress = getMeasuredStress(hrv, thresholds);
    const idealDiff = getIdealDifficulty(measuredStress);
    const difficultyDifferences = calculateAbsoluteDifferencesDifficulty(idealDiff, difficulties);
    const taskScores = calculateTaskScores(difficultyDifferences, prios);
    const indexOfMinScore = recommendTask(taskScores);
    //need to check whether the task that is recommended is not 'done'
    const id = ids[indexOfMinScore];

    const { data, error } = await supabase.from('todos').update({ recommended: true }).eq('id', id)
  }

  return (
    <HStack spacing={4}>
      <Button colorScheme={'blue'} onClick={handleChange} >
        RefreshPage
      </Button>
    </HStack>
  )
}

export default RecommendTask
