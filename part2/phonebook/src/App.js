import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { 
      name: 'Arto Hellas',
      number: '040-1234567'
    },
  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

  const nameAlreadyExists = (submittedName) =>
    persons.findIndex((person) => person.name === submittedName) !== -1

  const numberAlreadyExists = (submittedNumber) =>
    persons.findIndex((person) => person.number === submittedNumber) !== -1

  const handleNameInputChange = (event) => setNewName(event.target.value)

  const handleNumberInputChange = (event) => setNewNumber(event.target.value)

  const handleAddContact = (event) => {
    event.preventDefault()
    if (nameAlreadyExists(newName)) {
      alert(`${newName} is already added to phonebook`)
      return
    }
    if (numberAlreadyExists(newNumber)) {
      alert(`${newNumber} is already in the phonebook`)
      return
    }
    const newPerson = {
      name: newName,
      number: newNumber,
    }
    setPersons([...persons, newPerson])
    setNewName('')
    setNewNumber('')
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form>
        <div>
          name: <input value={newName} onChange={handleNameInputChange} />
        </div>
        <div>
          number: <input value={newNumber} onChange={handleNumberInputChange} />
        </div>
        <div>
          <button type="submit" onClick={handleAddContact}>add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.map((person) =>
        <p key={person.name}>{person.name} {person.number}</p>
      )}
    </div>
  )
}

export default App
