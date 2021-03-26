import React, { useState, useEffect } from 'react'

import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import personService from './services/persons'
import Notification from './components/Notification';

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newPhone, setNewPhone] = useState('')
  const [filter, setFilter] = useState('')
  const [results, setResults] = useState([])
  const [notif, setNotif] = useState('*** message for you ***')

  useEffect(() => {
    personService
      .getAll()
      .then(response => {
        setPersons(response.data)
      })
  }, [])

  const handlePersonChange = (event) => setNewName(event.target.value)
  const handlePhoneChange = (event) => setNewPhone(event.target.value)

  const handleFilterChange = (event) => {
    event.preventDefault()
    setFilter(event.target.value)
    let results = persons.filter(person => person.name.toLowerCase().includes(filter.toLowerCase()));
    if (!event.target.value) {
      setResults(persons)
    } else {
      setResults(results);
    }
  }

  const handleAdd = async (event) => {
    event.preventDefault()
    const contact = persons.find((p) => p.name === newName)
    const names = persons.map((person) => person.name)
    if (names.includes(newName)) {
      if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
        handleUpdate(contact.id)
        setNewName('')
        setNewPhone('')
        setPersons(persons)
        setNotif(
          `'${newName}' has a new phone number: '${newPhone}'`
        )
        setTimeout(() => {
          setNotif(null)
        }, 5000)
      }
    } else {
      const newObject = {
        name: newName,
        number: newPhone
      }

      personService
        .create(newObject)
        .then(response => {
          console.log(response)
          setPersons(persons.concat(newObject))
          setNewName('')
          setNewPhone('')
          setNotif(
            `'${newName}' has been added!'`
          )
          setTimeout(() => {
            setNotif(null)
          }, 5000)
        })
    }
  }

  const handleDelete = id => {
    if (window.confirm("Do you really want to delete?")) {
      personService
        .deletion(id)
        .then(() => {
          setPersons(persons.filter(p => p.id !== id))
        })
    } else {
      return null;
    }
  }

  const handleUpdate = id => {
    const contact = persons.find(p => p.id === id)
    const changedNumber = { ...contact, number: newPhone }
    personService
      .update(id, changedNumber)
      .then(response => {
        setPersons(persons.map(person => person.id !== id ? person : response))
      })
      .catch(error => {
        setNotif(
          `'${newName}' was already deleted from server`
        )
        setPersons(persons.filter(p => p.id !== id))
        setTimeout(() => {
          setNotif(null)
        }, 5000)
      })
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filter={filter} onFilterChange={handleFilterChange} />

      <h3>Add a New</h3>
      <PersonForm
        addPerson={handleAdd}
        newName={newName}
        handlePersonChange={handlePersonChange}
        newPhone={newPhone}
        handlePhoneChange={handlePhoneChange}
      />

      <Notification notif={notif} />

      <h3>Numbers</h3>
      <Persons results={results} persons={persons} handleDelete={handleDelete} />
    </div>
  )
}

export default App;