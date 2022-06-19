import { useState } from 'react'
import { gql, useQuery } from '@apollo/client'
import AuthorFormYear from './AuthorFormYear'

const Authors = (props) => {
  if (!props.show) {
    return null
  }

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {props.authors.map((a) => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <AuthorFormYear setError={props.setError} authors={props.authors.map((item) => item.name)}/>
    </div>
  )
}

export default Authors
