import React from 'react';
import {
  Badge,
} from '@chakra-ui/react'
import { renderColorBadge } from '../helpers';



const Prio = ({ prio }) => {

  let newPrio = '';
  if (prio === 1) {
    newPrio = 'low'
  } else if (prio === 2) {
    newPrio = 'medium'
  } else if (prio === 3) {
    newPrio = 'high'
  }


  return (

      <Badge colorScheme={renderColorBadge(newPrio)}>
        {newPrio}
      </Badge>

  )
}

export default Prio
