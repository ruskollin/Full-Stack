import React from 'react'

const User = ({ user }) => {
  if(!user) return null

  return (
    <div>
      <h2>BLOGS by: {user.name}</h2>
      <div>
        {user.blogs.map(blog =>
          <p key={blog.id}>{blog.title}</p>
        )}
      </div>
    </div>
  )
}

export default User