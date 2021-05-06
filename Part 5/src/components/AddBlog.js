import React from 'react'
import '../index.css'

const AddBlog = ({ onSubmit, handleTitleChange, handleAuthorChange, handleURLChange, newTitle, newURL, newAuthor}) => {
    return (
        <form onSubmit={onSubmit} className='formContainer'>
          <div className='formBody'>
            Title: {' '} 
            <input
              value={newTitle}
              onChange={handleTitleChange} />
          </div>
          <div className='formBody'>
            Author: {' '}
            <input
              value={newAuthor}
              onChange={handleAuthorChange} />
          </div>
          <div className='formBody'>
            url: {' '}
            <input
              value={newURL}
              onChange={handleURLChange} />
          </div>

        <div>
          <button style={{ marginLeft: 150, marginBottom: 5, marginTop: 10, backgroundColor: 'green', color: 'white' }} type="submit"> 
            ADD 
          </button>
        </div>
      </form>
    )
}

export default AddBlog