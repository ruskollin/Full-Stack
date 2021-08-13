import React from 'react'

const Country = ({ country }) => {
    if (!country) {
        return <div>Please Enter A Country...</div>
      }
    
      if (!country.found) {
        return <div>No Country Found...</div>
      }
    const countryObject = country[0]

    return (
    <div>
        <h2>{countryObject.name} </h2>
        <img src={countryObject.flag} height='200' alt={`flag of ${countryObject.name}`}/>
        <p>Capital: {countryObject.capital} </p>
        <p>Population: {countryObject.population}</p>
    </div>
    )
  }

  export default Country