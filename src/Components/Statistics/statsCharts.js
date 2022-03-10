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
import PieChart from "highcharts-react-official";
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';


const options = {
  chart: {
    type: "pie",
    height: (14 / 16 * 100) + '%' 
  },
  title: {
    text: ""
  },
  credits: {
    enabled: false
  },
  plotOptions: {
    pie: {
      allowPointSelect: true,
      cursor: "pointer",
      dataLabels: {
        enabled: true
      },
      showInLegend: false
    }
  },
  series: [{
    name: 'Percentage',
    colorByPoint: true,
    data: [{
        name: 'Technology',
        y: 40
    }, {
        name: 'Finance',
        y: 20
    }, {
        name: 'Automotive',
        y: 10
    }, {
        name: 'Entertainment',
        y: 10
    }, {
        name: 'Energy',
        y: 10
    }, {
        name: 'Food & Drink',
        y: 10
    }]
}]
}

const StatsCharts = () => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  }

  return (
    <Investments>
      <Typography variant="h5" component="div">
        Investments By
      </Typography>
      <Box sx={{p: 1}}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
          <Tab label="Sector" />
          <Tab label="Type" />
          <Tab label="Position" />
        </Tabs>
      </Box>
      <PieChart highcharts={Highcharts} options={options} />
    </Investments>
  )
}

export default StatsCharts;

const Investments = styled.div`
  padding: 5%;
`

