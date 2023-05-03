const Blog = require('../models/blog')

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

module.exports = {
  initialBlogs,
  blogsInDb,
  createBlog,
}
