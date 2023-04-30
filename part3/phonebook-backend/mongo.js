const mongoose = require('mongoose')

const password = process.argv[2]
const connectionUrl = `mongodb+srv://h8ngo:${password}@full-stack-open-notes.hajvcwu.mongodb.net/phonebook?retryWrites=true&w=majority`

mongoose.set('strictQuery', false)
mongoose.connect(connectionUrl)

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
})

const Person = mongoose.model('Person', personSchema)

function main() {
  const argv = process.argv
  if (argv.length < 3) {
    console.error('Please enter a password')
    process.exit(1)
  }
  if (argv.length === 3) {
    return Person.find({}).then((people) => {
      console.log('phonebook:')
      people.forEach((person) => {
        console.log(`${person.name} ${person.number}`)
      })
    })
  }
  const name = argv[3]
  const number = argv[4]
  const newPerson = new Person({
    name,
    number,
  })
  return newPerson.save().then((result) => {
    console.log(`added ${result.name} number ${result.number} to phonebook`)
  })
}

main().then(() => mongoose.connection.close())
