import * as React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import styled from 'styled-components'
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardSharpIcon from '@mui/icons-material/ArrowDownwardSharp';
import { useState, useEffect} from 'react';
import Container from '@mui/material/Container';
import ContactlessSharpIcon from '@mui/icons-material/ContactlessSharp';
import axios from 'axios';
import Modal from '@mui/material/Modal';

const SetColours = ({percent}) => {
  if (percent > 0) {
    return(
      <>
        <Typography variant="body1" component="div" sx={{color:'#1976d2'}}>
          +{percent}%
        </Typography>
      </>
    )
  }
  return (
    <>
      <Typography variant="body1" component="div" sx={{color:'#1976d2'}}>
        {percent}%
      </Typography>
    </>
  )
}

const Friend = ({ data }) => {
  return (
    <div style={{display: 'flex', flexDirection: 'row', padding: '1.2%', width: 'max-content', alignItems: 'center'}}>
      <Avatar alt={data.name} src="/static/images/avatar/1.jpg" sx={{ width: 50, height: 50 }} />
    <div style={{display: 'flex', flexDirection: 'column', paddingLeft: 10}}>
      <Typography variant="body1" component="div">
        {data.name}
      </Typography>
      <SetColours percent={data.percent} />
    </div>
  </div>
  )
}

export default Friend;
