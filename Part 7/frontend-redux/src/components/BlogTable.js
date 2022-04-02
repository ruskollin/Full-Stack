/* eslint-disable react/jsx-key */
/* eslint-disable react/react-in-jsx-scope */
import { Link } from 'react-router-dom'
import Table from 'react-bootstrap/Table'
import '../index.css'

const BlogTable = ({ blogs }) => {
  return (
    <div style={{ width: 1000 }}>
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>Title</th>
            <th>Author</th>
            <th>Likes</th>
          </tr>
        </thead>
        <tbody>
          {blogs
            .sort((a, b) => b.likes - a.likes)
            .map(blog =>
              <tr>
                <td><Link to={{ pathname: `/blogs/${blog.id}` }} >{blog.title}</Link></td>
                <td>{blog.author}</td>
                <td>{blog.likes}</td>
              </tr>
            )}
        </tbody>
      </Table>
    </div>
  )
}

export default BlogTable
