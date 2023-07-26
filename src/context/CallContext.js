import React, { createContext, useState } from 'react';

export const CallContext = createContext();

export function CallProvider({ children }) {
  const [calls, setCalls] = useState([]);

  return (
    <CallContext.Provider value={{ calls, setCalls }}>
      {children}
    </CallContext.Provider>
  );
}
