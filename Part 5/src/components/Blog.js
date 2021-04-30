import React from 'react'
import '../index.css'

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

const Blog = ({blog}) => (
  <div style={containerStyle}>
  <div style={blogStyle}>
    <h3>---{blog.title}---</h3>
    <p> {blog.author}  </p>
  </div>  
  </div>
)

export default Blog