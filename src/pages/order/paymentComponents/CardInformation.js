import { formatZipCode } from "./CardUtils";
import { Grid, Typography, TextField, FormControl, Select, MenuItem, InputLabel } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import theme from '../../../theme/theme';
import countries from '../../../Util/countries.json';
import states from '../../../Util/states.json';

const CardInformation = (props) => {

  // handler
  const cardStateInput = (e) => {
    props.cardStateHandler(e.target.value)
  }

  const cardCountryInput = (e) => {
    props.cardCountryHandler(e.target.value)
  }

  const cardPostalInput = (e) => {
    props.cardPostalHandler(formatZipCode(e.currentTarget.value))
  }

  return (
    <ThemeProvider theme={theme}>
      <Grid item xs={12}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography>Billing Information</Typography>
          </Grid>
          <Grid item xs={12}>
            <TextField 
              type='text'
              value={props.cardName}
              label='Name on the card'
              sx={{width: '100%'}}
              onChange={props.cardNameHandler}
              required
              />
            </Grid>
          <Grid item xs={12}>
            <TextField 
              type='text'
              value={props.line1}
              label='Address'
              sx={{width: '100%'}}
              onChange={props.cardAddressHandler}
              required
              />
            </Grid>
          <Grid item xs={12}>
            <TextField 
              type='text'
              value={props.city}
              label='City'
              sx={{width: '100%'}}
              onChange={props.cardCityHandler}
              required
              />
          </Grid>
          <Grid item xs={12}>
            <TextField 
              type='text'
              value={props.postal}
              label='Zip Code'
              sx={{width: '100%'}}
              onChange={cardPostalInput}
              required
              />
          </Grid>
          <Grid item xs={6}>
            <FormControl sx={{ width: '100%'}}>
              <InputLabel>State</InputLabel>
              <Select
                value={props.state}
                label='State'
                sx={{ width: '100%'}}
                onChange={cardStateInput}
                required
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
          <Grid item xs={6}>
            <FormControl sx={{ width: '100%' }}>
              <InputLabel>Country</InputLabel>
              <Select
                value={props.country}
                label='Country'
                onChange={cardCountryInput}
                required
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
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}
export default CardInformation;