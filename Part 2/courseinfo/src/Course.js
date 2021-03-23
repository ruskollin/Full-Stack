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

const Course = ({ courses }) => {
    return (
        <div>{courses.map((course) => 
            <div key={course.id}>
                <Header name={course.name} />
                <Content parts={course.parts} />
                <Total parts={course.parts} />
            </div>   
            )}
        </div>
    )
}

export default Course; 