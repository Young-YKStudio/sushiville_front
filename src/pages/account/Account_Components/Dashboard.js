import { useState } from 'react';

import { ThemeProvider } from '@mui/material/styles';
import { Typography, Grid, Accordion, AccordionSummary, AccordionDetails, Card } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import theme from '../../../theme/theme';
import moment from 'moment';

const Dashboard = (props) => {

  const [ expanded, setExpanded ] = useState(false);

  const pannelHandler = (panel) => (e, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  }

  const orderStatusFilter = (data) => {
    if (data.isFinished) {
      return 'Order is fulfilled'
    }
    if (!data.isFinished && data.isReady) {
      return 'Order is ready for pick-up'
    }
    if (!data.isFinished && !data.isReady && data.isConfirmed) {
      return 'Order is being prepared'
    }
    if (!data.isFinished && !data.isReady && !data.isConfirmed) {
      return 'Order received'
    }
  }

  const orderPaymentFilter = (data) => {
    if (data.isPaidAtRestaurant && !data.isPaid) {
      return 'Order is not paid yet'
    }
    if (data.isPaidAtRestaurant && data.isPaid) {
      return 'Order is paid'
    } 
    if (!data.isPaidAtRestaurant) {
      return 'Order is paid'
    }
  }

  const resStatusFilter = (data) => {
    if (data.isDenied) {
      return 'Reservation request has been denied'
    }
    if (data.isShowedUp) {
      return 'Reservation completed'
    }
    if (!data.isDenied && !data.isShowedUp && !data.isConfirmed) {
      return 'Reservation requested'
    }
    if (!data.isDenied && !data.isShowedUp && data.isConfirmed) {
      return 'Reservation confirmed'
    }
  }

  const dataDistributor = (data, text) => {
    if (text === 'currentOrders') {
      let currentOrders = data.Orders.filter(order => !order.isFinished)
      return currentOrders.length === 0 ?
        <Grid container>
          <Grid item xs={12}>
            <Typography sx={{ textAlign: 'center', color: 'gray'}}>There is no current orders.</Typography>
          </Grid>
        </Grid>
        :
        <Grid container sx={{ maxHeight: '50vh', overflow: 'auto', '&::-webkit-scrollbar': {display: 'none'}}} spacing={2}>
          {currentOrders.map((order, i) => (
            <Grid item xs={12} key={i} sx={{ padding: '.5em .5em'}}>
              <Card sx={{ padding: '1.5em 1.5em', bgcolor: '#f5f5f5'}} elevation={1}>
                <Grid container>
                  <Grid item xs={6}>
                    <Typography sx={{color: '#dc5a41', fontWeight: 'light'}}><span style={{color: 'gray', marginRight: '.5em'}}>Order Number:</span> {order.OrderNumber}</Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography sx={{color: 'darkgreen', fontWeight: 'light'}}><span style={{color: 'gray', marginRight: '.5em'}}>Order Status:</span> {orderStatusFilter(order)}</Typography>
                  </Grid>
                  <Grid item xs={6} sx={{ paddingTop: '.25em'}}>
                    <Typography sx={{color: '#dc5a41', fontWeight: 'light'}}><span style={{color: 'gray', marginRight: '.5em'}}>Order Placed:</span> {moment(order.createdAt).format('LLL')}</Typography>
                  </Grid>
                  <Grid item xs={6} sx={{ paddingTop: '.25em'}}>
                    <Typography sx={{color: '#dc5a41', fontWeight: 'light'}}><span style={{color: 'gray', marginRight: '.5em'}}>Order Total:</span> ${order.grandTotal.toFixed(2)}, <span style={{color: 'darkgreen', fontSize: '.9em', fontStyle: 'italic'}}>{orderPaymentFilter(order)}</span></Typography>
                  </Grid>
                </Grid>
              </Card>
            </Grid>
          ))}
        </Grid>
    }
    if (text === 'FulfilledOrders') {
      let fulfilledOrders = data.Orders.filter(order => order.isFinished)
      return fulfilledOrders.length === 0 ?
        <Grid container>
          <Grid item xs={12}>
            <Typography sx={{ textAlign: 'center', color: 'gray'}}>There is no fulfilled orders.</Typography>
          </Grid>
        </Grid>
        :
        <Grid container sx={{ maxHeight: '50vh', overflow: 'auto', '&::-webkit-scrollbar': {display: 'none'}}} spacing={2}>
          {fulfilledOrders.map((order, i) => (
            <Grid item xs={12} key={i} sx={{ padding: '.5em .5em'}}>
              <Card sx={{ padding: '1.5em 1.5em', bgcolor: '#f5f5f5'}} elevation={1}>
                <Grid container>
                  <Grid item xs={6}>
                    <Typography sx={{color: '#dc5a41', fontWeight: 'light'}}><span style={{color: 'gray', marginRight: '.5em'}}>Order Number:</span> {order.OrderNumber}</Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography sx={{color: 'darkgreen', fontWeight: 'light'}}><span style={{color: 'gray', marginRight: '.5em'}}>Order Status:</span> {orderStatusFilter(order)}</Typography>
                  </Grid>
                  <Grid item xs={6} sx={{ paddingTop: '.25em'}}>
                    <Typography sx={{color: '#dc5a41', fontWeight: 'light'}}><span style={{color: 'gray', marginRight: '.5em'}}>Order Placed:</span> {moment(order.createdAt).format('LLL')}</Typography>
                  </Grid>
                  <Grid item xs={6} sx={{ paddingTop: '.25em'}}>
                    <Typography sx={{color: '#dc5a41', fontWeight: 'light'}}><span style={{color: 'gray', marginRight: '.5em'}}>Order Total:</span> ${order.grandTotal.toFixed(2)}, <span style={{color: 'darkgreen', fontSize: '.9em', fontStyle: 'italic'}}>{orderPaymentFilter(order)}</span></Typography>
                  </Grid>
                </Grid>
              </Card>
            </Grid>
          ))}
        </Grid>
    }
    if (text === 'CurrentReservations') {
      let currentRes = data.Reservations.filter(res => !res.isDenied && !res.isShowedUp)
      return currentRes.length === 0 ?
        <Grid container>
          <Grid item xs={12}>
            <Typography sx={{ textAlign: 'center', color: 'gray'}}>There is no fulfilled orders.</Typography>
          </Grid>
        </Grid>
        :
        <Grid container sx={{ maxHeight: '50vh', overflow: 'auto', '&::-webkit-scrollbar': {display: 'none'}}} spacing={2}>
          {currentRes.map((res, i) => (
            <Grid item xs={12} key={i} sx={{ padding: '.5em .5em'}}>
              <Card sx={{ padding: '1.5em 1.5em', bgcolor: '#f5f5f5'}} elevation={1}>
                <Grid container>
                  <Grid item xs={12}>
                    <Typography sx={{color: '#dc5a41', fontWeight: 'light'}}><span style={{color: 'gray', marginRight: '.5em'}}>Reservation Status:</span> {resStatusFilter(res)}</Typography>
                  </Grid>
                  <Grid item xs={12} sx={{ paddingTop: '.25em'}}>
                    <Typography sx={{color: 'darkgreen', fontWeight: 'light'}}><span style={{color: 'gray', marginRight: '.5em'}}>Email:</span> {res.email}</Typography>
                  </Grid>
                  <Grid item xs={6} sx={{ paddingTop: '.25em'}}>
                    <Typography sx={{color: 'darkgreen', fontWeight: 'light'}}><span style={{color: 'gray', marginRight: '.5em'}}>Name:</span> {res.name}</Typography>
                  </Grid>
                  <Grid item xs={6} sx={{ paddingTop: '.25em'}}>
                    <Typography sx={{color: 'darkgreen', fontWeight: 'light'}}><span style={{color: 'gray', marginRight: '.5em'}}>Contact:</span> {res.contact}</Typography>
                  </Grid>
                  <Grid item xs={6} sx={{ paddingTop: '.25em'}}>
                    <Typography sx={{color: 'darkgreen', fontWeight: 'light'}}><span style={{color: 'gray', marginRight: '.5em'}}>Date:</span> {moment(res.reserveDate).format('LLL')}</Typography>
                  </Grid>
                  <Grid item xs={6} sx={{ paddingTop: '.25em'}}>
                    <Typography sx={{color: 'darkgreen', fontWeight: 'light'}}><span style={{color: 'gray', marginRight: '.5em'}}>Requested:</span> {moment(res.createdAt).format('LLL')}</Typography>
                  </Grid>
                  <Grid item xs={12} sx={{ paddingTop: '.25em'}}>
                    <Typography sx={{color: '#dc5a41', fontWeight: 'light'}}><span style={{color: 'gray', marginRight: '.5em'}}>Party:</span> {res.totalParty} ppl</Typography>
                  </Grid>
                  {res.comments !== '' ?
                    <>
                      <Grid item xs={3} sx={{ paddingTop: '.25em'}}>
                        <Typography sx={{fontWeight: 'light'}}><span style={{color: 'gray', marginRight: '.5em'}}>Comments:</span></Typography>
                      </Grid> 
                      <Grid item xs={9} sx={{ paddingTop: '.25em'}}>
                        <Typography sx={{color: '#333', fontWeight: 'light'}}>{res.comments}</Typography>
                      </Grid> 
                    </> 
                    : null }
                </Grid>
              </Card>
            </Grid>
          ))}
        </Grid>
    }
    if (text === 'PastReservations') {
      let pastRes = data.Reservations.filter(res => res.isDenied || res.isShowedUp)
      return pastRes.length === 0 ?
        <Grid container>
          <Grid item xs={12}>
            <Typography sx={{ textAlign: 'center', color: 'gray'}}>There is no fulfilled orders.</Typography>
          </Grid>
        </Grid>
        :
        <Grid container sx={{ maxHeight: '50vh', overflow: 'auto', '&::-webkit-scrollbar': {display: 'none'}}} spacing={2}>
          {pastRes.map((res, i) => (
            <Grid item xs={12} key={i} sx={{ padding: '.5em .5em'}}>
              <Card sx={{ padding: '1.5em 1.5em', bgcolor: '#f5f5f5'}} elevation={1}>
                <Grid container>
                  <Grid item xs={12}>
                    <Typography sx={{color: '#dc5a41', fontWeight: 'light'}}><span style={{color: 'gray', marginRight: '.5em'}}>Reservation Status:</span> {resStatusFilter(res)}</Typography>
                  </Grid>
                  <Grid item xs={12} sx={{ paddingTop: '.25em'}}>
                    <Typography sx={{color: 'darkgreen', fontWeight: 'light'}}><span style={{color: 'gray', marginRight: '.5em'}}>Email:</span> {res.email}</Typography>
                  </Grid>
                  <Grid item xs={6} sx={{ paddingTop: '.25em'}}>
                    <Typography sx={{color: 'darkgreen', fontWeight: 'light'}}><span style={{color: 'gray', marginRight: '.5em'}}>Name:</span> {res.name}</Typography>
                  </Grid>
                  <Grid item xs={6} sx={{ paddingTop: '.25em'}}>
                    <Typography sx={{color: 'darkgreen', fontWeight: 'light'}}><span style={{color: 'gray', marginRight: '.5em'}}>Contact:</span> {res.contact}</Typography>
                  </Grid>
                  <Grid item xs={6} sx={{ paddingTop: '.25em'}}>
                    <Typography sx={{color: 'darkgreen', fontWeight: 'light'}}><span style={{color: 'gray', marginRight: '.5em'}}>Date:</span> {moment(res.reserveDate).format('LLL')}</Typography>
                  </Grid>
                  <Grid item xs={6} sx={{ paddingTop: '.25em'}}>
                    <Typography sx={{color: 'darkgreen', fontWeight: 'light'}}><span style={{color: 'gray', marginRight: '.5em'}}>Requested:</span> {moment(res.createdAt).format('LLL')}</Typography>
                  </Grid>
                  <Grid item xs={12} sx={{ paddingTop: '.25em'}}>
                    <Typography sx={{color: '#dc5a41', fontWeight: 'light'}}><span style={{color: 'gray', marginRight: '.5em'}}>Party:</span> {res.totalParty} ppl</Typography>
                  </Grid>
                  {res.comments !== '' ?
                    <>
                      <Grid item xs={3} sx={{ paddingTop: '.25em'}}>
                        <Typography sx={{fontWeight: 'light'}}><span style={{color: 'gray', marginRight: '.5em'}}>Comments:</span></Typography>
                      </Grid> 
                      <Grid item xs={9} sx={{ paddingTop: '.25em'}}>
                        <Typography sx={{color: '#333', fontWeight: 'light'}}>{res.comments}</Typography>
                      </Grid> 
                    </> 
                    : null }
                </Grid>
              </Card>
            </Grid>
          ))}
        </Grid>
    }
  }

  return (
    <ThemeProvider theme={theme}>
      <Grid item xs={12} md={8} sx={{ margin: '0 auto', paddingTop: '8.5em', width: '100%'}}>
        <Typography variant="h6" sx={{ color: '#dc5a41', marginBottom: '.5em'}}>Welcome {props.userData.username}.</Typography>
        <Typography variant="body1" sx={{ color: 'gray', marginBottom: '1.5em'}}>Here's your order and reservation status.</Typography>
        <Accordion
          expanded={expanded === 'panel1'}
          onChange={pannelHandler('panel1')}
          elevation={3}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
          >
            <Typography sx={{fontSize: '1.25em', color: 'darkgreen'}}>Current Orders</Typography>
          </AccordionSummary>
          <AccordionDetails>
            {dataDistributor(props.userData, 'currentOrders')}
          </AccordionDetails>
        </Accordion>
        <Accordion
          expanded={expanded === 'panel2'}
          onChange={pannelHandler('panel2')}
          elevation={3}
          sx={{ zIndex: 1, position: 'relative'}}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
          >
            <Typography sx={{fontSize: '1.25em', color: 'darkgreen'}}>Fulfilled Orders</Typography>
          </AccordionSummary>
          <AccordionDetails>
            {dataDistributor(props.userData, 'FulfilledOrders')}
          </AccordionDetails>
        </Accordion>
        <Accordion
          expanded={expanded === 'panel3'}
          onChange={pannelHandler('panel3')}
          elevation={3}
          sx={{ zIndex: 1, position: 'relative'}}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
          >
            <Typography sx={{fontSize: '1.25em', color: 'darkgreen'}}>Current Reservations</Typography>
          </AccordionSummary>
          <AccordionDetails>
            {dataDistributor(props.userData, 'CurrentReservations')}
          </AccordionDetails>
        </Accordion>
        <Accordion
          expanded={expanded === 'panel4'}
          onChange={pannelHandler('panel4')}
          elevation={3}
          sx={{ zIndex: 1, position: 'relative'}}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
          >
            <Typography sx={{fontSize: '1.25em', color: 'darkgreen'}}>Past Reservations</Typography>
          </AccordionSummary>
          <AccordionDetails>
            {dataDistributor(props.userData, 'PastReservations')}
          </AccordionDetails>
        </Accordion>
      </Grid>
    </ThemeProvider>
  );
}
export default Dashboard;