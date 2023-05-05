const supertest = require('supertest')
const mongoose = require('mongoose')
const app = require('../app')
const helper = require('./test_helper')

const api = supertest(app)

beforeEach(async () => {
  await helper.initializesDb()
})

describe('when there are blogs saved to the database initially', () => {
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
    result.body.forEach((blog) => {
      expect(blog.user).toBeDefined()
      expect(blog.user.username).toBeDefined()
      expect(blog.user.name).toBeDefined()
      expect(blog.user.id).toBeDefined()
      expect(blog.user.blogs).toBeUndefined()
    })
  })
})

describe('viewing a single blog', () => {
  test('a blog is returned with id field', async () => {
    const oneBlog = (await helper.blogsInDb())[0]
    const result = await api.get(`/api/blogs/${oneBlog.id}`).expect(200)
    const resultBlog = result.body
    expect(resultBlog.id).toBeDefined()
  })

  test('a blog is returned with no _id and __v fields', async () => {
    const oneBlog = (await helper.blogsInDb())[0]
    const result = await api.get(`/api/blogs/${oneBlog.id}`).expect(200)
    const resultBlog = result.body
    /* eslint-disable no-underscore-dangle */
    expect(resultBlog._id).toBeUndefined()
    expect(resultBlog.__v).toBeUndefined()
    /* eslint-enable no-underscore-dangle */
  })
})

describe('creating a new blog', () => {
  test('can successfully save blog to the database', async () => {
    const payload = {
      title: 'Test title',
      author: 'Jack Test',
      url: 'https://google.com',
      likes: 4,
    }
    const user = (await helper.usersInDb())[0]
    const existingUserToken = await helper.getUserToken(user.id)
    const existingUserAuthorizationHeader = `Bearer ${existingUserToken}`
    const result = await api
      .post('/api/blogs')
      .set('Authorization', existingUserAuthorizationHeader)
      .send(payload)
      .expect(201)
    const allBlogs = await helper.blogsInDb()

    expect(allBlogs).toHaveLength(helper.initialBlogs.length + 1)
    expect(allBlogs.map((blog) => ({ ...blog, user: blog.user.toString() }))).toContainEqual(
      result.body
    )
  })

  test('created blog has like default to 0 if payload does not contains likes property', async () => {
    const payload = {
      title: 'Test title',
      author: 'Jack Test',
      url: 'https://google.com',
    }
    const user = (await helper.usersInDb())[0]
    const existingUserToken = await helper.getUserToken(user.id)
    const existingUserAuthorizationHeader = `Bearer ${existingUserToken}`
    const result = await api
      .post('/api/blogs')
      .set('Authorization', existingUserAuthorizationHeader)
      .send(payload)
      .expect(201)
    const allBlogs = await helper.blogsInDb()

    const savedBlog = allBlogs.find((blog) => blog.id === result.body.id)
    expect(savedBlog).toBeDefined()
    expect(savedBlog.likes).toBe(0)
  })

  test('created blog is associated with the user who created it', async () => {
    const payload = {
      title: 'Test title',
      author: 'Jack Test',
      url: 'https://google.com',
      likes: 4,
    }
    const user = (await helper.usersInDb())[0]
    const existingUserToken = await helper.getUserToken(user.id)
    const existingUserAuthorizationHeader = `Bearer ${existingUserToken}`
    const result = await api
      .post('/api/blogs')
      .set('Authorization', existingUserAuthorizationHeader)
      .send(payload)
      .expect(201)
    expect(result.body.user).toBe(user.id)
  })

  test('responds with bad request if payload missing title or url fields on POST', async () => {
    const payload = {
      author: 'Jack Test',
    }
    const user = (await helper.usersInDb())[0]
    const existingUserToken = await helper.getUserToken(user.id)
    const existingUserAuthorizationHeader = `Bearer ${existingUserToken}`
    await api
      .post('/api/blogs')
      .set('Authorization', existingUserAuthorizationHeader)
      .send(payload)
      .expect(400)

    payload.title = 'Test title'

    await api
      .post('/api/blogs')
      .set('Authorization', existingUserAuthorizationHeader)
      .send(payload)
      .expect(400)

    delete payload.title
    payload.url = 'https://google.com'

    await api
      .post('/api/blogs')
      .set('Authorization', existingUserAuthorizationHeader)
      .send(payload)
      .expect(400)
  })

  test('returns 401 unauthorized with missing or invalid token', async () => {
    await api.post('/api/blogs').expect(401)
    await api.post('/api/blogs').set('Authorization', 'Bearer 450245').expect(401)
  })
})

