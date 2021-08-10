  
import React from 'react'

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