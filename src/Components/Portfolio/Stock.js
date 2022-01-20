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

const Stock = ( { data } ) => {
  const stockValue = Number(data.value)
  const originalValue = Number(data.shares*data.priceBought)
  const percentageChange = (((stockValue - originalValue) / originalValue) * 100).toFixed(2)

  return (
    <Container maxWidth="sm">
      <View>
        <Card sx={{ display: 'flex', alignItems: 'center', p: 0, px: 0}}>
          <CardContent sx={{ flex: '0 1 auto', display: 'flex' }}>
            <img sx={{borderRadius: '10%'}} src={`${data.LogoURL}?size=45`}></img>
          </CardContent>
          <CardContent sx={{ flex: '20 1 auto', display: 'flex', justifyItems: "flex-start"}}>
            <FlexStock>
              <Typography component="div" variant="h5">
                {data.Name} 
              </Typography>
              <Typography component="div" variant="body">
                ${data.ticker} - {data.shares} Shares
              </Typography>
            </FlexStock>
          </CardContent>
          <CardContent sx={{ flex: '0 1 auto'}}>
            <FlexPrice>
              <Typography component="div" variant="h6">
                {stockValue.toLocaleString('en-US', {
                  style: 'currency',
                  currency: 'USD',
                })}
              </Typography>
              <SetColours percentageChange={percentageChange} />
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
