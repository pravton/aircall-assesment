import React, {useContext} from 'react';
import { CallContext } from '../context/CallContext';
import styles from './ActivityFeed.module.css';

function ActivityFeed() {
  const { calls, loading } = useContext(CallContext);

  if (loading) {
    return <LoadingIndicator />;
  }

  return (
    <div className={styles.feed}>
      <div className=''>
        <h2>Activity</h2>
      </div>
      <div className='buttons-container'>
        <button className='button'>Inbox</button>
        <button className='button'>All</button>
      </div>
    </div>
  );
}

export default ActivityFeed;
