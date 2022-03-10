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

const StatsGraph = ({ userID }) => {
  const [data, setData] = React.useState([])
  const id = userID.id

  useEffect(() => {
    axios
      .get(`http://localhost:3001/api/stocks/history/${id}`)
      .catch(error => {
        console.log(error.toJSON());
      })
      .then(response => {
        setData(response.data)
      })
  },[])


  const options = {
    chart: {
      height: (8 / 16 * 100) + '%' 
    },
      title: {
        text: 'Portfolio Value'
      },
      series: [{
        name: 'Portfolio',
        data: data,
        tooltip: {
          valueDecimals: 2
        }
      }, /*
      {
        name: 'TSLA',
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
      sx={{height: 'max'}}
      highcharts={Highcharts}
      constructorType={'stockChart'}
      options={options}
    />
  )
}

export default StatsGraph;

