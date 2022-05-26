import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

// MUI components
import { TextField, Paper, Grid, Button } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';

import theme from '../../theme/theme';

const LogIn = (props) => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  
  const loginHandler = async (e) => {
    e.preventDefault();
    
    const config = {
      header: {
        "Content-Type": "application/json",
      }
    };
    
    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_SERVER_URL}/api/auth/login`,
        { email, password },
        config
        );
        sessionStorage.setItem("authToken", data.token);
        sessionStorage.setItem("role", data.role);
        sessionStorage.setItem("userId", data.userId);
        window.location.reload(false)
      } catch (error) {
        setError('Please check your email and password')
      }
    }

  useEffect(() => {
    if (sessionStorage.role == 'admin') {
      navigate('/dashboard')

    } else if (sessionStorage.authToken) {
      navigate('/')
    }
  }, []);


  return (
    <ThemeProvider theme={theme}>
      <Grid container 
        sx={{
          display: "flex",
          flexDirection: 'row',
          justifyContent: "center",
          width: '100vw',
          minHeight: '65vh',
          marginBottom: '10em',
          paddingTop: '6em'
        }}
      >
        <Paper elevation={2}
          sx={{
            width: '40em',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            marginTop: '3.5em',
            paddingTop: '1em'
          }}
        >
          <h3 className='login_title'>Login</h3>
          {error && <span className='error_message'>{error}</span>}
          <form onSubmit={loginHandler} className='form_login'>
            { error ?
              <TextField
              required
              error
              placeholder='Enter email address'
              helperText='Check email and passward again'
              id='email'
              type='email'
              label='Enter email address'
              variant="outlined"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              tabIndex={1}
              sx={{
                marginBottom: '1.5em',
                width: '23em'
              }}
            />
            :
            <TextField
            required
            placeholder='Enter email address'
            id='email'
            type='email'
            label='Enter email address'
            variant="outlined"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            tabIndex={1}
            sx={{
              marginBottom: '1.5em',
              width: '23em'
            }}
          />
          }
            <TextField
              required
              type='password'
              placeholder='Enter Password'
              autoComplete='true'
              id='password'
              label='Enter Password'
              variant="outlined"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              tabIndex={2}
              sx={{
                marginBottom: '2em',
                width: '23em'
              }}
            />
            <Button type='submit' className='IO_buttons' variant="contained">Login</Button>
          </form>
          <Link to="../forgotpassword" className='login_forgotpassword'>Forgot Password?</Link>
          <span className='login_subtext'>
            Don't have an account?
            <Link to='../register' className='login_register'>  Register</Link>
          </span>
        </Paper>
      </Grid>
    </ThemeProvider>
  );
}
export default LogIn;