import { HeaderProps, CoursePart } from "../types";

const App = () => {
  const courseName = "Half Stack application development";
  const courseParts: CoursePart[] = [
    {
      name: "Fundamentals",
      exerciseCount: 10,
      description: "This is an awesome course part",
      kind: "basic",
    },
    {
      name: "Using props to pass data",
      exerciseCount: 7,
      groupProjectCount: 3,
      kind: "group",
    },
    {
      name: "Basics of kind Narrowing",
      exerciseCount: 7,
      description: "How to go from unknown to string",
      kind: "basic",
    },
    {
      name: "Deeper kind usage",
      exerciseCount: 14,
      description: "Confusing description",
      backroundMaterial:
        "https://kind-level-kindscript.com/template-literal-kinds",
      kind: "background",
    },
    {
      name: "kindScript in frontend",
      exerciseCount: 10,
      description: "a hard part",
      kind: "basic",
    },
  ];

  //HEADER -> name
  const Header = (props: HeaderProps) => {
    return <h1>{props.name}</h1>;
  };

  //CONTENT -> names of parts and number of exercises per part
  const Content = ({ parts }: { parts: CoursePart[] }) => {
    return (
      <div>
        {parts.map((part, index) => (
          <div key={index}>
            <Part part={part} />
          </div>
        ))}
      </div>
    );
  };

  //Total -> sum of exercises
  const Total = ({ parts }: { parts: CoursePart[] }) => {
    return (
      <p style={{ fontWeight: 900, fontSize: 18 }}>Number of exercises: {parts.reduce((total, course) => total + course.exerciseCount, 0)}</p>
    );
  };

  const assertNever = (value: never): never => {
    throw new Error(
      `Unhandled discriminated union member: ${JSON.stringify(value)}`
    );
  };

  //Parts -> all attributes of each kind of course part
  const Part = ({ part }: { part: CoursePart }) => {
    switch (part.kind) {
      case "basic":
        return (
          <div>
            <p style={{ fontWeight: 900 }}>
              {part.name} {part.exerciseCount}
            </p>
            <p style={{ fontStyle: "italic" }}>{part.description}</p>
          </div>
        );
      case "group":
        return (
          <div>
            <p style={{ fontWeight: 900 }}>
              {part.name} {part.exerciseCount}
            </p>
            <p>project exercises: {part.groupProjectCount}</p>
          </div>
        );
      case "background":
        return (
          <div>
            <p style={{ fontWeight: 900 }}>
              {part.name} {part.exerciseCount}
            </p>
            <p style={{ fontStyle: "italic" }}>{part.description}</p>
            <p>{part.backroundMaterial}</p>
          </div>
        );
      case "special":
        return (
          <div>
            <p style={{ fontWeight: 900 }}>
              {part.name} {part.exerciseCount}
            </p>
            <p style={{ fontStyle: "italic" }}>{part.description}</p>
            <p>required skills: {part.requirements}</p>
          </div>
        );
      default:
        return assertNever(part);
    }
  };

  return (
    <div>
      <Header name={courseName} />
      <Content parts={courseParts} />
      <Total parts={courseParts} />
    </div>
  );
};

export default App;
