import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import './index.css'
import Blog from './components/Blog'
import loginService from './services/login'
import AddBlog from './components/AddBlog'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import Togglable from './components/Togglable'

import { initializeBlogs, addBlog } from './reducers/blogReducer'
import { setNotification } from './reducers/notificationReducer'
import { setLoggedUser } from './reducers/loggedUserReducer'

const App = () => {
  const dispatch = useDispatch()
  const blogs = useSelector(state => state.blogs)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  useEffect(() => {
    dispatch(initializeBlogs())
    dispatch(setLoggedUser())
  }, [dispatch])

  const handleLogin = async (event) => {
    event.preventDefault()
    console.log(password)
    // cats = cats, root = salainen
    try {
      const user = await loginService.login({
        username, password
      })
      window.localStorage.setItem(
        'loggedBlogAppUser', JSON.stringify(user)
      )
      dispatch(setUser(user))
      setUsername('')
      setPassword('')
    } catch (exception) {
      dispatch(setNotification('Wrong username and password', 10))
    }
  }

  const loginForm = () => (
    <Togglable buttonLabel="log in">
      <LoginForm
        username={username}
        password={password}
        handleUsernameChange={({ target }) => setUsername(target.value)}
        handlePasswordChange={({ target }) => setPassword(target.value)}
        handleSubmit={handleLogin}
      />
    </Togglable>
  )

  const handleAddBlog = (blog) => {
    dispatch(addBlog(blog))
    dispatch(setNotification(`New blog '${blog.title}' by ${blog.author} has been added.`, 10))
  }

  const blogForm = () => (
    <div>
      <button onClick={handleLogout} style={{ backgroundColor: 'red', color: 'white' }}>LOGOUT</button>
      <div>
        <h2>BLOGS</h2>
      </div>
      <Notification />
      <br />
      <Togglable buttonLabel="Create New Blog">
        <AddBlog createBlog={handleAddBlog} />
      </Togglable>
      <br />
      <div id='blogs' style={{ display: 'flex', flexWrap: 'wrap' }}>
        {blogs
          .sort((first, second) => second.likes - first.likes)
          .map(blog =>
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
    dispatch(setUser(null))
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