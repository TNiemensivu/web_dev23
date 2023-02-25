import { useState } from 'react'
import {useEffect} from 'react'
import axios from 'axios'
import Persons from './Persons'
import PersonForm from './Personform'


const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

  useEffect(() => {
    console.log('effect')
  
    const eventHandler = response => {
      console.log('promise fulfilled')
      setPersons(response.data)
    }
  
    const promise = axios.get('http://localhost:3001/persons')
    promise.then(eventHandler)
  }, [])

  const handleName = (event) => {
    event.preventDefault()
    setNewName(event.target.value)
  }

  const handleNumber = (event) => {
    event.preventDefault()
    setNewNumber(event.target.value)
  }

  const addName = (event) => {
    event.preventDefault()
    if(newName === '') {
      window.alert('Please enter a proper name')
    }
    else if(persons.some(person => person.name === newName)) {
      window.alert(`${newName} is already in the list`)
    }
    else if(persons.some(person => person.number === newNumber)) {
      window.alert(`${newNumber} is already in the list`)
    }
    else{
    const newPerson = { name: newName, number: newNumber }
    setPersons(persons.concat(newPerson))
    axios.post('http://localhost:3001/notes', newPerson)
    .then(response => {setPersons(persons.concat(response.data))})
    setNewName('')
    setNewNumber('')
    }
  }
  return (
    <div>
      <h2>Phonebook</h2>
      <PersonForm addName={addName} newName={newName} newNumber={newNumber} handleName={handleName} handleNumber={handleNumber}/>
      <h2>Numbers</h2>
      <Persons persons={persons}/>
    </div>
  )

}

export default App
