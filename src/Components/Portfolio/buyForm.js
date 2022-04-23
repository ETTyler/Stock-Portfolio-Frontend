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
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
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
  height: '2.4rem',
  width: '100%',
  borderRadius: '4px',
  textTransform: 'uppercase',
  verticalAlign: 'middle',
  fontFamily: 'Inter',
  fontSize: '0.875rem',
  cursor: 'pointer',
  marginTop: '5%',
}

const BuyForm = ({ handleClose, setIsUpdated }) => {
  const [stocks, setStocks] = useState([])
  const [value, setValue] = useState(null)
  const [stockName, setStockName] = useState([])
  const [checked, setChecked] = useState(false)
  const [checked2, setChecked2] = useState(false);

  const handleChange = (event) => {
    setChecked(event.target.checked);
  }

  const handleChange2 = (event) => {
    setChecked2(event.target.checked);
  }
  
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
    if (checked) {
      const userData = {
        userID: decodedToken.id,
        ticker: stockName.ticker,
        date: new Date(),
        price: 'current',
        shares: data.get('shares')
      }
      axios.post(url, userData)
      .then(res => { 
        handleClose()
        setIsUpdated(true)
      })
      .catch(err => console.log(err.data))
    }
    else if (checked2) {
      const userData = {
        userID: decodedToken.id,
        ticker: stockName.ticker,
        date: value,
        price: 'historical',
        shares: data.get('shares')
      }
      axios.post(url, userData)
      .then(res => { 
        handleClose()
        setIsUpdated(true)
      })
      .catch(err => console.log(err.data))
    }
    else {
      const userData = {
        userID: decodedToken.id,
        ticker: stockName.ticker,
        date: value,
        price: data.get('price'),
        shares: data.get('shares')
      }
      axios.post(url, userData)
      .then(res => { 
        handleClose()
        setIsUpdated(true)
      })
      .catch(err => console.log(err.data))
    }
  }

    return (
      <div>
      <form onSubmit={handleSubmit} autoComplete="off">
        <Autocomplete
          id="stock"
          name="stock"
          label="stock"
          options={stocks}
          renderInput={(params) => <TextField {...params} label="Stock" variant="outlined" required/>}
          sx={{paddingTop: '5%'}}
          onChange={(event, value) => setStockName(value)}
        />
        <div style={{marginTop: "5%"}}>
          <TextField name="shares" label="Shares" variant="outlined" type="number" required fullWidth  />
        </div>
        <FormGroup sx={{marginTop: "5%"}}>
          <FormControlLabel control={<Checkbox checked={checked} onChange={handleChange} />} label="Use Current Price and Date"/>
          {!checked && (
            <>
            <div style={{ marginTop: "5%" }}>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker
                  label="Date"
                  name="date"
                  value={value}
                  fullWidth
                  onChange={(newValue) => {
                    setValue(newValue);
                  }}
                  renderInput={(params) => <TextField {...params} variant="outlined" required />} />
              </LocalizationProvider>
              <FormControlLabel control={<Checkbox checked={checked2} onChange={handleChange2} />} label="Use Price on Date Selected" sx={{ marginTop: '5%' }}/>
              {!checked2 && (
                <TextField name="price" label="Price" variant="outlined" type="number" fullWidth style={{ marginTop: '5%' }} />
              )}
            </div>
            </>
          )}
        </FormGroup>
        <input type="submit" value="Submit" style={style}/>
      </form>
      </div>
    )
};

export default BuyForm;

