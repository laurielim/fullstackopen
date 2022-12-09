import React, { useState, useEffect } from 'react';

import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import Notification from './components/Notification';

import { getAll, createContact, deleteContact, updateContact } from './services/personService';

const App = () => {
  const [persons, setPersons] = useState([])
  const [notificationMessage, setNotificationMessage] = useState("")
  const [notificationStatus, setNotificationStatus] = useState("")

  const hideNotification = () => {
    setTimeout(() => {
      setNotificationMessage("");
      setNotificationStatus("");
    }, 5000)
  }

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
    const newContact = {name: newName, phoneNumber: newNumber}
    const existingContact = persons.filter(person => person.name === newName)

    if (existingContact.length > 0) {
      const result = window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`);
      if (result) {
        updateContact(existingContact[0].id, newContact)
      .then(res => {
        const updatedPersons = persons.map(person => person.id === existingContact[0].id ? res : person)
        setPersons(updatedPersons)
        setNotificationMessage(`Updated ${newName}`)
      })
      .catch(() => {
        setNotificationMessage(`${newName} is no longer in the phonebook`)
        setNotificationStatus("error")
        const updatedPersons = persons.filter(person => person.name !== newName)
        setPersons(updatedPersons)
        hideNotification()
      })
    }
    } else {
      createContact(newContact)
      .then(res => {
        setPersons([...persons, res])
        setNotificationMessage(`Added ${newName}`)
      })
    }
    setNotificationStatus("success")
    setNewName('')
    setNewNumber('')
    hideNotification()
  }

  const [ searchInput, setSearchInput ] = useState('')
  const searchHandler = (e) => setSearchInput(e.target.value)

  const deleteHanlder = (contact, id) => {
    const result = window.confirm(`Delete ${contact}`);
    if (result) {
      deleteContact(id)
        .catch(() => {
          setNotificationMessage(`${contact} has already been removed`)
          setNotificationStatus("error")
          hideNotification()
        }
        )
        const updatedPersons = persons.filter(person => person.id !== id)
        setPersons(updatedPersons)
    }
  }

  return (
    <div>
      <h1>Phonebook</h1>
      {notificationStatus && <Notification message={notificationMessage} status={notificationStatus}/>}
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
