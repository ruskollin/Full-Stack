import React from 'react'
import { useSelector } from 'react-redux'

const Notification = () => {
  const notification = useSelector(state => state.notification)

  const style = {
    border: 'solid',
    padding: 10,                           
    borderWidth: 1,
    fontSize: '12px',
    color: 'blue'
  }

  let component = null
  if (notification) {
    component = (
      <div style={style}>
        {notification}
      </div>
    )
  }

  return component
}

export default Notification