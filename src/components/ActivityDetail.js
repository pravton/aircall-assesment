import React, { useEffect, useState, useContext } from 'react';
import { CallContext } from '../context/CallContext';
import { useParams, useNavigate } from 'react-router-dom';
import { getCall, updateCall } from '../services/CallService';
import { formatDate } from "../utils/helpers";

import incomingCallIcon from '../assets/incoming-call.svg';
import outgoingCallIcon from '../assets/outgoing-call.svg';
import loader from '../assets/loader.svg';

function ActivityDetail() {
  const { refresh, setRefresh } = useContext(CallContext);
  const history = useNavigate();
  const { id } = useParams();
  const [update, setUpdate] = useState(0);
  const [call, setCall] = useState({});

  const goBack = () => {
    history(-1);
  }

  const handleButtonClick = async (e) => {
    const archived = e.target.value === 'true' ? true : false;
    const data = {
      is_archived: !archived,
    };

    try {
      const response = await updateCall(id, JSON.stringify(data), false);
      setUpdate(update+1);
      setRefresh(refresh + 1)
    } catch (error) {
      console.error(error);
    }
  };


  useEffect(() => {
    const fetchCall = async () => {
      try {
        const callData = await getCall(id);
        const formattedDate = formatDate(callData.created_at);
        setCall({
          ...callData,
          formattedDate: formattedDate
        });
      } catch (error) {
        console.error('Error fetching call:', error); 
      }
    };
  
    fetchCall();
  }, [id, update]);

  if (Object.keys(call).length === 0) {
    return <div className='loading'>{loader()}</div>;
  }

  
  return (
    <div className='activity-detail-container'>
      <div className='calls-container'>
        <div className='calls'>
          <div className="call-container call-detail" data-id={call.id}>
          {call.direction === 'inbound' ? <div className="icon"><span>{incomingCallIcon()}</span></div> : <div className="icon"><span>{outgoingCallIcon()}</span></div>}
            <div className="number-details">
              <div className="number-tofrom">
                <span className="number"><span>From: </span>{call.from}</span>
                <span className="number"><span>To: </span>{call.to}</span>
                {/* {call.length !== 1 && <span className="count"><span>{call.length}</span></span>} */}
              </div>
              <div className="number-via">
                <span className="via">tried to call via {call.via}</span>
              </div>
              <div className="call-duration">
                <span className="duration"><span>Duration: </span>{call.duration}</span>
              </div>
              <div className="call-type">
                <span className="type"><span>Type: </span>{call.call_type}</span>
              </div>
              <div className="archived">
                <span className="status"><span>Archived: </span>{call.is_archived ? "Yes" : "No"}</span>
              </div>
            </div>
            <div className="time">
              <span className="time-text">{call.formattedDate.time}</span>
              <span className="period">{call.formattedDate.period}</span>
            </div>
          </div>
        </div>
        <div className="buttons-container">
          <button onClick={handleButtonClick} className="button" value={call.is_archived}>{call.is_archived ? "Unarchive" : "Archive"}</button>
          <button onClick={goBack} className="button">Go Back</button>
        </div>
      </div>
    </div>
  );
}

export default ActivityDetail;