export  function renderColorBadge(prio) {
    // eslint-disable-next-line default-case
    switch(prio) {
      case 'low':
        return 'yellow';
      case 'medium':
        return 'green';
      case 'high':
        return 'red';
   }
  }