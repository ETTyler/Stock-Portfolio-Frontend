import * as React from 'react';
import Typography from '@mui/material/Typography';
import DatePicker from '@mui/lab/DatePicker';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import TextField from '@material-ui/core/TextField';
import { useState, useEffect } from 'react'; 
import axios from 'axios';
import Friend from './friend';

const SideBar = () => {
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
    .get(`/api/stocks/analytics/friends`, config)
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
    .get(`/api/stocks/analytics/friends/${date}`, config)
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
      <div style={{height: 'auto', maxHeight:'33vh', overflowY:'auto', width: '20vw', paddingBottom: '5%'}}>
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
      <div style={{height: 'auto', maxHeight:'33vh', overflowY:'auto', width: '20vw'}}>
        {dateFriends.map((friend) => (
          <Friend key={friend.name} data={friend} />
        ))}  
      </div>
    </>
  )
}

export default SideBar;
