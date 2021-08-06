import React, { useState, useEffect } from 'react';

import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";

import { getAll, createContact, deleteContact, updateContact } from './services/personService';

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

  const addContact = (e, id) => {
    e.preventDefault()
    const newContact = {name: newName, number: newNumber}
    const existingContact = persons.filter(person => person.name === newName)

    if (existingContact.length > 0) {
      const result = window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`);
      if (result) {
        updateContact(existingContact[0].id, newContact)
      .then(res => {
        const updatedPersons = persons.map(person => person.id === existingContact[0].id ? res : person)
        setPersons(updatedPersons)
      })
      }
    } else {
      createContact(newContact)
      .then(res => setPersons([...persons, res]))
    }
    

    setNewName('')
    setNewNumber('')
  }

  const [ searchInput, setSearchInput ] = useState('')
  const searchHandler = (e) => setSearchInput(e.target.value)

  const deleteHanlder = (contact, id) => {
    const result = window.confirm(`Delete ${contact}`);
    if (result) {
      deleteContact(id)
      const updatedPersons = persons.filter(person => person.id !== id)
      setPersons(updatedPersons)
    }
  }

  return (
    <div>
      <h1>Phonebook</h1>
      <Filter searchInput={searchInput} searchHandler={searchHandler}/>
      <h2>Add new contact</h2>
      <PersonForm
      newName={newName}
      handleNameChange={handleNameChange}
      newNumber={newNumber}
      handleNumberChange={handleNumberChange}
      addContact={addContact}
      />
      <h2>Contacts</h2>
      <Persons persons={persons} searchInput={searchInput} deleteHanlder={deleteHanlder}/>
    </div>
  )
}

export default App