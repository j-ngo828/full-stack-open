const supertest = require('supertest')
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const app = require('../app')
const helper = require('./test_helper')

const User = require('../models/user')

const api = supertest(app)

const userApiRoute = '/api/users'

beforeEach(async () => {
  await User.deleteMany({})
  const hashUserPasswords = helper.initialUsers.map((user) => bcrypt.hash(user.password, 10))
  const results = await Promise.all(hashUserPasswords)

  await User.insertMany(
    helper.initialUsers.map((user, index) => {
      const userWithHashPassword = {
        ...user,
        passwordHash: results[index],
      }
      delete userWithHashPassword.password
      return userWithHashPassword
    })
  )
})

describe('when there are some initial users in the database', () => {
  test('returns all users', async () => {
    const result = await api
      .get(userApiRoute)
      .expect(200)
      .expect('Content-Type', /application\/json/)
    const allUsers = await helper.usersInDb()
    expect(result.body.length).toBe(allUsers.length)
  })
})

describe('creating a new user', () => {
  test('returns correct fields', async () => {
    const payload = {
      username: 'jngop',
      name: 'Gia Nato',
      password: 'abc123',
    }
    const result = await api
      .post(userApiRoute)
      .send(payload)
      .expect(201)
      .expect('Content-Type', /application\/json/)
    const allUsers = await helper.usersInDb()
    expect(allUsers).toHaveLength(helper.initialUsers.length + 1)
    const createdUser = allUsers.find((user) => user.username === payload.username)
    expect(result.body).toEqual(createdUser)
  })

  test('returns with 400 if username already exists', async () => {
    const payload = {
      username: helper.initialUsers[0].username,
      name: 'Duplicate Man',
      password: 'superse(*(&%*#$&*(&*$3y48931cvasdf,>?<',
    }
    await api.post(userApiRoute).send(payload).expect(400)
  })

  test('returns with 400 if username or password is missing', async () => {
    const payload = {
      name: 'Duplicate Man',
      password: 'superse(*(&%*#$&*(&*$3y48931cvasdf,>?<',
    }
    await api.post(userApiRoute).send(payload).expect(400)

    delete payload.password
    payload.username = helper.initialUsers[0].username

    await api.post(userApiRoute).send(payload).expect(400)
  })

  test('returns with 400 if username or password are at most 2 characters', async () => {
    const payload = {
      username: 'a',
      name: 'Duplicate Man',
      password: 'su',
    }
    await api.post(userApiRoute).send(payload).expect(400)
  })
})

afterAll(async () => mongoose.connection.close())
