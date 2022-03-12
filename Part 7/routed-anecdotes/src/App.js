import React, { useState } from 'react'
import { Switch, Route, useRouteMatch } from 'react-router-dom'
import Menu from './components/Menu'
import AnecdoteList from './components/AnecdoteList'
import About from './components/About'
import Footer from './components/Footer'
import Anecdote from './components/Anecdote'
import CreateNew from './components/CreateNew'
import Notification from './components/Notification'
import './index.css'
import  { useField } from './hooks'

const App = () => {
  const [anecdotes, setAnecdotes] = useState([
    {
      content: 'If it hurts, do it more often',
      author: 'Jez Humble',
      info: 'https://martinfowler.com/bliki/FrequencyReducesDifficulty.html',
      votes: 0,
      id: 1
    },
    {
      content: 'Premature optimization is the root of all evil',
      author: 'Donald Knuth',
      info: 'http://wiki.c2.com/?PrematureOptimization',
      votes: 0,
      id: 2
    }
  ])

  const addNew = (anecdote) => {
    anecdote.id = (Math.random() * 10000).toFixed(0)
    setAnecdotes(anecdotes.concat(anecdote))
    setNotif(`${anecdote.content} created successfully !`)
    setTimeout(() => {
      setNotif('')
    }, 10000)
  }

  const [notif, setNotif] = useState('')

  // const anecdoteById = (id) =>
  //   anecdotes.find(a => a.id === id)

  // const vote = (id) => {
  //   const anecdote = anecdoteById(id)

  //   const voted = {
  //     ...anecdote,
  //     votes: anecdote.votes + 1
  //   }

  //   setAnecdotes(anecdotes.map(a => a.id === id ? voted : a))
  //   setNotif(`${anecdote.content} created successfully !`)
  //   setTimeout(() => {
  //     setNotif(null)
  //   }, 10000)
  // }


  const match = useRouteMatch('/anecdotes/:id')
  const anecdote = match
    ? anecdotes.find((anecdote) => anecdote.id === Number(match.params.id))
    : null


  return (
    <div style={{height: '100vh'}}>
      <div style={{display: 'flex', flexDirection: 'row', backgroundColor: '#57BED7', padding: '10px'}}>
        <h1 style={{width: '30%', margin: 0}}>Software anecdotes</h1>
        <Menu />
      </div>
      <div style={{height: '80%'}}>
      <Notification notif={notif} />
      <Switch>
      <Route path="/anecdotes/:id">
          <Anecdote anecdote={anecdote} />
        </Route>
        <Route path="/about">
          <About />
        </Route>
        <Route path="/create">
          <CreateNew addNew={addNew} />
        </Route>
        <Route path="/">
          <AnecdoteList anecdotes={anecdotes} />
        </Route>
      </Switch>
      </div>
      <Footer />
    </div>
  )
}

export default App