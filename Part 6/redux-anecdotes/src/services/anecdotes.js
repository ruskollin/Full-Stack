import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const createNew = async (content) => {
    const object = { 
        content: content,
        id:  Number((Math.random() * 1000000).toFixed(0)), 
        votes: 0
    }
    const response = await axios.post(baseUrl, object)
    return response.data
  }

  const vote = async (anecdote) => {
    const response = await axios.patch(`${baseUrl}/${anecdote.id}`, anecdote)
    return response.data
  }

  const deleteAnecdote = async (anecdote) => {
    const response = await axios.delete(`${baseUrl}/${anecdote.id}`, anecdote)
    return response.data
  }
  
export default { getAll, createNew, vote, deleteAnecdote }