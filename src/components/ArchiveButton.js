import React from 'react';
import '../scss/ArchiveButtons.scss';

function ArchiveButton() {
  return (
    <div className='archive-button-container'>
      <button className='archive-button'>
        <i className="fa-solid fa-archive"></i>
        Archive all calls
      </button>
    </div>
  );
}

export default ArchiveButton;