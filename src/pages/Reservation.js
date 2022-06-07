import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

// MUI
import { TextField, Paper, Grid, Button, Typography, Modal, CircularProgress } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DateTimePicker from '@mui/lab/DateTimePicker';
import CheckCircleOutlineRoundedIcon from '@mui/icons-material/CheckCircleOutlineRounded';
import theme from '../theme/theme';

import { io } from 'socket.io-client';
// TODO: update serverURL
const socket = io('http://sushiville-socket.herokuapp.com/', {withCredentials: true})

const Reservation = (props) => {
  
  const [ username, setUsername ] = useState('');
  const [ name, setName ] = useState('');
  const [ email, setEmail ] = useState('');
  const [ contact, setContact ] = useState ('');
  const [ totalParty, setTotalParty] = useState(0);
  const [ comments, setComments ] = useState('');
  const [ error, setError ] = useState('');
  const [ userId, setUserId ] = useState('');
  const [ reserveDate, setReserveDate ] = useState(new Date());
  const [ isConfirmed, setIdConfirmed ] = useState(false);
  const [ modalOpen, setModalOpen ] = useState(false);
  const [ loading, setLoading ] = useState(false);
  const [ ldata, setLdata ] = useState();
  const navigate = useNavigate();


  
  function formatPhoneNumber(telNum) {
    if (!telNum) return telNum;
  
    const telPhoneNum = telNum.replace(/[^\d]/g, "");
    const phoneNumberLength = telPhoneNum.length;
    if (phoneNumberLength < 4) return telPhoneNum;
    if (phoneNumberLength < 7) {
      return `(${telPhoneNum.slice(0, 3)}) ${telPhoneNum.slice(3)}`;
    }
    return `(${telPhoneNum.slice(0, 3)}) ${telPhoneNum.slice(
      3,
      6
    )}-${telPhoneNum.slice(6, 10)}`;
  }
  
  const phoneNumberHandler = (e) => {
    const formattedPhoneNumber = formatPhoneNumber(e.target.value);
    setContact(formattedPhoneNumber);
  };

  const reservationHandler = async (e) => {
    
    const request = {
      "name": `${name}`,
      "customer": `${userId}`,
      "email": `${email}`,
      "contact": `${contact}`,
      "totalParty": `${totalParty}`,
      "comments": `${comments}`,
      "reserveDate": `${reserveDate}`
    }
    const sendRequest = async () => {
      if (!!request) {
        try {
          await socket.emit('newReservation', request)
          // modal on
        } catch (err) {
          console.log(err)
        }
      }
    }

    const handleRequest = async () => {
      await sendRequest();
      await setModalOpen(true);
    }
    handleRequest();
  }

  // Handlers
  const modalHandler = (e) => {
    e.preventDefault();
    setModalOpen(!modalOpen);
  }

  const backToHomeHandler = () => {
    setModalOpen(false);
    navigate('/');
  }

  useEffect(() => {
    setUserId(sessionStorage.userId);
  },[])

  return (
    <ThemeProvider theme={theme}>
      <Grid container sx={{ 
        paddingTop: '2.5em', 
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        backgroundColor: 'rgba(255, 240, 174, 0.75)',
        minHeight: '81vh'
      }}>
        <Grid item sx={{ marginTop: '3em'}}>
          <Paper sx={{ 
            marginBottom: '2em',
            borderRadius: '10px'
            }} elevation={2}>
            <Typography variant='h5' sx={{ fontWeight: 'bold', color: 'darkgreen', textAlign: 'center', paddingTop: '1.5em', marginBottom: '1em'}}>
              Make a Reservation
            </Typography>
            <form className='register_form'>
              <TextField 
                type='text'
                required
                id='name'
                label='Enter your name'
                value={name}
                variant='standard'
                autoComplete='on'
                onChange={(e) => setName(e.target.value)}
                sx={{ marginBottom: '2em'}}
              />
              <TextField 
                type='email'
                required
                id='email'
                label='Enter your email'
                value={email}
                variant='standard'
                autoComplete='on'
                onChange={(e) => setEmail(e.target.value)}
                sx={{
                  marginBottom: '2em',
                }}
              />
              <TextField 
                type='tel'
                required
                id='contact'
                value={contact}
                variant='standard'
                autoComplete='on'
                label='Enter contact number'
                onChange={(e) => phoneNumberHandler(e)}
                sx={{
                  marginBottom: '2em',
                }}
              />
              <TextField 
                type='number'
                required
                id='totalParty'
                value={totalParty}
                variant='standard'
                label="Number of your party"
                autoComplete='on'
                onChange={(e) => setTotalParty(e.target.value)}
                sx={{
                  marginBottom: '2em',
                }}
              />
              <TextField 
                type='text'
                multiline
                maxRows={3}
                id='comments'
                value={comments}
                variant='outlined'
                label='Comments on your reservation'
                autoComplete='on'
                onChange={(e) => setComments(e.target.value)}
                sx={{
                  marginBottom: '2em',
                }}
              />
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DateTimePicker 
                  renderInput={(props) => <TextField {...props} />}
                  value={reserveDate}
                  onChange={(newValue) => {setReserveDate(newValue)}}
                  label="Set Date and Time"
                />
              </LocalizationProvider>
              <TextField 
                type='hidden'
                required
                id='username'
                value={username}
                variant='filled'
                autoComplete='on'
                onChange={(e) => setComments(e.target.value)}
              />
              <Button variant='contained' sx={{ marginTop: '2em'}} onClick={reservationHandler}>Confirm Reservation</Button>
            </form>
          </Paper>              
        </Grid>
      </Grid>
      <Modal
        open={modalOpen}
      >
        <Paper 
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 400,
            border: '2px solid white',
            boxShadow: 24,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            padding: '3em 2em'
          }}
        >
          { loading ? <>
            <CircularProgress />
            <Typography sx={{ paddingTop: '1.5em'}}>Loading...</Typography>
          </> :
            <>
              <Typography>
                <CheckCircleOutlineRoundedIcon sx={{ color: 'darkgreen', fontWeight: 'bold', fontSize: '8em'}}/>
              </Typography>
              <Typography sx={{paddingTop: '1em'}}>
                Your reservation has been successfully requested!
              </Typography>
              <Typography variant='body1' sx={{ fontWeight: 'light', padding: '1.5em 1.5em'}}>We'll contact you within 30minutes to confirm the reservation. Please check your email for the confimation and details.</Typography>
              <Button variant='contained' onClick={backToHomeHandler} sx={{ marginTop: '.25em'}}>back to home</Button>
            </>
          }
        </Paper>
      </Modal>
    </ThemeProvider>
  );
}
export default Reservation;