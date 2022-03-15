import React from 'react'
import '../index.css'
import { useSelector } from 'react-redux'

const Notification = () => {
  const notif = useSelector(state => state.notification)
  if (!notif) {
    return null
  } else {
    return (
      <div className='notification'>
        {notif}
      </div>
    )
  }

}

export default Notification