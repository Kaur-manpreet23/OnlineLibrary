import logo from './logo.svg';
import './App.css';
//import {BrowserRouter, Routes, Route} from "react-router-dom";
import React, { Component } from 'react';
import Register from './components/Registration';
import ErrorPage from "./components/ErrorPage";
import Login from "./components/Login";
import Main from "./components/Main";
import BookData from "./go-api/BookData";
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import 'bootstrap/dist/js/bootstrap.bundle.min.js'; // Import Bootstrap JS
import {
  createBrowserRouter,
  RouterProvider,
  Link,
} from "react-router-dom";
import Dashboard from './components/Dashboard';
import Logout from './components/Logout';
import DataProvider from './DataProvider';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    errorElement: <ErrorPage />,
  },
  {
    path: "register/",
    element: <Register />
  },
  {
    path: "login/",
    element: <Login />
  },
  {
    path: "dashboard/",
    element: <Dashboard />
  }, 
  {
    path: "logout/",
    element: <Logout/>
  },
]);

class App extends Component {
  render() {
    return (
      <div className='app'>
        <h1 className='text-center'>Online library Portal</h1>
        <DataProvider>
        <React.StrictMode>
          <RouterProvider router={router} />
        </React.StrictMode>
        </DataProvider>
      </div>
    );
  }
}

export default App;
