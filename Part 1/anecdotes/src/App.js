import React, { useState } from 'react'

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
  ]
   
  const [selected, setSelected] = useState(0)
  const arbitrary = Array(anecdotes.length).fill(0)
  const [vote, setVote] = useState(arbitrary)
  const [highest, setHighest] = useState(0)

  const handleRandom = () => {
    const random = Math.floor(Math.random() * anecdotes.length)
    setSelected(random)
  }

  const handleVote = () => {
    const copy = [...vote]
    copy[selected] += 1
    if (copy[selected] > copy[highest]) {
      setHighest(selected);
    }
    setVote(copy)
  }

  return (
    <div>
      
      <h1>Anecdote of the Day</h1>
      <p>{anecdotes[selected]}</p>
      <p>has {vote[selected]} votes</p>
      <button onClick={() => handleVote()}>Vote</button>
      <button onClick={() => handleRandom()}>Next</button>

      <h1>Anecdote with Most Votes</h1>
      <p>{anecdotes[highest]}</p>
      <p>has {vote[highest]} votes</p> 

    </div>
  )
}

export default App