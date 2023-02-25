const Course = (props) => {
    return(
    <div>
    <Header course={props.course} />
    <Content parts={props.course.parts} />
    <Total parts={props.course.parts} />
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
        {props.parts.map(part =>
        <Part key={part.id} part={part}/>
        )}
    </div>
    )
  }
  
  const Part = (props) =>{
    return(
    <div>
      <li>{props.part.name} {props.part.exercises}</li>
    </div>
    
      )
  }
  
  const Total = (props) => {
    return (
      <p>Number of exercises {props.parts.map(part => part.exercises).reduce((a, b) => a + b, 
      )}</p>
    )
  }
export default Course;