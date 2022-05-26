import { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

// MUI components

import { TextField, Paper, Grid, Button } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';

import theme from '../../theme/theme';

const PasswordReset = ({ match }) => {

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const resetPasswordHandler = async (e) => {
    e.preventDefault();
    
    const config = {
      header: {
        "Content-Type": "application/json",
      },
    };
    
    if (password !== confirmPassword) {
      setPassword("");
      setTimeout(() => {
        setError('');
      }, 5000);
      return setError("Passwords don't match");
    }
    
    try {
      let resetToken = window.location.pathname.slice(15)
      const { data } = await axios.put(
        `${process.env.REACT_APP_SERVER_URL}/api/auth/resetpassword/${resetToken}`,
        {
          password,
        },
        config
        );
        setSuccess(data.data);
    } catch (error) {
      setError(error.response);
      setTimeout(() => {
        setError('');
      }, 5000);
    }
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

        }}
      >
        <Paper elevation={2}
          sx={{
            width: '40em',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            padding: '3em 2em',
            marginTop: '6.5em'
          }}
        >
          <h3 className='login_title'>Reset Password</h3>
          {error && <span className='error_message'>{error}</span>}
          {success && (<span className='success_message'>{success} <Link to="login">Login</Link></span>)}
          <form onSubmit={resetPasswordHandler} className='form_login'>
            <TextField
              required
              placeholder='Enter New Password'
              id='password'
              type='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              sx={{
                marginBottom: '1.5em',
                width: '23em'
              }}
              label='Enter New Password'
              variant='outlined'
            />
            <TextField
              required
              placeholder='Confirm New Password'
              id='confirmPassword'
              type='password'
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              sx={{
                marginBottom: '2em',
                width: '23em'
              }}
              label='Confirm New Password'
              variant='outlined'
            />
            <Button type='submit' className='IO_buttons' variant='contained'>Reset Password</Button>
          </form>
        </Paper>
      </Grid>
    </ThemeProvider>
  );
}
export default PasswordReset;