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

const InfoBar = ({ userID }) => {
  const [marketNews, setMarketNews] = useState({})
  const [isLoading, setLoading] = useState(true)
  const id = userID.id
  const date = new Date()

  useEffect(() => {
    axios
    .get(`http://localhost:3001/api/stocks/news/${id}`)
    .catch(error => {
      console.log(error.toJSON());
    })
    .then(response => {
      setMarketNews(response.data)
      setLoading(false)
    })
  },[])

  return (
    <Paper elevation={3} sx={{
      width: '80%', 
      height: '14vh',
      display: 'flex',
      flexDirection: 'column', 
      alignItems: 'flex-start',
      justifyContent: 'flex-start',
      borderRadius: 6,
      overflow: 'hidden'
    }}>
      <div style={{padding: '1em'}}>
      <Typography variant='body2' component="div" sx={{color: 'gray'}}>
        {date.toDateString()}
      </Typography>
      <Typography variant='body1' component="div" sx={{color: '#1976d2'}}>
        {marketNews.title}
      </Typography>
      <Typography variant='body2' component="div">
        { isLoading ? 'Loading...': marketNews.description}
      </Typography>
      <Typography variant='caption' component="div">
        <a href={marketNews.url} target="_blank">{marketNews.url}</a>
      </Typography>
      </div>
    </Paper>
  )
}

export default InfoBar;
