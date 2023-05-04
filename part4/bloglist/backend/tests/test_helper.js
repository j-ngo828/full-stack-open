const Blog = require('../models/blog')
const User = require('../models/user')

const initialBlogs = [
  {
    title: 'Go To Statement Considered Harmful',
    author: `Edsger W. Dijkstra`,
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
  },
  {
    title: 'Speeding up drug discovery with diffusion generative models',
    author: `Alex Ouyang`,
    url: 'https://news.mit.edu/2023/speeding-drug-discovery-with-diffusion-generative-models-diffdock-0331',
    likes: 5,
  },
]

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map((blog) => blog.toJSON())
}

const getDefaultBlogData = () => ({
  title: 'Test Title',
  author: `Test Author`,
  url: 'https://google.com',
  likes: 5,
})

const createBlog = async (payload) => {
  const data = {
    ...getDefaultBlogData(),
    ...payload,
  }
  const newBlog = new Blog(data)
  const savedBlog = await newBlog.save()
  return savedBlog
}

const initialUsers = [
  {
    username: 'hellas',
    name: 'Arto Hellas',
    password: 'hola342',
  },
  {
    username: 'mlukkai',
    name: 'Matti Lukkainen',
    password: 'salainen',
  },
]

const usersInDb = async () => {
  const users = await User.find({})
  return users.map((user) => user.toJSON())
}

module.exports = {
  initialBlogs,
  blogsInDb,
  createBlog,
  initialUsers,
  usersInDb,
}
