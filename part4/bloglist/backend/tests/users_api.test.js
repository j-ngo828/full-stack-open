const supertest = require('supertest')
const mongoose = require('mongoose')
const app = require('../app')
const helper = require('./test_helper')

const api = supertest(app)

const userApiRoute = '/api/users'

beforeEach(async () => {
  await helper.initializesDb()
})

describe('when there are some initial users in the database', () => {
  test('returns all users', async () => {
    const result = await api
      .get(userApiRoute)
      .expect(200)
      .expect('Content-Type', /application\/json/)
    const allUsers = await helper.usersInDb()
    expect(result.body.length).toBe(allUsers.length)
    result.body.forEach((user) => {
      expect(user.blogs).toBeDefined()
      expect(user.blogs).toHaveLength(1)
      expect(user.blogs[0].url).toBeDefined()
      expect(user.blogs[0].title).toBeDefined()
      expect(user.blogs[0].author).toBeDefined()
      expect(user.blogs[0].id).toBeDefined()
      expect(user.blogs[0].user).toBeUndefined()
    })
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

describe('logging in', () => {
  test('as an existing user', async () => {
    const payload = {
      username: helper.initialUsers[0].username,
      password: helper.initialUsers[0].password,
    }
    const result = await api
      .post('/api/login')
      .send(payload)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    expect(result.body.token).toBeDefined()
    expect(result.body.username).toBe(payload.username)
  })

  test('as a newly created user', async () => {
    const payload = {
      username: 'hiam3521',
      password: 'HNO$b6WYPId*dokWH$5DQ!!l%6MP%m',
    }
    await api
      .post(userApiRoute)
      .send(payload)
      .expect(201)
      .expect('Content-Type', /application\/json/)
    const result = await api
      .post('/api/login')
      .send(payload)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    expect(result.body.token).toBeDefined()
    expect(result.body.username).toBe(payload.username)
  })
})

afterAll(async () => mongoose.connection.close())
