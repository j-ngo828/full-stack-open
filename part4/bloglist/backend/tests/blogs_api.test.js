const supertest = require('supertest')
const mongoose = require('mongoose')
const app = require('../app')
const helper = require('./test_helper')

const Blog = require('../models/blog')

const api = supertest(app)

beforeEach(async () => {
  await Blog.deleteMany({})
  await Blog.insertMany(helper.initialBlogs)
})

describe('blogs api', () => {
  test('blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('returns all blogs', async () => {
    const result = await api.get('/api/blogs').expect(200)
    const allBlogs = await helper.blogsInDb()
    expect(result.body.length).toBe(allBlogs.length)
  })

  test('blog detail endpoint returns a blog with id field', async () => {
    const oneBlog = (await Blog.find({}))[0]
    const result = await api.get(`/api/blogs/${oneBlog.id}`).expect(200)
    const resultBlog = result.body
    expect(resultBlog.id).toBeDefined()
  })

  test('blog detail endpoint returns a blog with no _id and __v fields', async () => {
    const oneBlog = (await Blog.find({}))[0]
    const result = await api.get(`/api/blogs/${oneBlog.id}`).expect(200)
    const resultBlog = result.body
    /* eslint-disable no-underscore-dangle */
    expect(resultBlog._id).toBeUndefined()
    expect(resultBlog.__v).toBeUndefined()
    /* eslint-enable no-underscore-dangle */
  })
})

afterAll(async () => mongoose.connection.close())
