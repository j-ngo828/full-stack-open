const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
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

const getUserToken = async (userId) => {
  const user = await User.findById(userId)
  const userForToken = {
    username: user.username,
    id: user._id,
  }

  return jwt.sign(userForToken, process.env.SECRET)
}

const intializesUsers = async () => {
  await User.deleteMany({})
  const hashUserPasswords = initialUsers.map((user) => bcrypt.hash(user.password, 10))
  const results = await Promise.all(hashUserPasswords)

  await User.insertMany(
    initialUsers.map((user, index) => {
      const userWithHashPassword = {
        ...user,
        passwordHash: results[index],
      }
      delete userWithHashPassword.password
      return userWithHashPassword
    })
  )
}

const initializesNotes = async () => {
  const allUsers = await User.find({})
  await Blog.deleteMany({})
  const allBlogs = await Blog.insertMany(
    initialBlogs.map((blog, index) => ({ ...blog, user: allUsers[index].id }))
  )
  const userUpdates = allUsers.map((user, index) => {
    // eslint-disable-next-line no-param-reassign
    user.blogs = [...user.blogs, allBlogs[index].id]
    return user.save()
  })
  await Promise.all(userUpdates)
}

const initializesDb = async () => {
  await intializesUsers()
  await initializesNotes()
}

module.exports = {
  initialBlogs,
  blogsInDb,
  createBlog,
  initialUsers,
  usersInDb,
  getUserToken,
  initializesDb,
}
