import React, { useState } from 'react';
import axios from 'axios';
import BrowseBookDetails from '../go-api/BrowseBookDetails';
import './MemberOptions.css'

function MemberDashboard(props) {
  const [action, setAction] = useState('');
  const [borrowedBooks, setBorrowedBooks] = useState([]);
  const [bid, setBid] = useState('');
  const [borrowId, setBorrowId] = useState('');
  const token = localStorage.getItem('token')
  
  const handleAction = (event) => {
    event.preventDefault();
    try {
      switch (action) {
        case 'borrowHistory':
            axios.get("http://localhost:3001/history",{headers: { 
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json' 
             }, withCredentials: true })
            .then(response => {
                alert('History fetched successfully');
                console.log(response);
              setBorrowedBooks(response.data.history);
            })
            .catch(error => {
              console.log(error.message);
            });
            break;
        default:
          break;
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  const returnHandler=(id,borrowId,uid)=>{
    console.log(id,borrowId,uid);
    const formData = {
      uid: uid,
      bid: id,
      borrowId: borrowId
  };
  console.log(JSON.stringify(formData));
  axios
  .post("http://localhost:8080/mbookreturn",JSON.stringify(formData),{headers: {
'Accept': 'application/json',
'Content-Type': 'application/json',
'Authorization': `Bearer ${token}`,
'user': props.uid 
},withCredentials: true, mode: 'cors'})
.then(response => {
  if (response.data.message === "Return Success")
  {
    alert('Book returned successfully');
  } else if (response.data.message === "No such books in your records"){
    alert('No such book in your records');
  } else {
    alert('Something went wrong');
  }
  console.log('done', response);
})
.catch(error => {
  console.log("error", error);
});   
  }

  return (
    <div>
      <h6>Logged in to Member Dashboard!</h6>
      
      <form onSubmit={handleAction} className='container member-options'>
        <button type="submit" className="btn btn-primary" onClick={() => setAction('browse')}>Browse Books</button>
        <button type="submit" className="btn btn-primary" onClick={() => setAction('borrowHistory')}>Fetch Borrow History</button>
      </form>
    {action === 'browse' && <BrowseBookDetails isStaff={false}/>}
    
    {action === 'borrowHistory' && borrowedBooks && borrowedBooks.length > 0 && (<div>
        <table className='table'>
        <tbody>
        <tr>
          <th>Book Id</th>
          <th>Title</th>
          <th>Author</th>
          <th>Publication Date</th>
          <th>Genre</th>
          <th>Borrow id</th>
          <th>Borrower's id</th>
          <th>Issue Date</th>
          <th>Return Date</th>
        </tr>
        
        {borrowedBooks.map((info, i) => (
          <tr key={i}>
            <td>{info.id}</td>
            <td>{info.title}</td>
            <td>{info.author}</td>
            <td>{info.publication_date}</td>
            <td>{info.genre}</td>
            <td>{info.borrow_id}</td>
            <td>{info.uid}</td>
            <td>{info.issue_date}</td>
            <td>{info.return_date}</td>
            {info.return_date==null && <td><button onClick={(e)=>{returnHandler(info.id,info.borrow_id,info.uid)}}>Return</button></td>}
          </tr>
        ))}
      </tbody>
      </table>
      </div>)}
    </div>
  );
}

export default MemberDashboard;
