import { useState, useEffect } from 'react';
import { io } from 'socket.io-client';
import moment from 'moment';
// move io to dashboardPannel

// Mui
import { ThemeProvider } from '@mui/material/styles'
import { Typography, Grid, Accordion, AccordionSummary, AccordionDetails, Modal, Badge, CircularProgress, Card, Chip } from "@mui/material";
import { LoadingButton } from '@mui/lab';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

// Components
import theme from '../../../theme/theme';
import DetailCard from './DetailCard';
import ResDetailCard from './ResDetailCard';

const OrderStatus = (props) => {
  
  // states
  const [ expanded, setExpanded ] = useState(false);
  const [ socketNewOrders, setSocketNewOrders ] = useState([]);
  const [ socketConfirmedOrders, setSocketConfirmedOrders ] = useState([]);
  const [ socketReadyOrders, setSocketReadyOrders ] = useState([]);
  const [ socketNewReservations, setSocketNewReservations ] = useState([]);
  const [ socketConfirmedReservations, setSocketConfirmedReservations ] = useState([]);
  const [ modalValue, setModalValue ] = useState('');
  const [ modalOpen, setModalOpen ] = useState(false);
  const [ modalResValue, setModalResValue ] = useState('');
  const [ modalResOpen, setModalResOpen ] = useState(false);

  const socket = io('https://sushiville-socket.herokuapp.com/')
  const audio = new Audio('/sound/ding.mp3')
  let interval

  // handlers
  const NewOrderSeparator = (orders) => {
    if (!!orders) {
      let NewOrders = orders.filter(order => !order.isFinished && !order.isConfirmed && !order.isReady)
      setSocketNewOrders(NewOrders)
    } else {
      console.log('loading... or getting problem with getting orders')
    }
  }
    
  const ConfirmedOrderSeparator = (orders) => {
    if (!!orders) {
      let confirmedOrders = orders.filter(order => order.isConfirmed && !order.isFinished && !order.isReady)
      setSocketConfirmedOrders(confirmedOrders)
    } else {
      console.log('loading... or getting problem with getting orders')
    }
  }
  
  const readyOrderSeparator = (orders) => {
    if (!!orders) {
      let readyToPickUpOrders = orders.filter(order => order.isConfirmed && order.isReady && !order.isFinished)
      setSocketReadyOrders(readyToPickUpOrders)
    } else {
      console.log('loading... or getting problem with getting orders')      
    }
  } 

  const NewReservationSeparator = (reservations) => {
    if (!!reservations) {
      let NewReservations = reservations.filter(reservation => !reservation.isConfirmed && !reservation.isShowedUp)
      setSocketNewReservations(NewReservations);
    } else {
      console.log('loading... or getting problem with getting orders')      
    }
  }

  const ConfirmedReservationSeparator = (reservations) => {
    if(!!reservations) {
      let NewConfirmedRes = reservations.filter(reservation => reservation.isConfirmed && !reservation.isShowedUp)
      setSocketConfirmedReservations(NewConfirmedRes)
    } else {
      console.log('loading... or getting problem with getting orders')      
    }
  }

  useEffect(() => {
    const setStates = () => {
      NewOrderSeparator(props.socketOrders)
      ConfirmedOrderSeparator(props.socketOrders)
      readyOrderSeparator(props.socketOrders)
    }
    setStates()

  },[props.socketOrders])

  useEffect(() => {
    const setStates = () => {
      NewReservationSeparator(props.socketReservations)
      ConfirmedReservationSeparator(props.socketReservations)
    }
    setStates()
  }, [props.socketReservations])
  
  useEffect(() => {
    if (!!modalValue) {
      console.log(modalValue, modalOpen)
    }
  },[modalValue, modalOpen])

  useEffect(() => {
    if (!!modalResValue) {
      console.log(modalResValue, modalResOpen)
    }
  },[modalResValue, modalResOpen])

  useEffect(() => {
    if (!!socketNewOrders.length >= 1) {
      musicPlay();
    } else {
      audio.pause();
      clearInterval(interval)

    }
    return () => {
      clearInterval(interval)
    }
  }, [socketNewOrders])

  // handlers

  const musicPlay = () => {
    if (!!socketNewOrders.length >= 1) {
      interval = setInterval(() => {
        audio.play()
      }, 5000)
    } else {
      audio.pause();
      clearInterval(interval)
    }
  }

  const pannelHandler = (panel) => (e, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  }

  const paidOrNotPaidText = (Boolean) => {
    if (Boolean) {
      return <Chip label='Pay at Restaurant' color='primary' size='small' />
    } else if(!Boolean) {
      return <Chip label='Paid Online' color='success' size='small' />
    } else {
      return 'Loading...'
    }
  }

  const totalPriceText = (Number) => {
    if (!!Number) {
      return `$${Number.toFixed(2)}`
    } else {
      return 'Loading Data'
    }
  }

  const detailButtonHandler = (e) => {
    setModalValue(e.currentTarget.value);
    setModalOpen(true);
  }
  
  const detailButtonHandlerRes = (e) => {
    setModalResValue(e.currentTarget.value);
    setModalResOpen(true);
  }

  const confirmOrderHandler = (e) => {
    const connectingSocket = async () => {
      try {
        await socket.emit('confirmOrder', e.currentTarget.value)
      } catch (err) {
        console.log(err)
      }
    }
    connectingSocket();
  }
  
  const confirmResHandler = (e) => {
    const connectingSocket = async () => {
      try {
        await socket.emit('confirmReservation', e.currentTarget.value)
      } catch (err) {
        console.log(err)
      }
    }
    connectingSocket();
  }
  
  const denyResHandler = (e) => {
    const connectingSocket = async () => {
      try {
        await socket.emit('deniedReservation', e.currentTarget.value)
      } catch (err) {
        console.log(err)
      }
    }
    connectingSocket();
  }

  const showupResHandler = (e) => {
    const connectingSocket = async () => {
      try {
        await socket.emit('showedupReservation', e.currentTarget.value)
      } catch (err) {
        console.log(err)
      }
    }
    connectingSocket();
  }

  const readyOrderHandler = (e) => {
    const connectingSocket = async () => {
      try {
        await socket.emit('readyToPickUp', e.currentTarget.value)
      } catch (err) {
        console.log(err)
      }
    }
    connectingSocket();
  }

  const finishOrderHandler = (e) => {
    const connectingSocket = async () => {
      try {
        await socket.emit('finishOrder', e.currentTarget.value)
      } catch (err) {
        console.log(err)
      }
    }
    connectingSocket();
  }

  const backgroundChanger = () => {
    let returnObj = socketNewOrders.length > 0 ? 'hotpink' : 'white'
    return returnObj
  }

  const textColorChanger = () => {
    let returnObj = socketNewOrders.length > 0 ? 'white' : 'darkgreen'
    return returnObj
  }

  const backgroundChanger2 = () => {
    let returnObj = socketNewReservations.length > 0 ? 'darkgreen' : 'white'
    return returnObj
  }

  const textColorChanger2 = () => {
    let returnObj = socketNewReservations.length > 0 ? 'white' : 'darkgreen'
    return returnObj
  }

  return (
    <ThemeProvider theme={theme}>
      <Grid item xs={12} md={8} sx={{ margin: '3em auto'}}>

        <Typography variant='h6' sx={{ color: '#dc5a41', marginBottom: '.5em'}}>Orders</Typography>
        {/* New Orders */}
        <Accordion
          expanded={expanded === 'panel1'}
          onChange={pannelHandler('panel1')}
          elevation={3}
          sx={{ bgcolor: backgroundChanger }}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
          >
            <Badge badgeContent={socketNewOrders.length} color='primary'><Typography sx={{fontSize: '1.25em', color: textColorChanger}}>New</Typography></Badge>
          </AccordionSummary>
          <AccordionDetails sx={{ bgcolor: 'rgba(255, 240, 174, 0.75)'}}>
            { !props.socketOrders ? 
              <Grid container>
                <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', margin: '2em auto', flexDirection: 'column'}}>
                  <CircularProgress />
                  <Typography variant='body1' sx={{marginTop: '.5em'}}>Loading...</Typography>
                </Grid>
              </Grid>
            : 
              <Grid container sx={{ maxHeight: '50vh', overflow: 'auto', '&::-webkit-scrollbar': {display: 'none'}}} spacing={2} >
                {socketNewOrders.map((order, i) => (
                  <Grid item xs={12} key={i}>
                    <Card sx={{ padding: '1em 1em'}}>
                      <Grid container>
                        <Grid item xs={8}>
                          <Grid container>
                            <Grid item xs={12} sx={{marginBottom: '.5em', marginTop: '.5em', display: 'flex', flexDirection: 'row'}}>
                              <Typography sx={{ fontWeight: 'bold', color: 'darkgreen', marginRight: '1.5em'}}>
                                {order.OrderNumber}
                              </Typography>
                              <Typography sx={{ fontSize: '.85em', fontWeight: 'light', paddingTop: '.15em'}}>
                                Order Placed: {moment(order.updatedAt).calendar()}
                              </Typography>
                            </Grid>
                            <Grid item xs={12} sx={{marginBottom: '.5em', display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
                              <Typography sx={{ color: 'darkgreen', fontSize: '1.25em', fontWeight: 'bold'}}>{order.customer.username} -&nbsp;</Typography>
                              <Typography sx={{ color: 'gray', marginRight: '.25em'}}>Total: </Typography>
                              <Typography sx={{ color: '#dc5a41', fontWeight: 'bold'}}>
                                {totalPriceText(order.grandTotal)}
                              </Typography>
                            </Grid>
                            <Grid item xs={12} sx={{marginBottom: '.5em'}}>
                              {paidOrNotPaidText(order.isPaidAtRestaurant)}
                            </Grid>
                          </Grid>
                        </Grid>
                        <Grid item xs={4} sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center'}}>
                          <LoadingButton variant='outlined' value={order._id} onClick={detailButtonHandler} sx={{ marginBottom: '.5em'}}> Detail</LoadingButton>
                          <LoadingButton variant='contained' value={order._id} onClick={confirmOrderHandler}>Confirm</LoadingButton>
                        </Grid>
                      </Grid>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            }
          </AccordionDetails>
        </Accordion>
        {/* Confired Orders */}
        <Accordion
          expanded={expanded === 'panel2'}
          onChange={pannelHandler('panel2')}
          elevation={3}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
          >
            {/* TODO: Badge numers = order length */}
            <Badge badgeContent={socketConfirmedOrders.length} color='primary'><Typography sx={{fontSize: '1.25em', color: 'darkgreen'}}>Confirmed</Typography></Badge>
            {/* TODO: set lineheight */}
          </AccordionSummary>
          <AccordionDetails sx={{ bgcolor: 'rgba(255, 240, 174, 0.75)'}}>
          { !props.socketOrders ? 
              <Grid container>
                <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', margin: '2em auto', flexDirection: 'column'}}>
                  <CircularProgress />
                  <Typography variant='body1' sx={{marginTop: '.5em'}}>Loading...</Typography>
                </Grid>
              </Grid>
            : 
              <Grid container sx={{ maxHeight: '50vh', overflow: 'auto', '&::-webkit-scrollbar': {display: 'none'}}} spacing={2} >
                {socketConfirmedOrders.map((order, i) => (
                  <Grid item xs={12} key={i}>
                    <Card sx={{ padding: '1em 1em'}}>
                      <Grid container>
                        <Grid item xs={8}>
                          <Grid container>
                            <Grid item xs={12} sx={{marginBottom: '.5em', marginTop: '.5em', display: 'flex', flexDirection: 'row'}}>
                              <Typography sx={{ color: 'gray', marginRight: '1.5em'}}>
                                {order.OrderNumber}
                              </Typography>
                              <Typography sx={{ fontSize: '.85em', fontWeight: 'light', paddingTop: '.15em'}}>
                                Order Placed: {moment(order.updatedAt).calendar()}
                              </Typography>
                            </Grid>
                            <Grid item xs={12} sx={{marginBottom: '.5em', display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
                              <Typography sx={{ color: 'darkgreen', fontSize: '1.25em', fontWeight: 'bold'}}>{order.customer.username} -&nbsp;</Typography>
                              <Typography sx={{ color: 'gray', marginRight: '.25em'}}>Total: </Typography>
                              <Typography sx={{ color: '#dc5a41', fontWeight: 'bold'}}>
                                {totalPriceText(order.grandTotal)}
                              </Typography>
                            </Grid>
                            <Grid item xs={12} sx={{marginBottom: '.5em'}}>
                              {paidOrNotPaidText(order.isPaidAtRestaurant)}
                            </Grid>
                          </Grid>
                        </Grid>
                        <Grid item xs={4} sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center'}}>
                          <LoadingButton variant='outlined' value={order._id} onClick={detailButtonHandler} sx={{ marginBottom: '.5em'}}> Detail</LoadingButton>
                          <LoadingButton variant='contained' value={order._id} onClick={readyOrderHandler}>ready</LoadingButton>
                        </Grid>
                      </Grid>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            }
          </AccordionDetails>
        </Accordion>
        {/* Finished Orders */}
        <Accordion
          expanded={expanded === 'panel3'}
          onChange={pannelHandler('panel3')}
          elevation={3}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
          >
            {/* TODO: Badge numers = order length */}
            <Badge badgeContent={socketReadyOrders.length} color='primary'><Typography sx={{fontSize: '1.25em', color: 'darkgreen'}}>Ready To Pick Up</Typography></Badge>
            {/* TODO: set lineheight */}
          </AccordionSummary>
          <AccordionDetails sx={{ bgcolor: 'rgba(255, 240, 174, 0.75)'}}>
          { !props.socketOrders ? 
              <Grid container>
                <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', margin: '2em auto', flexDirection: 'column'}}>
                  <CircularProgress />
                  <Typography variant='body1' sx={{marginTop: '.5em'}}>Loading...</Typography>
                </Grid>
              </Grid>
            : 
              <Grid container sx={{ maxHeight: '50vh', overflow: 'auto', '&::-webkit-scrollbar': {display: 'none'}}} spacing={2} >
                {socketReadyOrders.map((order, i) => (
                  <Grid item xs={12} key={i}>
                    <Card sx={{ padding: '1em 1em'}}>
                      <Grid container>
                        <Grid item xs={8}>
                          <Grid container>
                            <Grid item xs={12} sx={{marginBottom: '.5em', marginTop: '.5em', display: 'flex', flexDirection: 'row'}}>
                              <Typography sx={{ fontWeight: 'bold', color: 'darkgreen', marginRight: '1.5em'}}>
                                {order.OrderNumber}
                              </Typography>
                              <Typography sx={{ fontSize: '.85em', fontWeight: 'light', paddingTop: '.15em'}}>
                                Order Placed: {moment(order.updatedAt).calendar()}
                              </Typography>
                            </Grid>
                            <Grid item xs={12} sx={{marginBottom: '.5em', display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
                              <Typography sx={{ color: 'darkgreen', fontSize: '1.25em', fontWeight: 'bold'}}>{order.customer.username} -&nbsp;</Typography>
                              <Typography sx={{ color: 'gray', marginRight: '.25em'}}>Total: </Typography>
                              <Typography sx={{ color: '#dc5a41', fontWeight: 'bold'}}>
                                {totalPriceText(order.grandTotal)}
                              </Typography>
                            </Grid>
                            <Grid item xs={12} sx={{marginBottom: '.5em'}}>
                              {paidOrNotPaidText(order.isPaidAtRestaurant)}
                            </Grid>
                          </Grid>
                        </Grid>
                        <Grid item xs={4} sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center'}}>
                          <LoadingButton variant='outlined' value={order._id} onClick={detailButtonHandler} sx={{ marginBottom: '.5em'}}> Detail</LoadingButton>
                          <LoadingButton variant='contained' value={order._id} onClick={finishOrderHandler}>Picked Up</LoadingButton>
                        </Grid>
                      </Grid>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            }
          </AccordionDetails>
        </Accordion>
      </Grid>
        {/* Reservations */}
      <Grid item xs={12} md={8} sx={{ margin: '0 auto'}}>
        <Typography variant='h6' sx={{ color: '#dc5a41', marginBottom: '.5em', marginTop: '2em'}}>Reservations</Typography>
        <Grid container>
          <Grid item xs={12}>
          <Accordion
              expanded={expanded === 'panel4'}
              onChange={pannelHandler('panel4')}
              elevation={3}
              sx={{ bgcolor: backgroundChanger2 }}
            >
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Badge badgeContent={socketNewReservations.length} color='primary'><Typography sx={{fontSize: '1.25em', color: textColorChanger2 }}>New</Typography></Badge>
              </AccordionSummary>
              <AccordionDetails sx={{ bgcolor: 'rgba(255, 240, 174, 0.75)'}}>
              { !props.socketReservations ? 
                  <Grid container>
                    <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', margin: '2em auto', flexDirection: 'column'}}>
                      <CircularProgress />
                      <Typography variant='body1' sx={{marginTop: '.5em'}}>Loading...</Typography>
                    </Grid>
                  </Grid>
                : 
                  <Grid container sx={{ maxHeight: '50vh', overflow: 'auto', '&::-webkit-scrollbar': {display: 'none'}}} spacing={2} >
                    {socketNewReservations.map((reservation, i) => (
                      <Grid item xs={12} key={i}>
                        <Card sx={{ padding: '1em 1em'}}>
                          <Grid container>
                            <Grid item xs={8}>
                              <Grid container>
                                <Grid item xs={12} sx={{marginBottom: '.5em', marginTop: '.5em', display: 'flex', flexDirection: 'row'}}>
                                  <Typography sx={{ fontSize: '.85em', fontWeight: 'light', paddingTop: '.15em'}}>
                                    Reservation Placed: {moment(reservation.updatedAt).calendar()}
                                  </Typography>
                                </Grid>
                                <Grid item xs={12} sx={{marginBottom: '.5em', display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
                                  <Typography sx={{ color: 'darkgreen', fontSize: '1.25em', fontWeight: 'bold'}}>{reservation.name} -&nbsp;</Typography>
                                  <Typography sx={{ fontWeight: 'bold', color: 'gray', fontStyle: 'italic'}}>{reservation.totalParty} ppl</Typography>
                                </Grid>
                                <Grid item xs={12} sx={{marginBottom: '.5em', display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
                                  <Typography sx={{ fontWeight: 'light'}}>Reserve Date:</Typography>
                                  <Typography sx={{ color: '#dc5a41', paddingLeft: '.5em' }}>{moment(reservation.reserveDate).format('LLL')}</Typography>
                                </Grid>
                              </Grid>
                            </Grid>
                            <Grid item xs={4} sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center'}}>
                              <LoadingButton variant='outlined' value={reservation._id} onClick={detailButtonHandlerRes} sx={{ marginBottom: '.75em'}} size='small'> Detail</LoadingButton>
                              <LoadingButton variant='contained' value={reservation._id} onClick={confirmResHandler} size='small' sx={{ marginBottom: '.75em'}}>Confirm</LoadingButton>
                              <LoadingButton variant='text' value={reservation._id} onClick={denyResHandler} size='small'>Deny Request</LoadingButton>
                            </Grid>
                          </Grid>
                        </Card>
                      </Grid>
                    ))}
                  </Grid>
                }
              </AccordionDetails>
            </Accordion>
            {/* confirmed Reservations */}
            <Accordion
              expanded={expanded === 'panel5'}
              onChange={pannelHandler('panel5')}
              elevation={3}
            >
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Badge badgeContent={socketConfirmedReservations.length} color='primary'><Typography sx={{fontSize: '1.25em', color: 'darkgreen'}}>Confirmed</Typography></Badge>
              </AccordionSummary>
              <AccordionDetails sx={{ bgcolor: 'rgba(255, 240, 174, 0.75)'}}>
              { !props.socketReservations ? 
                  <Grid container>
                    <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', margin: '2em auto', flexDirection: 'column'}}>
                      <CircularProgress />
                      <Typography variant='body1' sx={{marginTop: '.5em'}}>Loading...</Typography>
                    </Grid>
                  </Grid>
                : 
                  <Grid container sx={{ maxHeight: '50vh', overflow: 'auto', '&::-webkit-scrollbar': {display: 'none'}}} spacing={2} >
                    {socketConfirmedReservations.map((reservation, i) => (
                      <Grid item xs={12} key={i}>
                        <Card sx={{ padding: '1em 1em'}}>
                          <Grid container>
                            <Grid item xs={8}>
                              <Grid container>
                                <Grid item xs={12} sx={{marginBottom: '.5em', marginTop: '.5em', display: 'flex', flexDirection: 'row'}}>
                                  <Typography sx={{ fontSize: '.85em', fontWeight: 'light', paddingTop: '.15em'}}>
                                    Reservation Placed: {moment(reservation.updatedAt).calendar()}
                                  </Typography>
                                </Grid>
                                <Grid item xs={12} sx={{marginBottom: '.5em', display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
                                  <Typography sx={{ color: 'darkgreen', fontSize: '1.25em', fontWeight: 'bold'}}>{reservation.name} -&nbsp;</Typography>
                                  <Typography sx={{ fontWeight: 'bold', color: 'gray', fontStyle: 'italic'}}>{reservation.totalParty} ppl</Typography>
                                </Grid>
                                <Grid item xs={12} sx={{marginBottom: '.5em', display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
                                  <Typography sx={{ fontWeight: 'light'}}>Reserve Date:</Typography>
                                  <Typography sx={{ color: '#dc5a41', paddingLeft: '.5em' }}>{moment(reservation.reserveDate).format('LLL')}</Typography>
                                </Grid>
                              </Grid>
                            </Grid>
                            <Grid item xs={4} sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center'}}>
                              <LoadingButton variant='outlined' value={reservation._id} onClick={detailButtonHandlerRes} sx={{ marginBottom: '.75em'}}> Detail</LoadingButton>
                              <LoadingButton variant='contained' value={reservation._id} onClick={showupResHandler} sx={{ marginBottom: '.75em'}}>Showed Up</LoadingButton>
                            </Grid>
                          </Grid>
                        </Card>
                      </Grid>
                    ))}
                  </Grid>
                }
              </AccordionDetails>
            </Accordion>
          </Grid>
        </Grid>
      </Grid>
      <Modal open={modalOpen}>
        <DetailCard value={modalValue} modalOpen={modalOpen} setModalOpen={setModalOpen}/>
      </Modal>
      <Modal open={modalResOpen}>
        <ResDetailCard value={modalResValue} modalOpen={modalResOpen} setModalOpen={setModalResOpen} />
      </Modal>
    </ThemeProvider>
  );
}
export default OrderStatus;