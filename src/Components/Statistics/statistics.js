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
import StockOverview from './stockOverview';
import axios from 'axios';
import jwt_decode from "jwt-decode";
import StatsGraph from './statsGraph';
import StatsCharts from './statsCharts';

const Statistics = () => {
  const [stockData, setStockData] = useState([])
  const [isLoading, setLoading] = useState(true)

  const token = localStorage.getItem('token')
  const decodedToken = jwt_decode(token)

  useEffect(() => {
    axios.all([
      axios.get(`http://localhost:3001/api/stocks/update`),
      axios.get(`http://localhost:3001/api/stocks/info/${decodedToken.id}`)
    ])
    .then(axios.spread((res1, res2) => {
      setStockData(res2.data)
      setLoading(false)
    }))
  }, [])

  if (isLoading) {
    return <div>Loading...</div>;
  }
  
  return (
    <Box 
      sx={{ 
        padding: 2,
        px: 10,
        maxWidth: '100%',
        width: 'auto',
        display: 'grid',
        gridTemplateRows: 'auto',
        gridTemplateColumns: 'repeat(3, 1fr)',
        justifyContent: 'center',
        gap: 3,
        gridTemplateAreas: `"stockBar stockBar stockBar"
         "graph graph charts"`
      }}
    >
      <Paper elevation={6} sx={{
        gridArea: 'stockBar', 
        height: '18vh', 
        width: 'fit-content', 
        display: 'flex', 
        flexDirection: 'row', 
        justifySelf: 'center', 
        alignItems: 'center', 
        justifyContent: 'center',
        borderRadius: 5,
      }}>
        {stockData.map((stock) => (
          <StockOverview key={stock.transationID} stock={stock}/>
        ))}
      </Paper>
      <Paper elevation={6} sx={{gridArea: 'graph', height: '65vh', padding: 1, borderRadius: 5}}>
        <StatsGraph userID={decodedToken}/>
      </Paper>
      <Paper elevation={6} sx={{gridArea: 'charts', borderRadius: 5}}>
        <StatsCharts />
      </Paper>
    </Box>
  )

}

export default Statistics;
