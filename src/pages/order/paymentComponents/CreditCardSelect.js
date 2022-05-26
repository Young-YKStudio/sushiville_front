import { useState, useEffect } from "react";

import { Button, Select, MenuItem, InputLabel, Grid, CircularProgress, Typography, TextField, FormControl } from '@mui/material';
import { formatCreditCardNumber, formatCVC, formatExpirationDate, formatZipCode } from "./CardUtils";
import { ThemeProvider } from '@mui/material/styles';
import theme from '../../../theme/theme';
import countries from '../../../Util/countries.json';
import states from '../../../Util/states.json';

function clearNumber(value = '') {
  return value.replace(/\D+/g, '');
}

function getCountOfDigits(str) {
  return str.replace(/[^0-9]/g, '').length;
}

const CreditCardSelect = (props) => {

  // states
  const [ loading, setLoading ] = useState(false);
  const [ cardFormOpen, setCardFormOpen ] = useState(false);
  const [ line1, setLine1 ] = useState('');
  const [ city, setCity ] = useState('');
  const [ state, setState ] = useState('');
  const [ country, setCountry ] = useState('');
  const [ name, setName ] = useState('');
  const [ brand, setBrand ] = useState('');
  const [ cvc, setCvc ] = useState('');
  const [ last4, setLast4 ] = useState('');
  const [ postal, setPostal ] = useState('');
  const [ number, setNumber ] = useState('');
  const [ exp, setExp ] = useState('');
  const [ expMonth, setExpMonth ] = useState();
  const [ expYear, setExpYear ] = useState();

  // handler
  const cardAddHandler = (e) => {
    setCardFormOpen(!cardFormOpen)
  }

  const nameInputHandler = (e) => {
    setName(e.currentTarget.value)
  }

  const addressInputhandler = (e) => {
    setLine1(e.currentTarget.value)
  }

  const cityInputHandler = (e) => {
    setCity(e.currentTarget.value)
  }

  const stateInputHandler = (e) => {
    setState(e.target.value)
  }

  const countryInputHandler = (e) => {
    setCountry(e.target.value)
  }

  const postalInputHandler = (e) => {
    setPostal(formatZipCode(e.currentTarget.value))
  }

  const CreditNumInputHandler = (e) => {
    setNumber(formatCreditCardNumber(e.currentTarget.value))
  }

  const expInputHandler = (e) => {
    setExp(formatExpirationDate(e.currentTarget.value))
  }

  const cvcInputHandler = (e) => {
    setCvc(formatCVC(e.currentTarget.value))
  }

  function formatLast4(cardNumber) {
    let withoutSpaces = clearNumber(cardNumber);
    setLast4(withoutSpaces.substring(withoutSpaces.length -4))
  }


  function formatBrand(cardNumber) {
    let withoutSpaces = clearNumber(cardNumber); 
    let first1digit = withoutSpaces.substring(0, 1);
    let first2digits = withoutSpaces.substring(0, 2);
    let first3digits = withoutSpaces.substring(0, 3);
    let first4digits = withoutSpaces.substring(0, 4);
    // amex 34,37
    if (first2digits === '34' || first2digits === '37') {
      setBrand('American Express')
    } else if (first2digits === '62') {
      setBrand('China UnionPay')
    } else if (Number(first2digits) >=51 && Number(first2digits) <= 55) {
      setBrand('Master')
    } else if (Number(first4digits) >= 2221 && Number(first4digits) <= 2720) {
      setBrand('Master')
    } else if (first2digits === '65' || first4digits === '6011') {
      setBrand('Discover')
    } else if (Number(first3digits) >= 644 && Number(first3digits <= 649)) {
      setBrand('Discover')
    } else if (Number(first4digits) >= 3528 && Number(first4digits) <= 3589) {
      setBrand('Japan Credit Bureau')
    } else if (first1digit === '4') {
      setBrand('Visa')
    } else {
      setBrand('');
    }
  }

  function formatDate(exp) {
    let fullString = clearNumber(exp);
    let first2digit = fullString.substring(0, 2);
    let last2digits = fullString.substring(2, 4);
    if (getCountOfDigits(fullString) == 4) {
      setExpMonth(Number(first2digit));
      setExpYear(Number(last2digits)+2000);
    } else {
      setExpMonth();
      setExpYear();
    }
  }

  // useEffect
  useEffect(() => {
    setLoading(true);
    formatLast4(number);
    formatBrand(number);
    formatDate(exp);
  },[loading, number, last4, exp, expMonth, expYear])

  return (
    <ThemeProvider theme={theme}>
      {loading ? 
        <Grid container>
          <Grid item xs={12} sx={{ width: '100%', display: 'flex', justifyContent: 'center', padding: '2em 2em', flexDirection: 'column', alignItems: 'center'}}>
            <CircularProgress />
            <Typography sx={{ marginTop: '1em'}}>
              Loading...
            </Typography>
            { props.user ? <>{setLoading(false)}</> : null }
          </Grid>
        </Grid>
      : 
        <>
          {!!props.user ?
            <Grid container>
              { cardFormOpen ? 
                <Grid item xs={12} md={6}>
                  <Grid container>
                    <Grid item xs={12}>
                      <Typography>
                        Billing Infomation
                      </Typography>
                    </Grid>
                    <Grid item>
                      <FormControl>
                        <TextField 
                          size='small'
                          type='text'
                          value={name}
                          label='Name on the card'
                          onChange={nameInputHandler}
                        />
                      </FormControl>
                    </Grid>
                    <Grid item>
                      <FormControl>
                        <TextField 
                          size='small'
                          type='text'
                          value={line1}
                          label='Address'
                          onChange={addressInputhandler}
                        />
                      </FormControl>
                    </Grid>
                    <Grid item>
                      <FormControl>
                        <TextField 
                          size='small'
                          type='text'
                          value={city}
                          label='City'
                          onChange={cityInputHandler}
                        />
                      </FormControl>
                    </Grid>
                    <Grid item>
                      <FormControl>
                        <InputLabel>State</InputLabel>
                        <Select
                          value={state}
                          label='State'
                          size='small'
                          onChange={stateInputHandler}
                        >
                          {states.map((state, i) => (
                            <MenuItem
                              value={state.name}
                              key={i}
                            >
                              {state.name}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </Grid>
                    <Grid item>
                      <FormControl>
                        <InputLabel>Country</InputLabel>
                        <Select
                          value={country}
                          label='Country'
                          size='small'
                          onChange={countryInputHandler}
                        >
                          {countries.map((country, i) => (
                            <MenuItem
                              value={country.country}
                              key={i}
                            >
                              {country.country}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </Grid>
                    <Grid item>
                      <FormControl>
                        <TextField 
                          size='small'
                          type='text'
                          value={postal}
                          label='Zip Code'
                          onChange={postalInputHandler}
                        />
                      </FormControl>
                    </Grid>
                  </Grid>
                  <Grid container>
                    <Grid item xs={12}>
                      <Typography>Credit Card Infomation</Typography>
                    </Grid>
                    <Grid item>
                      <FormControl>
                        <TextField 
                          size='small'
                          type='text'
                          value={number}
                          label='Card Number'
                          onChange={CreditNumInputHandler}
                        />
                      </FormControl>
                    </Grid>
                    <Grid item>
                      <FormControl>
                        <TextField 
                          size='small'
                          type='text'
                          value={exp}
                          label='Expiration Date'
                          onChange={expInputHandler}
                        />
                      </FormControl>
                    </Grid>
                    <Grid item>
                      <FormControl>
                        <TextField 
                          size='small'
                          type='text'
                          value={cvc}
                          label='Security Code'
                          onChange={cvcInputHandler}
                        />
                      </FormControl>
                    </Grid>
                    <Grid item>
                      <Button variant="contained" onClick={cardAddHandler}>Add Credit Card</Button>
                    </Grid>
                    <Grid item>
                      <Typography>{name}-name on the card</Typography>
                      <Typography>{line1}-street</Typography>
                      <Typography>{city}-city</Typography>
                      <Typography>{state}-state</Typography>
                      <Typography>{country}-country</Typography>
                      <Typography>{postal}-postal</Typography>
                      <Typography>{number}-cc Num</Typography>
                      <Typography>{exp}-exp</Typography>
                      <Typography>{brand}-brand</Typography>
                    </Grid>
                  </Grid>
                </Grid>
                :
                <Grid item xs={12} md={6}>
                  <Typography>
                    There is no credit card added
                  </Typography>
                  <Button variant="contained" onClick={cardAddHandler}>Add Credit Card</Button>
                </Grid>
              }
            </Grid>
            :
            <Typography>
              There is credit cards added
            </Typography>
          }
        </>
      }
    </ThemeProvider>

  );
}
export default CreditCardSelect;