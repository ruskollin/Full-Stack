import blogService from '../services/blogs'

const blogReducer = (state = [], action) => {
  switch (action.type) {
  case 'INITIALIZE_BLOGS':
    return action.data
  case 'ADD_BLOG':
    return state.concat(action.data)
  case 'INCREASE_LIKES': {
    const id = action.data.id
    const updatedBlog = state.find(blog => blog.id === id)
    const newList = {
      ...updatedBlog,
      likes: updatedBlog.likes
    }
    return state.map(blog =>
      blog.id === id ? newList : blog)
  }
  case 'REMOVE_BLOG': {
    const id = action.data
    return state.filter(p => p.id !== id).sort((a, b) => b.likes - a.likes)
  }
  default:
    return state
  }
}

export const initializeBlogs = () => {
  return async dispatch => {
    const blogs = await blogService.getAll()
    dispatch({
      type: 'INITIALIZE_BLOGS',
      data: blogs
    })
  }
}

export const addBlog = (blog) => {
  return async dispatch => {
    const newBlog = await blogService.create(blog)
    dispatch({
      type: 'ADD_BLOG',
      data: newBlog,
    })
  }
}

export const handleLikes = (blog) => {
  const id = blog.id
  const likes = blog.likes += 1
  const newBlog = {
    ...blog,
    likes,
  }

  return async dispatch => {
    const response = await blogService.update(id, newBlog)
    const newList = {
      ...response,
      id: id
    }
    dispatch({
      type: 'INCREASE_LIKES',
      data: newList
    })
  }
}

export const deleteBlog = (id) => {
  console.log(id)
  return async dispatch => {
    await blogService.remove(id)
    dispatch({
      type: 'REMOVE_BLOG',
      data: id
    })
  }
}

export default blogReducer