import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Results from './components/Results'
import Filter from './components/Filter'

function App() {
  const [countries, setCountries]= useState([])
  const [filter, setFilter]= useState('')
  const [results, setResults]= useState('')

  useEffect(() => {
    axios
      .get(`https://restcountries.eu/rest/v2/all`)
      .then(response => {
        console.log('promise fulfilled')
        setCountries(response.data)
        console.log(response.data)
      })
  }, [])

  const handleFilterChange = (event) => {
    event.preventDefault()
    setFilter(event.target.value)
    let results = countries.filter(country => country.name.toLowerCase().includes(filter.toLowerCase()));
    setResults(results);
  }

  return (
    <div className="App">
      <Filter filter={filter} onFilterChange={handleFilterChange} />
      <Results results={results} countries={countries} />
    </div>
  );
}

export default App;
