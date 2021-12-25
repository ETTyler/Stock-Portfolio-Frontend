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
import PortfolioValue from './portfolioValue';


const Portfolio = () => {
  const [upDown, setUpDown] = useState(Boolean)
  
  return (
    <Box sx={{ flexGrow: 1, mt: "2rem" }}>
      <Grid container textAlign="center" >
        <Grid item xs>
          <Button size="medium" variant="outlined">Add New</Button>
        </Grid>
        <Grid item xs={6}>
          <CenterBox>
            <PortfolioValue/>
          </CenterBox>
        </Grid>
        <Grid item xs>
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