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

const SetColours = ({percentageChange}) => {
  if (percentageChange > 0) {
    return(
      <>
        <Typography component="div" variant="body" sx={{color: '#3fcc6f', display: 'flex', justifyContent: 'flex-end' }}>
          +{percentageChange}%
        </Typography>
      </>
    )
  }
  return (
    <>
      <Typography component="div" variant="body" sx={{color: '#fd6e70', display: 'flex', justifyContent: 'flex-end' }}>
        {percentageChange}%
      </Typography>
    </>
  )
}

const StockOverview = ({ stock }) => {
  console.log(stock)
  const stockValue = Number(stock.value)
  const originalValue = Number(stock.shares*stock.priceBought)
  const percentageChange = (((stockValue - originalValue) / originalValue) * 100).toFixed(2)

  return (
    <div style={{padding: 11}}>
    <Card sx={{ display: 'flex', alignItems: 'center', width: '30vh', height: '16vh', borderRadius: 5}}>
      <FlexStock>
      <CardContent sx={{ flex: '0 1 auto', display: 'flex'}}>
      <img sx={{borderRadius: '10%', pr: 5}} src={`${stock.LogoURL}?size=30`}></img>
        <Typography component="div" variant="h6">
          &nbsp;{stock.Name}
        </Typography>
      </CardContent>
      <CardContent sx={{ flex: '0 1 auto'}}>
        <Typography component="div" variant="h6">
          {stockValue.toLocaleString('en-US', {
            style: 'currency',
            currency: 'USD',
          })}
        </Typography>
      </CardContent>
      </FlexStock>
      <CardContent sx={{ flex: '1 1 auto', display: 'flex'}}>
        <FlexStock>
          <Typography component="div" variant="h6">
            {stock.Ticker}
          </Typography>
          <Typography component="div" variant="body2">
            <SetColours percentageChange={percentageChange} />
          </Typography>
          <Typography component="div" variant="body">
      
        </Typography>
        </FlexStock>
      </CardContent>
      </Card>
      </div>

  )
}

export default StockOverview;


const FlexStock = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
  gap: 0;
`