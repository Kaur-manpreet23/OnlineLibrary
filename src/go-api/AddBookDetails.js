import React, { useState } from 'react';
import axios from 'axios';

function AddBookDetails() {
    const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [publicationDate, setPublicationDate] = useState('');
  const [genre, setGenre] = useState('');
  const token = localStorage.getItem('token');
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = {
        title: title,
        author: author,
        publication_date: publicationDate,
        genre: genre,
        status: 1,
        quantity: 5
      };
      console.log(JSON.stringify(formData));
    axios
    .post("http://localhost:8080/sbookadd",JSON.stringify(formData),{headers: { 
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json' 
     }, withCredentials: true })
    .then(response => {
        alert('Book added successfully');
        console.log('done', response);
    })
    .catch(error => {
        console.log("error", error);
    }); 
    setTitle('');
    setAuthor('');
    setPublicationDate('');
    setGenre('');
  }

  return (
    <div>
      <br/>
    <form onSubmit={handleSubmit} className='container'>
      <div>
        <label htmlFor="title">Title:</label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className='form-control'
          required
        />
      </div>
      <div>
        <label htmlFor="author">Author:</label>
        <input
          type="text"
          id="author"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          className='form-control'
          required
        />
      </div>
      <div>
        <label htmlFor="publicationDate">Publication Date:</label>
        <input
          type="date"
          id="publicationDate"
          value={publicationDate}
          onChange={(e) => setPublicationDate(e.target.value)}
          className='form-control'
          required
        />
      </div>
      <div>
        <label htmlFor="genre">Genre:</label>
        <input
          type="text"
          id="genre"
          value={genre}
          onChange={(e) => setGenre(e.target.value)}
          className='form-control'
          required
        />
      </div>
      <button type="submit" className='btn btn-primary'>Add</button>
    </form>
    </div>
  );
}

export default AddBookDetails