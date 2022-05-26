import { useNavigate, Outlet } from "react-router-dom";
import { useState, useEffect } from 'react';
import axios from 'axios';
import moment from 'moment';

// MUI
import { TextField, Grid, Typography, Button, Tabs, Tab, Box, List, ListItemText, Card, Modal, ListItem, CircularProgress } from "@mui/material";
import { ThemeProvider } from '@mui/material/styles';
import theme from '../../theme/theme';
import PropTypes from 'prop-types';
import { makeStyles } from '@mui/styles';

import Dashboard from './Account_Components/Dashboard';

// MUI Tabs
function TabPanel(props) {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      sx={{ bgcolor: 'blue', width: '100%'}}
      {...other}
    >
      {value === index && (
        <Box>
          <div className='thebox' style={{ width: '100%'}}>{children}</div>
        </Box>
      )}
    </div>
  )
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
}

function allyProps(index) {
  return {
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`,
  }
}

const useTabStyles = makeStyles({
  'root': {
    'width': '100%',
    '&.Mui-selected': {
      'color': 'white'
    } 
  },
  scroller: {
    flexGrow: '0',
    display: 'flex', 
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    
  }
});

// phoneNum

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

const Account = (props) => {

  const [ userData, setUserData ] = useState(null);
  const [ value, setValue ] = useState(0);
  // state for accout detail
  const [ username, setUsername ] = useState('');
  const [ contact, setContact ] = useState('');
  const [ email, setEmail] = useState('');
  const [ address1, setAddress1 ] = useState('');
  const [ acctModalOpen, setAcctModalOpen] = useState(false);


  // MUI tab
  const handleChange = (event, newValue) => {
    setValue(newValue);
  }
  
  const classes = useTabStyles();

  useEffect(() => {
    async function fetchData() {
      const config = {
        header: {
          "Content-Type": "application/json"
        }
      }
      const request = await axios.get(`${process.env.REACT_APP_SERVER_URL}/api/auth/${sessionStorage.userId}`, config);
      setUserData(request.data.user)
      return request
    }
    fetchData();
  }, [])

  const navigate = useNavigate();

  // -- Acct Details
  const logoutHandler = async (e) => {
    e.preventDefault();

    try {
      sessionStorage.clear();
      navigate('/')
      window.location.reload(false)
    } catch (error) {
      console.log(error)
    }
  }

  const acctModalHandler = (e) => {
    setAcctModalOpen(!acctModalOpen);
    setUsername(userData.username);
    setContact(userData.contact);
    setEmail(userData.email);
    setAddress1(userData.address1);
  }

  const acctModalCloser = (e) => {
    setAcctModalOpen(!acctModalOpen);
  }

  const phoneNumberHandler = (e) => {
    const formattedPhoneNumber = formatPhoneNumber(e.target.value);
    setContact(formattedPhoneNumber);
  };

  const backToHomeHandler = (e) => {
    navigate('/');
  }

  const resetPassHandler = (e) => {
    navigate('/forgotpassword');
  }

  const editAcctHandler = async (e) => {
    e.preventDefault();

    const config = {
      header: {
        "Content-Type": "application/json",
      },
      id: `${sessionStorage.userId}`,
      username: `${username}`,
      contact: `${contact}`,
      email: `${email}`,
      address1: `${address1}`,
    };

    try {
      await axios.put(
        `${process.env.REACT_APP_SERVER_URL}/api/auth/${sessionStorage.userId}`, 
        config
      );
    } catch (error) {
      console.log(error);
    }

    setAcctModalOpen(!acctModalOpen);
  }
  
  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ flexGrow: 1, display: 'flex'}}>
        <Tabs
          classes={{ root: classes.root, scroller: classes.scroller }}
          variant="scrollable"
          value={value}
          onChange={handleChange}
          sx={{ borderBottom: 1, borderColor: 'divider', marginTop: '4em', position: 'fixed', zIndex: 4, bgcolor: 'white', marginLeft: 'auto', marginRight: 'auto', 'root': {'&.Mui-selected': { color: 'white'}}, }}
        >
          <Tab label='Dashboard' {...allyProps(0)} />
          <Tab label='Account' {...allyProps(1)} />
        </Tabs>
        { !userData ?
          <TabPanel value={value} index={0}>
            <Grid container sx={{ marginTop: '7em'}}>
              <Grid item xs={12} >
                <CircularProgress />
                <Typography variant="h4" sx={{ fontFamily: 'Raleway', fontWeight: 'bold', color: 'darkgreen', borderBottom: '2px solid #dc5a41', marginBottom: '.5em', paddingBottom: '.5em'}}>loading data... </Typography>
              </Grid>
              <Grid item xs={12} sx={{ marginBottom: '1em'}}>
                <Typography sx={{ marginBottom: '1em'}}>Click button to go back, and try again.</Typography>
                <Button variant="contained" onClick={backToHomeHandler}>Go back</Button>
              </Grid>
            </Grid>
          </TabPanel>
        :
          <>
            <TabPanel value={value} index={0}>
            <Grid container sx={{ width: '98vw', height: '100vh'}}>
              {/* Dashboard */}
              <Dashboard userData={userData} />
            </Grid>
            </TabPanel>
            {/* Account */}
            <TabPanel value={value} index={1}>
              <Grid item xs={12}>
                <Grid container sx={{ marginTop: '7.5em', paddingLeft: '1em'}}>
                  <Grid item xs={12} sx={{ width: '90vw'}}>
                    <Card sx={{ width: 400, marginTop: '1.5em', marginLeft: 'auto', marginRight: 'auto', padding: '1em 1em', marginBottom: '2em'}}>
                      <Typography variant="h6" sx={{ fontFamily: 'Raleway', color: 'darkgreen', borderBottom: '2px solid #dc5a41', paddingBottom: '.25em'}}>Account Details</Typography>
                      <List>
                        <ListItem sx={{ borderBottom: '1px solid lightgray'}}>
                          <ListItemText primary="Name" secondary={userData.username} />
                        </ListItem>
                        <ListItem sx={{ borderBottom: '1px solid lightgray'}}>
                          <ListItemText primary="Contact" secondary={userData.contact} />
                        </ListItem>
                        <ListItem sx={{ borderBottom: '1px solid lightgray'}}>
                          <ListItemText primary="Email" secondary={userData.email} />
                        </ListItem>
                        <ListItem sx={{ borderBottom: '1px solid lightgray'}}>
                          <ListItemText primary="Address" secondary={userData.address1 ? userData.address1 : "Not Registered"} />
                        </ListItem>
                        <ListItem sx={{ borderBottom: '1px solid lightgray'}}>
                          <ListItemText primary="Total Orders" secondary={(userData.Orders).length} />
                        </ListItem>
                        <ListItem>
                          <ListItemText primary="Total Reservations" secondary={(userData.Reservations).length} />
                        </ListItem>
                        <ListItem>
                          <Grid container spacing={2}>
                            <Grid item xs={6}>
                              <Button onClick={acctModalHandler} variant="contained" sx={{ width: '100%' }}>Edit Profile</Button>
                            </Grid>
                            <Grid item xs={6}>
                              <Button onClick={logoutHandler} variant="outlined" sx={{ width: '100%' }}>Log out</Button>
                            </Grid>
                          </Grid>
                        </ListItem>
                      </List>
                    </Card>
                    <Modal open={acctModalOpen}>
                      <Card sx={{ width: 460, position: 'fixed', left: "50%", top: 
                    '50%', transform: 'translate(-50%, -50%)', padding: '1.5em 1.5em'}}>
                        <Typography variant="h6" sx={{ color: 'darkgreen', borderBottom: '1.5px solid #dc5a41', paddingBottom: '.5em'}}>Edit Profile</Typography>
                        <form onSubmit={editAcctHandler}>
                          <Grid container>
                            <Grid item xs={12} sx={{ marginTop: '1.5em', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                              <TextField
                                type='text'
                                id='name'
                                label='Enter your name'
                                value={username}
                                variant='outlined'
                                onChange={(e) => setUsername(e.target.value)}
                                size='small'
                                sx={{ width: 350 }}
                              />
                            </Grid>
                            <Grid item xs={12} sx={{ marginTop: '1.5em', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                              <TextField
                                type='text'
                                id='contact'
                                label='Enter your contact number'
                                value={contact}
                                variant='outlined'
                                onChange={(e) => phoneNumberHandler(e)}
                                size='small'
                                sx={{ width: 350 }}
                              />
                            </Grid>
                            <Grid item xs={12} sx={{ marginTop: '1.5em', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                              <TextField
                                type='email'
                                id='email'
                                label='Enter your Email address'
                                value={email}
                                variant='outlined'
                                onChange={(e) => setEmail(e.target.value)}
                                size='small'
                                sx={{ width: 350 }}
                              />
                            </Grid>
                            <Grid item xs={12} sx={{ marginTop: '1.5em', display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: '1.5em'}}>
                              <TextField
                                type='text'
                                id='address'
                                label='Enter your address'
                                value={address1}
                                variant='outlined'
                                onChange={(e) => setAddress1(e.target.value)}
                                size='small'
                                sx={{ width: 350 }}
                              />
                            </Grid>
                            <Grid item xs={4} sx={{ paddingRight: '7px'}} onClick={editAcctHandler}>
                              <Button variant="contained" sx={{ width: '100%' }}>Update profile</Button>
                            </Grid>
                            <Grid item xs={4} sx={{ paddingRight: '7px'}} onClick={acctModalCloser}>
                              <Button variant="outlined" sx={{ width: '100%' }}>close</Button>
                            </Grid>
                            <Grid item xs={4}>
                              <Button variant="outlined" sx={{ width: '100%' }} onClick={resetPassHandler}>Password Reset</Button>
                            </Grid>
                          </Grid>
                        </form>
                      </Card>
                    </Modal>
                  </Grid>
                </Grid>
              </Grid>
            </TabPanel>
          </>
          
        }
      </Box> 
      <Outlet />
    </ThemeProvider>
  );
}
export default Account;