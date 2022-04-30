import * as React from 'react';
import Box from '@mui/material/Box';
import { useState, useEffect } from 'react'; 
import Highcharts from 'highcharts/highstock';
import HighchartsReact from 'highcharts-react-official'
import axios from 'axios';
import { GraphContext } from './statistics';
import { useContext } from 'react';
import CircularProgress from '@mui/material/CircularProgress';

const StatsGraph = () => {
  const [graphData, setGraphData] = useState([])
  const { chosenGraph } = useContext(GraphContext)
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
      .get(`/api/stocks/graph/${chosenGraph}`, config)
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
      .get(`/api/stocks/history`, config)
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
    return (
      <Box sx={{ display: 'flex', height: '60vh', alignItems: 'center', justifyContent: 'center' }}>
        <CircularProgress />
      </Box>
    )
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

