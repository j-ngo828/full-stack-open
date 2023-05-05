const blogsRouter = require('express').Router()
const jwt = require('jsonwebtoken')
const Blog = require('../models/blog')
const User = require('../models/user')

blogsRouter.get('/', async (request, response) => {
  const allBlogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
  response.json(allBlogs)
})

blogsRouter.get('/:id', async (request, response) => {
  const oneBlog = await Blog.findById(request.params.id)
  if (oneBlog) {
    response.json(oneBlog)
  } else {
    response.status(404).end()
  }
})

blogsRouter.post('/', async (request, response) => {
  const decodedToken = jwt.verify(request.token, process.env.SECRET)
  if (!decodedToken.id) {
    return response.status(401).json({ error: 'token invalid' })
  }
  const user = await User.findById(decodedToken.id)
  const blog = new Blog({
    ...request.body,
    likes: request.body.likes || 0,
    user: user.id,
  })

  const savedBlog = await blog.save()
  user.blogs = [...user.blogs, savedBlog]
  await user.save()
  return response.status(201).json(savedBlog)
})

blogsRouter.delete('/:id', async (request, response) => {
  const decodedToken = jwt.verify(request.token, process.env.SECRET)
  if (!decodedToken.id) {
    return response.status(401).json({ error: 'token invalid' })
  }
  const user = await User.findById(decodedToken.id)

  const blogToBeDeleted = await Blog.findById(request.params.id)
  if (blogToBeDeleted.user.toString() === user.id) {
    await Blog.deleteOne({ _id: blogToBeDeleted._id })
    return response.status(204).end()
  }
  return response.status(401).end()
})

blogsRouter.put('/:id', async (request, response) => {
  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, request.body, { new: true })
  response.json(updatedBlog)
})

module.exports = blogsRouter
