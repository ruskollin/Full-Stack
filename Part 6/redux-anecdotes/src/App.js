import React, {useEffect} from 'react'
import { useDispatch } from 'react-redux'
import AnecdoteList from './components/AnecdoteList'
import Filter from './components/Filter'
import AnecdoteForm from './components/AnecdoteForm'
import Notification from "./components/Notification"
import { initializeAnecdotes } from './reducers/anecdoteReducer'
import './index.css'

const App = () => {

  
  // useEffect(() => {
  //   anecdoteService.getAll().then(anecdotes => dispatch(initializeAnecdotes(anecdotes)))
  // }, [dispatch])
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(initializeAnecdotes())
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