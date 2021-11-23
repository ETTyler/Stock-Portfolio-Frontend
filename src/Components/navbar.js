import * as React from 'react';
import ReactDOM from 'react-dom';
import Button from '@mui/material/Button';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import SignIn from './login';
import {
  BrowserRouter as Router,
  Routes, Route, Link, useLocation
} from "react-router-dom"

const Navbar = () => {
  const padding = {
    padding: 5
  }

  return (
    <>
      <div>
        <Link style={padding} to="/login">home</Link>
        <Link style={padding} to="/login">notes</Link>
        <Link style={padding} to="/">users</Link>
      </div>
      
    </>
  )
}
export default Navbar;
