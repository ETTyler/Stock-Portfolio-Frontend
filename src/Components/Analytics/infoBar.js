import * as React from 'react';
import Typography from '@mui/material/Typography';
import { useState, useEffect } from 'react'; 
import { Paper } from '@mui/material';
import axios from 'axios';

const InfoBar = () => {
  const [marketNews, setMarketNews] = useState({})
  const [isLoading, setLoading] = useState(true)
  const date = new Date()
  const token = localStorage.getItem('token')

  useEffect(() => {
    const config = {
      headers: {
        Authorization: token
      }
    }
    axios
    .get(`/api/stocks/news`, config)
    .catch(error => {
      console.log(error.toJSON());
    })
    .then(response => {
      setMarketNews(response.data)
      setLoading(false)
    })
  },[token])

  return (
    <Paper elevation={3} sx={{
      width: '80%', 
      height: 'auto',
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
        <a href={marketNews.url} target="_blank" rel="noreferrer">{marketNews.url}</a>
      </Typography>
      </div>
    </Paper>
  )
}

export default InfoBar;
