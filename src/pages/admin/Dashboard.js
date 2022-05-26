import { useState, useEffect } from 'react'
import axios from 'axios';

// pages
import MenuManagement from "./MenuManagement";
import DashBoardPannel from './Dashboard/DashboardPannel';
import OrderManagement from './OrderManagement';
import ReservationHistory from './ReservationHistory';

// MUI
import PropTypes from 'prop-types';
import { Tabs, Tab, Card, Typography, Button, Grid, Box, CircularProgress } from '@mui/material'
import { ThemeProvider } from '@mui/material/styles';
import theme from '../../theme/theme'


// MUI - tabs
function TabPanel(props) {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3, display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
          <div className='thebox'>{children}</div>
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

// customers, orders, menu, dashboard, reservations, payments


const DashBoard = (props) => {

  // states
  const [ value, setValue ] = useState(0);
  const [ allOrders, setAllOrders ] = useState([]);

  // handlers
  const handleChange = (event, newValue) => {
    setValue(newValue);
  }

  // useEffect
  useEffect(() => {
    async function fetchOrders() {
      const config = {
        header: {
          "Content-Type": "application/json"
        }
      }

      const { data } = await axios.get(`${process.env.REACT_APP_SERVER_URL}/api/order/list/listorder`, config);
      setAllOrders(data.listOrder);
    }
    fetchOrders();
  },[])

  return (
    <ThemeProvider theme={theme}>
      <Grid container >
        <Box sx={{ flexGrow: 1, bgcolor: 'Background.paper', display: 'flex', marginTop: '4.25em'}}>
          <Tabs
            orientation='horizontal'
            variant='scrollable'
            value={value}
            onChange={handleChange}
            sx={{ borderBottom: 1, borderColor: 'divider', width: '100%'}}
          >
            <Tab label="Dashboard" {...allyProps} />
            <Tab label="Order History" {...allyProps} />
            <Tab label="Reservation History" {...allyProps} />
            <Tab label="Menu Management" {...allyProps} />
          </Tabs>
        </Box>
        <Grid item xs={12}>
          <TabPanel value={value} index={0}>
            { allOrders.length > 0 ?
              <DashBoardPannel 
                allOrders={allOrders}
              />
              :
              <Grid container>
                <Grid item sx={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center', height: '70vh'}} xs={12}>
                  <CircularProgress />
                  <Typography sx={{ marginTop: '1em'}}>Loading...</Typography>
                </Grid>
              </Grid>
            }
          </TabPanel>
          <TabPanel value={value} index={1}>
            <OrderManagement allOrders={allOrders}/>
          </TabPanel>
          <TabPanel value={value} index={2}>
            <ReservationHistory />
          </TabPanel>
          <TabPanel value={value} index={3}>
            <MenuManagement />
          </TabPanel>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}
export default DashBoard;