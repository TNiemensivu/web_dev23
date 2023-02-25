const Person = (props) => {
    return(
      <li key={props.person.name}>
        {props.person.name} {props.person.number}
      </li>
    )
  }
  
  const Persons = (props)=> {
    return(
      <ul>
        {props.persons.map((person) => 
          <Person person={person}/>
        )}
      </ul>
    )
  }
export default Persons;