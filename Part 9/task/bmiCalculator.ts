interface bmiNumbers {
  heightValue: number;
  weightValue: number;
}

export const parseArguments = (
  height: number,
  weight: number
): bmiNumbers => {
  if (!isNaN(height) && !isNaN(weight)) {
    return {
      heightValue: height,
      weightValue: weight
    };
  } else {
    throw new Error('Provided values were not numbers!');
  }
};

 export const calculateBmi = (height: number , weight: number): string => {
  const bmi: number = weight / ((height * height) / 10000);
  console.log(bmi);

  if (bmi < 18.6) {
     return `Underweight`;
  } else if (bmi >= 18.6 && bmi < 24.9) {
      return `Normal (healthy weight)`;
  } else {
      return `Overweight`;
  }
};

//9.3
  // export const calculateBmi = (height: number, weight: number) => {
  //   const bmi: number = weight / ((height * height) / 10000)

  //   if (bmi < 18.6) {
  //       console.log( `Underweight` )
  //   } else if (bmi >= 18.6 && bmi < 24.9) {
  //       console.log(`Normal (healthy weight)` )
  //   } else {
  //       console.log(`Overweight` )
  //   }
  // }

  // const height: number = Number(process.argv[2])
  // const weight: number = Number(process.argv[3])

  // calculateBmi(height, weight);

//9.2
//  export const calculateBmi = (height: number , weight: number) => {
//   const bmi: number = weight / ((height * height) / 10000)
//   console.log(bmi)

//   if (bmi < 18.6) {
//       console.log( `Underweight` )
//   } else if (bmi >= 18.6 && bmi < 24.9) {
//       console.log(`Normal (healthy weight)` )
//   } else {
//       console.log(`Overweight` )
//   }
// }

// calculateBmi(180, 174)