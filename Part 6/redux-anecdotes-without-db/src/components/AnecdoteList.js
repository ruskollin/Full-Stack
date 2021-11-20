import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { vote } from '../reducers/anecdoteReducer'
import {setNotification, hideNotification} from '../reducers/notifReducer'

const AnecdoteList = () => {
    const dispatch = useDispatch()
      const anecdotes = useSelector(( { filter, anecdotes }) => {
        if (filter === '') return anecdotes                                  
        anecdotes = anecdotes.filter(anecdote => anecdote.content.toLocaleLowerCase().indexOf(filter.toLocaleLowerCase()) !== -1)
        return anecdotes        
    })


    const handleVotes = (id) => {
        const anecdoteChosen = anecdotes.find((a) => a.id === id)
        dispatch(vote(id))
        dispatch(setNotification(`VOTED FOR: '${anecdoteChosen.content}'`))
        setTimeout(() => {
          dispatch(hideNotification())
        }, 10000)
    }

    return (
        <div>
            {anecdotes.sort((a, b) => (a.votes > b.votes ? -1 : 1)) &&
            anecdotes.map(anecdote =>
                <div key={anecdote.id}>
                    <div>
                        {anecdote.content}
                    </div>
                    <div>
                        has {anecdote.votes}
                        <button style={{marginLeft: '10px'}} onClick={() => handleVotes(anecdote.id)}>vote</button>
                    </div>
                </div>
            )}
        </div>
    )
}

export default AnecdoteList
