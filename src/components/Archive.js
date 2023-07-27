import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import { formatDate, formatDatesInArray, groupCalls, filterArchived, filterAllCalls } from "../utils/helpers";
import sampleData from "../../sampledata.json";
import UnArchiveButton from "./UnArchiveButton";
import { resetCalls } from '../services/CallService';
import '../scss/calls.scss';

import incomingCallIcon from '../assets/incoming-call.svg';
import outgoingCallIcon from '../assets/outgoing-call.svg';
import loader from '../assets/loader.svg';

function Archive({ calls, refresh, setRefresh, loading, setCount }) {
  const [unArchiveAll, setUnArchiveAll] = useState(false);
  const filtered = filterArchived(calls);
  const data = formatDatesInArray(filtered);
  const groupedData = groupCalls(data);

  useEffect(() => {
    setCount(filterAllCalls(filtered).length);
  }, [groupedData]);

  useEffect(() => {
    const fetchCall = async () => {
      if(unArchiveAll) {
        try {
          const callData = await resetCalls();
          setRefresh(refresh+1);
        } catch (error) {
          console.error('Error fetching call:', error); 
        }
      }
    };
  
    fetchCall();
  }, [unArchiveAll]);

  if (loading) {
    return <div className='loading'>{loader()}</div>;
  }

  
  if (Object.keys(groupedData).length === 0) {
    return null;
  }

  return (
    <div className="main-container">
      <div className="achive-button-container">
        <UnArchiveButton setUnArchiveAll={setUnArchiveAll} />
      </div>
      <div className="calls-container">
            {Object.entries(groupedData).map(([key, value]) => {
              return (
                <div className="date-container" key={key}>
                  <div className="date">
                    <h3>{key}</h3>
                  </div>
                  {Object.entries(value).map(([type, typeData]) => {
                    return (
                      <div className="calls" key={type}>
                        {Object.entries(typeData).map(([number, callsToOrFromNumber]) => {
                          return (
                            <Link to={`/activities/${callsToOrFromNumber[0].id}`} key={callsToOrFromNumber[0].id}>
                              <div className="call-wrapper" key={number} type={type}>
                                {callsToOrFromNumber[0] && (
                                  <div className="call-container" key={callsToOrFromNumber[0].id} data-id={callsToOrFromNumber[0].id}>
                                    {type === 'inbound' ? <div className="icon"><span>{incomingCallIcon()}</span></div> : <div className="icon"><span>{outgoingCallIcon()}</span></div>}
                                    <div className="number-details">
                                      <div className="number-tofrom">
                                        <span className="number">{callsToOrFromNumber[0].from}</span>
                                        {callsToOrFromNumber.length !== 1 && <span className="count"><span>{callsToOrFromNumber.length}</span></span>}
                                      </div>
                                      <div className="number-via">
                                        <span className="via">tried to call via {callsToOrFromNumber[0].via}</span>
                                      </div>
                                    </div>
                                    <div className="time">
                                      <span className="time-text">{callsToOrFromNumber[0].formattedDate.time}</span>
                                      <span className="period">{callsToOrFromNumber[0].formattedDate.period}</span>
                                    </div>
                                  </div>
                                )}
                              </div>
                            </Link>
                          );
                        })}
                      </div>
                    )
                  })}
                </div>
              );
            })}
          </div>
    </div>
    
  );
}

export default Archive;