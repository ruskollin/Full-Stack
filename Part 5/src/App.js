import React, { useState, useEffect } from 'react'
import './index.css'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import AddBlog from './components/AddBlog'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import Togglable from './components/Togglable'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [newTitle, setNewTitle] = useState('')
  const [newAuthor, setNewAuthor] = useState('')
  const [newURL, setNewURL] = useState('')
  const [showAll, setShowAll] = useState(true)
  const [errorMessage, setErrorMessage] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [notif, setNotif] = useState('*** message for you ***')
  const [loginVisible, setLoginVisible] = useState(false)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    console.log(password)
    try {
      const user = await loginService.login({
        username, password
      })
      window.localStorage.setItem(
        'loggedBlogAppUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setNotif(
        `wrong username or password`
      )
      setTimeout(() => {
        setNotif(null)
      }, 5000)
    }
  }

  const loginForm = () => (
    <Togglable buttonLabel="log in">
       <Notification notif={notif} />
      <LoginForm
        username={username}
        password={password}
        handleUsernameChange={({ target }) => setUsername(target.value)}
        handlePasswordChange={({ target }) => setPassword(target.value)}
        handleSubmit={handleLogin}
      />
    </Togglable>
  )

  const blogForm = () => (
    <div>
      <button onClick={handleLogout} style={{ backgroundColor: 'red', color: 'white' }}>LOGOUT</button>
      <div>
        <h2>BLOGS</h2>
      </div>
      <Notification notif={notif} />
      <br />
      <Togglable buttonLabel="new blog">
        <AddBlog
          addBlog={handleAdd}
          newTitle={newTitle}
          handleTitleChange={handleTitleChange}
          newAuthor={newAuthor}
          handleAuthorChange={handleAuthorChange}
          newURL={newURL}
          handleURLChange={handleURLChange} />
      </Togglable>
      <br />
      <div>
        {blogs.map(blog =>
          <Blog
            key={blog.id}
            blog={blog}
            user={user}
          />
        )}
      </div>
    </div>
  )

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogAppUser')
    setUser(null)
  }

  const handleTitleChange = (event) => setNewTitle(event.target.value)
  const handleAuthorChange = (event) => setNewAuthor(event.target.value)
  const handleURLChange = (event) => setNewURL(event.target.value)

  const handleAdd = async (event) => {
    event.preventDefault()
    const newObject = {
      title: newTitle,
      author: newAuthor,
      url: newURL
    }

    blogService
      .create(newObject)
      .then(response => {
        console.log(response)
        setBlogs(blogs.concat(newObject))
        setNewTitle('')
        setNewAuthor('')
        setNewURL('')
        setNotif(
          `new blog '${newTitle}' has been added!'`
        )
        setTimeout(() => {
          setNotif(null)
        }, 5000)
      })
      .catch((error) => {
        console.log(error.response.data.error)
      })
  }

  return (
    <div>
      {user === null ?
        loginForm() :
        <div>
          <p>{user.name} is logged-in</p>
          {blogForm()}

        </div>
      }
    </div>
  )
}

export default App