export  function renderColorBadge(prio) {
    // eslint-disable-next-line default-case
    switch(prio) {
      case 'low':
        return 'green';
      case 'medium':
        return 'yellow';
      case 'high':
        return 'red';
   }
  }

export function renderDiffColors(diff) {
  if (diff <= 33) {
    return 'green'
  } else if (diff < 67 && diff > 33) {
    return 'yellow'
  } else if (diff <= 100 && diff >= 67) {
    return 'red'
  }
}


export function sortFunctionPrio(data, sortType) {
  if(sortType === "ascending") {
    data.sort((a,b) => a.prio - b.prio)
  } else if (sortType === "descending") {
    data.sort((a,b) => b.prio - a.prio)
  }
  return data; 
}

export function handleSortPrio(tasks, setTasks, sortType, setSortType) {
  if(sortType === 'ascending') {
    sortFunctionPrio(tasks, 'ascending')
    setTasks(tasks)
    setSortType('descending')
} else if (sortType === 'descending') {
    sortFunctionPrio(tasks, 'descending')
    setTasks(tasks)
    setSortType('ascending')
}
}

export function sortFunctionDifficulty(data, sortType) {
  if(sortType === "ascending") {
    data.sort((a,b) => a.difficulty - b.difficulty)
  } else if (sortType === "descending") {
    data.sort((a,b) => b.difficulty - a.difficulty)
  }
  return data; 
}

export function handleSortDiff(tasks, setTasks, sortDiff, setSortDiff) {
  if(sortDiff === 'ascending') {
    sortFunctionDifficulty(tasks, 'ascending', setSortDiff)
    setTasks(tasks)
    setSortDiff('descending')
} else if (sortDiff === 'descending') {
    sortFunctionDifficulty(tasks, 'descending')
    setTasks(tasks)
    setSortDiff('ascending')
}
}

export function sortFunctionDone(data, sortType) {
  if(sortType === "true") {
    data.sort((a,b) =>b.done - a.done)
  } else if (sortType === "false") {
    data.sort((a,b) => a.done - b.done)
  }
  return data;
}

export function handleSortDone(tasks, setTasks, sortDone, setSortDone) {
  if(sortDone === 'false') {
    sortFunctionDone(tasks, 'false')
    setTasks(tasks);
    setSortDone('true')
} else if (sortDone === 'true') {
    sortFunctionDone(tasks, 'true')
    setTasks(tasks)
    setSortDone('false')
}
}