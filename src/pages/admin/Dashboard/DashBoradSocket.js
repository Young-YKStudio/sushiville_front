import { useState, useEffect } from 'react';
import io from 'socket.io-client';

import OrderStatus from './OrderStatus';

// MUI
import { ThemeProvider } from '@mui/material/styles';
import { Grid } from '@mui/material';
import theme from '../../../theme/theme'

const DashBoardSocket = (props) => {

  const [ socketOrders, setSocketOrders ] = useState(null);
  const [ socketReservations, setSocketReservations ] = useState(null);

  const socket = io('http://sushiville-socket.herokuapp.com/');
  // const socket = io('http://localhost:4000/');


  useEffect(() => {
    
    socket.on('Orders', async (data) => {
      await setSocketOrders(data)
    })
    socket.on('Reservations', async (data) => {
      await setSocketReservations(data)
    })

    return () => socket.off()
  },[])

  useEffect(() => {
    console.log('updated', socketOrders, socketReservations)
  }, [socketOrders, socketReservations])

  return (
    <ThemeProvider theme={theme}>
      <Grid container>
        <Grid item xs={12}>
          <OrderStatus socketOrders={socketOrders} socketReservations={socketReservations} />
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}
export default DashBoardSocket;