import * as React from 'react';
import ReactDOM from 'react-dom';
import Button from '@mui/material/Button';
import { useState } from 'react';
import jwt_decode from "jwt-decode";
import { createTheme, ThemeProvider, responsiveFontSizes } from '@mui/material/styles';
import SignIn from './Components/login';
import Navbar from './Components/navbar';
import Portfolio from './Components/Portfolio/portfolio';
import {
  BrowserRouter as Router,
  Routes, Route, Link, useLocation
} from "react-router-dom"
import Statistics from './Components/Statistics/statistics';

let theme = createTheme({
  typography: {
    allVariants: {
      fontFamily: 'Inter',
    },
  },
})
theme = responsiveFontSizes(theme)

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
    <ThemeProvider theme={theme}> 
      {pathname === '/login' || pathname === '/' ? clearToken() : <Navbar username={decodedToken.name}/>}
      <Routes>
        <Route path="/" element={<SignIn />}/>
        <Route path="/login" element={<SignIn />}/>
        <Route path="/portfolio" element={<Portfolio />}/>
        <Route path="/insights" element={<Statistics />}/>
      </Routes>
    </ThemeProvider>
  )
}

export default App;
