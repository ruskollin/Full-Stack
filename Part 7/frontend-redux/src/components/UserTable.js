import React from 'react'
import { Link } from 'react-router-dom'
import Table from 'react-bootstrap/Table'
import '../index.css'

const UserTable = ({ users }) => {
  return (
    <div style={{ width: 1000, marginTop: 100 }}>
      <Table striped bordered hover>
        <tr>
          <th>User</th>
          <th>Number of Blogs</th>
        </tr>
        <tbody>
          {users.map(user =>
            <tr key={user.id}>
              <td><Link to={{ pathname: `/users/${user.id}` }} >{user.name}</Link></td>
              <td>{user.blogs.length}</td>
            </tr>
          )}
        </tbody>
      </Table>
    </div>
  )
}

export default UserTable