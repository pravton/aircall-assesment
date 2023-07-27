import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { formatDate, formatDatesInArray, groupCalls, filterNotArchived, filterIncomingCalls } from "../utils/helpers";
import { updateCall } from "../services/CallService";
import sampleData from "../../sampledata.json";
import ArchiveButton from "./ArchiveButton";
import '../scss/calls.scss';


import incomingCallIcon from '../assets/incoming-call.svg';
import loader from '../assets/loader.svg';

function IncomingCalls({ calls, refresh, setRefresh, loading, setCount }) {
  const [archiveAll, setArchiveAll] = useState(false);
  const samData = JSON.parse(JSON.stringify(sampleData));
  const filteredCalls = filterNotArchived(calls);
  const data = formatDatesInArray(filteredCalls);
  const groupedData = groupCalls(data);

  useEffect(() => {
    setCount(filterIncomingCalls(filteredCalls).length);
  }, [groupedData]);

  useEffect(() => {
    if (archiveAll) {
      const ids = filterIncomingCalls(filteredCalls).map(call => call.id);
      const patchRequests = ids.map(id => updateCall(id, JSON.stringify({ is_archived: true })), false);
      
      Promise.all(patchRequests)
        .then(responses => responses)
        .catch(error => console.error(error))
        .finally(() => setRefresh(refresh + 1));
    }
  }, [archiveAll]);

  
  const hasMissingInbounds = Object.keys(groupedData).some(date => !groupedData[date].hasOwnProperty('inbound'));

  if (loading) {
    return <div className='loading'>{loader()}</div>;
  }

  if (hasMissingInbounds) {
    return null;
  }

  if (Object.keys(groupedData).length === 0) {
    return null;
  }

  return (
    <div className="main-container">
      <div className="achive-button-container">
        <ArchiveButton setArchiveAll={setArchiveAll} text={'incoming'} />
      </div>
      <div className="calls-container">
            {Object.entries(groupedData).map(([key, value]) => {
              return (
                <div className="date-container" key={key}>
                  <div className="date">
                    <h3>{key}</h3>
                  </div>
                  {Object.entries(value).map(([type, typeData]) => {
                    if (type === 'inbound') {
                      return (
                          <div className="calls" key={type}>
                            {Object.entries(typeData).map(([number, callsToOrFromNumber]) => {
                              return (
                                <Link to={`/activities/${callsToOrFromNumber[0].id}`} key={callsToOrFromNumber[0].id}>
                                  <div className="call-wrapper" key={number} type={type}>
                                    {callsToOrFromNumber[0] && (
                                      <div className="call-container" key={callsToOrFromNumber[0].id} data-id={callsToOrFromNumber[0].id}>
                                        <div className="icon"><span>{incomingCallIcon()}</span></div>
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
                    }
                  })}
                </div>
              );
            })}
          </div>
    </div>
    
  );
}

export default IncomingCalls;