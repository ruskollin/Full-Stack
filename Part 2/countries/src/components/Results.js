import React from 'react'
import Country from './Country'

const Results = ({ results }) => {
    const overTen = results.length > 10;
    const oneToTen = results.length > 1 && results.length <= 10;
    const match = results.length === 1;
  
    const countryList = results.map((country) => {
      return (
        <div key={country.name}>
          {country.name}
        </div>
      );
    });
  
    return (
      <div>
        {/* Inline If with Logical && Operator */}
        {overTen && 'Too many matches, specify another filter'}
        {oneToTen && <div>{countryList}</div>}
        {match && <Country country={results[0]} />}
      </div>
    );
  };

export default Results
