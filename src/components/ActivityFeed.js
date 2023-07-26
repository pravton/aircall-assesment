import React, {useContext} from 'react';
import { CallContext } from '../context/CallContext';
import '../scss/ActivityFeed.scss';

import ArchiveButton from './ArchiveButton';

function ActivityFeed() {
  const { calls, loading } = useContext(CallContext);

  if (loading) {
    return <LoadingIndicator />;
  }

  return (
    <div className='activity-feed'>
      <div className="activity-feed-header">
        <div className='title-container'>
          <h2><i className="fa-solid fa-phone"></i>Activity</h2>
        </div>
        <div className='buttons-container'>
          <button className='button'>Inbox</button>
          <button className='button'>All</button>
          <button className='button'><i className="fa-solid fa-sliders"></i></button>
        </div>
      </div>
      <div className='activity-feed-body'>
        <ArchiveButton />
      </div>
    </div>
  );
}

export default ActivityFeed;
