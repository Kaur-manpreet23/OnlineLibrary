import React, { useEffect } from 'react';
import axios from 'axios';

function DeleteBookDetails(props) {
  const id = props.bid;
 const token = localStorage.getItem('token');
    useEffect(() => {
    const formData = {
        id: id
      };
      console.log(JSON.stringify(formData));
    axios
    .post("http://localhost:8080/sbookdelete",JSON.stringify(formData),{headers: { 
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json' 
     }, withCredentials: true })
    .then(response => {
        alert('Book deleted successfully');
        console.log('done', response);
    })
    .catch(error => {
        console.log("error", error);
    }); 
  },[]);
  return(<div></div>);
    
}

export default DeleteBookDetails