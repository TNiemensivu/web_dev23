import { useState } from 'react'

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
    return (
      <div>
        <Header/>
        <Vote handleClick={()=>setGood(good+1)} buttonText={"good"}/>
        <Vote handleClick={()=>setNeutral(neutral+1)} buttonText={"neutral"}/>
        <Vote handleClick={()=>setBad(bad+1)} buttonText={"bad"}/>
        <Statistics good={good} neutral={neutral} bad={bad}/>
      </div>
    )
}

const Header = () =>{
  return (
    <h1>give feedback</h1>
  )
}

const Vote = (props) =>{
  return(
  <button onClick={props.handleClick}>{props.buttonText}</button>
  )
}


const Statistics = (props) => {
  const total= props.good+props.neutral+props.bad
  const totalVal= props.good-props.bad
  if(total === 0){
    return (
      <div>
        <h1>statistics</h1>
        <p>No feedback given</p>
      </div>
    )
  }
  return(
    <div>
      <h1>statistics</h1>
      <StatisticLine text="good" value ={props.good} />
      <StatisticLine text="neutral" value ={props.neutral} />
      <StatisticLine text="bad" value ={props.bad} />
      <StatisticLine text="average" value={totalVal/total}/>
      <StatisticLine text="positive" value={100*props.good/total}/>
    </div>
  )
}

const StatisticLine = (props) =>{
  return(
    <p>{props.text} {props.value}</p>
  )
}

export default App