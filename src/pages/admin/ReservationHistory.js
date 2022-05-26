import { useState, useEffect } from 'react';
import axios from 'axios';
import moment from 'moment';

// MUI
import { ThemeProvider } from '@mui/material/styles';
import theme from '../../theme/theme';
import { Typography, Grid, Button, Modal, Card, CircularProgress } from '@mui/material';

const statusFilter = (data) => {
  if (!!data) {
    if(data.isDenied) {
      return 'Denied'
    } else if (!data.isDenied && data.isConfirmed && !data.isShowedUp) {
      return 'Confirmed'
    } else if (!data.isDenied && data.isConfirmed && data.isShowedUp) {
      return 'Arrived'
    } else {
      return 'New Request'
    }
  }
}

// TODO: need to finish reservation logic below
// Booked Left Message Confirmed Running Late Partially Arrived Arrived Cancelled No-Show


const ReservationHistory = (props) => {

  // States
  const [ loading, setLoading ] = useState(true);
  const [ reservations, setReservations ] = useState(null);
  const [ reservation, setReservation ] = useState(null);
  const [ modalLoading, setModalLoading ] = useState(false);
  const [ detailOpen, setDetailOpen ] = useState(false);

  // Handlers
  const detailHandler = (e) => {
    setModalLoading(true);
    setDetailOpen(true);
    const findOneReservation = async (id) => {
      const foundReservation = await reservations.find(reservation =>  reservation._id === id)
      setReservation(foundReservation);
    }
    findOneReservation(e.currentTarget.value);
  }

  const detailCloser = (e) => {
    setDetailOpen(false);
  }

  // useEffect
  useEffect(() => {
    async function fetchReservations() {
      const config = {
        header: {
          "Content-Type": "application/json"
        }
      }
      const { data } = await axios.get(`${process.env.REACT_APP_SERVER_URL}/api/reservation/list/listreservation`, config)
      await setReservations(data.reservation);
    }
    fetchReservations();
  },[])


  return (
    <ThemeProvider theme={theme}>
      { !reservations ? 
      <Grid container>
        <Grid item xs={12} sx={{ width: '100%', height: '75vh', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
          <CircularProgress />
          <Typography sx={{ marginTop: '1em'}}>Loading...</Typography>
        </Grid>
      </Grid> :
      <>
      <Grid container>
        <Grid item xs={12}>
          <Typography variant='h5' sx={{ fontFamily: 'Raleway', fontWeight: 'bold', color: 'darkgreen', paddingBottom: '.5em', borderBottom: '1px solid #dc5a41'}}>Reservation History</Typography>
        </Grid>
        <Grid item xs={12}>
          <Card elevation={2} sx={{ marginTop: '1em' }}>
            <Grid container sx={{ padding: '3px 3px', minWidth: '900px', bgcolor: 'darkgreen', textAlign: 'center', color: 'white'}}>
              <Grid item xs={2} sx={{ padding: '3px 3px', borderRight: '1px solid gray'}}>
                <Typography>Status</Typography>
              </Grid>
              <Grid item xs={3} sx={{ padding: '3px 3px', borderRight: '1px solid gray'}}>
                <Typography>Reserved Date</Typography>
              </Grid>
              <Grid item xs={3}>
                <Typography sx={{ padding: '3px 3px', borderRight: '1px solid gray'}}>Reserved Name</Typography>
              </Grid>
              <Grid item xs={2} sx={{ padding: '3px 3px', borderRight: '1px solid gray'}}>
                <Typography>Party Number</Typography>
              </Grid>
              <Grid item xs={2} sx={{ padding: '3px 3px'}}>
                <Typography>More Info</Typography>
              </Grid>
            </Grid>
            <Grid item xs={12} sx={{ maxHeight: '80vh', overflow: 'auto' }}>
              {reservations.map((reservation, i) => (
                <Grid container key={i} sx={{ width: '100%', minWidth: '900px', textAlign: 'center', borderBottom: '1px solid lightgray'}}>
                  <Grid item xs={2} sx={{ padding: '3px 3px', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                    <Typography sx={{ lineHeight: '1.9em', fontSize: '.85em'}}>{statusFilter(reservation)}</Typography>
                  </Grid>
                  <Grid item xs={3} sx={{ padding: '3px 3px', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                    <Typography sx={{ lineHeight: '1.9em', fontSize: '.85em'}}>{moment(reservation.reserveDate).format('MM[/]DD[/]YY[, ]hh[:]mm[ ]a')}</Typography>
                  </Grid>
                  <Grid item xs={3} sx={{ padding: '3px 3px', display: 'flex', alignItems: 'center', paddingLeft: '2em'}}>
                    <Typography sx={{ lineHeight: '1.9em', fontSize: '.85em'}}>{reservation.name}</Typography>
                  </Grid>
                  <Grid item xs={2} sx={{ padding: '3px 3px', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                    <Typography sx={{ lineHeight: '1.9em', fontSize: '.85em'}}>{reservation.totalParty}&nbsp;ppl</Typography>
                  </Grid>
                  <Grid item xs={2} sx={{ padding: '3px 3px', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                    <Button size='small' value={reservation._id} onClick={detailHandler}>Details</Button>
                  </Grid>
                </Grid>
              ))}
            </Grid>
          </Card>
        </Grid>
      </Grid>
      <Modal open={detailOpen}>
      <Card sx={{ width: 400, position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', padding: '2em 2em', maxHeight: '70vh', overflow: 'auto'}}>
        {!!reservation ?
          <Grid container>
            <Grid item xs={12} sx={{ display: 'flex', flexDirection: 'row', borderBottom: '1px solid #dc5a41', marginBottom: '7px', justifyContent: 'space-between'}}>
              <Typography variant='h6' sx={{ color: 'darkgreen'}}>{reservation.name}</Typography>
              <Typography variant='body1' sx={{paddingTop: '.2em', color: 'gray'}}>{statusFilter(reservation)}</Typography>
            </Grid>
            {/* reserveDate */}
            <Grid item xs={4} sx={{ paddingLeft: '1em ', marginBottom: '.5em', marginTop: '.5em'}}>
              <Typography variant='body1' sx={{ fontSize: '1em', color: 'gray'}}>Reservation</Typography>
            </Grid>
            <Grid item xs={8} sx={{ paddingLeft: '1em', marginBottom: '.5em', marginTop: '.5em' }}>
              <Typography variant='body1' sx={{ color:'#dc5a41', fontWeight: 'bold'}}>{moment(reservation.reserveDate).format('LLL')}</Typography>
            </Grid>
            {/* reserveDate made */}
            <Grid item xs={4} sx={{ paddingLeft: '1em ', marginBottom: '.5em'}}>
              <Typography variant='body1' sx={{ fontSize: '1em', color: 'gray'}}>Placed</Typography>
            </Grid>
            <Grid item xs={8} sx={{ paddingLeft: '1em', marginBottom: '.5em' }}>
              <Typography variant='body1' sx={{ color:'gray', fontWeight: 'light'}}>{moment(reservation.updatedAt).format('LLL')}</Typography>
            </Grid>
            {/* # of party */}
            <Grid item xs={4} sx={{ paddingLeft: '1em ', marginBottom: '.5em'}}>
              <Typography variant='body1' sx={{ fontSize: '1em', color: 'gray'}}># of Party</Typography>
            </Grid>
            <Grid item xs={8} sx={{ paddingLeft: '1em', marginBottom: '.5em' }}>
              <Typography variant='body1' sx={{ color:'darkgreen', fontWeight: 'bold'}}>{reservation.totalParty} ppl</Typography>
            </Grid>
            {/* contact info-1 */}
            <Grid item xs={4} sx={{ paddingLeft: '1em ', marginBottom: '.5em'}}>
              <Typography variant='body1' sx={{ fontSize: '1em', color: 'gray'}}>Contact</Typography>
            </Grid>
            <Grid item xs={8} sx={{ paddingLeft: '1em', marginBottom: '.5em' }}>
              <Typography variant='body1' sx={{ color:'gray'}}>{reservation.contact}</Typography>
            </Grid>
            {/* contact info-2 */}
            <Grid item xs={4} sx={{ paddingLeft: '1em ', marginBottom: '.5em'}}>
              <Typography variant='body1' sx={{ fontSize: '1em', color: 'gray'}}>Email</Typography>
            </Grid>
            <Grid item xs={8} sx={{ paddingLeft: '1em', marginBottom: '.5em' }}>
              <Typography variant='body1' sx={{ color:'gray'}}>{reservation.email}</Typography>
            </Grid>
            {/* comments */}
            <Grid item xs={4} sx={{ paddingLeft: '1em ', marginBottom: '.5em'}}>
              <Typography variant='body1' sx={{ fontSize: '1em', color: 'gray'}}>Comments</Typography>
            </Grid>
            { reservation.comments === '' ?
              <Grid item xs={8} sx={{ paddingLeft: '1em', marginBottom: '.5em' }}>
                <Typography variant='body1' sx={{ color:'gray'}}>No comments</Typography>
              </Grid>
            :
              <Grid item xs={8} sx={{ paddingLeft: '1em', marginBottom: '.5em' }}>
                <Typography variant='body1' sx={{ color:'gray'}}>{reservation.comments}</Typography>
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
              <Typography variant='body1' sx={{ color:'gray'}}>{reservation.customer.username}</Typography>
            </Grid>
            {/* account email */}
            <Grid item xs={4} sx={{ paddingLeft: '1em ', marginBottom: '.5em'}}>
              <Typography variant='body1' sx={{ fontSize: '1em', color: 'gray'}}>Email</Typography>
            </Grid>
            <Grid item xs={8} sx={{ paddingLeft: '1em', marginBottom: '.5em' }}>
              <Typography variant='body1' sx={{ color:'gray'}}>{reservation.customer.email}</Typography>
            </Grid>
            {/* account contact */}
            <Grid item xs={4} sx={{ paddingLeft: '1em ', marginBottom: '.5em'}}>
              <Typography variant='body1' sx={{ fontSize: '1em', color: 'gray'}}>Contact</Typography>
            </Grid>
            <Grid item xs={8} sx={{ paddingLeft: '1em', marginBottom: '.5em' }}>
              <Typography variant='body1' sx={{ color:'gray'}}>{reservation.customer.contact}</Typography>
            </Grid>
            {/* account orders */}
            <Grid item xs={4} sx={{ paddingLeft: '1em ', marginBottom: '.5em'}}>
              <Typography variant='body1' sx={{ fontSize: '1em', color: 'gray'}}># Orders</Typography>
            </Grid>
            <Grid item xs={8} sx={{ paddingLeft: '1em', marginBottom: '.5em' }}>
              <Typography variant='body1' sx={{ color:'gray'}}>{reservation.customer.Orders.length} orders</Typography>
            </Grid>
            {/* account reservations */}
            <Grid item xs={4} sx={{ paddingLeft: '1em ', marginBottom: '.5em'}}>
              <Typography variant='body1' sx={{ fontSize: '1em', color: 'gray'}}># Reservations</Typography>
            </Grid>
            <Grid item xs={8} sx={{ paddingLeft: '1em', marginBottom: '.5em' }}>
              <Typography variant='body1' sx={{ color:'gray'}}>{reservation.customer.Reservations.length} reservations</Typography>
            </Grid>
            {/* Button */}
            <Grid item xs={12}>
              <Button onClick={detailCloser} sx={{ width: '100%', marginTop: '1em'}} variant='contained'>Close</Button>
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
      </Modal>
      </>
      }
    </ThemeProvider>
  );
}
export default ReservationHistory;