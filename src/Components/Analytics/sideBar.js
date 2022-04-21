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
import Avatar from '@mui/material/Avatar';
import DatePicker from '@mui/lab/DatePicker';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import TextField from '@material-ui/core/TextField';
import { useState, useEffect } from 'react'; 
import { grid } from '@mui/system';
import { Paper } from '@mui/material';
import axios from 'axios';
import jwt_decode from "jwt-decode";
import { createContext, useContext } from 'react';
import Friend from './friend';

const SideBar = ({ userID }) => {
  const [friends, setFriends] = useState()
  const [dateFriends, setDateFriends] = useState()
  const [isLoading, setLoading] = useState(true)
  const [value, setValue] = useState(null)
  const token = localStorage.getItem('token')

  useEffect(() => {
    const config = {
      headers: {
        Authorization: token
      }
    }
    axios
    .get(`http://localhost:3001/api/stocks/analytics/friends`, config)
    .catch(error => {
      console.log(error.toJSON());
    })
    .then(response => {
      setFriends(response.data)
      setDateFriends(response.data)
      setLoading(false)
    })
  },[token])

  const dateChange = (value) => {
    const config = {
      headers: {
        Authorization: token
      }
    }
    const date = new Date(value).toISOString().split('T')[0]
    axios
    .get(`http://localhost:3001/api/stocks/analytics/friends/${date}`, config)
    .catch(error => {
      console.log(error.toJSON());
    })
    .then(response => {
      setDateFriends(response.data)
      setLoading(false)
    })
  }

  const disableWeekends = (date) => {
    return date.getDay() === 0 || date.getDay() === 6 || date > new Date()
  }
  
  if(isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Typography variant="h5" component="div" sx={{paddingBottom: 1, color:'#1976d2'}}>
        Friends
      </Typography>
      <Typography variant="h6" component="div">
        All Time
      </Typography>
      <div style={{height: 'auto', maxHeight:'33vh', overflowY:'auto', width: '25vw', paddingBottom: '5%'}}>
        {friends.map((friend) => (
          <Friend key={friend.name} data={friend} />
        ))}
      </div>
      <div style={{display: 'flex', flexDirection: 'row', alignItems:'flex-end', gap: '5%', paddingBottom: '2%'}}>
        <Typography variant="h6" component="div">
          From         
        </Typography>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DatePicker
            label="Select Date"
            name="date"
            value={value}
            shouldDisableDate={disableWeekends}
            onChange={(newValue) => {
              setValue(newValue)
              dateChange(newValue)
            }}
            renderInput={(params) => <TextField {...params} />}
          />
        </LocalizationProvider>
      </div>
      <div style={{height: 'auto', maxHeight:'33vh', overflowY:'auto', width: '25vw'}}>
        {dateFriends.map((friend) => (
          <Friend key={friend.name} data={friend} />
        ))}  
      </div>
    </>
  )
}

export default SideBar;
