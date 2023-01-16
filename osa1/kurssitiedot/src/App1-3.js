const App = () => {
  const course = 'Half Stack application development'
  const part1 = {
    name: 'Fundamentals of React',
    exercises: 10
  }
  const part2 = {
    name: 'Using props to pass data',
    exercises: 7
  }
  const part3 = {
    name: 'State of a component',
    exercises: 14
  }
return (
  <div>
    <Header course={course} />
    <Content pt1={part1} pt2={part2} pt3={part3}/>
    <Total pt1={part1} pt2={part2} pt3={part3} />
  </div>
)
}

const Header = (props) => {
  return(
    <h1>{props.course}</h1>
  )
}

const Content = (props) =>{
  return(
    <div>
      <Part1 pt1={props.pt1}/>
      <Part2 pt2={props.pt2}/>
      <Part3 pt3={props.pt3}/>
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
    <p>Number of exercises {props.pt1.exercises + props.pt2.exercises + props.pt3.exercises}</p>
  )
}

export default App
