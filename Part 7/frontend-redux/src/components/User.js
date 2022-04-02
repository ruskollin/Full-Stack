import React from 'react'
import { Carousel } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'

const User = ({ user }) => {
  if(!user) return null

  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', flexDirection: 'column', alignContent: 'center' }}>
      <div style={{ position: 'relative' }}>
        <h2>BLOGS by: <em>{user.name}</em></h2>
        <Carousel className='userBg'>
          {user.blogs.map(blog =>
            <Carousel.Item key={blog.id} className='userBg'>
              <div className='caption'><p style={{ width: '90%' }}>{blog.title}</p></div>
            </Carousel.Item>
          )}
        </Carousel>
      </div>
    </div>
  )
}

export default User