import React from 'react';
import '../scss/footer.scss';

const FooterNav = ({count}) => {
  return (
    <footer className='footer'>
      <div className="footer-container">
        <div className='icon-container call-icon active'><i className="fa-solid fa-phone"></i><span className='count'>{count}</span></div>
        <div className='icon-container user-icon'><i className="fa-regular fa-user"></i></div>
        <div className='icon-container dial-icon'>
          <span>
            <i className="fa-solid fa-ellipsis"></i>
            <i className="fa-solid fa-ellipsis"></i>
            <i className="fa-solid fa-ellipsis"></i>
          </span>
        </div>
        <div className='icon-container settings-icon'><i className="fa-solid fa-gear"></i></div>
        <div className='icon-container dot-icon'><i className="fa-solid fa-circle"></i></div>
      </div>
    </footer>
  );
};

export default FooterNav;