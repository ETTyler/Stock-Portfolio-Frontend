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
import { createContext, useContext } from 'react';
import CircularProgress from '@mui/material/CircularProgress';

export const GraphContext = React.createContext({
  chosenGraph: 'Portfolio',
  setChosenGraph: () => {}
})

const Statistics = () => {
  const [stockData, setStockData] = useState([])
  const [isLoading, setLoading] = useState(true)
  const [chosenGraph, setChosenGraph] = useState('Portfolio')
  const value = { chosenGraph, setChosenGraph }
  const token = localStorage.getItem('token')  

  useEffect(() => {
    const config = {
      headers: {
        Authorization: token
      }
    }
    axios
    .get(`http://localhost:3001/api/stocks/information`, config)
    .then(res => {
      setStockData(res.data)
      setLoading(false)
    })
  }, [token])

  if (isLoading) {
    return (
      <Box sx={{ display: 'flex', alignItems: 'center', height: '90vh', justifyContent: 'center' }}>
        <CircularProgress />
      </Box>
    )
  }
  
  return (
    <GraphContext.Provider value={value}>
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
          rowGap: 1,
          gridTemplateAreas: `"stockBar stockBar stockBar"
          "graph graph charts"`
        }}
      >
        <Paper elevation={0} sx={{
          gridArea: 'stockBar', 
          height: '20vh', 
          width: 'fit-content', 
          maxWidth: '95vw',
          overflowY: 'hidden',
          overflowX: 'auto',
          display: 'flex', 
          flexDirection: 'row', 
          justifySelf: 'center', 
          alignItems: 'center', 
          justifyContent: 'space-between',
          gap: 2
        }}>
          {stockData.map((stock) => (
            <StockOverview key={stock.transactionID} stock={stock}/>
          ))}
        </Paper>
        <Paper elevation={6} sx={{
          gridArea: 'graph', height: '65vh', padding: 1, borderRadius: 5, width: '60vw'}}>
          <StatsGraph />
        </Paper>
        <Paper elevation={6} sx={{gridArea: 'charts', borderRadius: 5, width: 'fit-content'}}>
          <StatsCharts />
        </Paper>
      </Box>
    </GraphContext.Provider>
  )

}

export default Statistics;
