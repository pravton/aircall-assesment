import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { CallProvider } from './context/CallContext';
import ActivityFeed from './components/ActivityFeed';
import ActivityDetail from './components/ActivityDetail';
import Archive from './components/Archive';

import Header from './components/Header';

const App = () => {
  return (
    <CallProvider>
    <Router>
      <div className='container'>
        <Header />
        <Routes>
          <Route path="/activities/:id" element={<ActivityDetail />} />
          <Route path="/archive" element={<Archive />} />
          <Route path="/" element={<ActivityFeed />} />
        </Routes>
      </div>
    </Router>
    </CallProvider>

  );
};

export default App;
