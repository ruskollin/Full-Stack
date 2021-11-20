import React from 'react'
import { createAnecdote } from '../reducers/anecdoteReducer'
import {setNotification} from '../reducers/notifReducer'
import { connect } from 'react-redux'

const AnecdoteForm = (props) => {

  // const addAnecdote = (event) => {
  //   event.preventDefault()
  //   const content = event.target.anecdote.value
  //   event.target.anecdote.value = ''
  //   dispatch(createAnecdote(content))
  //   dispatch(setNotification(`ADDED: '${content}'`))
  //   setTimeout(() => {
  //     dispatch(hideNotification())
  //   }, 10000)
  // }

  const addAnecdote = async (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    props.createAnecdote(content)
    props.setNotification(`ADDED: '${content}'`, 10)
  }

  return (
    <form onSubmit={addAnecdote}>
      <h2>Create a New Anecdote</h2>
      <input name="anecdote" />
      <button type="submit">Add a new anecdote...</button>
    </form>
  )
}

export default connect(null, {createAnecdote, setNotification})(AnecdoteForm)