import React, { createContext, useState, useEffect } from 'react';

import { getCalls } from '../services/CallService';

export const CallContext = createContext();

export function CallProvider({ children }) {
  const [calls, setCalls] = useState([]);
  const [error, setError] = useState(null);
  const [refresh, setRefresh] = useState(0);

  useEffect(() => {
    getCalls().then((data) => {
      setCalls(data);
      setError(null); // reset error state when we successfully retrieve data
    }).catch(error => {
      setError("Failed to fetch calls");
      console.error("Failed to fetch calls:", error);
    });
  }, [refresh]);

  return (
    <CallContext.Provider value={{ calls, setCalls, refresh, setRefresh }}>
      {children}
    </CallContext.Provider>
  );
}
