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

const BottomBar = ({ userID }) => {
  const [isLoading, setLoading] = useState(true)
  const [stockData, setStockData] = useState({})
  const [highestValue, setHighestValue] = useState(0)
  const [lowestValue, setLowestValue] = useState(0)
  const id = userID.id

  useEffect(() => {
    axios
    .get(`http://localhost:3001/api/stocks/analytics/stockinfo/${id}`)
    .catch(error => {
      console.log(error.toJSON());
    })
    .then(response => {
      setStockData(response.data)
      console.log(response.data)
      setHighestValue(Number(response.data.highestStockData.value))
      setLowestValue(Number(response.data.lowestStockData.value))
      setLoading(false)
    })
  },[])

  if(isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <Paper elevation={0} sx={{
      width: '100%', 
      height: '16vh',
      display: 'flex',
      flexDirection: 'row', 
      alignItems: 'center',
      justifyContent: 'space-around',
      borderRadius: 6,
    }}>
      <Paper elevation={3} sx={{
        width: '20%', 
        height: '14vh',
        display: 'flex',
        flexDirection: 'column', 
        borderRadius: 6,
      }}>
        <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 2}}>
        <Typography variant='body1' component="div" sx={{color: "#1976d2", fontSize:'0.8rem', padding: 0.8}}>
          Largest Gain
        </Typography>
        <Typography variant='h6' component="div" sx={{display: 'flex', alignItems: 'center'}}>
          <img style={{borderRadius: 5}} src={`${stockData.largestGain.LogoURL}?size=20`}></img>&nbsp;{stockData.largestGain.name}
        </Typography>
        <Typography variant='h6' component="div" sx={{color: "#3fcc6f", justifySelf: 'flex-end'}}>
          +{stockData.largestGain.percentage}%
        </Typography>
        </div>
      </Paper>
      <Paper elevation={3} sx={{
        width: '20%', 
        height: '14vh',
        display: 'flex',
        flexDirection: 'column', 
        borderRadius: 6,
      }}>
        <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 2}}>
        <Typography variant='body1' component="div" sx={{color: "#1976d2", fontSize:'0.8rem', padding: 0.8}}>
          Largest Loss
        </Typography>
        <Typography variant='h6' component="div" sx={{display: 'flex', alignItems: 'center'}}>
          <img style={{borderRadius: 5}} src={`${stockData.largestLoss.LogoURL}?size=20`}></img>&nbsp;{stockData.largestLoss.name}
        </Typography>
        <Typography variant='h6' component="div" sx={{color: "#fd6e70", justifySelf: 'flex-end'}}>
          {stockData.largestLoss.percentage}%
        </Typography>
        </div>
      </Paper>
      <Paper elevation={3} sx={{
        width: '20%', 
        height: '14vh',
        display: 'flex',
        flexDirection: 'column', 
        borderRadius: 6,
      }}>
        <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 2}}>
        <Typography variant='body1' component="div" sx={{color: "#1976d2", fontSize:'0.8rem', padding: 0.8}}>
          Highest Value
        </Typography>
        <Typography variant='h6' component="div" sx={{display: 'flex', alignItems: 'center'}}>
          <img style={{borderRadius: 5}} src={`${stockData.highestStockData.LogoURL}?size=20`}></img>&nbsp;{stockData.highestStockData.Name}
        </Typography>
        <Typography variant='h6' component="div" sx={{color: "#3fcc6f", justifySelf: 'flex-end'}}>
          {highestValue.toLocaleString('en-US', {
            style: 'currency',
            currency: 'USD',
          })}
        </Typography>
        </div>
      </Paper>
      <Paper elevation={3} sx={{
        width: '20%', 
        height: '14vh',
        display: 'flex',
        flexDirection: 'column', 
        borderRadius: 6,
      }}>
        <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 2}}>
        <Typography variant='body1' component="div" sx={{color: "#1976d2", fontSize:'0.8rem', padding: 0.8}}>
          Lowest Value
        </Typography>
        <Typography variant='h6' component="div" sx={{display: 'flex', alignItems: 'center'}}>
          <img style={{borderRadius: 5}} src={`${stockData.lowestStockData.LogoURL}?size=20`}></img>&nbsp;{stockData.lowestStockData.Name}
        </Typography>
        <Typography variant='h6' component="div" sx={{color: "#fd6e70", justifySelf: 'flex-end'}}>
          {lowestValue.toLocaleString('en-US', {
            style: 'currency',
            currency: 'USD',
          })}
        </Typography>
        </div>
      </Paper>
    </Paper>
  )
}

export default BottomBar;