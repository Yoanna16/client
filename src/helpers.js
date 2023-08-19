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