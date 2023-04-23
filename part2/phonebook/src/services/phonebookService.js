import axios from 'axios'

const baseUrl = 'http://localhost:3001/persons'

const getAllContacts = () => axios.get(baseUrl).then((response) => response.data)

const createContact = (newContact) => axios.post(baseUrl, newContact).then((response) =>
  response.data
)

const updateContact = (contactDetail) => axios.put(baseUrl, contactDetail).then((response) =>
  response.data
)

const deleteContact = (contactId) => axios.delete(`${baseUrl}/${contactId}`).then((response) =>
  response.data
)

export default {getAllContacts, createContact, deleteContact, updateContact}
