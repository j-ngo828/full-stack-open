const usersRouter = require('express').Router()
const bcrypt = require('bcrypt')
const { ValidationError, ValidatorError } = require('mongoose').Error
const User = require('../models/user')

usersRouter.get('/', async (request, response) => {
  const allUsers = await User.find({}).populate('blogs', { user: 0 })
  response.json(allUsers)
})

usersRouter.post('/', async (request, response) => {
  const { username, name, password } = request.body
  if (!(password && password.length >= 3)) {
    const validationError = new ValidationError(null)
    validationError.addError(
      'password',
      new ValidatorError({ message: 'Password must have at least 3 characters' })
    )
    throw validationError
  }
  const saltRounds = 10
  const passwordHash = await bcrypt.hash(password, saltRounds)

  const newUser = new User({
    username,
    name,
    passwordHash,
  })

  const savedUser = await newUser.save()

  response.status(201).json(savedUser)
})

module.exports = usersRouter
