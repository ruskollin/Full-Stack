  
import React, {useEffect} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { reducer } from './reducers/anecdoteReducer'
import Anecdote from './components/Anecdote'

const App = () => {
  const anecdotes = useSelector(state => state)
  const dispatch = useDispatch()

  return (
    <div>
      <h2>Anecdotes</h2>
      <Anecdote />
    
      <h2>create new</h2>
      <form>
        <div><input /></div>
        <button>create</button>
      </form>
    </div>
  )
}

export default App