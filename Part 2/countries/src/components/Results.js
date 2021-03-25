import React from 'react'
import Country from './Country'

const Results = ({ results, handleClick }) => {
    const overTen = results.length > 10;
    const oneToTen = results.length > 1 && results.length <= 10;
    const match = results.length === 1;
    // const [show, setShow]= useState(true)

    const countryList = results.map((country) => {
      return (
        <div key={country.name} style={{padding: 3, fontSize: 20}} >
            {country.name}
            <button style={{marginLeft: 3, backgroundColor: 'green', color: 'white'}}
                    id={country.name}
                    onClick={handleClick} >
                Show
            </button>
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
