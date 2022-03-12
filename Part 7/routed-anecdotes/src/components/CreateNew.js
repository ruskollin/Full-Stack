import React from 'react'
import  { useField } from '../hooks'

const CreateNew = (props) => {
  //using useField
  const content = useField('text')
  const author = useField('text')
  const info = useField('text')

  const handleSubmit = (event) => {
    event.preventDefault()
    props.addNew({
      content: content.value,
      author: author.value,
      info: info.value,
      votes: 0
    })
  }
  
  const handleReset = () => {
    content.reset()
    author.reset()
    info.reset()
  }

  return (
    <div className='wrapper'>
      <h2>Create a New Anecdote</h2>
      <form onSubmit={handleSubmit}>

        <div>
          <label>content</label>
          <input
            type={content.type}
            name="content"
            value={content.value}
            onChange={content.onChange} 
          />
        </div>

        <div>
          <label>author</label>
          <input
            type={author.type}
            name="author"
            value={author.value}
            onChange={author.onChange} 
          />
        </div>

        <div style={{marginBottom: '50px'}}>
        <label> url for more info</label>
          <input
            type={info.type}
            name="info"
            value={info.value}
            onChange={info.onChange}
          />
        </div>
        <button className='button-4' type="reset" style={{background: 'lightgray' , marginRight: '50px'}}onClick={handleReset}>reset</button>

        <button className='button-4' type="submit" style={{background: '#b4d455'}}>create</button>
      </form>
    </div>
  )
}

  export default CreateNew

  //   const [content, setContent] = useState('')
  //   const [author, setAuthor] = useState('')
  //   const [info, setInfo] = useState('')
  
  //   const handleSubmit = (e) => {
  //     e.preventDefault()
  //     props.addNew({
  //       content,
  //       author,
  //       info,
  //       votes: 0
  //     })
  //   }
  
  //   return (
  //     <div>
  //       <h2>create a new anecdote</h2>
  //       <form onSubmit={handleSubmit}>
  //         <div>
  //           content
  //           <input name='content' value={content} onChange={(e) => setContent(e.target.value)} />
  //         </div>
  //         <div>
  //           author
  //           <input name='author' value={author} onChange={(e) => setAuthor(e.target.value)} />
  //         </div>
  //         <div>
  //           url for more info
  //           <input name='info' value={info} onChange={(e)=> setInfo(e.target.value)} />
  //         </div>
  //         <button type="submit">create</button>
  //       </form>
  //     </div>
  //   )
  
  // }

