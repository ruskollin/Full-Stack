import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'

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

  const blogView = component.container.querySelector('.blog-default')
  expect(blogView).toHaveTextContent('React')
  expect(blogView).toHaveTextContent('University Of Helsinki')

})

test('clicking the button displays likes and url', () => {
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
})