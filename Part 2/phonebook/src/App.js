import React, { useState } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ]) 
  const [newName, setNewName] = useState('')
  const [newPhone, setNewPhone] = useState('')
  const [filter, setFilter] = useState('')
  const [results, setResults] = useState([])

  const handlePersonChange = (event) => setNewName(event.target.value)
  const handlePhoneChange = (event) => setNewPhone(event.target.value)
  
  const handleFilterChange = (event) => {
    event.preventDefault()
    setFilter(event.target.value)
    let results = persons.filter(person => person.name.toLowerCase().includes(filter.toLowerCase()));
    setResults(results);
  }

  const addPerson = (event) => {
    event.preventDefault()
    const names = persons.map((person) => person.name)
    if (names.includes(newName)) {
      alert(`${newName} is already added to phonebook`)	
      setNewName('')
      setNewPhone('')
    } else {
      const newPerson = {
        name: newName,
        number: newPhone
      }
      setPersons(persons.concat(newPerson))
      setNewName('')
      setNewPhone('')
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filter={filter} onFilterChange={handleFilterChange} />

      <h3>Add a New</h3>
      <PersonForm
        addPerson={addPerson}
        newName={newName} 
        handlePersonChange={handlePersonChange} 
        newPhone={newPhone} 
        handlePhoneChange={handlePhoneChange} 
      />
      
      <h3>Numbers</h3>
      <Persons results={results} persons={persons}  />
    </div>
  )
}

export default App;