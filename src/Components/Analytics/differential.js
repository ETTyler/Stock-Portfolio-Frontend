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
import { Paper } from '@mui/material';
import axios from 'axios';
import jwt_decode from "jwt-decode";
import { createContext, useContext } from 'react';

const SetColours = ({ differential }) => {
  if (differential > 0) {
    return (
      <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems:'center'}}>
        <Typography variant="body2" component="div" sx={{color: "#1976d2", fontSize:'0.8em'}}>
          Outperforming the Market by:
        </Typography>
        <Typography variant="h5" sx={{color: "#3fcc6f"}}>
          +{differential.toFixed(2)}% <ArrowUpwardIcon fontSize='small' sx={{color: "#3fcc6f"}}/>
        </Typography>
      </div>
    )
  }
  return (
    <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems:'center'}}>
      <Typography variant="body2" component="div" sx={{color: "#1976d2", fontSize:'0.8em'}}>
        Underperforming the Market by:
      </Typography>
      <Typography variant="h5" sx={{color: "#fd6e70"}}>
        {differential.toFixed(2)}% <ArrowDownwardSharpIcon fontSize='small' sx={{color: "#fd6e70"}}/>
      </Typography>
    </div>
  )
}


const Differential = ({ userID }) => {
  const id = userID.id
  const [differential, setDifferential] = useState(0)
  const [isLoading, setLoading] = useState(true)
  const token = localStorage.getItem('token')

  useEffect(() => {
    const config = {
      headers: {
        Authorization: token
      }
    }
    axios
    .get(`http://localhost:3001/api/stocks/differential`, config)
    .catch(error => {
      console.log(error.toJSON());
    })
    .then(response => {
      setDifferential(response.data.differential)
      setLoading(false)
    })
  },[token])

  return (
    <Paper elevation={3} sx={{
      width: '18%',
      height: '14vh',
      display: 'flex',
      flexDirection: 'row', 
      justifySelf: 'center', 
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 6
    }}>
      {isLoading ? 'Loading...': <SetColours differential={differential} />}
    </Paper>
  )
}

export default Differential;
