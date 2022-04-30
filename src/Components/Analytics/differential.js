import * as React from 'react';
import Typography from '@mui/material/Typography';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardSharpIcon from '@mui/icons-material/ArrowDownwardSharp';
import { useState, useEffect } from 'react'; 
import { Paper } from '@mui/material';
import axios from 'axios';
import CircularProgress from '@mui/material/CircularProgress';

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


const Differential = () => {
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
    .get(`/api/stocks/differential`, config)
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
      {isLoading ? <CircularProgress /> : <SetColours differential={differential} />}
    </Paper>
  )
}

export default Differential;
