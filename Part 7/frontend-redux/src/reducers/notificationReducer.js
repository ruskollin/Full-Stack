const notificationReducer = (state = null, action) => {
  switch (action.type) {
  case 'SET_NOTIFICATION':
    return action.message
  default:
    return state
  }
}

export const setNotification = (message, timeout) => {
  window.clearTimeout(window.timeout)

  const object = {
    type: 'SET_NOTIFICATION',
    message: message
  }
  return async dispatch => {
    await dispatch(object)

    window.timeout = setTimeout(() => {
      dispatch({
        ...object,
        message: null
      })
    }, timeout * 1000)
  }
}

export default notificationReducer