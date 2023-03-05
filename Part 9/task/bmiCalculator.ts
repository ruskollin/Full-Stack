//9.3
  const calculateBmi = (a: number, b: number) => {
    const bmi: number = b / ((a * a) / 10000)

    if (bmi < 18.6) {
        console.log( `Underweight` )
    } else if (bmi >= 18.6 && bmi < 24.9) {
        console.log(`Normal (healthy weight)` )
    } else {
        console.log(`Overweight` )
    }
  }

  const a: number = Number(process.argv[2])
  const b: number = Number(process.argv[3])

  calculateBmi(a, b);

//9.2
//  const calculateBmi = (a: number, b: number) => {
//   const bmi: number = b / ((a * a) / 10000)
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