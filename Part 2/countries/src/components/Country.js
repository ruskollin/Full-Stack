import React from 'react'

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
            display: 'flex',
          }} >

        <div 
          style={{
            width: 600,
            backgroundImage: `url(${flag})`,
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
            textAlign: 'center',
            borderWidth: 2,
            borderStyle: 'solid'
          }} >
        </div>

        <div
          style={{
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
        </div>
      );
    };

export default Country