import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ]) 
  const [newName, setNewName] = useState('')

  const handleNameInputChange = (event) => setNewName(event.target.value)

  const nameAlreadyExists = (submittedName) =>
    persons.findIndex((person) => person.name === submittedName) !== -1

  const handleAddName = (event) => {
    event.preventDefault()
    if (nameAlreadyExists(newName)) {
      alert(`${newName} is already added to phonebook`)
      return
    }
    const newPerson = {
      name: newName,
    }
    setPersons([...persons, newPerson])
    setNewName('')
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form>
        <div>
          name: <input value={newName} onChange={handleNameInputChange} />
        </div>
        <div>
          <button type="submit" onClick={handleAddName}>add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.map((person) =>
        <p key={person.name}>{person.name}</p>
      )}
    </div>
  )
}

export default App
