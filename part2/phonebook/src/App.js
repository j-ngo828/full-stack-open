import { useState } from 'react'

const FILTER_INPUT_LABEL = 'filter shown with'

const getDefaultPersonsState = () => ([
  { name: 'Arto Hellas', number: '040-123456', id: 1 },
  { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
  { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
  { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
])

const App = () => {
  const [persons, setPersons] = useState(getDefaultPersonsState()) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [nameSearchQuery, setNameSearchQuery] = useState('')

  const nameAlreadyExists = (submittedName) =>
    persons.findIndex((person) => person.name === submittedName) !== -1

  const numberAlreadyExists = (submittedNumber) =>
    persons.findIndex((person) => person.number === submittedNumber) !== -1

  const handleNameInputChange = (event) => setNewName(event.target.value)

  const handleNumberInputChange = (event) => setNewNumber(event.target.value)

  const handleNameQueryInputChange = (event) => setNameSearchQuery(event.target.value)

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
      id: persons.length + 1,
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
      <p>
        {FILTER_INPUT_LABEL} <input value={nameSearchQuery} onChange={handleNameQueryInputChange} />
      </p>
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
      {persons
        .filter((person) =>
          person.name.toLocaleLowerCase().includes(
            nameSearchQuery.toLocaleLowerCase()
          )
        )
        .map((person) =>
          <p key={person.id}>{person.name} {person.number}</p>
        )
      }
    </div>
  )
}

export default App
