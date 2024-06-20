import React, { useEffect, useRef } from 'react';
import axios from 'axios';
import MemberDashboard from '../components/MemberDashboard';

function BorrowBook(props) {
 const token = localStorage.getItem('token');
 console.log(localStorage.getItem('uid'),props.bid);
 const didMount = useRef(false);
 useEffect(()=>{
    if (!didMount.current) {
        const formData = {
            uid: parseInt(localStorage.getItem('uid'),10),
            bid: props.bid
        }
        console.log(formData);
        didMount.current = true;
        axios
        .post("http://localhost:8080/mbookborrow",JSON.stringify(formData),{headers: { 
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json' 
         }, withCredentials: true })
    .then(response => {
        alert(response.data.message);
        console.log('done', response);
    })
    .catch(error => {
        console.log("error", error);
    });  }
    },[]);
  return(<div>
    
  </div>);
    
}

export default BorrowBook