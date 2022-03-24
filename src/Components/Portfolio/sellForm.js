import React from "react";
import ReactDOM from 'react-dom';
import { useFormik } from 'formik';
import * as yup from 'yup';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import axios from "axios";
import { useState, useEffect } from 'react';
import IconButton from '@mui/material/IconButton';
import Input from '@mui/material/Input';
import FilledInput from '@mui/material/FilledInput';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';
import jwt_decode from "jwt-decode";

const style = {
  position: 'relative',
  boxSizing: 'borderBox',
  background: 'white',
  color: '#3f51b5',
  border: '1px solid rgba(63, 81, 181, 0.5)',
  minWidth: '64px',
  height: '2.2rem',
  width: '100%',
  borderRadius: '4px',
  textTransform: 'uppercase',
  verticalAlign: 'middle',
  fontFamily: 'Inter',
  fontSize: '0.875rem',
  cursor: 'pointer'
}

const SellForm = ( {stockData, handleClose, setIsUpdated} ) => {
  const [date, setDate] = useState(null)
  
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    const url = `http://localhost:3001/api/sale/new`
    const userData = {
      transactionID: stockData.transactionID,
      saleDate: date,
      salePrice: data.get('price'),
      sharesSold: data.get('shares'),
      value: stockData.value,
      shares: stockData.shares,
      ticker: stockData.ticker,
      userID: stockData.userID
    }
    console.log(userData)
    axios.post(url, userData)
      .then(res => { 
        console.log(res)
        setIsUpdated(true)
        handleClose()
      })
      .catch(err => console.log(err.data))
  }
  
    return (
      <div>
      <form onSubmit={handleSubmit}>
        <TextField name="shares" label="Shares Sold" variant="standard" fullWidth style={{marginBottom: "5%"}} />
        <br/>
        <TextField name="price" label="Price Sold At" variant="standard" fullWidth style={{marginBottom: "5%"}}
        />
        <div style={{marginBottom: "5%"}}>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DatePicker
            label="Date Sold"
            name="date"
            value={date}
            onChange={(newValue) => {
              setDate(newValue);
            }}
            renderInput={(params) => <TextField {...params} />}
          />
        </LocalizationProvider>
        </div>
        <input type="submit" value="Submit" style={style}/>
      </form>
      </div>
    )   
}

export default SellForm;