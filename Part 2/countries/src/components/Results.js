import React from 'react'
import Country from './Country'

const Results = ({ results }) => {
    const tooManyCountries = results.length > 10;
    const multipleCountries = results.length > 1 && results.length <= 10;
    const singleCountry = results.length === 1;
  
    const countryList = results.map((country) => {
      return (
        <div key={country.name}>
          {country.name}
        </div>
      );
    });
  
    return (
      <div>
        {tooManyCountries && 'Too many matches, specify another filter'}
        {multipleCountries && <div>{countryList}</div>}
        {singleCountry && <Country country={results[0]} />}
      </div>
    );
  };

export default Results
