/* eslint-disable react/react-in-jsx-scope */
import { Link } from 'react-router-dom'

const BlogTable = ({ blogs }) => {
  console.log(blogs)
  return (
    <div>
      <table>
        <tr>
          <th>Title</th>
          <th>Author</th>
          <th>Likes</th>
        </tr>
        {blogs
          .sort((a, b) => b.likes - a.likes)
          .map(blog =>
            <tr key={blog.id}>
              <td><Link to={{ pathname: `/blogs/${blog.id}` }} >{blog.title}</Link></td>
              <td>{blog.author}</td>
              <td>{blog.likes}</td>
            </tr>
          )}
      </table>
    </div>
  )
}

export default BlogTable
