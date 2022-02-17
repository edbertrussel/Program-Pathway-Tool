import logo from '../logo.png'
import './Notification.css'
import React from 'react';
import { Link } from 'react-router-dom';

function Notification(){

  return(
    <div className='Notification'>
      <img src={logo} className="logo" alt="logo" />
      <p className='lbl__notification'>Drag and drop the courses you have taken</p>
      <Link
        className="btn__okay"
        to="/usermain">
        Okay
      </Link>
      <Link
        className="btn__back"
        to="/">
        Back
      </Link>
    </div>
  );
}

export default Notification;