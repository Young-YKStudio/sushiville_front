import { useState } from 'react';
import axios from 'axios';

// MUI components

import { TextField, Paper, Grid, Button } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';

import theme from '../../theme/theme';

const ForgotPassword = (props) => {

  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const forgotPasswordHandler = async (e) => {
    e.preventDefault();

    const config = {
      header: {
        "Content-Type": "application/json",
      },
    };

    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_SERVER_URL}/api/auth/forgotpassword`,
        { email },
        config
      );

      setSuccess(data.data);
    } catch (error) {
      setError(error.response.data.error);
      setEmail('');
      setTimeout(() => {
        setError("");
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
            marginTop: '5em',
            paddingBottom: '5em'
          }}
        >
          <h3 className='login_title'>Forgot / Reset Password</h3>
          {error && <span className='error_message'>{error}</span>}
          {success && <span className='success_message'>{success}</span>}
          <p className='forgotpassword_subtext'>
            Please enter the email address you registered your account with. <br />
            We will send you reset password confirmation to this email.
          </p>
          <form onSubmit={forgotPasswordHandler} className='form_login'>
            <TextField
              required
              placeholder='Enter email address'
              id='email'
              type='email'
              label='Enter email address'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              sx={{
                marginBottom: '2em',
                width: '23em'
              }}
              variant='outlined'
            />
            <Button type='submit' className='IO_buttons' variant='contained'>Send Eamil</Button>
          </form>
        </Paper>
      </Grid>
    </ThemeProvider>
  );
}
export default ForgotPassword;