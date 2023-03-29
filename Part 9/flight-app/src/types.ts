export interface FlightDiary {
  id: number;
  date: string;
  weather: string;
  visibility: string;
}

export type NewFlightDiary = Omit<FlightDiary, 'id'>

// export interface NewFlightDiary {
//   id: number;
//   date: string;
//   weather: string;
//   visibility: string;
// }
