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
import { grid, style } from '@mui/system';
import { Paper } from '@mui/material';
import Highcharts from 'highcharts/highstock';
import HighchartsReact from 'highcharts-react-official'
import axios from 'axios';
import { GraphContext } from './statistics';
import { useContext, createContext } from 'react';

const StatsGraph = ({ userID }) => {
  const [graphData, setGraphData] = useState([])
  const { chosenGraph, setChosenGraph } = useContext(GraphContext)
  const [isLoading, setLoading] = useState(true)
  const token = localStorage.getItem('token')

  useEffect(() => {
    const config = {
      headers: {
        Authorization: token
      }
    }
    if (chosenGraph !== "Portfolio") {
      axios
      .get(`http://localhost:3001/api/stocks/graph/${chosenGraph}`, config)
      .catch(error => {
        console.log(error.toJSON());
     })
      .then(response => {
        setGraphData(response.data)
        setLoading(false)
      })
    }
    else {
      axios
      .get(`http://localhost:3001/api/stocks/history`, config)
      .catch(error => {
        console.log(error.toJSON());
      })
      .then(response => {
        setGraphData(response.data)
        setLoading(false)
      })
    }
  },[chosenGraph, token])

  if (isLoading) {
    return <div>Loading...</div>;
  }
  
  const options = {
    chart: {
      height: (8.5 / 16 * 100) + '%' 
    },
      title: {
        text: chosenGraph
      },
      series: [{
        name: chosenGraph,
        data: graphData,
        tooltip: {
          valueDecimals: 2,
          valuePrefix: '$',
          valueSuffix: ' USD'
        }
      },]
  }

  return (
    <HighchartsReact
      highcharts={Highcharts}
      constructorType={'stockChart'}
      options={options}
    />
  )
}

export default StatsGraph;

