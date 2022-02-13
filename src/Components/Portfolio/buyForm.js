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

const BuyForm = ({ handleClose}) => {
  const [stocks, setStocks] = useState([])
  const [value, setValue] = useState(null)
  const [stockName, setStockName] = useState([])
  
  useEffect(() => {
    axios
      .get(`http://localhost:3001/api/stocks/info`)
      .then(response => {
        setStocks(response.data)
      })
  }, [])

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const token = localStorage.getItem('token')
    const decodedToken = jwt_decode(token)

    const url = `http://localhost:3001/api/purchases/new/`
    const userData = {
      userID: decodedToken.id,
      ticker: stockName.ticker,
      date: value,
      price: data.get('price'),
      shares: data.get('shares')
    }
    console.log(userData)
    axios.post(url, userData)
      .then(res => { 
        handleClose()
      })
      .catch(err => console.log(err.data))
  }

    return (
      <div>
      <form onSubmit={handleSubmit}>
        <Autocomplete
          id="stock"
          name="stock"
          label="stock"
          options={stocks}
          renderInput={(params) => <TextField {...params} label="Stock" />}
          style={{marginBottom: "5%"}}
          onChange={(event, value) => setStockName(value)}
        />
        <TextField name="shares" label="Shares" variant="standard" fullWidth style={{marginBottom: "5%"}} />
        <br/>
        <TextField name="price" label="Price Bought At" variant="standard" fullWidth style={{marginBottom: "5%"}}
        />
        <div style={{marginBottom: "5%"}}>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DatePicker
            label="Date Bought"
            name="date"
            value={value}
            onChange={(newValue) => {
              setValue(newValue);
            }}
            renderInput={(params) => <TextField {...params} />}
          />
        </LocalizationProvider>
        </div>
        <input type="button" value="Submit" style={style}/>
      </form>
      </div>
    )
};

export default BuyForm;

