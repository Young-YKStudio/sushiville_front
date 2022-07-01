import { useState, useEffect } from 'react';
import axios from 'axios';
import OrderStatus from './OrderStatus';

// MUI
import { ThemeProvider } from '@mui/material/styles';
import { Grid, Typography } from '@mui/material';
import theme from '../../../theme/theme'

const DashBoardSocket = (props) => {

  const [ socketOrders, setSocketOrders ] = useState(null);
  const [ socketReservations, setSocketReservations ] = useState(null);

  const callServer = async () => {
    const config = {
      header: {
        "Content=Type": "application/json"
      }
    }

    const { data } = await axios.get(`${process.env.REACT_APP_SERVER_URL}/api/order/list/socket`, config);
    console.log(data, 'from socket');

    if(data.message === 'listing all orders') {
      const filterOrder = (orders) => {
        let filteredOrder = orders.filter(order => order.isPlaced == true)
        setSocketOrders(filteredOrder);
        console.log(filteredOrder, 'filtered Order')
      }
      filterOrder(data.listOrder);
      setSocketReservations(data.listReservation);
    }
  }

  useEffect(() => {
    const interval = setInterval(() => {
      callServer();
    }, 60000);
    return () => clearInterval(interval);
  },[])

  useEffect(() => {
    console.log('updated', socketOrders, socketReservations)
  }, [socketOrders, socketReservations])

  return (
    <ThemeProvider theme={theme}>
      <Grid container>
        <Grid item xs={12}>
          <OrderStatus socketOrders={socketOrders} socketReservations={socketReservations} callServer={callServer} />
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}
export default DashBoardSocket;