describe('deleting a single blog', () => {
  test('responds with 204 on successful deletion', async () => {
    const allBlogs = await helper.blogsInDb()
    const blogToBeDeleted = allBlogs[0]
    const user = (await helper.usersInDb())[0]
    const token = await helper.getUserToken(user.id)
    const authorizationHeader = `Bearer ${token}`
    await api
      .delete(`/api/blogs/${blogToBeDeleted.id}`)
      .set('Authorization', authorizationHeader)
      .expect(204)
  })

  test('blog is successfully deleted from the database', async () => {
    const allBlogs = await helper.blogsInDb()
    const blogToBeDeleted = allBlogs[0]
    const user = (await helper.usersInDb())[0]
    const token = await helper.getUserToken(user.id)
    const authorizationHeader = `Bearer ${token}`

    await api.delete(`/api/blogs/${blogToBeDeleted.id}`).set('Authorization', authorizationHeader)

    const allBlogsUpdated = await helper.blogsInDb()
    expect(allBlogsUpdated.map((blog) => blog.title)).not.toContain(blogToBeDeleted.title)
  })

  test('responds with 401 unauthorized if attempting delete without token or by an invalid user', async () => {
    const allBlogs = await helper.blogsInDb()
    const blogToBeDeleted = allBlogs[0]
    const user = (await helper.usersInDb())[1]
    const token = await helper.getUserToken(user.id)
    const authorizationHeader = `Bearer ${token}`

    await api
      .delete(`/api/blogs/${blogToBeDeleted.id}`)
      .set('Authorization', authorizationHeader)
      .expect(401)
    await api.delete(`/api/blogs/${blogToBeDeleted.id}`).expect(401)
  })
})

describe('updating a single blog', () => {
  test('responds with correct headers and status on success', async () => {
    const allBlogs = await helper.blogsInDb()
    const blogToBeUpdated = allBlogs[0]
    await api
      .put(`/api/blogs/${blogToBeUpdated.id}`)
      .send({ title: 'Hllo Worl!' })
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('blog is successfully updated in the database', async () => {
    const allBlogs = await helper.blogsInDb()
    const blogToBeUpdated = allBlogs[0]
    const payload = { title: 'Kafkaesque' }
    await api
      .put(`/api/blogs/${blogToBeUpdated.id}`)
      .send(payload)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const allBlogsUpdated = await helper.blogsInDb()
    expect(allBlogsUpdated.map((blog) => blog.title)).toContain(payload.title)
  })

  test('respond with updated data upon success', async () => {
    const allBlogs = await helper.blogsInDb()
    const blogToBeUpdated = allBlogs[0]
    const payload = {
      author: 'Franz Kafka',
      title: 'The Metamorphosis',
    }
    const result = await api.put(`/api/blogs/${blogToBeUpdated.id}`).send(payload)
    const allBlogsAfterUpdate = await helper.blogsInDb()
    const updatedBlog = allBlogsAfterUpdate.find((blog) => blog.id === blogToBeUpdated.id)
    expect(result.body).toEqual({
      ...updatedBlog,
      user: updatedBlog.user.toString(),
    })
  })

  test('responds with 400 bad request if incorrect id format', async () => {
    await api.put(`/api/blogs/23as`).send({ title: 'HOLA' }).expect(400)
  })
})

afterAll(async () => mongoose.connection.close())
