import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Results from './components/Results'
import Filter from './components/Filter'

function App() {
  const [countries, setCountries]= useState([])
  const [filter, setFilter]= useState('')
  const [results, setResults]= useState([])

  const hook = () => {
    axios
      .get(`https://restcountries.eu/rest/v2/all`)
      .then(response => {
        console.log('promise fulfilled')
        setCountries(response.data)
        console.log(response.data)
      })
  }

  useEffect(hook, []);

  const handleFilterChange = (event) => {
    event.preventDefault()
    setFilter(event.target.value)
    let results = countries.filter(country => country.name.toLowerCase().includes(filter.toLowerCase()));
    setResults(results);
  }

  const handleClick = (event) => {
    setFilter(event.target.id);
  };

  return (
    <div className="App">
      <Filter filter={filter} onFilterChange={handleFilterChange} />     
      <Results results={results} handleClick={(event) => handleClick(event)} /> 
    </div>
  );
}

export default App;
