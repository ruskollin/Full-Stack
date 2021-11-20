const noteReducer = (state = [], action) => {
  switch(action.type) {
    case 'NEW_NOTE':
      return [...state, action.data]
      case "VOTE": {
        const id  = action.data;
        console.log(id)
        const votedAnecdote = state.find((anecdote) => anecdote.id === id);
        const updatedAnecdote = {
          ...votedAnecdote,
          votes: votedAnecdote.votes + 1,
        };
  
        return state.map((anecdote) =>
          anecdote.id !== id ? anecdote : updatedAnecdote
        );
      }
    default:
      return state
  }
}

const generateId = () =>
  Number((Math.random() * 1000000).toFixed(0))

export const createNote = (content) => {
  return {
    type: 'NEW_NOTE',
    data: {
      content,
      important: false,
      votes: 0,
      id: generateId()
    }
  }
}


export default noteReducer