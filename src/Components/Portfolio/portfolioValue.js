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
import { useState } from 'react';

const SetColours = ({portfolioDifference, portfolioValue}) => {
  if (portfolioDifference > 0) {
    return(
      <>
        <Typography variant="h3">
          {portfolioValue.toLocaleString('en-US', {
            style: 'currency',
            currency: 'USD',
          })} <ArrowUpwardIcon fontSize='large' sx={{color: "#3fcc6f"}}/>
        </Typography>
        <Typography variant="body1" sx={{color: "#3fcc6f"}}>
          Up by {portfolioDifference.toLocaleString('en-US', {
            style: 'currency',
            currency: 'USD',
          })}
        </Typography>
      </>
    )
  }
  return (
    <>
      <Typography variant="h3">
        {portfolioValue.toLocaleString('en-US', {
          style: 'currency',
          currency: 'USD',
        })} <ArrowDownwardSharpIcon fontSize='large' sx={{color: "#fd6e70"}}/>
      </Typography>
      <Typography variant="body1" sx={{color: "#fd6e70"}}>
        Down by {Math.abs(portfolioDifference).toLocaleString('en-US', {
          style: 'currency',
          currency: 'USD',
        })}
      </Typography>
    </>
  )
}

const PortfolioValue = ( {data} ) => {

  const portfolioValue = data.reduce((total, stock) => 
    total + Number(stock.value), 0
  )
  const originalValue = data.reduce((total, stock) => 
    total + Number(stock.priceBought*stock.shares), 0
  )
  
  return (
    <Card sx={{ width: "auto", height: "auto", p: 2, px: 8}}>
      <CardContent>
        <SetColours portfolioDifference={portfolioValue-originalValue} portfolioValue={portfolioValue}/>
      </CardContent>
    </Card>
  )
}

export default PortfolioValue;