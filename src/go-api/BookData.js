import React, { useState } from 'react';
import AddBookDetails from './AddBookDetails';
import DeleteBookDetails from './DeleteBookDetails';
import BrowseBookDetails from './BrowseBookDetails';

function BookData() {
  const [selectedOption, setSelectedOption] = useState('');
  const [addBook, setAdd] = useState(false);
  const [deleteBook, setDelete] = useState(false);
  const [browseBooks, setBrowse] = useState(false);

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('Selected option:', selectedOption);
    if (selectedOption===""){
        alert('Please select an option before proceeding');
    }else{
        if (selectedOption === 'Browse'){
            setBrowse(true);
            setAdd(false);
            setDelete(false);
        }else if (selectedOption==='Add'){
            setBrowse(false);
            setAdd(true);
            setDelete(false);
        }else if (selectedOption==='Delete'){
            setBrowse(false);
            setAdd(false);
            setDelete(true);
        }
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className='container'>
      <div className="input-group mb-3">
      <div className="input-group-text">
          <input
            type="radio"
            value="Add"
            checked={selectedOption === 'Add'}
            onChange={handleOptionChange}
            className='form-check-input mt-0'
          />
          </div>
          <label className='form-control'>
          Add book details
        </label>
        </div>
        <div className="input-group mb-3">
      <div className="input-group-text">
          <input
            type="radio"
            value="Browse"
            checked={selectedOption === 'Browse'}
            onChange={handleOptionChange}
          />
          </div>
        <label className='form-control'>
          Browse available books
        </label>
        </div>
        <div className="input-group mb-3">
      <div className="input-group-text">
          <input
            type="radio"
            value="Delete"
            checked={selectedOption === 'Delete'}
            onChange={handleOptionChange}
          />
          </div>
        <label className='form-control'>
          Delete a book 
        </label>
        </div>
        <button type="submit" className='btn btn-primary'>Submit</button>
      </form>
      {browseBooks && <div><BrowseBookDetails isStaff={true}/></div>}
      {addBook && <div><AddBookDetails /></div>}
      {updateBook && <div><UpdateBookDetails /></div>}
    </div>
  )
}

export default BookData;
