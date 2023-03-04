
  const calculateBmi = (a: number, b: number) => {
    const bmi: number = b / ((a * a) / 10000)
    console.log(bmi)

    if (bmi < 18.6) {
        console.log( `Underweight` )
    } else if (bmi >= 18.6 && bmi < 24.9) {
        console.log(`Normal (healthy weight)` )
    } else {
        console.log(`Overweight` )
    }
  }

 calculateBmi(180, 174)