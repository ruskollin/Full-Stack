  
import React from 'react'

const Notification = ({ notif }) => {
    if (notif === '') {
      return (
      <div style={{height: '33px'}}>
      </div>
      )
    } else {
  
    return (
      <div className='notification'>
        {notif}
      </div>
    )
  }
}

export default Notification