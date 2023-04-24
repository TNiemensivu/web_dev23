import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import userEvent from '@testing-library/user-event'
import BlogForm from './BlogForm'

test('<BlogForm /> updates parent state and calls onSubmit', async () => {
  const createBlog = jest.fn()
  const user = userEvent.setup()

  let newBlog = {
    title:"React patterns",
    author:"Michael Chan",
    url:"https://reactpatterns.com/"
    }

  render(<BlogForm createBlog={createBlog} />)

  const title = screen.getByTestId('title');
  const author = screen.getByTestId('author');
  const url = screen.getByTestId('url');
  const add = screen.getByTestId('add');

  await user.type(title, newBlog.title)
  await user.type(author, newBlog.author)
  await user.type(url, newBlog.url)
  await user.click(add)

  expect(createBlog.mock.calls).toHaveLength(1)
  expect(createBlog.mock.calls[0][0].title).toBe(newBlog.title)
  expect(createBlog.mock.calls[0][0].author).toBe(newBlog.author)
  expect(createBlog.mock.calls[0][0].url).toBe(newBlog.url)
})