import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import AdminDashboard from './AdminDashboard';
import MemberDashboard from './MemberDashboard';
import LibrarianDashboard from './LibrarianDashboard';
import Logout from './Logout';
import {Navigate, useParams} from 'react-router-dom'
import DataContext from '../DataContext';
function Dashboard() {
  const token = localStorage.getItem('token');
  const [bid, setBid] = useState(0);
  const [user, setUser] = useState('');
const [errMsg,setErrmsg] = useState('');

  useEffect(() => {
    console.log("dashboard token",token)
    axios.get("http://localhost:3001/dashboard", {headers: { 
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json' 
     }, withCredentials: true })
      .then(response => {
        console.log(response.data.user);
        setUser(response.data.user);
      })
      .catch(error => {
        setErrmsg(error.message);
        console.log(error.message);
      });
  }, []);

  return (
    <div>
      {errMsg === '' ? (<div>
      <h3 className='text-end'>Welcome, {user.email}!</h3>
      <Logout/>
      {user.role === 'admin' && <AdminDashboard />}
      {user.role === 'member' && <MemberDashboard />}
      {user.role === 'librarian' && <LibrarianDashboard />}
      </div>
      ):(
        <div>
        {/*alert('Please login first',errMsg)*/}
        <Navigate to="/"/>
        </div>
      )}
    </div>
  );
}

export default Dashboard;
