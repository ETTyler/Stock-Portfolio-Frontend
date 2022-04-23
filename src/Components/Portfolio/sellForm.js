import React from "react";
import ReactDOM from 'react-dom';
import { useFormik } from 'formik';
import * as yup from 'yup';
import Button from '@material-ui/core/Button';
import TextField from '@mui/material/TextField';
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
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
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
  cursor: 'pointer',
  marginTop: '5%'
}

const SellForm = ( {stockData, handleClose, setIsUpdated} ) => {
  const [date, setDate] = useState(null)
  const [checked, setChecked] = useState(false);

  const handleChange = (event) => {
    setChecked(event.target.checked);
  }
  
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    const url = `http://localhost:3001/api/sale/new`
    if (checked) {
      const userData = {
        transactionID: stockData.transactionID,
        saleDate: date,
        salePrice: false,
        sharesSold: data.get('shares'),
        value: stockData.value,
        shares: stockData.shares,
        ticker: stockData.ticker,
        userID: stockData.userID
      }
      axios.post(url, userData)
        .then(res => { 
          console.log(res)
          setIsUpdated(true)
          handleClose()
        })
        .catch(err => console.log(err.data))
    }
    else {
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
      axios.post(url, userData)
        .then(res => { 
          console.log(res)
          setIsUpdated(true)
          handleClose()
        })
        .catch(err => console.log(err.data))
    }
  }
    return (
      <div>
      <form onSubmit={handleSubmit} autoComplete="off">
        <TextField name="shares" label="Shares" variant="outlined" type="number" inputProps={{min: 1, max: Number(stockData.shares)}}fullWidth style={{marginTop: "5%"}} required/>
        <div style={{marginTop: "5%"}}>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DatePicker
            label="Date"
            name="date"
            value={date}
            onChange={(newValue) => {
              setDate(newValue);
            }}
            renderInput={(params) => <TextField {...params} required/>}
          />
        </LocalizationProvider>
        </div>
        <FormGroup style={{marginTop: "5%"}}>
          <FormControlLabel control={<Checkbox checked={checked} onChange={handleChange} />} label="Use Current Price"/>
          {!checked && (
            <TextField name="price" label="Price" variant="outlined" type="number" fullWidth style={{marginTop: "5%"}} />
          )}
        </FormGroup>
        <input type="submit" value="Submit" style={style}/>
      </form>
      </div>
    )   
}

export default SellForm;