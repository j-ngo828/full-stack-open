const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async (request, response) => {
  const allBlogs = await Blog.find({})
  response.json(allBlogs)
})

blogsRouter.get('/:id', async (request, response) => {
  const oneBlog = await Blog.findById(request.params.id)
  response.json(oneBlog)
})

blogsRouter.post('/', async (request, response) => {
  const blog = new Blog(request.body)

  const savedBlog = await blog.save()
  response.status(201).json(savedBlog)
})

module.exports = blogsRouter
