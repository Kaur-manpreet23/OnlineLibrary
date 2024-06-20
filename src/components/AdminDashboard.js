import React, { useState } from 'react';
import BookData from '../go-api/BookData';
import ManageUsers from './ManageUsers';

function AdminDashboard(props) {
  
  return (
    <div>
      <h2>Logged in to Admin Dashboard!</h2>
      
        <BookData/>
        <ManageUsers/>
    </div>
  );
}

export default AdminDashboard;