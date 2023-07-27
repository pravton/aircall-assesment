import React, {useState} from 'react';
import { HashRouter as Router, Route, Routes } from 'react-router-dom';
import { CallProvider } from './context/CallContext';
import ActivityFeed from './components/ActivityFeed';
import ActivityDetail from './components/ActivityDetail';
import FooterNav from './components/FooterNav';
import Archive from './components/Archive';

import Header from './components/Header';

const App = () => {
  const [count, setCount] = useState(0);

  return (
    <CallProvider>
      <Router>
        <div className='container'>
          <Header />
          <Routes>
            <Route path="/" element={<ActivityFeed setCount={setCount} />} />
            <Route path="/activities/:id" element={<ActivityDetail />} />
          </Routes>
          <FooterNav count={count} />
        </div>
      </Router>
    </CallProvider>
  );
};

export default App;
