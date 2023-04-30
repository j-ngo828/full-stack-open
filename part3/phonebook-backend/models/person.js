const mongoose = require('mongoose')

const connectionUrl = process.env.MONGODB_URI

mongoose.set('strictQuery', false)
mongoose
  .connect(connectionUrl)
  .then(() => {
    console.log('successfully connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connecting to MongoDB:', error.message)
  })

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    minLength: 3,
    required: true,
  },
  number: {
    type: String,
    validate: (value) => {
      return /^\d{2,3}-\d{6,}$/.test(value)
    },
  },
})

personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  },
})

module.exports = mongoose.model('Person', personSchema)
