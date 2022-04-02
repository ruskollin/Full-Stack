import React, { useState } from 'react'
import Button from 'react-bootstrap/Button'
import 'bootstrap/dist/css/bootstrap.min.css'

const Comment = ({ handleComment, blogId }) => {
  const [comment, setComment] = useState('')

  const handleCommentChange = (event) => {
    setComment(event.target.value)
  }

  const addComment = (event) => {
    event.preventDefault()
    handleComment(blogId, comment)
    setComment('')
  }

  return (
    <div style={{ display: 'flex' }}>
      <form onSubmit={addComment}>
        <input value={comment} onChange={handleCommentChange} style={{ height: '40px !important' }}/>
        <Button variant='success' type='submit' style={{ marginTop: '-5px', marginLeft: '20px' }}> Add </Button>
      </form>
    </div>
  )
}

export default Comment