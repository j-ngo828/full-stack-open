const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async (request, response) => {
  const { user } = request
  const allBlogs = await Blog.find({ user: user.id }).populate('user', {
    username: 1,
    name: 1,
  })
  response.json(allBlogs)
})

blogsRouter.get('/:id', async (request, response) => {
  const { user } = request
  const oneBlog = await Blog.findById(request.params.id)
  if (oneBlog && oneBlog.user.toString() === user.id) {
    response.json(oneBlog)
  } else if (!oneBlog) {
    response.status(404).end()
  } else {
    response.status(401).end()
  }
})

blogsRouter.post('/', async (request, response) => {
  const { user } = request
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
  const { user } = request

  const blogToBeDeleted = await Blog.findById(request.params.id)
  if (blogToBeDeleted && blogToBeDeleted.user.toString() === user.id) {
    await Blog.deleteOne({ _id: blogToBeDeleted._id })
    response.status(204).end()
  } else if (!blogToBeDeleted) {
    response.status(404).end()
  } else {
    response.status(401).end()
  }
})

blogsRouter.put('/:id', async (request, response) => {
  const { user } = request
  const blogToBeUpdated = await Blog.findById(request.params.id)
  if (blogToBeUpdated && blogToBeUpdated.user.toString() === user.id) {
    const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, request.body, { new: true })
    response.json(updatedBlog)
  } else if (!blogToBeUpdated) {
    response.status(404).end()
  } else {
    response.status(401).end()
  }
})

module.exports = blogsRouter
