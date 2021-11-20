import React from 'react'
import { useDispatch } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import {setNotification, hideNotification} from '../reducers/notifReducer'

const AnecdoteForm = () => {
  const dispatch = useDispatch()

  const addAnecdote = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    dispatch(createAnecdote(content))
    dispatch(setNotification(`ADDED: '${content}'`))
    setTimeout(() => {
      dispatch(hideNotification())
    }, 10000)
  }

  return (
    <form onSubmit={addAnecdote}>
      <h2>Create a New Anecdote</h2>
      <input name="anecdote" />
      <button type="submit">Add a new anecdote...</button>
    </form>
  )
}

export default AnecdoteForm