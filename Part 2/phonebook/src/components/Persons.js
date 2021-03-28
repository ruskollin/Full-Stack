import React from 'react'
import '../index.css'

const containerStyle = {
  display: 'flex',
  flexWrap: 'wrap'
}

const personStyle = {
  width: 250,
  marginBottom: 20,
  borderWidth: 2,
  borderStyle: 'solid',
  textAlign: 'center',
  marginLeft: 20,
  backgroundColor: '#ACE7FF'
}

const Persons = ({ persons, results, handleDelete }) => {
  return (
    <div style={containerStyle}>
      {results && results.length > 0
        ? results.map((person, i) =>
          <div key={person.name} style={personStyle} >
            <p>{person.name}</p>
            <p>{person.number}</p>
            <button
              style={{ marginLeft: 3, marginBottom: 5, backgroundColor: 'red', color: 'white' }}
              onClick={() => handleDelete(person.id)}>
              DELETE
            </button>
          </div>
        )
        :
        persons.map((person) => (
          <div key={person.name} style={personStyle} >
            <p>{person.name}</p>
            <p>{person.number}</p>
            <button
              style={{ marginLeft: 3, marginBottom: 5, backgroundColor: 'red', color: 'white' }}
              onClick={() => handleDelete(person.id)}>
              DELETE
            </button>
          </div>
        ))}
    </div>
  )
}

export default Persons