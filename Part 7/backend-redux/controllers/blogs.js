const jwt = require('jsonwebtoken')
const Blog = require('../models/blog')
const User = require('../models/user')
const blogsRouter = require('express').Router()
const config = require('../utils/config')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
  response.json(blogs.map((blog) => blog.toJSON()))
})

blogsRouter.get('/:id', (request, response, next) => {
  Blog.findById(request.params.id)
    .then(blog => {
      if (blog) {
        response.json(blog)
      } else {
        response.status(404).end()
      }
    })
    .catch(error => next(error))
})

const getTokenFrom = request => {
  const authorization = request.get('authorization')
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    return authorization.substring(7)
  }
  return null
}

blogsRouter.post('/', async (request, response, next) => {
  const body = request.body
  const token = getTokenFrom(request)
  const decodedToken = jwt.verify(token, config.SECRET)

  try {
    if (!token || !decodedToken.id) {
      return response.status(401).json({ error: 'token missing or invalid' })
    }
    const user = await User.findById(decodedToken.id)

      const blog = new Blog({
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes,
        user: user._id,
      });

      const savedBlog = await blog.save()
      user.blogs = user.blogs.concat(savedBlog._id)
      await user.save()
      response.json(savedBlog.toJSON())
  } catch (err) {
    next(err)
  }
})

// blogsRouter.delete('/:id', async (request, response, next) => {
//   try {
//     const blog = await Blog.findById(request.params.id)
//     const user = request.user

//     if (blog.user.toString() !== user.id.toString) {
//       return response.status(403).json({ error: 'Cannot delete other blogs' })
//     }
//     await blog.remove()
//     response.status(204).end()
//   } catch (error) {
//     error => next(error)
//   }
// })

blogsRouter.delete('/:id', async (req, res) => {
  const token = req.token
  const decodedToken = jwt.verify(req.token, config.SECRET)

  try {
    if (!token || !decodedToken.id) {
      return response.status(401).json({ error: 'token missing or invalid' })
    }
    const user = await User.findById(decodedToken.id)

      const blog = await Blog.findById(req.params.id)
      if (blog.user.toString() === decodedToken.id) {
          await Blog.findByIdAndRemove(req.params.id)
          console.log('deleted')
          res.status(204).end()
      } else {
          return res.status(403).json({ error: 'invalid delete operation' })
      }
  } catch (err) {
    next(err)
  }
})


blogsRouter.put('/:id', async (request, response, next) => {
  const body = request.body

  const blog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
  }

  Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
    .then(updatedBlog => {
      response.json(updatedBlog)
    })
    .catch(error => next(error))
})

blogsRouter.post('/:id/comments', async (request, response) => {
  const body = request.body
  const id = request.params.id
  const token = getTokenFrom(request)
  const decodedToken = jwt.verify(token, config.SECRET)

  if (!token || !decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }

  const updatedBlog = await Blog.findById(id)
  console.log(updatedBlog)
  updatedBlog.comments = updatedBlog.comments.concat(body.comment)

  await updatedBlog.save()
  response.status(200).json(updatedBlog.toJSON())
})

module.exports = blogsRouter