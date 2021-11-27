import React, { useState } from 'react'
import '../index.css'

const AddBlog = ({ createBlog }) => {
  const [newTitle, setNewTitle] = useState('')
  const [newAuthor, setNewAuthor] = useState('')
  const [newURL, setNewURL] = useState('')

  const handleTitleChange = (event) => setNewTitle(event.target.value)
  const handleAuthorChange = (event) => setNewAuthor(event.target.value)
  const handleURLChange = (event) => setNewURL(event.target.value)

  const addBlog= (event) => {
    event.preventDefault()
    createBlog({
      likes: 0,
      title: newTitle,
      author: newAuthor,
      url: newURL
    })

    setNewTitle('')
    setNewAuthor('')
    setNewURL('')
  }

  return (
    <form onSubmit={addBlog} className='formContainer'>
      <div className='formBody'>
        Title:{' '}
        <input
          id='title'
          value={newTitle}
          onChange={handleTitleChange} />
      </div>
      <div className='formBody'>
        Author: {' '}
        <input
          id='author'
          value={newAuthor}
          onChange={handleAuthorChange} />
      </div>
      <div className='formBody'>
        url: {' '}
        <input
          id='url'
          value={newURL}
          onChange={handleURLChange} />
      </div>

      <div>
        <button style={{ marginLeft: 120, marginBottom: 5, marginTop: 10, backgroundColor: 'green', color: 'white' }} type="submit" id='add-button'>
        ADD
        </button>
      </div>
    </form>
  )
}

export default AddBlog