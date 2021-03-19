import React from 'react'

const Header = ({name}) => <h1> {name} </h1>

const Content = ({parts}) => {
  return (
    <div>
      {parts.map(parts =>
        <div> {parts.name} {parts.exercises} </div>)}
    </div>
  )
}

const Total = ({parts}) => {
  let sum = (parts.reduce((acc,cur) =>  acc = acc + cur.exercises , 0))
  return (
    <div>
      <p>Number of exercises: {sum} </p>   
    </div>
  )
}

const App = () => {
  const course = {
    name: 'Half Stack Application Development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }

  return (
    <div>
      <Header name={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  )
}

export default App