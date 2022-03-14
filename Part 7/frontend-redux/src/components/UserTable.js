import React from 'react'


const UserTable = ({ users }) => {
  return (
    <div>
      <table>
        <tr>
          <th></th>
          <th>blogs created</th>
        </tr>
        {users.map(user =>
          <tr key={user.id}>
            <td style={{ width: '100px' }}><a href=''>{user.name}</a></td>
            <td>{user.blogs.length}</td>
          </tr>
        )}
      </table>
    </div>
  )
}

export default UserTable