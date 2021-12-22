import * as React from 'react';
import ReactDOM from 'react-dom';
import Button from '@mui/material/Button';
import { useState } from 'react';
import jwt_decode from "jwt-decode";
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import SignIn from './Components/login';
import Navbar from './Components/navbar';
import {
  BrowserRouter as Router,
  Routes, Route, Link, useLocation
} from "react-router-dom"

const App = () => {  
  const { pathname } = useLocation()

  if(!localStorage.getItem('token')) {
    return <SignIn />
  }

  const clearToken = () => {
    localStorage.clear()
  }

  const token = localStorage.getItem('token')
  const decodedToken = jwt_decode(token)

  return (
    <div> 
     {pathname === '/login' ? clearToken() : <Navbar username={decodedToken.name}/>}
     <Routes>
      <Route path="/login" element={<SignIn />}/>
    </Routes>
    </div>
  )
}

export default App;
