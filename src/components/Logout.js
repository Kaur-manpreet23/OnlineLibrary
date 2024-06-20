import React, {useState} from 'react';
import {Navigate} from 'react-router-dom';
import axios from 'axios';
function Logout () {
    const [logout, setLogout] = useState(false)
    const token = localStorage.getItem('token')
const handleLogout = (e) => {
    axios
    .delete("http://localhost:3001/logout",{headers: { 
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json' 
       }, withCredentials: true })
    .then(response => {
        console.log('Logged out successfully', response);
        alert("Logged out successfully");
        setLogout(true);
        localStorage.removeItem('token');
    })
    .catch(error => {
        console.log("logout", error);
    });
    e.preventDefault();
  }
  return(
    <div>
        <button className="btn btn-outline-primary" onClick={handleLogout}>Logout</button>
        { logout && <Navigate to="/"/>}

    </div>
  );
}

export default Logout