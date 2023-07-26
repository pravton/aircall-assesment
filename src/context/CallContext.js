import React, { createContext, useState, useEffect } from 'react';

import { getCalls } from '../services/CallService';

export const CallContext = createContext();

export function CallProvider({ children }) {
  const [calls, setCalls] = useState([]);

  // useEffect(() => {
  //   getCalls().then((data) => {
  //     console.log('CallContext: getCalls', data);
  //     setCalls(data);
  //   }).catch(error => {
  //     console.error("Failed to fetch calls:", error);
  //   });
  // }, []);

  return (
    <CallContext.Provider value={{ calls, setCalls }}>
      {children}
    </CallContext.Provider>
  );
}
