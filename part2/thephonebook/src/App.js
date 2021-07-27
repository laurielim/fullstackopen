import React, { useState } from 'react'

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
      filter shown with <input type="text" value={searchInput} onChange={handleSearch}/>
      <h2>Add new contact</h2>
      <form>
        <div>
          name: <input type="text" value={newName} onChange={handleNameChange} />
        </div>
        <div>
          number: <input type="text" value={newNumber} onChange={handleNumberChange}/>
        </div>
        <div>
          <button onClick={addName} type="submit">add</button>
        </div>
      </form>
      <h2>Contacts</h2>
      <ul>
        {persons.filter(person=>person.name.toLowerCase().includes(searchInput.toLowerCase())).map(person=><li key={person.name}>{person.name} {person.number}</li>)}
      </ul>
    </div>
  )
}

export default App