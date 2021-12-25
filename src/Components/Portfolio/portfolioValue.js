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

const portfolioValue = 10033.23
const portfolioDifference = -2234.03

const SetColours = ({portfolioDifference, portfolioValue}) => {
  if (portfolioDifference > 0) {
    return(
      <>
        <Typography variant="h3">
          £{portfolioValue.toLocaleString()} <ArrowUpwardIcon fontSize='large' sx={{color: "greenyellow"}}/>
        </Typography>
        <Typography variant="body1" sx={{color: "greenyellow"}}>
          Up by £{portfolioDifference.toLocaleString()}
        </Typography>
      </>
    )
  }
  return (
    <>
      <Typography variant="h3">
        £{portfolioValue.toLocaleString()} <ArrowDownwardSharpIcon fontSize='large' sx={{color: "red"}}/>
      </Typography>
      <Typography variant="body1" sx={{color: "red"}}>
        Down by £{Math.abs(portfolioDifference).toLocaleString()}
      </Typography>
    </>
  )
}

const PortfolioValue = () => {
  return (
    <Card sx={{ width: "auto", height: "auto", p: 2, px: 8}}>
    <CardContent>
      <SetColours portfolioDifference={portfolioDifference} portfolioValue={portfolioValue}/>
    </CardContent>
  </Card>
  )
}

export default PortfolioValue;