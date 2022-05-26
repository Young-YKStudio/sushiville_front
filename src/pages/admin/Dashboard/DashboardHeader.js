import { useState, useEffect } from "react";
import moment from 'moment';

// MUI
import { Grid, Typography } from '@mui/material';
import { ThemeProvider } from "@mui/material/styles";

// components
import theme from '../../../theme/theme';

const DashboardHeader = (props) => {
  // state
  const [ currentTime, setCurrentTime ] = useState('');
  
  // useEffect 
  useEffect(() => {
    setInterval(() => setCurrentTime(new Date()), 2000)

  }, [])

  return (
    <ThemeProvider theme={theme}>
      <Grid item xs={12} sx={{ width: '100%'}}>
        <Grid container sx={{ borderBottom: '1px solid #dc5a41'}}>
          <Grid item xs={6} md={9}>
            <Typography variant='h5' sx={{ fontFamily: 'Raleway', fontWeight: 'bold', color: 'darkgreen', paddingBottom: '.5em'}}>Dashboard</Typography>
          </Grid>
          <Grid item xs={6} md={3} sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-end'}}>
            <Typography variant='body1' sx={{ fontFamily: 'Raleway', color: 'darkgreen', paddingBottom: '.5em', paddingTop: '.25em'}}>{moment(currentTime).format('MM/DD | dddd | hh:mm a')}</Typography>
          </Grid>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}
export default DashboardHeader;