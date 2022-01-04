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
import PortfolioValue from './portfolioValue';
import Stock from './Stock';
import AddIcon from '@mui/icons-material/Add';
import axios from 'axios';
import jwt_decode from "jwt-decode";

const Portfolio = () => {

  const [stockData, setStockData] = useState([])
  const [isLoading, setLoading] = useState(true)

  const token = localStorage.getItem('token')
  const decodedToken = jwt_decode(token)
  console.log(decodedToken)

  useEffect(() => {
    axios
      .get(`http://localhost:3001/api/stocks/info/${decodedToken.id}`)
      .then(response => {
        console.log(response.data)
        setStockData(response.data)
        setLoading(false)
      })
  }, [])

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <Box sx={{ flexGrow: 1, mt: "2rem" }}>
      <Grid container textAlign="center" >
        <Grid item xs={12}>
          <CenterBox>
            <PortfolioValue data={stockData}/>
          </CenterBox>
        </Grid>
        <Grid item xs={12} sx={{ mt: "2rem" }}>
          <Button size="medium" variant="outlined" startIcon={<AddIcon />} sx={{mr: '26.5rem'}}>Add New</Button>
          {stockData.map((stock) => (
            <Stock key={stock.Ticker} data={stock}/>
          ))}
        </Grid>
      </Grid>
    </Box>
  )
}

export default Portfolio;

const CenterBox = styled.div`
  display: flex;
  justify-content: center;
`