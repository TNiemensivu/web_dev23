const App = () => {
  const course = 'Half Stack application development'
  const part1 = 'Fundamentals of React'
  const exercises1 = 10
  const part2 = 'Using props to pass data'
  const exercises2 = 7
  const part3 = 'State of a component'
  const exercises3 = 14
return (
  <div>
    <Header course={course} />
    <Content pt1={part1} pt2={part2} pt3={part3} ex1={exercises1} ex2={exercises2} ex3={exercises3}/>
    <Total ex1={exercises1} ex2={exercises2} ex3={exercises3} />
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
      <p>
        {props.pt1} {props.ex1}
      </p>
      <p>
        {props.pt2} {props.ex2}
      </p>
      <p>
        {props.pt3} {props.ex3}
      </p>
      </div>
  )
}

const Total = (props) => {
  return (
    <p>Number of exercises {props.ex1 + props.ex2 + props.ex3}</p>
  )
}

export default App
