import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable.js'
import blogService from './services/blogs'
import loginService from './services/login'


const App = () => {
  const [allBlogs, setAllBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)
  const [successMessage, setSuccessMessage] = useState(null)
  const [user, setUser] = useState(null)

  const blogFormRef = React.createRef()

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)

      getAllBlogs()
    }
  }, [])

  const getAllBlogs = async () => {
    const blogs = await blogService.getAll()
    blogs.sort((a, b) => (a.likes > b.likes) ? -1 : 1)
    setAllBlogs(blogs)
  }

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password,
      })

      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )
      setUser(user)
      blogService.setToken(user.token)
      getAllBlogs()
      setUsername('')
      setPassword('')
    } catch (exception) {
      setErrorMessage('Wrong credentials')
      setSuccessMessage(null)
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const handleLogout = async (event) => {
    event.preventDefault()
    window.localStorage.removeItem('loggedBlogappUser')
    setUser(null)
  }

  const createBlog = (BlogToAdd) => {
    blogService
    .create(BlogToAdd)
    .then(returnedBlog=> {
      setAllBlogs(allBlogs.concat(returnedBlog))
    })
    setSuccessMessage("Blog added successfully")
    setTimeout(() => {
      setSuccessMessage(null)
    }, 5000)
  }

  const updateBlog = async (BlogToUpdate) => {
    try {
      const updatedBlog = await blogService
        .update(BlogToUpdate)
      setAllBlogs(allBlogs.map(blog => blog.id !== BlogToUpdate.id ? blog : updatedBlog))
      setErrorMessage(null)
      setSuccessMessage(null)
    } catch(exception) {
      setErrorMessage(
        `Cannot update blog ${BlogToUpdate.title}`
      )
      setSuccessMessage(null)
      setTimeout(() => {
        setSuccessMessage(null)
      }, 5000)
    }
  }

  const deleteBlog = async (BlogToDelete) => {
    try {
      if (window.confirm(`Delete ${BlogToDelete.title} ?`)){
        blogService
          .remove(BlogToDelete.id)
        setSuccessMessage(
          `Blog ${BlogToDelete.title} was successfully deleted`
        )
        setAllBlogs(allBlogs.filter(blog => blog.id !== BlogToDelete.id))
        setErrorMessage(null)
        setTimeout(() => {
          setSuccessMessage(null)
        }, 5000)
      }
    } catch(exception) {
      setErrorMessage(
        `Cannot delete blog ${BlogToDelete.title}`
      )
      setSuccessMessage(null)
      setTimeout(() => {
        setSuccessMessage(null)
      }, 5000)
    }
  }

  return (
    <div>
      <h2>Blogs</h2>
      <Notification errorMessage={errorMessage} successMessage={successMessage} />
      {user === null ?
        <LoginForm
          handleLogin={handleLogin}
          username={username}
          setUsername={setUsername}
          setPassword={setPassword}
          password={password}
        /> :
        <div>
          <p>{user.name} logged in<button onClick={handleLogout} type="submit">logout</button></p>
          <Togglable buttonLabel="Add new blog" ref={blogFormRef}>
            <BlogForm
              createBlog={createBlog}
            />
          </Togglable>
          {allBlogs.map(blog =>
            <Blog
              key={blog.id}
              blog={blog}
              updateBlog={updateBlog}
              deleteBlog={deleteBlog}
              user = {user}
            />
          )}
        </div>
      }
    </div>
  )
}

export default App
