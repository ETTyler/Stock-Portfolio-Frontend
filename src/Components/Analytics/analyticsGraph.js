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

const AnalyticsGraph = ({ userID }) => {
  const [graphData, setGraphData] = useState([])
  const id = userID.id
  const [isLoading, setLoading] = useState(true)

  useEffect(() => {
      axios
      .get(`http://localhost:3001/api/stocks/history/${id}`)
      .catch(error => {
        console.log(error.toJSON());
      })
      .then(response => {
        setGraphData(response.data)
        setLoading(false)
      })
  },[])

  if (isLoading) {
    return <div>Loading...</div>;
  }
  
  const options = {
    chart: {
      height: (6.6 / 16 * 100) + '%'
    },
    title: {
        text: ''
      },
      series: [{
        name: 'Portfolio',
        data: graphData,
        tooltip: {
          valueDecimals: 2,
        }
      }, /*
      {
        name: 'S&P 500',
        data: data[0,1],
        tooltip: {
          valueDecimals: 2
        }
      },
      {
        name: 'AAPL',
        data: data[0,2],
        tooltip: {
          valueDecimals: 2
        }
      } */]
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

