import React, { useState } from 'react';
import axios from 'axios';

function ManageUsers() {
    const [action, setAction] = useState('');
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const [password_confirmation,setPasswordConfirmation] = useState('');
    const [role,setRole] = useState('');
    const token = localStorage.getItem('token');

const handleAdd = (e) => {
    const formData = {
        email: email,
        password: password,
        password_confirmation: password_confirmation,
        role: role
    } 
        axios
        .post("http://localhost:3001/add_member",formData,{headers: { 
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json' 
           }, withCredentials: true })
        .then(response => {
            console.log('Logged out successfully', response);
            alert(response.data.message.message);
            setAction('')
        })
        .catch(error => {
            console.log("logout", error);
        });
        e.preventDefault();
      }
    const handleDelete = (e) => {
        const formData = {
            email: email,
            password: password
        } 
        axios
        .post("http://localhost:3001/delete_member",formData,{headers: { 
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json' 
           }, withCredentials: true })
        .then(response => {
            console.log('Logged out successfully', response);
            alert(response.data.message.message);
            setAction('')
        })
        .catch(error => {
            console.log("logout", error);
        });
        e.preventDefault();
      }  
  return (
    <div>
            <button onClick={() => setAction('add')}>Add a user</button>
            <button onClick={() => setAction('delete')}>Delete a user</button>
        {action==='add' && (<div>
            <form onSubmit={handleAdd}>
                <input type='text' placeholder='user email' onChange={(e) => setEmail(e.target.value)} />
                <input type='password' placeholder='user password' onChange={(e) => setPassword(e.target.value)}/>
                <input type='password' placeholder='confirm password' onChange={(e) => setPasswordConfirmation(e.target.value)}/>
                <input type='text' placeholder='role' onChange={(e) => setRole(e.target.value)}/>
                <button type='submit'>Add</button>
            </form>
        </div>)}
        {action==='delete' && (<div>
            <form onSubmit={handleDelete}>
                <input type='text' placeholder='user email' onChange={(e) => setEmail(e.target.value)}/>
                <input type='password' placeholder='user password' onChange={(e) => setPassword(e.target.value)} />
                <button type='submit'>Delete</button>
            </form>
        </div>)}
    </div>
  )
}

export default ManageUsers;