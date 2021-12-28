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
import Container from '@mui/material/Container';
import ContactlessSharpIcon from '@mui/icons-material/ContactlessSharp';

const Stock = () => {
  return (
    <Container maxWidth="sm">
      <View>
        <Card sx={{ display: 'flex', alignItems: 'center', p: 0, px: 0}}>
          <CardContent sx={{ flex: '0 1 auto', display: 'flex' }}>
            <ContactlessSharpIcon fontSize="large"/>
          </CardContent>
          <CardContent sx={{ flex: '20 1 auto', display: 'flex', justifyItems: "flex-start"}}>
            <FlexStock>
            <Typography component="div" variant="h5">
              Apple 
            </Typography>
            <Typography component="div" variant="body">
              5 shares
            </Typography>
            </FlexStock>
          </CardContent>
          <CardContent sx={{ flex: '0 1 auto'}}>
            <FlexPrice>
            <Typography component="div" variant="h5">
              £12,077.32
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
