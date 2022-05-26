import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

// MUI components
import { makeStyles } from '@mui/styles';
import { ThemeProvider } from '@mui/material/styles'
import { Box, Container, Grid, Stack, Button } from '@mui/material/';
import SetMealIcon from '@mui/icons-material/SetMeal';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import LoginIcon from '@mui/icons-material/Login';
import DashboardIcon from '@mui/icons-material/Dashboard';

import theme from '../../theme/theme';

const Header = (props) => {

  const [ smallWindow, setSmallWindow ] = useState(false);

  useEffect(() => {
    function stateSetter() {
      if(window.innerWidth < 700) {
        setSmallWindow(true)
      } else {
        setSmallWindow(false)
      }
    }

    window.addEventListener('resize', stateSetter)
  }, [])

  const useStyles = makeStyles((theme) => ({
    logoContainer: {
      display: 'flex',
      alignItems: 'center',
      flexDirection: 'column',
      justifyContent: 'center',
    },
    navContainer: {
      display: 'flex',
      alignItems: 'center',
      flexDirection: 'row',
      justifyContent: 'center',
      minHeight: '50px',
      paddingTop: '0',
      paddingRight: '2em'
    },
    navItems: {
      marginRight: "1em",
    },
  }))


  const navigate = useNavigate();
  const classes = useStyles();

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

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ width: '100vw', position: 'fixed', backgroundColor: 'rgba(255,255,255)', zIndex: '2'}}>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Container className={classes.logoContainer}>
              <div className="logo-imagebox">
                <Link to="/"><img src='/images/logo_sushivill.png' style={{ "maxWidth": "180px" }}/></Link>
              </div>
            </Container>
          </Grid>
          <Grid className={classes.navContainer} item xs={6}>
            <Stack direction='row' spacing={2}>
              { smallWindow ? 
              <>
                <Link to='order'><Button className={classes.navItems}><SetMealIcon /></Button></Link>
                <Link to='reservation'><Button className={classes.navItems}><EventAvailableIcon /></Button></Link>
                <Button onClick={logoutHandler}>logout</Button>
                {!props.authUser ? <Link to='login'><Button className={classes.navItems}><LoginIcon /></Button></Link>
                  :
                  null
                }
                {sessionStorage.role == "user" &&
                  <>
                  <Link to='account'><Button className={classes.navItems}><AccountBoxIcon /></Button></Link>
                  </>
                }
                {sessionStorage.role == "admin" && <>
                  <Link to='dashboard'><Button className={classes.navItems}><DashboardIcon /></Button></Link>
                </>
                }
              </> 
              : 
              <>
                <Link to='order'><Button className={classes.navItems}><SetMealIcon />&nbsp;Order</Button></Link>
                <Link to='reservation'><Button className={classes.navItems}><EventAvailableIcon />&nbsp;Reservation</Button></Link>
                {!props.authUser ? <Link to='login'><Button className={classes.navItems}><LoginIcon />&nbsp;Login/Register</Button></Link>
                  :
                  null
                }
                {sessionStorage.role == "user" &&
                  <>
                  <Link to='account'><Button className={classes.navItems}><AccountBoxIcon />&nbsp;Account</Button></Link>
                  </>
                }
                {sessionStorage.role == "admin" && <>
                  <Link to='dashboard'><Button className={classes.navItems}><DashboardIcon /> Dashboard</Button></Link>
                </>
                }
              </>
              }
            </Stack>
          </Grid>
        </Grid>
      </Box>
    </ThemeProvider>
  );
}
export default Header;