import React, { useState } from 'react'

import Filter from "./components/Filter"
import PersonForm from "./components/PersonForm"
import Persons from "./components/Persons"

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ])

  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')

  const handleNameChange = (e) => setNewName(e.target.value)
  const handleNumberChange = (e) => setNewNumber(e.target.value)

  const addName = (e) => {
    e.preventDefault()
    if (persons.filter(person => person.name === newName).length > 0) {
      alert(`${newName} is already added to phonebook`)
      return;
    }
    setPersons([...persons, {name: newName, number: newNumber}])
    setNewName('')
    setNewNumber('')
  }

  const [ searchInput, setSearchInput ] = useState('')
  const handleSearch = (e) => setSearchInput(e.target.value)

  return (
    <div>
      <h1>Phonebook</h1>
      <Filter searchInput={searchInput} handleSearch={handleSearch}/>
      <h2>Add new contact</h2>
      <PersonForm
      newName={newName}
      handleNameChange={handleNameChange}
      newNumber={newNumber}
      handleNumberChange={handleNumberChange}
      addName={addName}
      />
      <h2>Contacts</h2>
      <Persons persons={persons} searchInput={searchInput}/>
    </div>
  )
}

export default App