import React, { useState, useEffect } from 'react';
import axios from "axios";

import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";

const App = () => {
  const [persons, setPersons] = useState([])

  useEffect(() => {
  const fetchData = async () => {
    try {
      const res = await axios.get('http://localhost:3001/persons');
      setPersons(res.data)
    } catch (e) {
      console.log(e)
    }   
  }
  fetchData();
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

    axios
        .post('http://localhost:3001/persons', newContact)
        .then(res => setPersons([...persons, res.data]))
        .catch(e => console.log('something wen wrong', e))

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