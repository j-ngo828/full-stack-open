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
    expect(result.body).toHaveLength(allBlogs.length)
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

  test('creates a new blog', async () => {
    const payload = {
      title: 'Test title',
      author: 'Jack Test',
      url: 'https://google.com',
      likes: 0,
    }
    await api.post('/api/blogs').send(payload).expect(201)
    const allBlogs = await helper.blogsInDb()

    expect(allBlogs).toHaveLength(helper.initialBlogs.length + 1)
    const titles = allBlogs.map((blog) => blog.title)
    expect(titles).toContain('Test title')
  })

  test('created blog has like default to 0 if payload does not contains likes property', async () => {
    const payload = {
      title: 'Test title',
      author: 'Jack Test',
      url: 'https://google.com',
    }
    const result = await api.post('/api/blogs').send(payload).expect(201)
    const allBlogs = await helper.blogsInDb()

    const savedBlog = allBlogs.find((blog) => blog.id === result.body.id)
    expect(savedBlog).toBeDefined()
    expect(savedBlog.likes).toBe(0)
  })

  test('responds with bad request if payload missing title or url fields on POST', async () => {
    const payload = {
      author: 'Jack Test',
    }
    await api.post('/api/blogs').send(payload).expect(400)

    payload.title = 'Test title'

    await api.post('/api/blogs').send(payload).expect(400)

    delete payload.title
    payload.url = 'https://google.com'

    await api.post('/api/blogs').send(payload).expect(400)
  })
})

afterAll(async () => mongoose.connection.close())
