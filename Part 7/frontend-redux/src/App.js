import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Routes, Route, useMatch } from 'react-router-dom'
import './index.css'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import AddBlog from './components/AddBlog'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import Togglable from './components/Togglable'
import UserTable from './components/UserTable'
import User from './components/User'
import BlogTable from './components/BlogTable'

import { LinkContainer } from 'react-router-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import Container from 'react-bootstrap/Container'

import { initializeBlogs, addBlog, handleLikes, deleteBlog } from './reducers/blogReducer'
import { setNotification } from './reducers/notificationReducer'
import { setLoggedUser, setUser } from './reducers/loggedUserReducer'
import { initializeUsers } from './reducers/userReducer'

const App = () => {
  const dispatch = useDispatch()
  const blogs = useSelector(state => state.blogs)
  const users = useSelector(state => state.users)
  const currentUser = useSelector(state => state.loggedUser)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  useEffect(() => {
    dispatch(initializeBlogs())
    dispatch(setLoggedUser())
    dispatch(initializeUsers())
  }, [dispatch])

  const handleLogin = async (event) => {
    event.preventDefault()
    // cats = cats, root = salainen
    try {
      const user = await loginService.login({
        username, password
      })
      window.localStorage.setItem(
        'loggedBlogAppUser', JSON.stringify(user)
      )
      console.log('USER WHO JUST LOGGED IN: ', user)
      blogService.setToken(user.token)
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

  const userMatch = useMatch('/users/:id')
  const user = userMatch
    ? users.find(user => user.id === userMatch.params.id)
    : null

  const blogMatch = useMatch('/blogs/:id')
  const blog = blogMatch
    ? blogs.find(blog => blog.id === blogMatch.params.id)
    : null

  const blogForm = () => (
    <div>
      <div>
        <h2>BLOGS</h2>
      </div>
      <p>{currentUser.name} is logged-in</p>
      <button onClick={handleLogout} style={{ backgroundColor: 'red', color: 'white', marginBottom: 50 }}>LOGOUT</button>
      <Notification />
      <br />
      <Togglable buttonLabel="Create New Blog">
        <AddBlog createBlog={handleAddBlog} />
      </Togglable>
      <br />
      <div id='blogs' style={{ display: 'flex', flexWrap: 'wrap' }}>
        <BlogTable blogs={blogs} />
        {/* {blogs
          .sort((first, second) => second.likes - first.likes)
          .map(blog =>
            <Blog
              key={blog.id}
              blog={blog}
              user={user}
              handleLikes={() => {
                dispatch(handleLikes(blog))
                dispatch(setNotification(`${blog.title} +1 LIKE.`, 5))
              }}
              deleteBlog={() => {
                if (window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)) {
                  dispatch(deleteBlog(blog.id))
                  dispatch(setNotification(`${blog.title} has been removed.`, 5))
                }
              }}
            />
          )} */}
      </div>
    </div>
  )

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogAppUser')
    dispatch(setUser(null))
  }

  const userList = () => (
    <div>
      <div>
        <h2>USERS</h2>
        <UserTable users={users} />
      </div>
    </div>
  )

  return (
    <div>
      {!currentUser ?
        loginForm() :
        <div>
          <Navbar bg="dark" variant="dark">
            <Container>
              <Nav className="me-auto">
                <LinkContainer to='/'>
                  <Nav.Link>Home</Nav.Link>
                </LinkContainer>
                <LinkContainer to='/users'>
                  <Nav.Link>Users</Nav.Link>
                </LinkContainer>
              </Nav>
            </Container>
          </Navbar>
          <Routes>
            <Route path='/' element={ blogForm() } />
            <Route path='/users' element= { userList() } />
            <Route path='/users/:id' element={ <User user={user} /> } />
            <Route path='/blogs/:id' element={
              <Blog
                blog={blog}
                currentUser={currentUser.username}
                handleLikes={() => {
                  dispatch(handleLikes(blog))
                  dispatch(setNotification(`${blog.title} +1 LIKE.`, 5))
                }}
                deleteBlog={() => {
                  if (window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)) {
                    dispatch(deleteBlog(blog.id))
                    dispatch(setNotification(`${blog.title} has been removed.`, 5))
                  }
                }} />
            } />
          </Routes>
        </div>
      }
    </div>
  )
}

export default App