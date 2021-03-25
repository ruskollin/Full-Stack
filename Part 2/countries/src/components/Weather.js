import React, { useState, useEffect } from 'react'
import axios from 'axios'

const Weather = ({ capital }) => {
  const [weather, setWeather] = useState({})

  const api_key = process.env.REACT_APP_API_KEY

  const hook = () => {
    axios
      .get(`http://api.weatherstack.com/current?access_key=${api_key}&query=${capital}`)
      .then(response => {
        console.log('promise fulfilled')
        setWeather(response.data)
        console.log(response.data)
      })
  }

  useEffect(hook, [capital]);

  return (
    <div style={{
            backgroundColor: '#CCEEFF',
            padding: 10,
        }} >
      <h3>Weather in {capital}</h3>
      {weather.current && (
        <div>
          <p><strong>Temperature:</strong> {weather.current.temperature} &deg;C </p>
          <p>Feels like {weather.current.feelslike} &deg;C </p>
          <img alt='weather' src={weather.current.weather_icons} />
          <p> <strong>Wind:</strong> {weather.current.wind_speed} mph direction {weather.current.wind_dir} </p>
        </div>
      )}
    </div>
  )
}

export default Weather