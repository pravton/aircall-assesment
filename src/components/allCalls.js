import React , {useEffect, useState, useContext } from "react";
import { Link } from 'react-router-dom';
import { formatDate, formatDatesInArray, groupCalls, filterNotArchived, filterAllCalls } from "../utils/helpers";
import { updateCall } from "../services/CallService";
import sampleData from "../../sampledata.json";
import ArchiveButton from "./ArchiveButton";
import '../scss/calls.scss';

import incomingCallIcon from '../assets/incoming-call.svg';
import outgoingCallIcon from '../assets/outgoing-call.svg';
import loader from '../assets/loader.svg';

function AllCalls({ calls, refresh, setRefresh, loading, setCount }) {
  const [archiveAll, setArchiveAll] = useState(false);
  const filteredCalls = filterNotArchived(calls);
  const data = formatDatesInArray(filteredCalls);
  const groupedData = groupCalls(data);

  useEffect(() => {
    setCount(filterAllCalls(filteredCalls).length);
  }, [groupedData]);

  useEffect(() => {
    if (archiveAll) {
      const ids = filterAllCalls(filteredCalls).map(call => call.id);
  
      const patchRequests = ids.map(id =>
        updateCall(id, JSON.stringify({ is_archived: true }), false)
          .then(response => response)
          .catch(error => {
            console.error(`Error updating call with id ${id}:`, error);
            return null;
          })
      );
        
      Promise.all(patchRequests)
        .then(() => {})
        .catch(error => console.error('An unexpected error occurred:', error))
        .finally(() => setRefresh(refresh + 1));
    }
  }, [archiveAll]);

  if (loading) {
    return <div className='loading'>{loader()}</div>;
  }

  if (Object.keys(groupedData).length === 0) {
    return null;
  }

  return (
    <div className="main-container">
      <div className="achive-button-container">
        <ArchiveButton setArchiveAll={setArchiveAll} text={'all'} />
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

export default AllCalls;
