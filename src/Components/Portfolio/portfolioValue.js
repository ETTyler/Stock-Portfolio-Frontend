import * as React from 'react';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardSharpIcon from '@mui/icons-material/ArrowDownwardSharp';

const SetColours = ({portfolioDifference, portfolioValue}) => {
  if (portfolioDifference > 0) {
    return (
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
    <Paper elevation={1} sx={{ width: "auto", height: "auto", p: 5, px: 10, borderRadius: 4}}>
      <SetColours portfolioDifference={portfolioValue-originalValue} portfolioValue={portfolioValue}/>
    </Paper>
  )
}

export default PortfolioValue;