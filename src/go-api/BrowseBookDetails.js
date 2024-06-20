import React, { useState } from 'react';
import axios from 'axios';
import DeleteBookDetails from './DeleteBookDetails';
import BorrowBook from './BorrowBook';

function BrowseBookDetails(props) {
    const [id, setId] = useState();
    const isStaff = props.isStaff
    const [selectedOption, setSelectedOption] = useState('Title');
    const [query, setQuery] = useState('');
    const [responseData, setResponseData] = useState([]);
    const token = localStorage.getItem('token');
    const handleChange = (event) =>{
        setSelectedOption(event.target.value);
    }

    const handleSubmit = (e, buttonname) => {
        e.preventDefault();
        const formData = {
            search_val : buttonname,
	        search_category : selectedOption,
	        search_data : query
          };
          console.log(JSON.stringify(formData));
        axios
        .post("http://localhost:8080/sbookbrowse",JSON.stringify(formData),{headers: { 
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json' 
         }, withCredentials: true })
        .then(response => {
            alert('Book added successfully');
            console.log('done', response);
            setResponseData(response.data);
        })
        .catch(error => {
            console.log("error", error);
        }); 
      }

    return(
        <div>
          <br />
        <form className='container'>
        <div className="input-group mb-3">
        <label className="input-group-text" for="inputGroupSelect01">Options</label>
      <select value={selectedOption} onChange={handleChange} className='form-select'>
        <option value="Title">Title</option>
        <option value="Author">Author</option>
        <option value="Status">Status</option>
        <option value="Quantity">Quantity</option>
        <option value="Genre">Genre</option>
      </select>
      </div>
      <div>
      <input
          type="text"
          id="query"
          placeholder='Enter value to search'
          onChange={(e) => setQuery(e.target.value)}
          className='form-control'
          required />
        </div>
        <br />
     <div>
      <button type="submit" name="submitType" value="search" onClick={(e) => handleSubmit(e,"search")} className='btn btn-primary'>Search</button>
       </div>
       <div className="text-success">
  <hr/>
</div>

      <button type="submit" name="submitType" value="view_all" onClick={(e) => handleSubmit(e, "View_all")} className='btn btn-primary'>View All</button>
    </form>
    <br />
    <table className='table'>
    <tbody>
        <tr>
          <th>ID</th>
          <th>Title</th>
          <th>Author</th>
          <th>Publication Date</th>
          <th>Genre</th>
          <th>Status</th>
          <th>Quantity</th>
        </tr>
        {responseData!=null && responseData.map((book, i) => (
          <tr key={i}>
            <td>{book.id}</td>
            <td>{book.title}</td>
            <td>{book.author}</td>
            <td>{book.publication_date}</td>
            <td>{book.genre}</td>
            <td>{book.status}</td>
            <td>{book.quantity}</td>
            {isStaff && <td><button onClick={(e) => setId(book.id)}>Delete</button></td>}
            {!isStaff && <td><button onClick={(e) => setId(book.id)}>Borrow</button></td>}
          </tr>
        ))}
        {responseData===null && <tr><td>No such record</td></tr>}
        {isStaff && id && <DeleteBookDetails bid={id}/>}
        {!isStaff && id && <BorrowBook bid={id}/>}
      </tbody>
      </table>
    </div>
    )
}

export default BrowseBookDetails