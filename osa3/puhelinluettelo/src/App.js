import { useState } from 'react'
import {useEffect} from 'react'
import React from 'react'
import Persons from './Persons'
import PersonForm from './Personform'
import Service from './Service'
import Message from './Message'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newMessage, setNewMessage] = useState(null)

  useEffect(() => {
    Service.getAll()
    .then(data => {setPersons(data)})
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
    const newPerson = { name: newName, number: newNumber, id: persons.size + 2}
    Service.create(newPerson).then(data => {setPersons(persons.concat(data))} )
    setNewMessage(`${newName} was added.`)
    setNewName('')
    setNewNumber('')
    setTimeout(() => {
      setNewMessage(null)
    }, 5000)
    }
  }
  const deletePerson = (id) => {
    const filteredPersons = persons.filter(person => person.id === id)
    const personName = filteredPersons[0].name
    const personId = filteredPersons[0].id
    if (window.confirm(`Delete ${personName} ?`)) {
      Service.remove(personId)
      setNewMessage(`${personName} was deleted`)
      setPersons(persons.filter(person => person.id !== personId))
      setTimeout(() => {
        setNewMessage(null)
      }, 5000)
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Message message={newMessage} />
      <h2>Add new person</h2>
      <PersonForm addName={addName} newName={newName} newNumber={newNumber} handleName={handleName} handleNumber={handleNumber}/>
      <h2>Numbers</h2>
      <Persons persons={persons} deletePerson={deletePerson}/>
    </div>
  )

}

export default App
