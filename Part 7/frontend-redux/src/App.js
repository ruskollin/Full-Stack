import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Routes, Route, useMatch, useNavigate } from 'react-router-dom'
import './index.css'
import Blog from './components/Blog'
import loginService from './services/login'
import AddBlog from './components/AddBlog'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import Togglable from './components/Togglable'
import UserTable from './components/UserTable'
import User from './components/User'
import BlogTable from './components/BlogTable'
import Burger from './components/Burger'
import MenuBar from './components/MenuBar'

import Button from 'react-bootstrap/Button'
import 'bootstrap/dist/css/bootstrap.min.css'

import { initializeBlogs, addBlog, handleLikes, deleteBlog } from './reducers/blogReducer'
import { setNotification } from './reducers/notificationReducer'
import { setLoggedUser, setUser } from './reducers/loggedUserReducer'
import { initializeUsers } from './reducers/userReducer'
import bulbImage from './images/img3.jpg'

const App = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const blogs = useSelector(state => state.blogs)
  const users = useSelector(state => state.users)
  const currentUser = useSelector(state => state.loggedUser)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [open, setOpen] = useState(false)

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
        'loggedUser', JSON.stringify(user)
      )
      dispatch(setUser(user))
      setUsername('')
      setPassword('')
    } catch (exception) {
      dispatch(setNotification('Wrong username and password', 10))
    }
  }

  const loginForm = () => (
    <div className='loginBg'>
      <div className='imgBulb' ><img alt='nature in my mind' src={bulbImage} style={{ width: 200 }}/></div>
      <Togglable buttonLabel="log in">
        <LoginForm
          username={username}
          password={password}
          handleUsernameChange={({ target }) => setUsername(target.value)}
          handlePasswordChange={({ target }) => setPassword(target.value)}
          handleSubmit={handleLogin}
        />
      </Togglable>
    </div>
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
    <div style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', position: 'relative' }}>
      <div>
        <Notification />
        <br />
        <Togglable buttonLabel="Create New Blog">
          <AddBlog createBlog={handleAddBlog} />
        </Togglable>
        <br />
        <div id='blogs' style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
          <BlogTable blogs={blogs} />
        </div>
      </div>
    </div>
  )

  const handleLogout = () => {
    window.localStorage.removeItem('loggedUser')
    dispatch(setUser(null))
  }

  const userList = () => (
    <div style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column' }}>
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
        <UserTable users={users} />
      </div>
    </div>
  )

  return (
    <div>
      {!currentUser ?
        loginForm() :
        <div>
          <div className='headerName'>
            <div style={{  width: '99%', display: 'flex', flexDirection: 'row', justifyContent: 'flex-end' }}>
              <p style={{ margin: 'auto', fontWeight: 600, textAlign: 'center', marginRight: 20 }}>Hi {currentUser.name}!</p>
              <Button onClick={handleLogout} variant="secondary" style={{ height: '31px', display: 'flex', alignItems: 'center', marginTop: 6 }}>LOGOUT</Button>
            </div>
          </div>
          <div>
            <Burger open={open} setOpen={setOpen} />
            <MenuBar open={open} setOpen={setOpen} />
          </div>

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
                    navigate('/')
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