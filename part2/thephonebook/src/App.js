import React, { useState, useEffect } from 'react';

import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";

import { getAll, createContact } from './services/personService';

const App = () => {
  const [persons, setPersons] = useState([])

  useEffect(() => {
  getAll()
      .then(res => setPersons(res))
      .catch(e => console.log(e))
  }, [])

  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')

  const handleNameChange = (e) => setNewName(e.target.value)
  const handleNumberChange = (e) => setNewNumber(e.target.value)

  const addContact = (e) => {
    e.preventDefault()
    if (persons.filter(person => person.name === newName).length > 0) {
      alert(`${newName} is already added to phonebook`)
      return;
    }
    const newContact = {name: newName, number: newNumber}

    createContact(newContact)
      .then(res => setPersons([...persons, res]))
      .catch(e => console.log(e))

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
      addContact={addContact}
      />
      <h2>Contacts</h2>
      <Persons persons={persons} searchInput={searchInput}/>
    </div>
  )
}

export default App