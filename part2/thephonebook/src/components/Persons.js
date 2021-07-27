import React from "react"

const Persons = ({persons, searchInput}) => {
    return <ul>
    {persons.filter(person=>person.name.toLowerCase().includes(searchInput.toLowerCase())).map(person=><li key={person.name}>{person.name} {person.number}</li>)}
  </ul>
}

export default Persons