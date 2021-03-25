import React from 'react'
import Weather from './Weather'

const Country = ({ country }) => {
    const { name, capital, population, languages, flag } = country

    return (
        <div 
          style={{
            width: 700,
            marginBottom: 20,
            marginTop: 10,
            marginLeft: 10,
            textAlign: 'center',
            borderWidth: 2,
            borderStyle: 'solid',
            display: 'grid',
            gridTemplateColumns: 400,
            gridTemplateRows: 300
          }} >

        <div 
          style={{
            width: 400,
            marginTop: -1,
            backgroundImage: `url(${flag})`,
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
            textAlign: 'center',
            borderWidth: 5,
            borderStyle: 'solid',
            gridColumnStart: 1,
            gridColumnEnd: -1,
            zIndex: 2
          }} >
        </div>

        <div
          style={{
            marginTop: -1,
            marginLeft: 1,
            width: 300,
            backgroundColor: '#BDF2FF'
          }} >

          <h2>{name}</h2>
          <p>Capital: {capital}</p>
          <p>Population: {population}</p>

          <h3>Languages</h3>
            {languages.map((lang) => (
              <p key={`${lang.iso639_1}`}>{lang.name}</p>
            ))}
          </div>  
        
          <div 
            style={{
              gridColumnStart: 'span 2',
              gridColumnEnd: 'span 2'
            }} >
          <Weather capital={capital}/>
          </div>     
        </div>
      );
    };

export default Country