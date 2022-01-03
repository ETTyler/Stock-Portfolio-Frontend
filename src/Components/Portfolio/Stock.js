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
import { useState, useEffect} from 'react';
import Container from '@mui/material/Container';
import ContactlessSharpIcon from '@mui/icons-material/ContactlessSharp';
import axios from 'axios';

const stockSite = "apple.com" 
const ticker = "AAPL"
const key = "2763b31a6eb31c17f34d03159506b46c"
const shares = 33

const Stock = () => {

  const [stockData, setStockData] = useState([])
  const [stockPrice, setStockPrice] = useState(0)
  const [stockName, setStockName] = useState()
  
  useEffect(() => {
    axios
      .get(`https://financialmodelingprep.com/api/v3/quote/${ticker}?apikey=${key}`)
      .then(response => {
        setStockData(response.data)
        setStockPrice(response.data[0].price*shares)
        setStockName(response.data[0].name)
      })
  }, [])

  return (
    <Container maxWidth="sm">
      <View>
        <Card sx={{ display: 'flex', alignItems: 'center', p: 0, px: 0}}>
          <CardContent sx={{ flex: '0 1 auto', display: 'flex' }}>
            <img sx={{borderRadius: '10%'}} src={`//logo.clearbit.com/${stockSite}?size=45`}></img>
          </CardContent>
          <CardContent sx={{ flex: '20 1 auto', display: 'flex', justifyItems: "flex-start"}}>
            <FlexStock>
            <Typography component="div" variant="h5">
              {stockName} 
            </Typography>
            <Typography component="div" variant="body">
              {shares} shares
            </Typography>
            </FlexStock>
          </CardContent>
          <CardContent sx={{ flex: '0 1 auto'}}>
            <FlexPrice>
            <Typography component="div" variant="h5">
              {stockPrice.toLocaleString('en-US', {
                style: 'currency',
                currency: 'GBP',
              })}
            </Typography>
            <Typography component="div" variant="body" sx={{color: '#3fcc6f' }}>
              +12.45%
            </Typography>
            </FlexPrice>
          </CardContent>
          <CardContent sx={{ flex: '0 1 auto', '.MuiCardContent-root&:last-child': {
            'padding-bottom': 15}}}>
            <Button size="medium" variant="outlined">Sell</Button>
          </CardContent>
        </Card>
      </View>
    </Container>
  )
}

export default Stock;

const View = styled.div`
  padding-top: 3%;
`

const FlexStock = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`
const FlexPrice = styled.div`
  display: flex;
  flex-direction: column;
`
