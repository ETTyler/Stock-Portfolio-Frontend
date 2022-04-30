import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import styled from 'styled-components'
import { useState, useEffect } from 'react'; 
import Highcharts from 'highcharts/highstock';
import PieChart from "highcharts-react-official";
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import axios from 'axios';

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
        <Box sx={{ display: 'flex', alignItems: 'center' , justifyContent: 'center', p: 0}}>
          <div>{children}</div>
        </Box>
      )}
    </div>
  );
}


const StatsCharts = () => {
  const [value, setValue] = useState(0);
  const [data, setData] = useState([])
  const token = localStorage.getItem('token')

  useEffect(() => {
    const config = {
      headers: {
        Authorization: token
      }
    }
    axios
      .get(`/api/stocks/insights`, config)
      .catch(error => {
        console.log(error.toJSON());
      })
      .then(response => {
        setData(response.data)
      })
  },[token])
  
  const sectorOptions = {
    chart: {
      type: "pie",
      height: (12 / 16 * 100) + '%' 
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
      data: data[0],
      tooltip: {
        valueDecimals: 2,
        valueSuffix: '%'
      }
    }]
  }

  const typeOptions = {
    chart: {
      type: "pie",
      height: (12 / 16 * 100) + '%' 
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
      data: data[1],
      tooltip: {
        valueDecimals: 2,
        valueSuffix: '%'
      }
    }]
  }

  const posOptions = {
    chart: {
      type: "pie",
      height: (12 / 16 * 100) + '%' 
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
          enabled: true,
        },
        showInLegend: true
      }
    },
    series: [{
      name: 'Percentage',
      colorByPoint: true,
      data: data[2],
      tooltip: {
        valueDecimals: 2,
        valueSuffix: '%'
      }
    }]
  }

  const handleChange = (event, newValue) => {
    setValue(newValue);
  }

  return (
    <Investments>
      <Typography variant="h6" component="div" sx={{color: '#1976d2'}}>
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

