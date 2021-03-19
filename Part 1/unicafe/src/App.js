import React, { useState } from 'react';

const Statistic = props => 
  <tr>
    <td>{props.text}</td> 
    <td>{props.value}</td>
  </tr>

const Button = ({handleClick, text}) => (
  <button onClick={handleClick}>
    {text}
  </button>
)

const Statistics = (props) => {
  if (props.total === 0) {
    return (
      <div>
        <h1>Statistics</h1>
        No Feedback Given
      </div>
    )
  } else {
    return (
      <div>
        <h1>Statistics</h1>
          <table>
            <tbody>
              <Statistic value={props.good} text="good"/>
              <Statistic value={props.neutral} text="neutral"/>
              <Statistic value={props.bad} text="bad"/>
              <Statistic value={props.total} text="all"/>
              <Statistic value={props.average} text="average"/>
              <Statistic value={props.positive} text="positive"/>
            </tbody>
          </table>
      </div>
    )
  }
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const total = good + neutral + bad
  const average = ((good * 1 + neutral * 0 + bad * -1) / total)
  const positive = ((good / total) * 100)

  const setToGood = () => {
    let up = good + 1
    setGood(up)
  }

  const setToNeutral = () => {
    let up = neutral + 1
    setNeutral(up)
  }

  const setToBad = () => {
    let up = bad + 1
    setBad(up)
  }

  return (
    <div>

      <h1>Give Feedback</h1>
      <Button style={{color: '#404333'}} handleClick={setToGood} text="Good" />
      <Button handleClick={setToNeutral} text="Neutral" />
      <Button handleClick={setToBad} text="Bad" />

      <Statistics
        good = {good}
        neutral = {neutral}
        bad = {bad}
        total = {total}
        average = {average}
        positive = {positive} />

    </div>
  )
}

export default App;
