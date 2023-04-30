import { useEffect, useState } from 'react';
import Filter from './components/Filter';
import Notification from './components/Notification';
import PersonForm from './components/PersonForm';
import Persons from './components/Persons';
import phonebookService from './services/phonebookService';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [nameSearchQuery, setNameSearchQuery] = useState('');
  const [message, setMessage] = useState(null);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    phonebookService
      .getAllContacts()
      .then((contacts) => setPersons(contacts))
      .catch((error) => console.error(error));
  }, []);

  const getIndexOfPersonWithName = (submittedName) =>
    persons.findIndex((person) => person.name === submittedName);

  const handleNameInputChange = (event) => setNewName(event.target.value);

  const handleNumberInputChange = (event) => setNewNumber(event.target.value);

  const handleNameQueryInputChange = (event) => setNameSearchQuery(event.target.value);

  const handleSuccessfulOperation = (message) => {
    setMessage(message);
    setNewName('');
    setNewNumber('');
    setTimeout(() => {
      setMessage(null);
    }, 5000);
    return phonebookService.getAllContacts();
  };

  const handleAddContact = (event) => {
    event.preventDefault();
    const newPerson = {
      name: newName,
      number: newNumber,
    };
    const nameExistsIndex = getIndexOfPersonWithName(newName);
    if (nameExistsIndex !== -1) {
      const shouldReplaceContact = window.confirm(
        `${newName} is already added to the phonebook, replace the old number with a new one?`
      );
      if (shouldReplaceContact) {
        phonebookService
          .updateContact(persons[nameExistsIndex].id, newPerson)
          .then((_) => handleSuccessfulOperation(`Updated ${newName}'s number`))
          .then((contacts) => setPersons(contacts))
          .catch((error) => {
            setHasError(true);
            setMessage(error.response.data.error);
            console.error(error);
            setTimeout(() => {
              setHasError(false);
              setMessage(null);
            }, 5000);
            phonebookService.getAllContacts().then((contacts) => setPersons(contacts));
          });
      }
    } else {
      phonebookService
        .createContact({ ...newPerson, id: persons.length + 1 })
        .then((_) => handleSuccessfulOperation(`Added ${newName}`))
        .then((contacts) => setPersons(contacts))
        .catch((error) => {
          setHasError(true);
          setMessage(error.response.data.error);
          setTimeout(() => {
            setHasError(false);
            setMessage(null);
          }, 5000);
          console.error(error);
        });
    }
  };

  const handleDeleteContact = (contactId) => {
    phonebookService
      .deleteContact(contactId)
      .then((_) => phonebookService.getAllContacts())
      .then((contacts) => setPersons(contacts));
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification
        message={message}
        isError={hasError}
      />
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
  );
};

export default App;
