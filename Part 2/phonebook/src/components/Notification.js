import React from 'react'
import '../index.css';

const Notification = ({ notif }) => {
    if (notif === null) {
      return null
    }
  
    return (
      <div className='notification'>
        {notif}
      </div>
    )
  }

export default Notification