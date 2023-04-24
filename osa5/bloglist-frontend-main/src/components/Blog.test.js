import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen  } from '@testing-library/react'
import userEvent from "@testing-library/user-event"
import Blog from './Blog'

describe('Blog component tests', () => {
  let blog = {
    title:"React patterns",
    author:"Michael Chan",
    url:"https://reactpatterns.com/",
    likes:7,
    user: {
      username: "admin",
      name: "admin"
    }
  }
  let user = {
    username: "admin",
    name: "admin"
  }

  let mockUpdateBlog = jest.fn()
  let mockDeleteBlog = jest.fn()

  test('renders title and author', () => {
    const component = render(
      <Blog blog={blog} updateBlog={mockUpdateBlog} deleteBlog={mockDeleteBlog} user = {user}/>
    )
    expect(component.container).toHaveTextContent(
      'React patterns - Michael Chan'
    )
  })

  test('clicking the like button twice', async () => {
    const user = userEvent.setup()
    const component = render(
      <Blog blog={blog} updateBlog={mockUpdateBlog} deleteBlog={mockDeleteBlog} user = {user} />
    )

    const button = screen.getByText('like')
    await user.click(button)
    await user.click(button)

    expect(mockUpdateBlog.mock.calls).toHaveLength(2)
  })
})