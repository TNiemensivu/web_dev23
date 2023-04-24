import React from 'react'
import {useState} from 'react'


const BlogForm = ({createBlog}) =>{
    const [newTitle, setNewTitle] = useState('')
    const [newAuthor, setNewAuthor] = useState('')
    const [newUrl, setNewUrl] = useState('')

    const handleTitleChange = (event) =>{
        setNewTitle(event.target.value)
    }

    const handleAuthorChange = (event) =>{
        setNewAuthor(event.target.value)
    }

    const handleUrlChange = (event) =>{
        setNewUrl(event.target.value)
    }

    const addBlog = (event) =>{
        event.preventDefault()
        createBlog({
            title: newTitle,
            author: newAuthor,
            url: newUrl
        })
        setNewAuthor('')
        setNewTitle('')
        setNewUrl('')
    }


return(
  <form onSubmit={addBlog}>
        <div>
            Title: <input value={newTitle} data-testid='title' onChange={handleTitleChange} />
        </div>
        <div>
            Author: <input value={newAuthor} data-testid='author' onChange={handleAuthorChange} />
        </div>
        <div>
            Url: <input value={newUrl} data-testid='url' onChange={handleUrlChange} />
        </div>
        <div>
            <button type="submit" data-testid='add' >add</button>
        </div>
    </form>
)}
export default BlogForm
