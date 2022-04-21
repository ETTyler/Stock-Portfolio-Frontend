import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import styled from 'styled-components'
import { useState, useEffect } from 'react'; 
import { useContext } from 'react';
import { GraphContext } from './statistics';
import Tooltip from '@mui/material/Tooltip';

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
  else {
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
  const [isClicked, setisClicked] = useState(false)

  useEffect(() => {
    if (chosenGraph === stock.Name) {
      setTooltip('Hide')
      setisClicked(true)
    }
    else {
      setTooltip('Show')
      setisClicked(false)
    }
  }, [chosenGraph, stock.Name])
  
  const handleClick = (event) => {
    event.preventDefault()
    if (chosenGraph === stock.Name) {
      setChosenGraph('Portfolio')
      setTooltip('Show')
      setisClicked(false)
    }
    else {
      setChosenGraph(stock.Name)
      setTooltip('Hide')
      setisClicked(true)
    }
  }

  return (
    <StockHover active={isClicked}>
    <Tooltip title={tooltip+" "+stock.Name+" Graph"}>
    <button onClick={handleClick} style={{all: 'unset', cursor: 'pointer'}}>
    <Card sx={{ display: 'flex', alignItems: 'center', width: '16vw', height: '16vh', borderRadius: 5}}>
      <FlexStock>
      <CardContent sx={{ flex: '0 1 auto', display: 'flex'}}>
      <img alt={stock.Name} style={{borderRadius: 5}} src={`${stock.LogoURL}?size=30`}></img>
        <Typography component="div" variant="h6">
          &nbsp;{stock.Name}
        </Typography>
      </CardContent>
      <CardContent sx={{ flex: '0 1 auto'}}>
        <Typography component="div" variant="h6" sx={{color: '#1976d2'}}>
          {stockValue.toLocaleString('en-US', {
            style: 'currency',
            currency: 'USD',
          })}
        </Typography>
      </CardContent>
      </FlexStock>
      <CardContent sx={{ flex: '1 1 auto', display: 'flex'}}>
        <FlexStock>
          <Typography component="div" variant="h6" sx={{color: '#1976d2'}}>
            {stock.Ticker}
          </Typography>
          <Typography component="div" variant="body2">
            <SetColours percentageChange={percentageChange} />
          </Typography>
        </FlexStock>
      </CardContent>
      </Card>
      </button>
      </Tooltip>
      </StockHover>
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
const StockHover = styled.div`
  padding: 1px;
  &:hover {
    transform: translateY(-10px);
  }
  transform: ${props => (props.active ? "translateY(-10px)" : "translateY(+0px)")};
`