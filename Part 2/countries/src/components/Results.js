import React from 'react'
import Country from './Country'

const Results = ({ results, countries }) => {

    return (
        <div>
            {results && results.length > 0 
            ? results.map((country) => 
            <Country 
            key= {country.name}
            country= {country}
             /> )
            : countries.map(country =>
            <Country 
            key= {country.name}
            country= {country}
             />
        )}
        </div>
    )
}      

export default Results
