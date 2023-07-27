export function formatDate(isoDateString) {
  const date = new Date(isoDateString);

  const options = { year: 'numeric', month: 'long', day: 'numeric' };

  const formattedDate = date.toLocaleDateString('en-US', options);
  let hours = date.getHours();
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();

  const isAM = hours < 12 || hours === 0;
  let period = isAM ? 'AM' : 'PM';

  if (hours === 0) {
    hours = 12;
  } else if (hours > 12) {
    hours -= 12;
  }

  const formattedTime = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;

  return {
    date: formattedDate,
    time: formattedTime,
    period: period
  };
}

export function formatDatesInArray(array) {
  if (!Array.isArray(array)) return [];
  return array.map(item => {
    const formattedDate = formatDate(item.created_at);
    return {
      ...item,
      formattedDate: formattedDate
    };
  });
}

export function groupCalls(calls) {
  if (!Array.isArray(calls)) { 
    return {}; 
  }
  const grouped = calls.reduce((acc, call) => {
    const date = call.formattedDate.date;
    const direction = call.direction;
    let key = 'no-type';
    if (call.direction == undefined || call.to == undefined || call.from == undefined) {
      return acc;
    }
    // if (call.direction === undefined) {
    //   call.direction = 'n/a';
    // }
    // if (call.to === undefined) {
    //   call.to = 'n/a';
    // }
    // if (call.from === undefined) {
    //   call.from = 'n/a';
    // }
    key = call.direction === 'outbound' ? call?.to.toString() : call?.from.toString();

    if (!acc[date]) {
      acc[date] = {};
    }

    if (!acc[date][direction]) {
      acc[date][direction] = {};
    }

    if (!acc[date][direction][key]) {
      acc[date][direction][key] = [];
    }

    acc[date][direction][key].push(call);

    return acc;
  }, {});

  return grouped;
}


export function filterArchived(calls) {
  const filteredCalls = calls.filter(call => call.is_archived === true);
  return filteredCalls;
}

export function filterNotArchived(calls) {
  const filteredCalls = calls.filter(call => call.is_archived === false);
  return filteredCalls;
}

export function filterIncomingCalls(calls) {
  const filteredCalls = calls.filter(call => {
    if (call.direction == undefined || call.to == undefined || call.from == undefined) {
      return;
    }
    return call.direction === 'inbound';
  });
  return filteredCalls;
}


export function filterAllCalls(calls) {
  const filteredCalls = calls.filter(call => {
    if (call.direction == undefined || call.to == undefined || call.from == undefined) {
      return;
    }
    return call;
  });
  return filteredCalls;
}