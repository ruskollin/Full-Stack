import { HeaderProps, ContentProps } from "../types";

const App = () => {
  const courseName = "Half Stack application development";
  const courseParts = [
    {
      name: "Fundamentals",
      exerciseCount: 10,
    },
    {
      name: "Using props to pass data",
      exerciseCount: 7,
    },
    {
      name: "Deeper type usage",
      exerciseCount: 14,
    },
  ];

  //HEADER -> name
  const Header = (props: HeaderProps) => {
    return <h1>{props.name}</h1>;
  };

  //CONTENT -> names of parts and number of exercises per part
  const Content = (props: ContentProps) => {
    return (
      <div>
        {props.content.map((course) => (
          <p>{course.name}</p>
        ))}
      </div>
    );
  };

  //Total -> sum of exercises
  const Total = (props: ContentProps) => {
    return (
      <h1>
        Total:{" "}
        {props.content.reduce(
          (total, course) => total + course.exerciseCount,
          0
        )}
      </h1>
    );
  };

  return (
    <div>
      <Header name={courseName} />
      <Content content={courseParts} />
      <Total content={courseParts} />
    </div>
  );
};

export default App;
