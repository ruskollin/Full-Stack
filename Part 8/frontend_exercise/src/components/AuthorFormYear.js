import { useState } from 'react'
import { useMutation } from '@apollo/client'
import Select from 'react-select'

import { ALL_AUTHORS, EDIT_AUTHOR } from '../queries'

const AuthorFormYear = (props) => {
  const [name, setName] = useState('')
  const [born, setBorn] = useState('')
  const [value, setValue] = useState('default')

  const [editAuthor] = useMutation(EDIT_AUTHOR, {
    refetchQueries: [{ query: ALL_AUTHORS }],
    onError: (error) => {
      console.log(error.graphQLErrors[0].message)
      props.setError(error.graphQLErrors[0].message)
    },
  })

  const submit = async (event) => {
    event.preventDefault()

    console.log('NAME: ', name)
    console.log('BORN: ', born)
    editAuthor({ variables: { name, born } })

    setName('')
    setBorn('')
  }

  return (
    <div>
      <form onSubmit={submit}>
        <h3>EDIT AUTHOR:</h3>
        {/* <div>
          Name of Author
          <input
            value={name}
            onChange={({ target }) => setName(target.value)}
          />
        </div> */}
        <label>Name:</label>
        <select defaultValue={value} onChange={({ target }) => setName(target.value)}>
        <option value="default" disabled hidden>
          Choose
        </option>
            {props.authors &&
              props.authors.map((name, index) => (
                <option key={index} value={name}>
                  {name}
                </option>
              ))}
          </select>
        <div>
          Year of Birth:
          <input
            type="number"
            value={born}
            onChange={({ target }) => setBorn(parseInt(target.value))}
          />
        </div>
        <button type="submit">update author</button>
      </form>
    </div>
  )
}

export default AuthorFormYear
