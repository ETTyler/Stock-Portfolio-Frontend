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
import axios from 'axios';
import PropTypes from 'prop-types';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}


const StatsCharts = ({ userID }) => {
  const [value, setValue] = useState(0);
  const [data, setData] = useState([])
  const id = userID.id

  useEffect(() => {
    axios
      .get(`http://localhost:3001/api/stocks/insights/${id}`)
      .catch(error => {
        console.log(error.toJSON());
      })
      .then(response => {
        setData(response.data)
      })
  },[])
  
  const sectorOptions = {
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
        showInLegend: true
      }
    },
    series: [{
      name: 'Percentage',
      colorByPoint: true,
      data: data[0]
    }]
  }

  const typeOptions = {
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
        showInLegend: true
      }
    },
    series: [{
      name: 'Percentage',
      colorByPoint: true,
      data: data[1]
    }]
  }

  const posOptions = {
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
        showInLegend: true
      }
    },
    series: [{
      name: 'Percentage',
      colorByPoint: true,
      data: data[2]
    }]
  }

  const handleChange = (event, newValue) => {
    setValue(newValue);
  }

  return (
    <Investments>
      <Typography variant="h6" component="div">
        Investments By
      </Typography>
      <Box sx={{p: 1}}>
        <Tabs value={value} onChange={handleChange} aria-label="tabs">
          <Tab label="Sector" />
          <Tab label="Type" />
          <Tab label="Position" />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <PieChart highcharts={Highcharts} options={sectorOptions} />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <PieChart highcharts={Highcharts} options={typeOptions} />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <PieChart highcharts={Highcharts} options={posOptions} />
      </TabPanel>
    </Investments>
  )
}

export default StatsCharts;

const Investments = styled.div`
  padding: 5%;
`

