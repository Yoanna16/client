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
  if (diff < 40) {
    return 'green'
  } else if (diff < 70 && diff > 40) {
    return 'yellow'
  } else if (diff <= 100 && diff >= 70) {
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

export function sortFunctionDifficulty(data, sortType) {
  if(sortType === "ascending") {
    data.sort((a,b) => a.difficulty - b.difficulty)
  } else if (sortType === "descending") {
    data.sort((a,b) => b.difficulty - a.difficulty)
  }
  return data; 
}