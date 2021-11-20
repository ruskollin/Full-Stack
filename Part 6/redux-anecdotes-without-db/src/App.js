import React, {useEffect} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { reducer } from './reducers/anecdoteReducer'
import AnecdoteList from './components/AnecdoteList'
import Filter from './components/Filter'
import { createStore } from 'redux'
import AnecdoteForm from './components/AnecdoteForm'
import Notification from "./components/Notification"
import anecdoteService from './services/anecdotes'
import { initializeAnecdotes } from './reducers/anecdoteReducer'
import './index.css'

const App = () => {

  const dispatch = useDispatch()
  useEffect(() => {
    anecdoteService.getAll().then(anecdotes => dispatch(initializeAnecdotes(anecdotes)))
  }, [dispatch])


  return (
    <div className="main">
      <h2>Anecdotes</h2>
      <Notification />
      <AnecdoteList />
      <Filter />
      <AnecdoteForm />
    </div>
  )
}

export default App