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
import { createContext, useContext } from 'react';
import { GraphContext } from './statistics';
import Tooltip from '@mui/material/Tooltip';

const SetColours = ({percentageChange, setValueColour}) => {
  if (percentageChange > 0) {
    setValueColour('#3fcc6f')
    return(
      <>
        <Typography component="div" variant="body" sx={{color: '#3fcc6f', display: 'flex', justifyContent: 'flex-end' }}>
          +{percentageChange}%
        </Typography>
      </>
    )
  }
  else {
    setValueColour('#fd6e70')
    return (
      <>
        <Typography component="div" variant="body" sx={{color: '#fd6e70', display: 'flex', justifyContent: 'flex-end' }}>
          {percentageChange}%
        </Typography>
      </>
    )
  }
}

const StockOverview = ({ stock }) => {
  const stockValue = Number(stock.value)
  const originalValue = Number(stock.shares*stock.priceBought)
  const percentageChange = (((stockValue - originalValue) / originalValue) * 100).toFixed(2)
  const { chosenGraph, setChosenGraph } = useContext(GraphContext)
  const [tooltip, setTooltip] = useState('Show')
  const [valueColour, setValueColour] = useState('')
  
  const handleClick = (event) => {
    event.preventDefault()
    if (chosenGraph === stock.Name) {
      setChosenGraph('Portfolio')
      setTooltip('Show')
    }
    else {
      setChosenGraph(stock.Name)
      setTooltip('Hide')
    }
  }

  return (
    <Tooltip title={tooltip+" "+stock.Name+" Graph"}>
    <a href='#' onClick={handleClick} style={{textDecoration: 'none'}}>
    <div style={{padding: 10}}>
    <Card sx={{ display: 'flex', alignItems: 'center', width: '30vh', height: '16vh', borderRadius: 5}}>
      <FlexStock>
      <CardContent sx={{ flex: '0 1 auto', display: 'flex'}}>
      <img sx={{borderRadius: '10%', pr: 5}} src={`${stock.LogoURL}?size=30`}></img>
        <Typography component="div" variant="h6">
          &nbsp;{stock.Name}
        </Typography>
      </CardContent>
      <CardContent sx={{ flex: '0 1 auto'}}>
        <Typography component="div" variant="h6" sx={{ color: valueColour }}>
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
            <SetColours percentageChange={percentageChange} setValueColour={setValueColour} />
          </Typography>
        </FlexStock>
      </CardContent>
      </Card>
      </div>
      </a>
      </Tooltip>

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