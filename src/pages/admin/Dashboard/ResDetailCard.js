import { useState, useEffect } from 'react';
import moment from 'moment';

// MUI
import { ThemeProvider } from '@mui/material/styles';
import { Grid, CircularProgress, Card, Typography, Button } from '@mui/material';
import axios from 'axios';

// componenets
import theme from '../../../theme/theme';


const ResDetailCard = (props) => {
// States
  const [ fetchedData, setFetchedData ] = useState();

  // useEffect
  useEffect(() => {
    if (!!props.value) {
      const fetchData = async () => {
        const config = {
          header: {
            "Content-Type": "application/json"
          }
        }
        const request = await axios.get(`${process.env.REACT_APP_SERVER_URL}/api/reservation/list/${props.value}`, config)
        setFetchedData(request.data.reservation[0])
      }
      fetchData();
    }
  },[])

  // handlers
  const closeModal = (e) => {
    props.setModalOpen(false);
  }

  const formatStatus = (data) => {
    if(!!data) {
      if(!data.isConfirmed) {
        return 'Pending...'
      } else if (data.isConfirmed && !data.isShowedUp) {
        return 'Confirmed'
      } else {
        return 'Reservation Fulfilled / Denied'
      }
    }
  }

  return (
    <ThemeProvider theme={theme}>
      <Card sx={{ width: 400, position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', padding: '2em 2em', maxHeight: '70vh', overflow: 'auto'}}>
        {!!fetchedData ?
          <Grid container>
            <Grid item xs={12} sx={{ display: 'flex', flexDirection: 'row', borderBottom: '1px solid #dc5a41', marginBottom: '7px', justifyContent: 'space-between'}}>
              <Typography variant='h6' sx={{ color: 'darkgreen'}}>{fetchedData.name}</Typography>
              <Typography variant='body1' sx={{paddingTop: '.2em', color: 'gray'}}>{formatStatus(fetchedData)}</Typography>
            </Grid>
            {/* reserveDate */}
            <Grid item xs={4} sx={{ paddingLeft: '1em ', marginBottom: '.5em', marginTop: '.5em'}}>
              <Typography variant='body1' sx={{ fontSize: '1em', color: 'gray'}}>Reservation</Typography>
            </Grid>
            <Grid item xs={8} sx={{ paddingLeft: '1em', marginBottom: '.5em', marginTop: '.5em' }}>
              <Typography variant='body1' sx={{ color:'#dc5a41', fontWeight: 'bold'}}>{moment(fetchedData.reserveDate).format('LLL')}</Typography>
            </Grid>
            {/* reserveDate made */}
            <Grid item xs={4} sx={{ paddingLeft: '1em ', marginBottom: '.5em'}}>
              <Typography variant='body1' sx={{ fontSize: '1em', color: 'gray'}}>Placed</Typography>
            </Grid>
            <Grid item xs={8} sx={{ paddingLeft: '1em', marginBottom: '.5em' }}>
              <Typography variant='body1' sx={{ color:'gray', fontWeight: 'light'}}>{moment(fetchedData.updatedAt).format('LLL')}</Typography>
            </Grid>
            {/* # of party */}
            <Grid item xs={4} sx={{ paddingLeft: '1em ', marginBottom: '.5em'}}>
              <Typography variant='body1' sx={{ fontSize: '1em', color: 'gray'}}># of Party</Typography>
            </Grid>
            <Grid item xs={8} sx={{ paddingLeft: '1em', marginBottom: '.5em' }}>
              <Typography variant='body1' sx={{ color:'darkgreen', fontWeight: 'bold'}}>{fetchedData.totalParty} ppl</Typography>
            </Grid>
            {/* contact info-1 */}
            <Grid item xs={4} sx={{ paddingLeft: '1em ', marginBottom: '.5em'}}>
              <Typography variant='body1' sx={{ fontSize: '1em', color: 'gray'}}>Contact</Typography>
            </Grid>
            <Grid item xs={8} sx={{ paddingLeft: '1em', marginBottom: '.5em' }}>
              <Typography variant='body1' sx={{ color:'gray'}}>{fetchedData.contact}</Typography>
            </Grid>
            {/* contact info-2 */}
            <Grid item xs={4} sx={{ paddingLeft: '1em ', marginBottom: '.5em'}}>
              <Typography variant='body1' sx={{ fontSize: '1em', color: 'gray'}}>Email</Typography>
            </Grid>
            <Grid item xs={8} sx={{ paddingLeft: '1em', marginBottom: '.5em' }}>
              <Typography variant='body1' sx={{ color:'gray'}}>{fetchedData.email}</Typography>
            </Grid>
            {/* comments */}
            <Grid item xs={4} sx={{ paddingLeft: '1em ', marginBottom: '.5em'}}>
              <Typography variant='body1' sx={{ fontSize: '1em', color: 'gray'}}>Comments</Typography>
            </Grid>
            { fetchedData.comments === '' ?
              <Grid item xs={8} sx={{ paddingLeft: '1em', marginBottom: '.5em' }}>
                <Typography variant='body1' sx={{ color:'gray'}}>No comments</Typography>
              </Grid>
            :
              <Grid item xs={8} sx={{ paddingLeft: '1em', marginBottom: '.5em' }}>
                <Typography variant='body1' sx={{ color:'gray'}}>{fetchedData.comments}</Typography>
              </Grid>
            }
            {/* account */}
            <Grid item xs={12} sx={{ paddingLeft: '1em ', marginTop: '.5em', marginBottom: '.5em', borderBottom: '1px solid lightgray'}}>
              <Typography variant='body1' sx={{ fontSize: '1em', color: '#dc5a41'}}>Account Info</Typography>
            </Grid>
            {/* account name */}
            <Grid item xs={4} sx={{ paddingLeft: '1em ', marginBottom: '.5em'}}>
              <Typography variant='body1' sx={{ fontSize: '1em', color: 'gray'}}>Name</Typography>
            </Grid>
            <Grid item xs={8} sx={{ paddingLeft: '1em', marginBottom: '.5em' }}>
              <Typography variant='body1' sx={{ color:'gray'}}>{fetchedData.customer.username}</Typography>
            </Grid>
            {/* account email */}
            <Grid item xs={4} sx={{ paddingLeft: '1em ', marginBottom: '.5em'}}>
              <Typography variant='body1' sx={{ fontSize: '1em', color: 'gray'}}>Email</Typography>
            </Grid>
            <Grid item xs={8} sx={{ paddingLeft: '1em', marginBottom: '.5em' }}>
              <Typography variant='body1' sx={{ color:'gray'}}>{fetchedData.customer.email}</Typography>
            </Grid>
            {/* account contact */}
            <Grid item xs={4} sx={{ paddingLeft: '1em ', marginBottom: '.5em'}}>
              <Typography variant='body1' sx={{ fontSize: '1em', color: 'gray'}}>Contact</Typography>
            </Grid>
            <Grid item xs={8} sx={{ paddingLeft: '1em', marginBottom: '.5em' }}>
              <Typography variant='body1' sx={{ color:'gray'}}>{fetchedData.customer.contact}</Typography>
            </Grid>
            {/* account orders */}
            <Grid item xs={4} sx={{ paddingLeft: '1em ', marginBottom: '.5em'}}>
              <Typography variant='body1' sx={{ fontSize: '1em', color: 'gray'}}># Orders</Typography>
            </Grid>
            <Grid item xs={8} sx={{ paddingLeft: '1em', marginBottom: '.5em' }}>
              <Typography variant='body1' sx={{ color:'gray'}}>{fetchedData.customer.Orders.length} orders</Typography>
            </Grid>
            {/* account reservations */}
            <Grid item xs={4} sx={{ paddingLeft: '1em ', marginBottom: '.5em'}}>
              <Typography variant='body1' sx={{ fontSize: '1em', color: 'gray'}}># Reservations</Typography>
            </Grid>
            <Grid item xs={8} sx={{ paddingLeft: '1em', marginBottom: '.5em' }}>
              <Typography variant='body1' sx={{ color:'gray'}}>{fetchedData.customer.Reservations.length} reservations</Typography>
            </Grid>
            {/* Button */}
            <Grid item xs={12}>
              <Button onClick={closeModal} sx={{ width: '100%', marginTop: '1em'}} variant='contained'>Close</Button>
            </Grid>
          </Grid>
          :
          <Grid container sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignContent: 'center'}}>
            <Grid item xs={12} sx={{ paddingLeft: '5px'}}>
              <CircularProgress />
            </Grid>
            <Grid item xs={12} sx={{ marginTop: '.5em'}}>
              <Typography>Loading...</Typography>
            </Grid>
          </Grid> 
        }
      </Card>
    </ThemeProvider>
  );
}
export default ResDetailCard;