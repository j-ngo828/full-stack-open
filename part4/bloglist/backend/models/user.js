const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    minLength: 3,
  },
  name: String,
  passwordHash: String,
  // blogs: [
  //   {
  //     type: mongoose.Schema.Types.ObjectId,
  //     ref: 'Blog',
  //   },
  // ],
})

userSchema.plugin(uniqueValidator)
userSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    /* eslint-disable no-param-reassign */
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
    // the passwordHash should not be revealed
    delete returnedObject.passwordHash
    /* eslint-enable no-param-reassign */
  },
})

const User = mongoose.model('User', userSchema)

module.exports = User
