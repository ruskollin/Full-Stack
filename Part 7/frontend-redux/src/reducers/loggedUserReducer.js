
import blogService from '../services/blogs'

const loggedUserReducer = (state = null, action) => {
  switch (action.type) {
  case 'SET_USER':
    return action.data
  case 'SET_LOGGED_USER':
    return action.data
  default:
    return state
  }
}

export const setUser = (user) => {
  return async dispatch => {
    dispatch({
      type: 'SET_USER',
      data: user,
    })
  }
}

export const setLoggedUser = () => {
  return async dispatch => {
    const loggedUser = await window.localStorage.getItem('loggedUser')
    if (loggedUser) {
      const user = JSON.parse(loggedUser)
      blogService.setToken(user.token)
      dispatch({
        type: 'SET_LOGGED_USER',
        data: user,
      })
    }
  }
}

export default loggedUserReducer