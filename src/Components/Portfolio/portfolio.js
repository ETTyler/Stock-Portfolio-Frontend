import * as React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import styled from 'styled-components'
import { useState, useEffect } from 'react';
import PortfolioValue from './portfolioValue';
import Stock from './Stock';
import AddIcon from '@mui/icons-material/Add';
import axios from 'axios';
import Modal from '@mui/material/Modal';
import BuyForm from './buyForm';
import CircularProgress from '@mui/material/CircularProgress';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '25rem',
  bgcolor: 'background.paper',
  border: '2px solid #1976d2',
  boxShadow: 20,
  p: 5,
  borderRadius: '5%'
};

const Portfolio = () => {
  const [stockData, setStockData] = useState([])
  const [isLoading, setLoading] = useState(true)
  const [isUpdated, setIsUpdated] = useState(false)
  const [open, setOpen] = useState(false)
  
  const handleOpen = () => {
    setOpen(true)
  }
  const handleClose = () => {
    setOpen(false)
  }

  const token = localStorage.getItem('token')
  useEffect(() => {
    const config = {
      headers: {
        Authorization: token
      }
    }
    axios.get(`/api/stocks/update`, config)
    .then(res => {
      axios.get(`/api/stocks/information`, config)
      .then(res => {
        setStockData(res.data)
        setLoading(false)
        setIsUpdated(false)
      })
    })
  }, [isUpdated, token])

  if (isLoading) {
    return (
      <Box sx={{ display: 'flex', alignItems: 'center', height: '90vh', justifyContent: 'center' }}>
        <CircularProgress />
      </Box>
    )
  }

  return (
    <Box sx={{ flexGrow: 1, mt: "2rem", paddingBottom: 2 }}>
      <Grid container textAlign="center" >
        <Grid item xs={12}>
          <CenterBox>
            <PortfolioValue data={stockData}/>
          </CenterBox>
        </Grid>
        <Grid item xs={12} sx={{ mt: "1rem" }}>
          <Button onClick={handleOpen} size="medium" variant="outlined" startIcon={<AddIcon />}>Purchase</Button>
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              <Typography id="modal-modal-title" variant="h6" component="div" sx={{color: '#1976d2'}}>
                New Purchase
              </Typography>
              <BuyForm handleClose={handleClose} setIsUpdated={setIsUpdated}/>
            </Box>
          </Modal>
          {stockData.map((stock) => (
            <Stock key={stock.transactionID} data={stock} setIsUpdated={setIsUpdated}/>
          ))}
        </Grid>
      </Grid>
    </Box>
  )
}

export default Portfolio;

const CenterBox = styled.div`
  display: flex;
  justify-content: center;
`