const App = () => {
  const course = {
    name: 'Half Stack application development',
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
        <Header course={course} />
        <Content parts={course.parts} />
        <Total parts={course.parts} />
      </div>
    )
}


const Header = (props) => {
  return(
    <h1>{props.course.name}</h1>
  )
}

const Content = (props) =>{
  return(
    <div>
      <Part1 pt1={props.parts[0]}/>
      <Part2 pt2={props.parts[1]}/>
      <Part3 pt3={props.parts[2]}/>
    </div>
  )
}
const Part1 = (props) =>{
  return(
    <p>
        {props.pt1.name} {props.pt1.exercises}
    </p>
  )
}
const Part2 = (props) =>{
  return(
    <p>
        {props.pt2.name} {props.pt2.exercises}
    </p>
  )
}
const Part3 = (props) =>{
  return(
    <p>
        {props.pt3.name} {props.pt3.exercises}
    </p>
  )
}

const Total = (props) => {
  return (
    <p>Number of exercises {props.parts[0].exercises + props.parts[1].exercises + props.parts[2].exercises}</p>
  )
}

export default App
