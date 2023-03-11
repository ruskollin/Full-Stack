/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import express from "express";
import { calculateBmi, parseArguments } from "./bmiCalculator";
import {
  calculateExercise,
  parseExerciseArguments,
} from "./exerciseCalculator";

const app = express();
app.use(express.json());
app.use(express.urlencoded());

app.get("/hello", (_req, res) => {
  res.send("Hello Full Stack!");
});

app.get("/bmi", (req, res) => {
  const height = req.query.height;
  const weight = req.query.weight;

  if (!height) {
    res.status(422);
    res.send({ error: "missing value for HEIGHT" });
  } else if (!weight) {
    res.status(422);
    res.send({ error: "missing value for WEIGHT" });
  } else {
    try {
      const { heightValue, weightValue } = parseArguments(
        Number(height),
        Number(weight)
      );
      const bmi = calculateBmi(heightValue, weightValue);
      res.send({
        weight: weightValue,
        height: heightValue,
        bmi: bmi,
      });
    } catch (e) {
      res.status(400);
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
      res.send({ error: e.message });
    }
  }
});

app.post("/exercises", (req, res) => {
  const dailyExercises = req.body.daily_exercises;
  const target = req.body.target;
  console.log(isNaN(target));

  if (!dailyExercises) {
    res.status(422);
    res.send({ error: "parameter daily_exercises is missing" });
  } else if (target && !isNaN(target)) {
    res.status(422);
    res.send({ error: "parameter target is not a number" });
  } else if (!target) {
    res.status(422);
    res.send({ error: "parameter target is missing" });
  } else {
    try {
      const { hours } = parseExerciseArguments(dailyExercises);
      res.send(calculateExercise(target, hours));
    } catch (e) {
      res.status(400);
      res.send({ error: e.message });
    }
  }
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
