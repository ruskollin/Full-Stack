import React from 'react'

const Person = (props) => {
    return (
      <div 
        style={{
          width: 250,
          marginBottom: 20,
          borderWidth: 2,
          borderStyle: 'solid',
          textAlign: 'center'
        }}
      >
        <strong>{props.name}</strong>
        <p>{props.number}</p>
      </div>
    );
  };

const Persons = (props) => {
  const persons = props.persons;
  const results = props.results;

  return (
    <div>
      {results && results.length > 0 
      ? results.map((person, i) => 
      <Person 
      key= {person.id}
      name= {person.name}
      number= {person.number} /> )
      : persons.map(person =>
          <Person 
            key= {person.id}
            name= {person.name}
            number= {person.number} />
        )}
    </div>
  )
}

export default Persons 