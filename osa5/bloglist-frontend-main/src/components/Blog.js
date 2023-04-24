import React , { useState } from 'react'
import PropTypes from 'prop-types'

const Blog = (props) => {
  const blog = props.blog
  const visible = (props.user.username === blog.user.username)
  const showWhenVisible = { display: visible ? '' : 'none' }

  const [blogObject, setBlogObject] = useState(blog)

  const increaseLikes = () => {
    const updatedBlog = ({
      ...blog,
      likes: blog.likes + 1
    })
    props.updateBlog(updatedBlog)
    setBlogObject(updatedBlog)
  }

  const removeBlog = () => props.deleteBlog(blog)

  return (
    <div>
      <div>
        <p>{blog.title} - {blog.author}</p>
      </div>
      <div>
        <p>{blog.url}</p>
        <p>{blogObject.likes} <button onClick={increaseLikes}>like</button></p>
      </div>
      <div style={showWhenVisible}>
      <button onClick={removeBlog}>remove</button>
      </div>
    </div>
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  updateBlog: PropTypes.func.isRequired,
  deleteBlog: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired
}

export default Blog