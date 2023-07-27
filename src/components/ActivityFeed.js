import React, {useContext, useState} from 'react';
import { CallContext } from '../context/CallContext';
import '../scss/activityFeed.scss';
import AllCalls from './allCalls';
import IncomingCalls from './incomingCalls';
import Archive from './Archive';

import loader from '../assets/loader.svg';

function ActivityFeed({setCount}) {
  const { calls, loading, refresh, setRefresh } = useContext(CallContext);
  const [selected, setSelected] = useState('incoming');

  const components = {
    'incoming': <IncomingCalls calls={calls} refresh={refresh} setRefresh={setRefresh} loading={loading} setCount={setCount} />,
    'all': <AllCalls calls={calls} refresh={refresh} setRefresh={setRefresh} loading={loading} setCount={setCount} />,
    'archive': <Archive calls={calls} refresh={refresh} setRefresh={setRefresh} loading={loading} setCount={setCount} />
  };

  const buttonToggle = (e) => {
    setSelected(e.target.value);
  }

  if (loading) {
    return <div className='loading'>{loader()}</div>;
  }

  return (
    <div className='activity-feed'>
      <div className="activity-feed-header">
        <div className='title-container'>
          <h2><i className="fa-solid fa-phone"></i>Activity</h2>
        </div>
        <div className='buttons-container'>
          <button onClick={buttonToggle} className={`button ${selected === 'incoming' ? 'selected' : ''}`} value="incoming"><span>Inbox</span></button>
          <button onClick={buttonToggle} className={`button ${selected === 'all' ? 'selected' : ''}`} value="all"><span>All calls</span></button>
          <button onClick={buttonToggle} className={`button ${selected === 'archive' ? 'selected' : ''}`} value="archive"><span>Archived</span></button>
          <button className='button'><span><i className="fa-solid fa-sliders"></i></span></button>
        </div>
      </div>
      <div className='activity-feed-body' >
        {components[selected]}
      </div>
    </div>
  );
}

export default ActivityFeed;
