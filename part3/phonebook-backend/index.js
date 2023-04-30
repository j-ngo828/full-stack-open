require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const Person = require('./models/person');

const app = express();

app.use(express.static('build'));
app.use(express.json());

morgan.token('body', (request, response) => {
  return JSON.stringify(request.body);
});

app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'));

function generateId() {
  return Math.floor(Math.random() * 23423523523);
}

app.get('/info', (request, response) => {
  const requestReceivedDate = new Date();
  Person.count({}).then((phoneBookCount) => {
    response.send(
      `<p>Phonebook has info for ${phoneBookCount} people</p><p>${requestReceivedDate.toString()}</p>`
    );
  });
});

app.get('/api/persons', (request, response) => {
  Person.find({}).then((persons) => {
    response.json(persons);
  });
});

app.get('/api/persons/:id', (request, response) => {
  const id = request.params.id;
  Person.findById(id)
    .then((person) => {
      response.json(person);
    })
    .catch((error) => {
      response.status(404).end();
    });
});

app.delete('/api/persons/:id', (request, response) => {
  const id = +request.params.id;
  persons = persons.filter((person) => person.id !== id);
  response.status(204).end();
});

app.post('/api/persons', (request, response) => {
  const body = request.body;
  if (!body.name || !body.number) {
    response.status(400).json({
      error: 'name or number missing',
    });
    return;
  }

  // const allNames = persons.map((person) => person.name);
  // const nameExists = allNames.find((name) => name === body.name);

  // if (nameExists) {
  //   response.status(400).json({
  //     error: 'name must be unique',
  //   });
  //   return;
  // }

  const person = new Person({
    name: body.name,
    number: body.number,
  });

  person.save().then((savedPerson) => {
    response.json(savedPerson);
  });
});

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
