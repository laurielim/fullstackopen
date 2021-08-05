import React from "react"

const Persons = ({persons, searchInput, deleteHanlder}) => {
    return <ul>
    {persons.filter(person=>person.name.toLowerCase().includes(searchInput.toLowerCase())).map(person=><li key={person.name}>{person.name} {person.number} <button onClick={() => deleteHanlder(person.name, person.id)}>delete</button></li>)}
  </ul>
}

export default Persons