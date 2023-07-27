import React from 'react';
import '../scss/ArchiveButtons.scss';

function ArchiveButton({setArchiveAll, text}) {

  function handleButtonClick() {
    setArchiveAll(true);
  }

  return (
    <div className='archive-button-container'>
      <button onClick={handleButtonClick} className='archive-button'>
        <i className="fa-solid fa-archive"></i>
        Archive {text} calls
      </button>
    </div>
  );
}

export default ArchiveButton;