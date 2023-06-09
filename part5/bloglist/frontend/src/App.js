import { useEffect, useState } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'

const getInitialBlogInputs = () => ({
  title: '',
  author: '',
  url: '',
})

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [blogInputs, setBlogInputs] = useState(getInitialBlogInputs())
  const [message, setMessage] = useState('')
  const [hasError, setHasError] = useState(false)

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs))
  }, [])

  useEffect(() => {
    const loggedInUserJSON = window.localStorage.getItem('loggedInUser')
    if (loggedInUserJSON) {
      const userDetails = JSON.parse(loggedInUserJSON)
      setUser(userDetails)
      blogService.setToken(userDetails.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username,
        password,
      })
      window.localStorage.setItem('loggedInUser', JSON.stringify(user))
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setMessage('wrong username or password')
      setHasError(true)
      setTimeout(() => {
        setMessage('')
        setHasError(false)
      }, 5000)
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedInUser')
    blogService.setToken(null)
    setUser(null)
  }

  const handleCreateBlog = async (event) => {
    event.preventDefault()
    console.log(blogInputs)
    try {
      const createdBlog = await blogService.create(blogInputs)
      setBlogs([...blogs, createdBlog])
      setBlogInputs(getInitialBlogInputs())
      setMessage(`a new blog ${createdBlog.title} by ${createdBlog.author} added`)
      setTimeout(() => {
        setMessage('')
      }, 5000)
    } catch (exception) {
      console.error(exception)
      setMessage(exception.response.data.error)
      setHasError(true)
      setTimeout(() => {
        setMessage('')
        setHasError(false)
      }, 5000)
    }
  }

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
        username
        <input
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
        <input
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit">login</button>
    </form>
  )

  const blogForm = () => {
    return (
      <form onSubmit={handleCreateBlog}>
        <h2>create new</h2>
        <div>
          title
          <input
            type="text"
            value={blogInputs.title}
            name="Title"
            onChange={({ target }) => setBlogInputs({ ...blogInputs, title: target.value })}
          />
        </div>
        <div>
          author
          <input
            type="text"
            value={blogInputs.author}
            name="Author"
            onChange={({ target }) => setBlogInputs({ ...blogInputs, author: target.value })}
          />
        </div>
        <div>
          url
          <input
            type="text"
            value={blogInputs.url}
            name="Url"
            onChange={({ target }) => setBlogInputs({ ...blogInputs, url: target.value })}
          />
        </div>
        <button type="submit">create</button>
      </form>
    )
  }

  const renderBlogs = () =>
    blogs.map((blog) => (
      <Blog
        key={blog.id}
        blog={blog}
      />
    ))

  const logOutButton = () => {
    return (
      <button
        type="button"
        onClick={handleLogout}
      >
        logout
      </button>
    )
  }

  return (
    <div>
      <h2>{user ? 'blogs' : 'log in to application'}</h2>
      <Notification
        message={message}
        isError={hasError}
      />
      {user && (
        <p>
          {user.name} logged in {logOutButton()}
        </p>
      )}
      {user ? (
        <>
          {blogForm()}
          <div>{renderBlogs()}</div>
        </>
      ) : (
        loginForm()
      )}
    </div>
  )
}

export default App
