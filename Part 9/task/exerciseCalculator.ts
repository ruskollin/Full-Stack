//9.3
interface Result {
  periodLength: number;
  trainingDays: number;
  isSuccess: boolean;
  rating: number;
  ratingText: string;
  target: number;
  averageTime: number;
}

const calculateExercise = (target: number, hours: Array<number>): Result => {

  //the number of days
  const periodLength = hours.length;

  //the number of training days
  const trainingDays = hours.filter((hour) => hour > 0).length;

  //the original target value = target

  //the calculated average time
  const averageTime = hours.reduce((a, b) => a + b, 0) / periodLength;

  //boolean value describing if the target was reached
  const isSuccess = averageTime >= target;

  //a rating between the numbers 1-3 that tells how well the hours are met. You can decide on the metric on your own.
  const handleRating = (average: number, target: number) => {
    if (average >= target) {
      return 3
    } else if (average < target && average > (target / 2)) {
      return 2
    } else if (average < target && average <= (target / 2)) {
      return 3
    }
  };

  const rating = handleRating(averageTime, target);

  //a text value explaining the rating, you can come up with the explanations
  const handleRatingText = (rating: number) => {
    if (rating === 1) {
      return "try harder!";
    } else if (rating === 2) {
      return "not too bad but could be better!";
    } else if (rating === 3) {
      return "you are a beast!";
    }
  };

  const ratingText = handleRatingText(rating);

  return {
    periodLength,
    trainingDays,
    isSuccess,
    rating,
    ratingText,
    target,
    averageTime
  };
};

interface CommandLineInput {
  target: number;
  hours: number[];
}

const parseArguments = (args: string[]): CommandLineInput => {
  if (args.length < 4) throw new Error("Not enough arguments");

  if (args.slice(2).every(num => !isNaN(Number(num)))) {
    const target = Number(args[2]);
    const hours = args.slice(3).map(hour => Number(hour));
    return {
      target,
      hours
    };
  } else {
    throw new Error('Provided values were not numbers!');
  }
};

try {
  const {
    target,
    hours
  } = parseArguments(process.argv);
  console.log(calculateExercise(target, hours));
} catch (error) {
  console.log(error.message);
}

//9.2

// interface Result {
//     periodLength: number;
//     trainingDays: number;
//     isSuccess: boolean;
//     rating: number;
//     ratingText: string;
//     target: number;
//     averageTime: number;
// }

// const calculateExercise = (hours: number[], target: number) => {

//     //the number of days
//     const periodLength = hours.length;

//     //the number of training days
//     const trainingDays = hours.filter((hour) => hour > 0).length;

//     //the original target value = target

//     //the calculated average time
//     const averageTime = hours.reduce((a, b) => a + b, 0) / periodLength;

//     //boolean value describing if the target was reached
//     const isSuccess = averageTime >= target;

//     //a rating between the numbers 1-3 that tells how well the hours are met. You can decide on the metric on your own.
//     const handleRating = (average: number, target: number) => {
//         if (average >= target) {
//             return 3
//         } else if (average < target && average > (target / 2) ) {
//             return 2
//         } else if (average < target && average <= (target / 2) ) {
//             return 3
//         }
//     };

//     const rating = handleRating(averageTime, target);

//     //a text value explaining the rating, you can come up with the explanations
//     const handleRatingText = (rating: number) => {
//         if (rating === 1) {
//           return "try harder!";
//         } else if (rating === 2) {
//           return "not too bad but could be better!";
//         } else if (rating === 3) {
//           return "you are a beast!";
//         }
//     };

//     const ratingText = handleRatingText(rating);

//     return {
//         periodLength,
//         trainingDays,
//         isSuccess,
//         rating,
//         ratingText,
//         target,
//         averageTime,
//     };

// }

// console.log(calculateExercise([3, 0, 2, 4.5, 0, 3, 1], 2))