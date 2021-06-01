import React, { useState } from 'react'

const containerStyle = {
  display: 'flex',
  flexWrap: 'wrap',
}

const blogStyle = {
  width: 300,
  marginBottom: 20,
  borderWidth: 2,
  borderStyle: 'solid',
  textAlign: 'center',
  marginLeft: 20,
  backgroundColor: '#ACE7FF',
}

const buttonStyle = {
  color: 'white',
  backgroundColor: 'green',
  marginBottom: 10,
  width: 60
}

const deleteButton = {
  color: 'white',
  backgroundColor: 'red',
  marginBottom: 10,
  display: 'grid',
  textAlign: 'center',
  marginLeft: 110,
  marginTop: 20,
  width: 80
}

const Blog = ({ blog, handleLikes, handleDelete }) => {
  const [visible, setVisible] = useState(false)

  const displayBlogForm = () => {
    return (
      <div style={{ wordWrap: 'break-word' }}>
        <p>URL:</p> <a href={blog.url}>{blog.url}</a>
        <p>
          likes: {blog.likes} &nbsp;
          <button onClick={() => handleLikes(blog.id)}>like</button>
          <button style={deleteButton} onClick={() => handleDelete(blog.id, blog.title, blog.author)}>remove</button>
        </p>
      </div>
    )
  }

  return (
    <div style={containerStyle}>
      <div style={blogStyle}>
        <h2>{blog.title}</h2>
        <p>{blog.author}</p>
        {visible && displayBlogForm()}
        <button onClick={() => setVisible(!visible)} style={buttonStyle}>
          {visible ? 'hide' : 'view'}
        </button>
      </div>
    </div>
  )
}

export default Blog