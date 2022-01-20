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
import PortfolioValue from './portfolioValue';
import Stock from './Stock';
import AddIcon from '@mui/icons-material/Add';
import axios from 'axios';
import jwt_decode from "jwt-decode";
import Modal from '@mui/material/Modal';
import BuyForm from './buyForm';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '30rem',
  bgcolor: 'background.paper',
  border: '2px solid #1976d2',
  boxShadow: 24,
  p: 5,
  borderRadius: '5%'
};

const Portfolio = () => {

  const [stockData, setStockData] = useState([])
  const [isLoading, setLoading] = useState(true)
  const [open, setOpen] = useState(false);
  
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const token = localStorage.getItem('token')
  const decodedToken = jwt_decode(token)

  useEffect(() => {
    axios.all([
      axios.get(`http://localhost:3001/api/stocks/update`),
      axios.get(`http://localhost:3001/api/stocks/info/${decodedToken.id}`)
    ])
    .then(axios.spread((res1, res2) => {
      setStockData(res2.data)
      setLoading(false)
    }))
  }, [])

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <Box sx={{ flexGrow: 1, mt: "2rem" }}>
      <Grid container textAlign="center" >
        <Grid item xs={12}>
          <CenterBox>
            <PortfolioValue data={stockData}/>
          </CenterBox>
        </Grid>
        <Grid item xs={12} sx={{ mt: "2rem" }}>
          <Button onClick={handleOpen} size="medium" variant="outlined" startIcon={<AddIcon />} sx={{mr: '26.5rem'}}>Add New</Button>
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              <Typography id="modal-modal-title" variant="h6" component="h2">
                Add New Stock Purchase
              </Typography>
              <BuyForm />
            </Box>
          </Modal>
          {stockData.map((stock) => (
            <Stock key={stock.ticker} data={stock}/>
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