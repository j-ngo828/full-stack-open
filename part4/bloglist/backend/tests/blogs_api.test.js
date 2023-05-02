const supertest = require('supertest')
const mongoose = require('mongoose')
const app = require('../app')
const helper = require('./test_helper')

const Blog = require('../models/blog')

const api = supertest(app)

describe('blogs api', () => {
  beforeEach(async () => {
    await Blog.deleteMany({})
    await Blog.insertMany(helper.initialBlogs)
  })

  test('blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('blogs get all route return all blogs', async () => {
    const result = await api.get('/api/blogs').expect(200)
    const allBlogs = await helper.blogsInDb()
    expect(result.body.length).toBe(allBlogs.length)
  })
})

afterAll(async () => mongoose.connection.close())
