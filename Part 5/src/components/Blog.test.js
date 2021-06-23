import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'
import AddBlog from './AddBlog'

test('renders content', () => {
  const blog = {
    title: 'Deciphering the Strange Mathematics of Cicadas',
    author: 'John Matson',
    likes: 1,
    url: 'https://blogs.scientificamerican.com/observations/deciphering-the-strange-mathematics-of-cicadas-video/',
    user: {
      name: 'root'
    }
  }

  const component = render(
    <Blog blog={blog} />
  )

  expect(component.container).toHaveTextContent('Deciphering the Strange Mathematics of Cicadas')
  expect(component.container).toHaveTextContent('John Matson')
  expect(component.container).not.toHaveTextContent(blog.url)
  expect(component.container).not.toHaveTextContent(blog.likes)
})

test('clicking button shows url and number of likes', () => {
  const blog = {
    title: 'Deciphering the Strange Mathematics of Cicadas',
    author: 'John Matson',
    likes: 1,
    url: 'https://blogs.scientificamerican.com/observations/deciphering-the-strange-mathematics-of-cicadas-video/',
    user: {
      name: 'root'
    }
  }

  const component = render(
    <Blog blog={blog} />
  )

  const button = component.getByText('view')
  fireEvent.click(button)

  expect(component.container).toHaveTextContent('https://blogs.scientificamerican.com/observations/deciphering-the-strange-mathematics-of-cicadas-video/')
  expect(component.container).toHaveTextContent(blog.likes)
})

test('if like button is clicked twice, event handler is called twice', async () => {
  const blog = {
    title: 'Deciphering the Strange Mathematics of Cicadas',
    author: 'John Matson',
    likes: 1,
    url: 'https://blogs.scientificamerican.com/observations/deciphering-the-strange-mathematics-of-cicadas-video/',
    user: {
      name: 'root'
    }
  }

  const mockHandler = jest.fn()

  const component = render(
    <Blog blog={blog} handleLikes={mockHandler}/>
  )

  const viewButton = component.getByText('view')
  fireEvent.click(viewButton)
  const likeButton = component.getByText('like')
  fireEvent.click(likeButton)
  fireEvent.click(likeButton)

  expect(mockHandler.mock.calls).toHaveLength(2)
})

test('form calls the event handler it received as props with the right details when a new blog is created', async () => {
  const blog = {
    title: 'Deciphering the Strange Mathematics of Cicadas',
    author: 'John Matson',
    likes: 1,
    url: 'https://blogs.scientificamerican.com/observations/deciphering-the-strange-mathematics-of-cicadas-video/',
    user: {
      name: 'root'
    }
  }

  const mockHandler = jest.fn()

  const component = render(
    <AddBlog blog={blog} handleAdd={mockHandler}/>
  )
  const title = component.container.querySelector('#title')
  const author = component.container.querySelector('#author')
  const url = component.container.querySelector('#url')

  fireEvent.change(title, {
    target: { value: blog.title },
  })

  fireEvent.change(author, {
    target: { value: blog.author },
  })

  fireEvent.change(url, {
    target: { value: blog.url },
  })
})
