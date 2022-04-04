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
import axios from 'axios';
import jwt_decode from "jwt-decode";
import { createContext, useContext } from 'react';
import Differential from './differential';
import InfoBar from './infoBar';
import AnalyticsGraph from './analyticsGraph';

const Analytics = () => {
  const token = localStorage.getItem('token')
  const decodedToken = jwt_decode(token)

  return (
      <Box 
        sx={{ 
          padding: 2,
          px: 10,
          maxWidth: '100%',
          width: 'auto',
          display: 'grid',
          gridTemplateRows: 'auto',
          gridTemplateColumns: 'repeat(3, 1fr)',
          justifyContent: 'center',
          gap: 3,
          rowGap: 1,
          gridTemplateAreas: `"infoBar infoBar friends"
          "graph graph friends"
          "stocksInfo stocksInfo friends"`
        }}
      >
        <Paper elevation={0} sx={{
          gridArea: 'infoBar', 
          height: '15vh', 
          width: '65vw', 
          maxWidth: '75vw',
          overflowY: 'hidden',
          overflowX: 'auto',
          display: 'flex', 
          flexDirection: 'row', 
          justifySelf: 'center', 
          alignItems: 'center', 
          justifyContent: 'center',
          gap: '1vw'
        }}>
          <InfoBar userID={decodedToken} />
          <Differential userID={decodedToken}/>
        </Paper>
        <Paper elevation={3} sx={{
          gridArea: 'friends', 
          height: '88vh', 
          width: '30vw', 
          maxWidth: '95vw',
          overflowY: 'hidden',
          overflowX: 'auto',
          display: 'flex', 
          flexDirection: 'row', 
          justifySelf: 'center', 
          alignItems: 'center', 
          justifyContent: 'center',
          borderRadius: 6
        }}>
          hello
        </Paper>
        <Paper elevation={6} sx={{
          gridArea: 'graph', 
          height: '55vh', 
          padding: 1,
          borderRadius: 6
        }}>
          <AnalyticsGraph userID={decodedToken}/>
        </Paper>
        <Paper elevation={3} sx={{
          gridArea: 'stocksInfo', 
          height: '15vh', 
          width: '65vw', 
          maxWidth: '95vw',
          overflowY: 'hidden',
          overflowX: 'auto',
          display: 'flex', 
          flexDirection: 'row', 
          justifySelf: 'center', 
          alignItems: 'center', 
          justifyContent: 'center',
          borderRadius: 6
        }}>
            Hello
        </Paper>
      </Box>
  )
}

export default Analytics;
