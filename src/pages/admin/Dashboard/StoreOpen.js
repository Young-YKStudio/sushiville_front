import { useState, useEffect } from 'react';
import axios from 'axios';

// MUI
import { ThemeProvider } from '@mui/material/styles';
import { Grid, Typography, Button } from '@mui/material';
import { LoadingButton } from '@mui/lab'; 
import theme from '../../../theme/theme'

const StoreOpen = (props) => {
  // States
  const [ isFetching, setIsFetching ] = useState(false);
  const [ status, setStatus ] = useState();
  const [ storeOpen, setStoreOpen ] = useState();
  // handlers

  const stateChanger = async (e) => {
    e.preventDefault();
    setIsFetching(true);

    const config = {
      header: {
        "Content-Type": "applicatioin/json"
      }
    }

    const request = {
      body: {
        isOpenStoreAuto: true
      }
    }

    try {
      const { data } = await axios.put(`${process.env.REACT_APP_SERVER_URL}/api/status/update/62730b437618fbe1c3ecb02e`, request.body, config)
      if (data) {
        setIsFetching(false)
      }
    } catch (err) {
      console.log(err)
    }
  }

  const stateChanger2 = async (e) => {
    e.preventDefault();
    setIsFetching(true);

    const config = {
      header: {
        "Content-Type": "applicatioin/json"
      }
    }

    const request = {
      body: {
        isOpenStoreAuto: false
      }
    }

    try {
      const { data } = await axios.put(`${process.env.REACT_APP_SERVER_URL}/api/status/update/62730b437618fbe1c3ecb02e`, request.body, config)
      if (data) {
        setIsFetching(false)
      }
    } catch (err) {
      console.log(err)
    }
  }

  const stateChanger3 = async (e) => {
    e.preventDefault();

    const config = {
      header: {
        "Content-Type": "applicatioin/json"
      }
    }

    const request = {
      body: {
        manualStatus: false,
      }
    }

    try {
      const { data } = await axios.put(`${process.env.REACT_APP_SERVER_URL}/api/status/update/62730b437618fbe1c3ecb02e`, request.body, config)
      if (data) {
        setStoreOpen(false);
      }
    } catch (err) {
      console.log(err)
    }

  }
  const stateChanger4 = async (e) => {
    e.preventDefault();

    const config = {
      header: {
        "Content-Type": "applicatioin/json"
      }
    }

    const request = {
      body: {
        manualStatus: true,
      }
    }

    try {
      const { data } = await axios.put(`${process.env.REACT_APP_SERVER_URL}/api/status/update/62730b437618fbe1c3ecb02e`, request.body, config)
      if (data) {
        setStoreOpen(true);
      }
    } catch (err) {
      console.log(err)
    }
  }

  const sendOutText = (Boolean) => {
    if (Boolean) {
      return 'Auto open/close'
    } else if (!Boolean) {
      return 'Manual open/close'
    } else {
      return 'Loading...'
    }
  }

  const ButtonOut = (store, auto) => {
    if (store) {
      let returnObj = auto ? <Button disabled>Auto Open/close</Button> : <Button onClick={stateChanger3}>Close Restaurant</Button>
      return returnObj
    } else if (!store) {
      let returnObj = auto? <Button disabled>Auto Open/close</Button> : <Button onClick={stateChanger4}>Open Restaurant</Button>
      return returnObj
    } else {
      return 'Loading...'
    }
  }

  // useEffect
  useEffect(() => {
    const fetchData = async () => {
      const config = {
        header: {
          "Content-Type": "application/json"
        }
      }
      const request = await axios.get(`${process.env.REACT_APP_SERVER_URL}/api/status/checkStatus`, config)
      setStatus(request.data.status[0].isOpenStoreAuto);
      setStoreOpen(request.data.status[0].manualStatus)
      return request
    }
    fetchData()
  },[isFetching, storeOpen])
  
  return (
    <ThemeProvider theme={theme}>
      <Grid container sx={{ margin: '1em 0'}}>
        <Grid item xs={12} sx={{ marginBottom: '1em'}}>
          <Typography variant='body1' sx={{ color: '#dc5a41'}}>Make sure to open store when you comeback if the setting is set to manual</Typography>
          <Typography variant='body1' sx={{ fontSize: '.75em', color: 'gray', fontStyle: 'italic'}}>If store hours has been changed, please contact YK Technolgoy Corporation representative.</Typography>
        </Grid>
        <Grid item xs={12} sx={{marginBottom: '.5em'}}>
          <Grid container spacing={2}>
            <Grid item xs={4}>
              <Typography>Current Setting:</Typography>
            </Grid>
            <Grid item xs={8}>
              <Typography sx={{color: 'darkgreen'}}><b>{sendOutText(status)}</b></Typography>
            </Grid>
          </Grid>
        </Grid>
        { storeOpen ?
          <Grid item xs={12} sx={{marginBottom: '.5em'}}>
            <Grid container spacing={2}>
              <Grid item xs={4}>
                <Typography>Manual Setting:</Typography>
              </Grid>
              <Grid item xs={8}>
                <Typography sx={{color: 'darkgreen'}}><b>Open</b></Typography>
              </Grid>
            </Grid>
          </Grid>
          :
          <Grid item xs={12} sx={{marginBottom: '.5em'}}>
            <Grid container spacing={2}>
              <Grid item xs={4}>
                <Typography sx={{ color: 'gray'}}>Manual Setting:</Typography>
              </Grid>
              <Grid item xs={8}>
                <Typography sx={{color: 'gray'}}><b>Closed</b></Typography>
              </Grid>
            </Grid>
          </Grid>
        }

        <Grid item xs={12} sx={{ marginBottom: '1em'}}>
          <Grid container spacing={2}>
            <Grid item xs={4}>
              <Typography variant='body1' sx={{ fontSize: '.75em', color: 'gray'}}>Current Auto Setting:</Typography>
            </Grid>
            <Grid item xs={8}>
              <Typography variant='body1' sx={{ fontSize: '.75em', color: 'gray'}}>Mon, Wed, Thu, Sun : 12pm - 9pm</Typography>
              <Typography variant='body1' sx={{ fontSize: '.75em', color: 'gray'}}>Fri, Sat : 12pm - 9:30pm</Typography>
              <Typography variant='body1' sx={{ fontSize: '.75em', color: 'gray'}}>Tue : Closed</Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly'}}>
          { !!status ? 
            <LoadingButton loading={isFetching} onClick={stateChanger2} variant='contained'>Change to Manual</LoadingButton>
            :
            <LoadingButton loading={isFetching} onClick={stateChanger} variant='contained'>Change to Auto</LoadingButton>
          }
          {ButtonOut(storeOpen, status)}
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}
export default StoreOpen;