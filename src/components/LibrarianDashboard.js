import React, { useState } from 'react';
import BookData from '../go-api/BookData';
import ManageUsers from './ManageUsers';

function LibrarianDashboard(props) {
  
  return (
    <div>
      <h2>Logged in to Librarian Dashboard!</h2>

        <BookData/>
        <ManageUsers/>
    </div>
  );
}

export default LibrarianDashboard;