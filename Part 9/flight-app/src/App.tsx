import { useState, useEffect } from "react";
import axios, {Axios, AxiosError} from "axios";
import { FlightDiary } from "./types";
import { getAllFlightDiaries, createFlightDiary } from "./flightService";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import "./App.css";
import { setFips } from "crypto";

function App() {
  const [flightDiaries, setFlightDiaries] = useState<FlightDiary[]>([]);
  const [date, setDate] = useState("");
  const [visibility, setVisibility] = useState("");
  const [weather, setWeather] = useState("");
  const [comment, setComment] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    getAllFlightDiaries().then((data) => {
      setFlightDiaries(data);
    });
  }, []);

  const handleAddNewFlightDiary = (event: React.SyntheticEvent) => {
    event.preventDefault();
    const newDiary = {
      date: date,
      visibility: visibility,
      weather: weather,
      comment: comment,
    };
 
      createFlightDiary(newDiary).then((data) => {
        setFlightDiaries(flightDiaries.concat(data));
        setDate("");
        setVisibility("");
        setWeather("");
        setComment("");
        setError("");
      }).catch((err: any | AxiosError) => {
        if (axios.isAxiosError(error))  {
          console.log(error);
          console.log(err);
        } else {
          setError(err.response.data);
        }
      })
  };

  return (
    <div className="App">
      {error && <h1 style={{color: 'red'}}>{error}</h1>}
      <Box
        component="form"
        sx={{
          m: 1,
          width: "25ch",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          height: 300,
        }}
        noValidate
        autoComplete="off"
      >
        <TextField
          id="outlined-basic"
          label="Date"
          value={date}
          variant="outlined"
          onChange={(event) => setDate(event.target.value)}
        />
        <TextField
          id="outlined-basic"
          label="Visibility"
          value={visibility}
          variant="outlined"
          onChange={(event) => setVisibility(event.target.value)}
        />
        <TextField
          id="outlined-basic"
          label="Weather"
          value={weather}
          variant="outlined"
          onChange={(event) => setWeather(event.target.value)}
        />
        <TextField
          id="outlined-basic"
          label="Comment"
          value={comment}
          variant="outlined"
          onChange={(event) => setComment(event.target.value)}
        />

        <Button
          variant="contained"
          color="success"
          onClick={handleAddNewFlightDiary}
        >
          ADD
        </Button>
      </Box>

      {flightDiaries.map((flight) => (
        <div key={flight.id}>
          <h2>{flight.date}</h2>
          <p>visibility: {flight.visibility}</p>
          <p>weather: {flight.weather}</p>
        </div>
      ))}
    </div>
  );
}

export default App;
