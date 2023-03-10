const Person = (props) => {
    return(
      <li key={props.person.name}>
        {props.person.name} {props.person.number}<button onClick={() => props.deletePerson(props.person.id)}>delete</button>
      </li>
    )
  }

const Persons = (props)=> {
    return(
      <ul>
        {props.persons.map((person) => 
          <Person person={person} deletePerson={props.deletePerson}/>
        )}
      </ul>
    )
  }
export default Persons;