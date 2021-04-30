import React from 'react'
import '../index.css'

const AddBlog = (props) => {
    return (
        <form onSubmit={props.addBlog} className='formContainer'>
          <div className='formBody'>
            Title: {' '} 
            <input
              value={props.newTitle}
              onChange={props.handleTitleChange} />
          </div>
          <div className='formBody'>
            Author: {' '}
            <input
              value={props.newAuthor}
              onChange={props.handleAuthorChange} />
          </div>
          <div className='formBody'>
            url: {' '}
            <input
              value={props.newURL}
              onChange={props.handleURLChange} />
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