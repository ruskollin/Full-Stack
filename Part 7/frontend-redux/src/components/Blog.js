import React, { useState } from 'react'
import Comment from './Comment'
import { useDispatch } from 'react-redux'
import { addComment } from '../reducers/blogReducer'
import '../index.css'
import Button from 'react-bootstrap/Button'
import 'bootstrap/dist/css/bootstrap.min.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart, faFrog } from '@fortawesome/free-solid-svg-icons'

const containerStyle = {
  display: 'flex',
  flexWrap: 'wrap',
  flexDirection: 'column',
  alignContent: 'center',
}

const blogStyle = {
  width: 500,
  height: 600,
  marginBottom: 20,
  borderWidth: 2,
  borderStyle: 'solid',
  textAlign: 'center',
  backgroundColor: '#ACE7FF',
}

const buttonStyle = {
  marginBottom: 10,
  width: 60,
  marginRight: 20,
}

const Blog = ({ blog, handleLikes, deleteBlog }) => {
  const [visible, setVisible] = useState(false)
  const dispatch = useDispatch()
  const handleComment = (id, comment) => {
    dispatch(addComment(id, comment))
  }

  if(!blog) {
    return null
  }

  const displayBlogForm = () => {
    return (
      <div style={{ wordWrap: 'break-word', marginRight: 20 }}>
        <a href={blog.url}>{blog.url}</a>
        <p id='likes' style={{ marginTop: 10, fontsize: '30px', fontWeight: '500', color: '#3a00e2' }}>
          {blog.likes}
          <Button variant='primary' onClick={handleLikes} id='like-button' className='likeStyle'><FontAwesomeIcon title='Add a like?' icon={faHeart} style={{ color: 'red', width: 30, height: 30 }}/></Button>
        </p>
        <Button variant="danger" onClick={deleteBlog} style={{ marginBottom: 10 }}>delete</Button>
      </div>
    )
  }

  return (
    <div style={containerStyle}>
      <div id='blog' style={blogStyle} className='cardBg'>
        <div className='cardBlog'>
          <div style={{ display: 'flex', justifyContent: 'end' }}><div style={{ width: '90%' }}><h2 style={{ marginRight: 20 }}>{blog.title}</h2></div></div>
          <p style={{ marginRight: 20 }}>{blog.author}</p>
          {visible && displayBlogForm()}
          <Button variant="info" className='like' onClick={() => setVisible(!visible)} style={buttonStyle} id='view-button'>
            {visible ? 'hide' : 'view'}
          </Button>
        </div>
      </div>
      <div>
        <h3>Comments</h3>
        <div style={{ padding: 20 }}>
          {blog.comments.map(comment => (
            <p key={blog.comment}> <FontAwesomeIcon title='kokak kokak' icon={faFrog} style={{ color: 'green', width: 30, height: 30, marginRight: 10 }}/>{comment}</p>
          ))}
          <Comment handleComment={handleComment} blogId={blog.id} />
        </div>
      </div>
    </div>
  )
}

export default Blog