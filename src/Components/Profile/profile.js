import * as React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import styled from 'styled-components'
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardSharpIcon from '@mui/icons-material/ArrowDownwardSharp';
import { useState, useEffect } from 'react'; 
import { grid } from '@mui/system';
import { Avatar, Container, Paper } from '@mui/material';
import axios from 'axios';
import jwt_decode from "jwt-decode";
import { createContext, useContext } from 'react';
import CircularProgress from '@mui/material/CircularProgress';


const Profile = () => {  
  const token = localStorage.getItem('token')
  const decodedToken = jwt_decode(token)
  const [userData, setUserData] = useState()
  const [isLoading, setLoading] = useState(true)
  console.log(decodedToken)

  useEffect(() => {
    setLoading(false)
  }, [token])

  if (isLoading) {
    return (
      <Box sx={{ display: 'flex', alignItems: 'center', height: '90vh', justifyContent: 'center' }}>
        <CircularProgress />
      </Box>
    )
  }


  return (
    <Container maxWidth="sm" sx={{display: 'flex', alignItems:'center', justifyContent:'center', height: '90vh'}}>
      <Paper elevation={6} sx={{padding: 5, borderRadius: 5, display: 'flex', flexDirection: 'column', gap: 3}}>
        <div style={{display: 'flex', flexDirection: 'row', gap: 10, alignItems:'center'}}>
          <Avatar></Avatar>
          <Typography variant='h6' component="h4">
            {decodedToken.name} 
          </Typography> 
        </div>
        <div style={{display: 'flex', flexDirection: 'column', gap: 20, alignItems:'flex-start'}}>
          <Typography variant='h6' component="h4">
            Email: {decodedToken.name}
          </Typography>
          <Typography variant='h6' component="h4">
            Initial Investment: 12-01-2022
          </Typography> 
          <Typography variant='h6' component="h4">
            Porfolio Value: $34,454.45
          </Typography> 
        </div>
      </Paper>
    </Container>
  )
}

export default Profile;
