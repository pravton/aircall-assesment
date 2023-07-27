import React from 'react';
import '../scss/ArchiveButtons.scss';

function UnArchiveButton({setUnArchiveAll}) {

  function handleButtonClick() {
    setUnArchiveAll(true);
  }

  return (
    <div className='archive-button-container'>
      <button onClick={handleButtonClick} className='archive-button'>
        <i className="fa-solid fa-archive"></i>
        Unarchive all calls
      </button>
    </div>
  );
}

export default UnArchiveButton;