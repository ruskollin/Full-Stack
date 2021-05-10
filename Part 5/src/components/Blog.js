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

const Blog = ({ blog }) => {
  const [visible, setVisible] = useState(false)

  const showDetails = () => {
    return (
      <div style={{wordWrap: 'break-word'}}>
        <p>url: {blog.url}</p>
        <p>
          likes: {blog.likes}{' '}
          <button>like</button>
        </p>
      </div>
    )
  }

  return (
    <div style={containerStyle}>
    <div style={blogStyle}>
      <h2>{blog.title}</h2>
      <p>{blog.author}</p>
      <br />
      <button onClick={() => setVisible(!visible)} style={buttonStyle}>
        {visible ? 'hide' : 'view'}
      </button>
      {visible && showDetails()}
    </div>
    </div>
  )
}

export default Blog