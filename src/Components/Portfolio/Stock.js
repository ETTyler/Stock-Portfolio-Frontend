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
import Modal from '@mui/material/Modal';
import SellForm from './sellForm';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '20rem',
  bgcolor: 'background.paper',
  border: '2px solid #1976d2',
  boxShadow: 24,
  p: 4,
  borderRadius: '5%'
};


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

const Stock = ( { data, setIsUpdated } ) => {
  const stockValue = Number(data.value)
  const originalValue = Number(data.shares*data.priceBought)
  const percentageChange = (((stockValue - originalValue) / originalValue) * 100).toFixed(2)
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true)
  }
  const handleClose = () => {
    setOpen(false)
  }


  return (
    <Container maxWidth="sm">
      <View>
        <Card sx={{ display: 'flex', alignItems: 'center', p: 0, px: 0}}>
          <CardContent sx={{ flex: '0 1 auto', display: 'flex' }}>
            <img style={{borderRadius: 8}} src={`${data.LogoURL}?size=45`}></img>
          </CardContent>
          <CardContent sx={{ flex: '20 1 auto', display: 'flex', justifyItems: "flex-start"}}>
            <FlexStock>
              <Typography component="div" variant="h6">
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
          <CardContent sx={{ flex: '0 1 auto', '.MuiCardContent-root&:last-child': {'padding-bottom': 15}}}>
            <Button size="medium" onClick={handleOpen} variant="outlined">Sell</Button>
            <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              <Typography id="modal-modal-title" variant="h6" component="h2">
                Sell Stock
              </Typography>
              <SellForm stockData={data} handleClose={handleClose} setIsUpdated={setIsUpdated}/>
            </Box>
          </Modal>
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
