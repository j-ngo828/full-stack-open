const express = require('express');
const morgan = require('morgan');

const app = express();

app.use(express.static('build'));
app.use(express.json());

morgan.token('body', (request, response) => {
  return JSON.stringify(request.body);
});

app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'));

let persons = [];

function generateId() {
  return Math.floor(Math.random() * 23423523523);
}

app.get('/info', (request, response) => {
  const requestReceivedDate = new Date();
  const phoneBookCount = persons.length;
  response.send(
    `<p>Phonebook has info for ${phoneBookCount} people</p><p>${requestReceivedDate.toString()}</p>`
  );
});

app.get('/api/persons', (request, response) => {
  response.json(persons);
});

app.get('/api/persons/:id', (request, response) => {
  const id = +request.params.id;
  const person = persons.find((person) => person.id === id);

  if (!person) {
    response.status(404).end();
  } else {
    response.json(person);
  }
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

  const allNames = persons.map((person) => person.name);
  const nameExists = allNames.find((name) => name === body.name);

  if (nameExists) {
    response.status(400).json({
      error: 'name must be unique',
    });
    return;
  }

  const person = {
    id: generateId(),
    name: body.name,
    number: body.number,
  };

  persons = [...persons, person];

  response.json(person);
});

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
