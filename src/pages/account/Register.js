import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

// MUI components

import { TextField, Paper, Grid, Button } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';

import theme from '../../theme/theme';

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


const Register = (props) => {

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmPassword] = useState("");
  const [contact, setContact] = useState('');
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (sessionStorage.authToken) {
      navigate('/')
    }
  }, []);

  const registerHandler = async (e) => {
    e.preventDefault();

    const config = {
      header: {
        "Content-Type": "application/json",
      }
    }

    if(password !== confirmpassword) {
      setPassword("");
      setConfirmPassword("");
      setTimeout(() => {
        setError("")
      }, 10000);
      return setError("Passwords do not match")
    }

    
    try {
      const {data} = await axios.post(
        `${process.env.REACT_APP_SERVER_URL}/api/auth/register`,
        {username, email, password, contact}, 
        config);

      sessionStorage.setItem("authToken", data.token);
      sessionStorage.setItem("role", data.role)
      sessionStorage.setItem('userId', data.userId)
      window.location.reload(false)
    } catch (error) {
      setError('The email address has already taken');
      setTimeout(() => {
        setError("");
      }, 10000);
    }
  }


  const phoneNumberHandler = (e) => {
    const formattedPhoneNumber = formatPhoneNumber(e.target.value);
    setContact(formattedPhoneNumber);
  };

  
  return (
    <ThemeProvider theme={theme}>
      <Grid container
        sx={{
          display: "flex",
          justifyContent: "center",
          width: '100vw',
          minHeight: '60vh',
          marginBottom: '10em',
          paddingTop: '3em'
        }}
      >
        <Paper elevation={2}
          sx={{
            width: '40em',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            paddingTop: '1em',
            marginTop: '2em'
          }}
        >
          <h3 className='login_title'>Register</h3>
          {error && <span className='error_message'>{error}</span>}
          <form onSubmit={registerHandler} className='form_login'>
            <TextField 
              type='text'
              required
              id='name'
              placeholder='Enter your name'
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              variant='outlined'
              label='Enter your name'
              autoComplete='on'
              sx={{
                marginBottom: '2em',
                width: '23em'
              }}
            />
            <TextField 
              type='email'
              required
              id='email'
              placeholder='Enter email address'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              variant='outlined'
              label='Enter email address'
              autoComplete='on'
              sx={{
                marginBottom: '2em',
                width: '23em'
              }}
            />
            <TextField 
              type='password'
              required
              id='password'
              placeholder='Enter password'
              value={password}
              autoComplete='on'
              onChange={(e) => setPassword(e.target.value)}
              variant='outlined'
              label='Enter password'
              sx={{
                marginBottom: '2em',
                width: '23em'
              }}
            />
            <TextField 
              type='password'
              required
              id='confirmPassword'
              placeholder='Confirm password'
              value={confirmpassword}
              autoComplete='on'
              onChange={(e) => setConfirmPassword(e.target.value)}
              variant='outlined'
              label='Confirm password'
              sx={{
                marginBottom: '2em',
                width: '23em'
              }}
            />
            <TextField 
              type='tel'
              required
              id='contact'
              placeholder='Enter contact number'
              value={contact}
              autoComplete='on'
              onChange={(e) => phoneNumberHandler(e)}
              variant='outlined'
              label='Enter contact number'
              sx={{
                marginBottom: '2em',
                width: '23em'
              }}
            />
            <Button type='submit' className='IO_buttons' variant='contained'>Register</Button>
          </form>
          <span className='register_subtext'>Already have an account? <Link to="../login" className='login_register'>&nbsp;Login</Link></span>
        </Paper>
      </Grid>
    </ThemeProvider>
  );
}
export default Register;