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
import Highcharts from 'highcharts/highstock';
import HighchartsReact from 'highcharts-react-official'
import axios from 'axios';
import CircularProgress from '@mui/material/CircularProgress';

const AnalyticsGraph = () => {
  const [userGraph, setUserGraph] = useState([])
  const [marketGraph, setMarketGraph] = useState([])
  const [isLoading, setLoading] = useState(true)
  const token = localStorage.getItem('token')

  useEffect(() => {
    const config = {
      headers: {
        Authorization: token
      }
    }
    axios
      .get(`http://localhost:3001/api/stocks/analytics/graph`, config)
      .catch(error => {
        console.log(error.toJSON());
      })
      .then(response => {
        setUserGraph(response.data.userDataset)
        setMarketGraph(response.data.marketDataset)
        setLoading(false)
      })
  },[token])

  if (isLoading) {
    return (
      <Box sx={{ display: 'flex', height: '50vh', alignItems: 'center', justifyContent: 'center' }}>
        <CircularProgress />
      </Box>
    )
  }
  
  const options = {
    chart: {
      height: (6.1 / 16 * 100) + '%'
    },
    title: {
        text: 'Portfolio Percentage Change'
      },
      series: [{
        name: 'Portfolio',
        data: userGraph,
        tooltip: {
          valueDecimals: 2,
          valueSuffix: '%'
        },
      },
      {
        name: 'Market ($VOO)',
        data: marketGraph,
        tooltip: {
          valueDecimals: 2,
          valueSuffix: '%'
        },
      }]
  }

  return (
    <HighchartsReact
      highcharts={Highcharts}
      constructorType={'stockChart'}
      options={options}
    />
  )
}

export default AnalyticsGraph;

