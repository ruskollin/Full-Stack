import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { createStore } from 'redux'
import noteReducer from '../reducers/noteReducer'

const store = createStore(noteReducer)

const Note = ({ note, handleClick }) => {
  return(
    <li onClick={handleClick}>
      {note.content} 
      {note.votes}
      <strong> {note.important ? 'important' : ''}</strong>
      <button 
        onClick={e => store.dispatch({ type: 'VOTE' })}
      >VOTE</button>
    </li>
  )
}


const Notes = () => {
  const dispatch = useDispatch()
  const notes = useSelector(state => state)


  return(
    <ul>
      {notes.map(note =>
        <Note
          key={note.id}
          note={note}
        />
      )}
    </ul>
  )
}

export default Notes