import React from 'react'
import { Link } from 'react-router-dom'

const UserTable = ({ users }) => {
  console.log(users)
  return (
    <div>
      <table>
        <tr>
          <th></th>
          <th>blogs created</th>
        </tr>
        {users.map(user =>
          <tr key={user.id}>
            <td><Link to={{ pathname: `/users/${user.id}` }} >{user.name}</Link></td>
            <td>{user.blogs.length}</td>
          </tr>
        )}
      </table>
    </div>
  )
}

export default UserTable