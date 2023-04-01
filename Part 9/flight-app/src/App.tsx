import { useState, useEffect } from "react";
import axios, { Axios, AxiosError } from "axios";
import { FlightDiary } from "./types";
import { getAllFlightDiaries, createFlightDiary } from "./flightService";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import "./App.css";

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

    createFlightDiary(newDiary)
      .then((data) => {
        setFlightDiaries(flightDiaries.concat(data));
        setDate("");
        setVisibility("");
        setWeather("");
        setComment("");
        setError("");
      })
      .catch((err: any | AxiosError) => {
        if (axios.isAxiosError(error)) {
          console.log(error);
          console.log(err);
        } else {
          setError(err.response.data);
        }
      });
  };

  // const handleDateChange = (event) => {
  //   console.log(event)
  // }

  return (
    <div className="App">
      {error && <h1 style={{ color: "red" }}>{error}</h1>}
      <Box
        component="form"
        sx={{
          m: 1,
          width: 600,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          height: 300,
        }}
        noValidate
        autoComplete="off"
      >
        <FormControl style={{ display: "flex", flexDirection: "row" }}>
          <label>Date</label>
          <input
            type="date"
            value={date}
            onChange={(event) => setDate(event.target.value)}
            style={{ marginLeft: 106 }}
          />
        </FormControl>

        <FormControl style={{ display: "flex", flexDirection: "row" }}>
          <FormLabel id="demo-row-radio-buttons-group-label">
            Visibility
          </FormLabel>
          <RadioGroup
            row
            aria-labelledby="demo-row-radio-buttons-group-label"
            name="row-radio-buttons-group"
            style={{ marginLeft: 80 }}
            onChange={(event) => setVisibility(event.target.value)}
            value={visibility}
          >
            <FormControlLabel value="great" control={<Radio />} label="great" />
            <FormControlLabel value="good" control={<Radio />} label="good" />
            <FormControlLabel value="okay" control={<Radio />} label="okay" />
            <FormControlLabel value="poor" control={<Radio />} label="poor" />
          </RadioGroup>
        </FormControl>

        <FormControl style={{ display: "flex", flexDirection: "row" }}>
          <FormLabel id="demo-row-radio-buttons-group-label">Weather</FormLabel>
          <RadioGroup
            row
            aria-labelledby="demo-row-radio-buttons-group-label"
            name="row-radio-buttons-group"
            style={{ marginLeft: 80 }}
            onChange={(event) => setWeather(event.target.value)}
            value={weather}
          >
            <FormControlLabel value="sunny" control={<Radio />} label="sunny" />
            <FormControlLabel value="rainy" control={<Radio />} label="rainy" />
            <FormControlLabel
              value="cloudy"
              control={<Radio />}
              label="cloudy"
            />
            <FormControlLabel
              value="stormy"
              control={<Radio />}
              label="stormy"
            />
            <FormControlLabel value="windy" control={<Radio />} label="windy" />
          </RadioGroup>
        </FormControl>

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
