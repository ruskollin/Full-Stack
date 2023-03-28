import { useState, useEffect } from "react";
import { FlightDiary } from "./types";
import { getAllFlightDiaries } from './flightService';
import './App.css';

function App() {
  const [flightDiaries, setFlightDiaries] = useState<FlightDiary[]>([]);

  useEffect(() => {
    getAllFlightDiaries().then(data => {
      setFlightDiaries(data)
    })
  }, [])

  return (
    <div className="App">
        {flightDiaries.map(flight => (
          <div>
          <h2>{flight.date}</h2>
          <p>visibility: {flight.visibility}</p>
          <p>weather: {flight.weather}</p>
          </div>
        ))}
    </div>
  );
}

export default App;
