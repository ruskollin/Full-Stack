// const anecdotesAtStart = [
//   'If it hurts, do it more often',
//   'Adding manpower to a late software project makes it later!',
//   'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
//   'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
//   'Premature optimization is the root of all evil.',
//   'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
// ]


// const generateId = () =>
//   Number((Math.random() * 1000000).toFixed(0))

// const asObject = (anecdote) => {
//   return {
//     content: anecdote,
//     id: generateId(),
//     votes: 0
//   }
// }

// const initialState = anecdotesAtStart.map(asObject)

import anecdoteService from '../services/anecdotes'

const anecdoteReducer = (state = [], action) => {
  switch (action.type) {
    case 'VOTE': {
      return state.map((anecdote) =>
      anecdote.id === action.data
        ? { ...anecdote, votes: anecdote.votes + 1 }
        : anecdote
    )
  }
    case 'NEW_ANECDOTE':
      return [...state, action.data]
    case 'DELETE_ANECDOTE':
      return state.filter(a => a.id !== action.data)
    case 'INIT_ANECDOTES':
      return action.data
    default:
      return state
  }
}

// export const vote = (id) => {
//   return {
//     type: 'VOTE',
//     data: { id }
//   }
// }

export const vote = (anecdote) => {
  return async (dispatch) => {
    await anecdoteService.vote({ ...anecdote, id: anecdote.id})
    dispatch({
      type: 'VOTE',
      data: anecdote.id,
    })
  }
}

export const deleteAnecdote = (anecdote) => {
  return async dispatch => {
    await anecdoteService.deleteAnecdote({ ...anecdote, votes: anecdote.votes + 1 })
  dispatch({
     type: 'DELETE_ITEM',
     data: anecdote.id
  })
}
}


export const createAnecdote = (content) => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch({
      type: 'NEW_ANECDOTE',
      data: newAnecdote,
    })
  }
  }

  export const initializeAnecdotes = () => {
    return async dispatch => {
      const anecdotes = await anecdoteService.getAll()
      dispatch({
        type: 'INIT_ANECDOTES',
        data: anecdotes,
      })
    }
  }


// export const createAnecdote = (content) => {
//   return {
//       type: 'NEW_ANECDOTE',
//       data: {
//         content,
//         votes: 0,
//         id: generateId()
//       }
//   }
// }


export default anecdoteReducer