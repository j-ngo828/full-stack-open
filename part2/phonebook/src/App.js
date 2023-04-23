import { useEffect, useState } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import phonebookService from './services/phonebookService'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [nameSearchQuery, setNameSearchQuery] = useState('')

  useEffect(
    () => {
      phonebookService.getAllContacts()
        .then((contacts) =>
          setPersons(contacts)
        )
        .catch((error) => console.error(error))
    },
    [],
  )

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
    phonebookService.createContact(newPerson)
      .then((_) => phonebookService.getAllContacts())
      .then((contacts) => setPersons(contacts))
      .catch((error) => console.error(error))
    setNewName('')
    setNewNumber('')
  }

  const handleDeleteContact = (contactId) => {
    phonebookService.deleteContact(contactId)
      .then((_) =>
        phonebookService.getAllContacts()
      )
      .then((contacts) => setPersons(contacts))
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter
        nameSearchQuery={nameSearchQuery}
        handleNameQueryInputChange={handleNameQueryInputChange}
      />
      <h3>Add a new</h3>
      <PersonForm
        newName={newName}
        handleNameInputChange={handleNameInputChange}
        newNumber={newNumber}
        handleNumberInputChange={handleNumberInputChange}
        handleAddContact={handleAddContact}
      />
      <h3>Numbers</h3>
      <Persons
        persons={persons}
        nameSearchQuery={nameSearchQuery}
        handleDeleteContact={handleDeleteContact}
      />
    </div>
  )
}

export default App
