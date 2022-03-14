import axios from 'axios'

const userReducer = (state = [], action) => {
  switch (action.type) {
  case 'INITIALIZE_USERS':
    return action.data
  default:
    return state
  }
}

export const initializeUsers = () => {
  return async dispatch => {
    const users = await axios.get('/api/users')
    const userList = users.data
    dispatch({
      type: 'INITIALIZE_USERS',
      data: userList
    })
  }
}

export default userReducer