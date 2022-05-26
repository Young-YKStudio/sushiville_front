import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import moment from 'moment-timezone'

// import page components
import OrderItem from './OrderItem';
import Cart from './Cart';
import { determineDay, TimeFormatter, storeOpener } from '../../Util/StoreSetting'

// MUI stuff
import PropTypes from 'prop-types';
import { Tabs, Tab, Box, Card, Typography, Button, Grid, Modal, CircularProgress } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import theme from '../../theme/theme';

// MUI Tabs
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

// lunch roll choices
const LunchRollChoices = [
  { name: 'California Roll' },
  { name: 'Tuna Avocado Roll' },
  { name: 'Tuna Roll' },
  { name: 'Smoked Salmon Roll' },
  { name: 'Mango Roll' },
  { name: 'Mango Avocado Roll' },
  { name: 'Spicy Tuna Roll' },
  { name: 'Salmon Avocado Roll' },
  { name: 'Salmon Roll' },
  { name: 'Avocado Roll' },
  { name: 'Cucumber Avocado Roll' },
  { name: 'Spicy Salmon Roll' },
  { name: 'Alaska Roll' },
  { name: 'Yellowtail Roll' },
  { name: 'Cucumber Roll' },
  { name: 'AAC Roll' },
]

// TODO: business hours, lunch hours

const Order = (props) => {

  // States
  const [ dataLoaded, setDataLoaded ] = useState(false);
  const [ value, setValue ] = useState(0);
  const [ cartOpened, setCartOpened ] = useState(false);
  const [ cart, setCart ] = useState([]);
  const [ products, setProducts ] = useState([]);
  const [ product, setProduct ] = useState('');
  const [ itemOpen, setItemOpen ] = useState(false);
  const [ loadCount, setLoadCount ] = useState(0);
  const [ storeOpen, setStoreOpen ] = useState(false);
  const [ lunchHour, setLunchHour ] = useState(false);

  const navigate = useNavigate();

  // MUI tab
  const handleChange = (event, newValue) => {
    setValue(newValue);
  }
  
  useEffect(() => {
    async function fetchData() {
      const config = {
        header: {
          "Content-Type": "application/json"
        }
      }
      
      const { data } = await axios.get(`${process.env.REACT_APP_SERVER_URL}/api/menu/allmenu`, config);
      setProducts(data);
      setDataLoaded(true);
    }
    function now() {
      const date = new Date();
      let localeTime = moment.tz(date, 'America/New_York')
      let openClose = storeOpener(determineDay(localeTime), TimeFormatter(localeTime))
      // bottom is the test time => set time to current
      // let openClose = storeOpener('regular hours', 1000)
      if (openClose === 'regular open' || openClose === 'longer hour open') {
        setStoreOpen(true);
      } else if (openClose === 'lunch hour') {
        setStoreOpen(true);
        setLunchHour(true);
      } else {
        setStoreOpen(false);
        setLunchHour(false);
      }
    }
    fetchData();
    now()
  },[loadCount])
  
  // button handlers

  const storeHourHandler = (e) => {
    alert('Restaurant is currently closed')
  }

  const lunchHourHandler = (e) => {
    alert('Lunch special is 12pm - 3pm only')
  }

  const cartClearHandler = (e) => {
    e.preventDefault();
    setCart([]);
  }

  const loadCountHandler = (e) => {
    navigate('/')
    window.location.reload(false)
  }

  const modalOpener = (e) => {
    e.preventDefault();
    setItemOpen(true);
    setProduct(e.target.value)
  }

  const modalCloser = (e) => {
    setItemOpen(false);
  }
  
  return (
    <ThemeProvider theme={theme}>
      <div className="orderContainer">
        { !dataLoaded ? (
          <Grid container sx={{ marginTop: '4.25em' }}>
              <Card sx={{ paddingBottom: '1em', width: '100%', height: '100vh'}}>
                <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '1em'}}>
                  <CircularProgress />
                </Grid>
                <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '1em'}}>
                  <Button onClick={loadCountHandler} variant='outlined'>Click to start again</Button>
                </Grid>
              </Card>
            </Grid>
        ) : (
          <div className='order_left'>
            <Box
              sx={{ flexGrow: 1, bgcolor: 'background.paper', display: 'flex'}}
            >
              <Tabs
                orientation='horizontal'
                variant='scrollable'
                value={value}
                onChange={handleChange}
                sx={{ borderBottom: 1, borderColor: 'divider', width: '100%' }}
              >
                <Tab label="Special Rolls" {...allyProps} />
                <Tab label="Regular Rolls" {...allyProps} />
                <Tab label="Lunch Special" {...allyProps} />
                <Tab label="Appetizer" {...allyProps} />
                <Tab label="Soup & Salad" {...allyProps} />
                <Tab label="Kitchen Entree" {...allyProps} />
                <Tab label="Sushi & Sashimi" {...allyProps} />
                <Tab label="A La Carte" {...allyProps} />
                <Tab label="Party Platter" {...allyProps} />
              </Tabs>
            </Box>
            {/* Special Rolls */}
            <TabPanel value={value} index={0} sx={{ minWidth: '250px' }}>
              <Grid container spacing={2} sx={{ marginTop: '2em', padding: '0 2em', marginBottom: '2em' }}>
                <Grid item xs={12} sx={{ marginBottom: '1em'}}>
                  <Typography variant='h4' sx={{ fontFamily: 'Raleway', fontWeight: 'bold', color: 'darkgreen', paddingBottom: '.5em', borderBottom: '2px solid #dc5a41' }}>Chef Special Rolls</Typography>
                </Grid>
                {/* Fresh Rolls */}
                <Grid item xs={12} sx={{ marginBottom: '1em'}}>
                  <Typography variant='h5' sx={{ fontFamily: 'Raleway', fontWeight: 'bold', color: 'darkgreen', paddingBottom: '.5em', borderBottom: '1px solid #dc5a41' }}>Fresh Rolls</Typography>
                </Grid>
                {products.menu.map((menu, i) => (
                  menu.category === 'Special Rolls' && menu.Sub_Category === 'Fresh Rolls' ?
                    <Grid item xs={12} sm={6} md={4} key={i}>
                      <Card sx={{ padding: '1em 1em'}}>
                        <Grid container>
                          <Grid item xs={12} sx={{ borderBottom: '1.5px solid darkgreen', marginBottom: '1em'}}>
                            <Typography variant='h6' sx={{ fontFamily: 'Raleway', color: '#dc5a41' }}>{menu.name}&nbsp;&nbsp;<span className='order_card_caption'>{menu.caption}</span></Typography>
                          </Grid>
                          <Grid item xs={12} sx={{ marginBottom: '1.5em'}}>
                            <Typography>{menu.description}</Typography>
                          </Grid>
                          <Grid item xs={4}>
                            <Typography sx={{ color: 'darkgreen', fontStyle: 'italic', fontFamily: 'Raleway', fontSize: '1.25em'}}>${menu.price}</Typography>
                          </Grid>
                          <Grid item xs={8}>
                            {props.isAutoOpen ? 
                            <>
                              {storeOpen ? 
                                <Button 
                                  variant='outlined' 
                                  sx={{ width: '100%'}}
                                  size='small'
                                  value={menu._id}
                                  onClick={modalOpener}
                                >
                                  <ShoppingCartIcon sx={{ fontSize: '1.3em'}} />&nbsp;Add to Cart
                                </Button>
                                : 
                                <Button 
                                  variant='outlined' 
                                  sx={{ width: '100%'}}
                                  size='small'
                                  value={menu._id}
                                  onClick={modalOpener}
                                  disabled
                                >
                                  Restaurant closed
                                </Button>
                              }
                            </> 
                            : 
                            <>
                              {props.manualOpen ?
                                <Button 
                                variant='outlined' 
                                sx={{ width: '100%'}}
                                size='small'
                                value={menu._id}
                                onClick={modalOpener}
                                >
                                  <ShoppingCartIcon sx={{ fontSize: '1.3em'}} />&nbsp;Add to Cart
                                </Button>
                                :
                                <Button 
                                variant='outlined' 
                                sx={{ width: '100%'}}
                                size='small'
                                value={menu._id}
                                onClick={modalOpener}
                                disabled
                                >
                                  Restaurant closed
                                </Button>
                              }
                            </>
                            }
                          </Grid>
                        </Grid>
                      </Card>
                    </Grid>
                  :  null
                ))}
                {/* Baked Rolls */}
                <Grid item xs={12} sx={{ marginBottom: '1em', marginTop: '1.5em'}}>
                  <Typography variant='h5' sx={{ fontFamily: 'Raleway', fontWeight: 'bold', color: 'darkgreen', paddingBottom: '.5em', borderBottom: '1px solid #dc5a41' }}>Baked Rolls</Typography>
                </Grid>
                {products.menu.map((menu, i) => (
                  menu.category === 'Special Rolls' && menu.Sub_Category === 'Baked Rolls' ?
                    <Grid item xs={12} sm={6} md={4} key={i}>
                      <Card sx={{ padding: '1em 1em'}}>
                        <Grid container>
                          <Grid item xs={12} sx={{ borderBottom: '1.5px solid darkgreen', marginBottom: '1em'}}>
                            <Typography variant='h6' sx={{ fontFamily: 'Raleway', color: '#dc5a41' }}>{menu.name}&nbsp;&nbsp;<span className='order_card_caption'>{menu.caption}</span></Typography>
                          </Grid>
                          <Grid item xs={12} sx={{ marginBottom: '1.5em'}}>
                            <Typography>{menu.description}</Typography>
                          </Grid>
                          <Grid item xs={4}>
                            <Typography sx={{ color: 'darkgreen', fontStyle: 'italic', fontFamily: 'Raleway', fontSize: '1.25em'}}>${menu.price}</Typography>
                          </Grid>
                          <Grid item xs={8}>
                          {props.isAutoOpen ? 
                            <>
                              {storeOpen ? 
                                <Button 
                                  variant='outlined' 
                                  sx={{ width: '100%'}}
                                  size='small'
                                  value={menu._id}
                                  onClick={modalOpener}
                                >
                                  <ShoppingCartIcon sx={{ fontSize: '1.3em'}} />&nbsp;Add to Cart
                                </Button>
                                : 
                                <Button 
                                  variant='outlined' 
                                  sx={{ width: '100%'}}
                                  size='small'
                                  value={menu._id}
                                  onClick={modalOpener}
                                  disabled
                                >
                                  Restaurant closed
                                </Button>
                              }
                            </> 
                            : 
                            <>
                              {props.manualOpen ?
                                <Button 
                                variant='outlined' 
                                sx={{ width: '100%'}}
                                size='small'
                                value={menu._id}
                                onClick={modalOpener}
                                >
                                  <ShoppingCartIcon sx={{ fontSize: '1.3em'}} />&nbsp;Add to Cart
                                </Button>
                                :
                                <Button 
                                variant='outlined' 
                                sx={{ width: '100%'}}
                                size='small'
                                value={menu._id}
                                onClick={modalOpener}
                                disabled
                                >
                                  Restaurant closed
                                </Button>
                              }
                            </>
                            }
                          </Grid>
                        </Grid>
                      </Card>
                    </Grid>
                  :  null
                ))}
                {/* Tempura Rolls */}
                <Grid item xs={12} sx={{ marginBottom: '1em', marginTop: '1.5em'}}>
                  <Typography variant='h5' sx={{ fontFamily: 'Raleway', fontWeight: 'bold', color: 'darkgreen', paddingBottom: '.5em', borderBottom: '1px solid #dc5a41' }}>Tempura Rolls</Typography>
                </Grid>
                {products.menu.map((menu, i) => (
                  menu.category === 'Special Rolls' && menu.Sub_Category === 'Tempura Rolls' ?
                    <Grid item xs={12} sm={6} md={4} key={i}>
                      <Card sx={{ padding: '1em 1em'}}>
                        <Grid container>
                          <Grid item xs={12} sx={{ borderBottom: '1.5px solid darkgreen', marginBottom: '1em'}}>
                            <Typography variant='h6' sx={{ fontFamily: 'Raleway', color: '#dc5a41' }}>{menu.name}&nbsp;&nbsp;<span className='order_card_caption'>{menu.caption}</span></Typography>
                          </Grid>
                          <Grid item xs={12} sx={{ marginBottom: '1.5em'}}>
                            <Typography>{menu.description}</Typography>
                          </Grid>
                          <Grid item xs={4}>
                            <Typography sx={{ color: 'darkgreen', fontStyle: 'italic', fontFamily: 'Raleway', fontSize: '1.25em'}}>${menu.price}</Typography>
                          </Grid>
                          <Grid item xs={8}>
                          {props.isAutoOpen ? 
                            <>
                              {storeOpen ? 
                                <Button 
                                  variant='outlined' 
                                  sx={{ width: '100%'}}
                                  size='small'
                                  value={menu._id}
                                  onClick={modalOpener}
                                >
                                  <ShoppingCartIcon sx={{ fontSize: '1.3em'}} />&nbsp;Add to Cart
                                </Button>
                                : 
                                <Button 
                                  variant='outlined' 
                                  sx={{ width: '100%'}}
                                  size='small'
                                  value={menu._id}
                                  onClick={modalOpener}
                                  disabled
                                >
                                  Restaurant closed
                                </Button>
                              }
                            </> 
                            : 
                            <>
                              {props.manualOpen ?
                                <Button 
                                variant='outlined' 
                                sx={{ width: '100%'}}
                                size='small'
                                value={menu._id}
                                onClick={modalOpener}
                                >
                                  <ShoppingCartIcon sx={{ fontSize: '1.3em'}} />&nbsp;Add to Cart
                                </Button>
                                :
                                <Button 
                                variant='outlined' 
                                sx={{ width: '100%'}}
                                size='small'
                                value={menu._id}
                                onClick={modalOpener}
                                disabled
                                >
                                  Restaurant closed
                                </Button>
                              }
                            </>
                            }
                          </Grid>
                        </Grid>
                      </Card>
                    </Grid>
                  :  null
                ))}
              </Grid>
            </TabPanel>
            {/* Regular Rolls */}
            <TabPanel value={value} index={1} sx={{ minWidth: '250px' }}>
              <Grid container spacing={2} sx={{ marginTop: '2em', padding: '0 2em', marginBottom: '2em' }}>
                <Grid item xs={12} sx={{ marginBottom: '1em'}}>
                  <Typography variant='h4' sx={{ fontFamily: 'Raleway', fontWeight: 'bold', color: 'darkgreen', paddingBottom: '.5em', borderBottom: '2px solid #dc5a41' }}>Regular Rolls</Typography>
                </Grid>
                {products.menu.map((menu, i) => (
                  menu.category === 'Regular Rolls' ?
                    <Grid item xs={12} sm={6} md={4} key={i}>
                      <Card sx={{ padding: '1em 1em'}}>
                        <Grid container>
                          <Grid item xs={12} sx={{ borderBottom: '1.5px solid darkgreen', marginBottom: '1em'}}>
                            <Typography variant='h6' sx={{ fontFamily: 'Raleway', color: '#dc5a41' }}>{menu.name}&nbsp;&nbsp;<span className='order_card_caption'>{menu.caption}</span></Typography>
                          </Grid>
                          <Grid item xs={12} sx={{ marginBottom: '1.5em'}}>
                            <Typography>{menu.description}</Typography>
                          </Grid>
                          <Grid item xs={4}>
                            <Typography sx={{ color: 'darkgreen', fontStyle: 'italic', fontFamily: 'Raleway', fontSize: '1.25em'}}>${menu.price}</Typography>
                          </Grid>
                          <Grid item xs={8}>
                          {props.isAutoOpen ? 
                            <>
                              {storeOpen ? 
                                <Button 
                                  variant='outlined' 
                                  sx={{ width: '100%'}}
                                  size='small'
                                  value={menu._id}
                                  onClick={modalOpener}
                                >
                                  <ShoppingCartIcon sx={{ fontSize: '1.3em'}} />&nbsp;Add to Cart
                                </Button>
                                : 
                                <Button 
                                  variant='outlined' 
                                  sx={{ width: '100%'}}
                                  size='small'
                                  value={menu._id}
                                  onClick={modalOpener}
                                  disabled
                                >
                                  Restaurant closed
                                </Button>
                              }
                            </> 
                            : 
                            <>
                              {props.manualOpen ?
                                <Button 
                                variant='outlined' 
                                sx={{ width: '100%'}}
                                size='small'
                                value={menu._id}
                                onClick={modalOpener}
                                >
                                  <ShoppingCartIcon sx={{ fontSize: '1.3em'}} />&nbsp;Add to Cart
                                </Button>
                                :
                                <Button 
                                variant='outlined' 
                                sx={{ width: '100%'}}
                                size='small'
                                value={menu._id}
                                onClick={modalOpener}
                                disabled
                                >
                                  Restaurant closed
                                </Button>
                              }
                            </>
                            }
                          </Grid>
                        </Grid>
                      </Card>
                    </Grid>
                  : null
                ))}
                {/* Veg Rolls */}
                <Grid item xs={12} sx={{ marginBottom: '1em', marginTop: '1.5em'}}>
                  <Typography variant='h5' sx={{ fontFamily: 'Raleway', fontWeight: 'bold', color: 'darkgreen', paddingBottom: '.5em', borderBottom: '1px solid #dc5a41' }}>Vegetable Rolls</Typography>
                </Grid>
                {products.menu.map((menu, i) => (
                  menu.category === 'Vegetable Rolls' ?
                    <Grid item xs={12} sm={6} md={4} key={i}>
                      <Card sx={{ padding: '1em 1em'}}>
                        <Grid container>
                          <Grid item xs={12} sx={{ borderBottom: '1.5px solid darkgreen', marginBottom: '1em'}}>
                            <Typography variant='h6' sx={{ fontFamily: 'Raleway', color: '#dc5a41' }}>{menu.name}&nbsp;&nbsp;<span className='order_card_caption'>{menu.caption}</span></Typography>
                          </Grid>
                          <Grid item xs={12} sx={{ marginBottom: '1.5em'}}>
                            <Typography>{menu.description}</Typography>
                          </Grid>
                          <Grid item xs={4}>
                            <Typography sx={{ color: 'darkgreen', fontStyle: 'italic', fontFamily: 'Raleway', fontSize: '1.25em'}}>${menu.price}</Typography>
                          </Grid>
                          <Grid item xs={8}>
                          {props.isAutoOpen ? 
                            <>
                              {storeOpen ? 
                                <Button 
                                  variant='outlined' 
                                  sx={{ width: '100%'}}
                                  size='small'
                                  value={menu._id}
                                  onClick={modalOpener}
                                >
                                  <ShoppingCartIcon sx={{ fontSize: '1.3em'}} />&nbsp;Add to Cart
                                </Button>
                                : 
                                <Button 
                                  variant='outlined' 
                                  sx={{ width: '100%'}}
                                  size='small'
                                  value={menu._id}
                                  onClick={modalOpener}
                                  disabled
                                >
                                  Restaurant closed
                                </Button>
                              }
                            </> 
                            : 
                            <>
                              {props.manualOpen ?
                                <Button 
                                variant='outlined' 
                                sx={{ width: '100%'}}
                                size='small'
                                value={menu._id}
                                onClick={modalOpener}
                                >
                                  <ShoppingCartIcon sx={{ fontSize: '1.3em'}} />&nbsp;Add to Cart
                                </Button>
                                :
                                <Button 
                                variant='outlined' 
                                sx={{ width: '100%'}}
                                size='small'
                                value={menu._id}
                                onClick={modalOpener}
                                disabled
                                >
                                  Restaurant closed
                                </Button>
                              }
                            </>
                            }
                          </Grid>
                        </Grid>
                      </Card>
                    </Grid>
                  : null
                ))}
              </Grid>
            </TabPanel>
            {/* Lunch Special */}
            <TabPanel value={value} index={2} sx={{ minWidth: '250px' }}>
              <Grid container spacing={2} sx={{ marginTop: '2em', padding: '0 2em', marginBottom: '2em' }}>
                <Grid item xs={12} sx={{ marginBottom: '1em'}}>
                  <Typography variant='h4' sx={{ fontFamily: 'Raleway', fontWeight: 'bold', color: 'darkgreen', paddingBottom: '.5em', borderBottom: '2px solid #dc5a41' }}>Lunch Special<span className='order_card_caption_1'>12pm - 3pm, Served with miso soup</span></Typography>
                </Grid>
                {/* bento lunch */}
                <Grid item xs={12} sx={{ marginBottom: '1em' }}>
                  <Typography variant='h5' sx={{ fontFamily: 'Raleway', fontWeight: 'bold', color: 'darkgreen', paddingBottom: '.5em', borderBottom: '1px solid #dc5a41' }}>Bento Lunch<span className='order_card_caption_2'>Served with soup, salad, gyoza & california roll</span></Typography>
                </Grid>
                {products.menu.map((menu, i) => (
                  menu.Sub_Category === 'Bento Lunch' ?
                    <Grid item xs={12} sm={6} md={4} key={i}>
                      <Card sx={{ padding: '1em 1em'}}>
                        <Grid container>
                          <Grid item xs={12} sx={{ borderBottom: '1.5px solid darkgreen', marginBottom: '1em'}}>
                            <Typography variant='h6' sx={{ fontFamily: 'Raleway', color: '#dc5a41' }}>{menu.name}&nbsp;&nbsp;<span className='order_card_caption'>{menu.caption}</span></Typography>
                          </Grid>
                          <Grid item xs={12} sx={{ marginBottom: '1.5em'}}>
                            <Typography>{menu.description}</Typography>
                          </Grid>
                          <Grid item xs={4}>
                            <Typography sx={{ color: 'darkgreen', fontStyle: 'italic', fontFamily: 'Raleway', fontSize: '1.25em'}}>${menu.price}</Typography>
                          </Grid>
                          <Grid item xs={8}>
                          {props.isAutoOpen ? 
                            <>
                              {lunchHour ? 
                                <Button 
                                  variant='outlined' 
                                  sx={{ width: '100%'}}
                                  size='small'
                                  value={menu._id}
                                  onClick={modalOpener}
                                >
                                  <ShoppingCartIcon sx={{ fontSize: '1.3em'}} />&nbsp;Add to Cart
                                </Button>
                                : 
                                <Button 
                                  variant='outlined' 
                                  sx={{ width: '100%'}}
                                  size='small'
                                  value={menu._id}
                                  onClick={modalOpener}
                                  disabled
                                >
                                  Not Lunch Time
                                </Button>
                              }
                            </> 
                            : 
                            <>
                              {props.manualOpen ?
                                <>
                                  {lunchHour ? 
                                  <>
                                    <Button 
                                    variant='outlined' 
                                    sx={{ width: '100%'}}
                                    size='small'
                                    value={menu._id}
                                    onClick={modalOpener}
                                    >
                                      <ShoppingCartIcon sx={{ fontSize: '1.3em'}} />&nbsp;Add to Cart
                                    </Button>
                                  </> 
                                  : 
                                  <>
                                    <Button 
                                    variant='outlined' 
                                    sx={{ width: '100%'}}
                                    size='small'
                                    value={menu._id}
                                    onClick={modalOpener}
                                    disabled
                                    >
                                      Not Lunch Time
                                    </Button>
                                  </>}
                                </>
                                :
                                <Button 
                                variant='outlined' 
                                sx={{ width: '100%'}}
                                size='small'
                                value={menu._id}
                                onClick={modalOpener}
                                disabled
                                >
                                  Restaurant closed
                                </Button>
                              }
                            </>
                            }
                          </Grid>
                        </Grid>
                      </Card>
                    </Grid>
                  : null
                ))}
                {/* Su & SA lunch */}
                <Grid item xs={12} sx={{ marginBottom: '1em', marginTop: '1.5em'}}>
                  <Typography variant='h5' sx={{ fontFamily: 'Raleway', fontWeight: 'bold', color: 'darkgreen', paddingBottom: '.5em', borderBottom: '1px solid #dc5a41' }}>Sushi & Sashimi Lunch</Typography>
                </Grid>
                {products.menu.map((menu, i) => (
                  menu.Sub_Category === 'Sushi & Sashimi Lunch' ?
                    <Grid item xs={12} sm={6} md={4} key={i}>
                      <Card sx={{ padding: '1em 1em'}}>
                        <Grid container>
                          <Grid item xs={12} sx={{ borderBottom: '1.5px solid darkgreen', marginBottom: '1em'}}>
                            <Typography variant='h6' sx={{ fontFamily: 'Raleway', color: '#dc5a41' }}>{menu.name}&nbsp;&nbsp;<span className='order_card_caption'>{menu.caption}</span></Typography>
                          </Grid>
                          <Grid item xs={12} sx={{ marginBottom: '1.5em'}}>
                            <Typography>{menu.description}</Typography>
                          </Grid>
                          <Grid item xs={4}>
                            <Typography sx={{ color: 'darkgreen', fontStyle: 'italic', fontFamily: 'Raleway', fontSize: '1.25em'}}>${menu.price}</Typography>
                          </Grid>
                          <Grid item xs={8}>
                          {props.isAutoOpen ? 
                            <>
                              {lunchHour ? 
                                <Button 
                                  variant='outlined' 
                                  sx={{ width: '100%'}}
                                  size='small'
                                  value={menu._id}
                                  onClick={modalOpener}
                                >
                                  <ShoppingCartIcon sx={{ fontSize: '1.3em'}} />&nbsp;Add to Cart
                                </Button>
                                : 
                                <Button 
                                  variant='outlined' 
                                  sx={{ width: '100%'}}
                                  size='small'
                                  value={menu._id}
                                  onClick={modalOpener}
                                  disabled
                                >
                                  Not Lunch Time
                                </Button>
                              }
                            </> 
                            : 
                            <>
                              {props.manualOpen ?
                                <>
                                  {lunchHour ? 
                                  <>
                                    <Button 
                                    variant='outlined' 
                                    sx={{ width: '100%'}}
                                    size='small'
                                    value={menu._id}
                                    onClick={modalOpener}
                                    >
                                      <ShoppingCartIcon sx={{ fontSize: '1.3em'}} />&nbsp;Add to Cart
                                    </Button>
                                  </> 
                                  : 
                                  <>
                                    <Button 
                                    variant='outlined' 
                                    sx={{ width: '100%'}}
                                    size='small'
                                    value={menu._id}
                                    onClick={modalOpener}
                                    disabled
                                    >
                                      Not Lunch Time
                                    </Button>
                                  </>}
                                </>
                                :
                                <Button 
                                variant='outlined' 
                                sx={{ width: '100%'}}
                                size='small'
                                value={menu._id}
                                onClick={modalOpener}
                                disabled
                                >
                                  Restaurant closed
                                </Button>
                              }
                            </>
                            }
                          </Grid>
                        </Grid>
                      </Card>
                    </Grid>
                  : null
                ))}
                {/* pick rolls lunch */}
                <Grid item xs={12} sx={{ marginBottom: '1em', marginTop: '1.5em'}}>
                  <Typography variant='h5' sx={{ fontFamily: 'Raleway', fontWeight: 'bold', color: 'darkgreen', paddingBottom: '.5em', borderBottom: '1px solid #dc5a41' }}>Lunch Roll Combo</Typography>
                </Grid>
                <Grid item xs={12}>
                  <Grid container spacing={1.5} sx={{ justifyContent: 'center', alignContent: 'center', backgroundColor: 'white', padding: '1em 1.5em', paddingBottom: '2em', color: '#dc5a41', borderRadius: '10px', marginBottom: '2em'}}>
                    <Grid item xs={12}>
                      <Typography sx={{ color: 'darkgreen', fontWeight: 'bold', borderBottom: '1px solid gray', paddingBottom: '.5em', marginBottom: '.5em'}}>Lunch Roll Combo Choices</Typography>
                    </Grid>
                    {LunchRollChoices.map((choice, i) => (
                      <Grid item xs={6} sm={4} md={3} key={i}>
                        <Typography>{choice.name}</Typography>
                      </Grid>
                    ))}
                  </Grid>
                </Grid>
                {products.menu.map((menu, i) => (
                  menu.Sub_Category === 'Lunch Roll Combo' ?
                    <Grid item xs={12} sm={6} md={4} key={i}>
                      <Card sx={{ padding: '1em 1em'}}>
                        <Grid container>
                          <Grid item xs={12} sx={{ borderBottom: '1.5px solid darkgreen', marginBottom: '1em'}}>
                            <Typography variant='h6' sx={{ fontFamily: 'Raleway', color: '#dc5a41' }}>{menu.name}&nbsp;&nbsp;<span className='order_card_caption'>{menu.caption}</span></Typography>
                          </Grid>
                          <Grid item xs={12} sx={{ marginBottom: '1.5em'}}>
                            <Typography>{menu.description}</Typography>
                          </Grid>
                          <Grid item xs={4}>
                            <Typography sx={{ color: 'darkgreen', fontStyle: 'italic', fontFamily: 'Raleway', fontSize: '1.25em'}}>${menu.price}</Typography>
                          </Grid>
                          <Grid item xs={8}>
                          {props.isAutoOpen ? 
                            <>
                              {lunchHour ? 
                                <Button 
                                  variant='outlined' 
                                  sx={{ width: '100%'}}
                                  size='small'
                                  value={menu._id}
                                  onClick={modalOpener}
                                >
                                  <ShoppingCartIcon sx={{ fontSize: '1.3em'}} />&nbsp;Add to Cart
                                </Button>
                                : 
                                <Button 
                                  variant='outlined' 
                                  sx={{ width: '100%'}}
                                  size='small'
                                  value={menu._id}
                                  onClick={modalOpener}
                                  disabled
                                >
                                  Not Lunch Time
                                </Button>
                              }
                            </> 
                            : 
                            <>
                              {props.manualOpen ?
                                <>
                                  {lunchHour ? 
                                  <>
                                    <Button 
                                    variant='outlined' 
                                    sx={{ width: '100%'}}
                                    size='small'
                                    value={menu._id}
                                    onClick={modalOpener}
                                    >
                                      <ShoppingCartIcon sx={{ fontSize: '1.3em'}} />&nbsp;Add to Cart
                                    </Button>
                                  </> 
                                  : 
                                  <>
                                    <Button 
                                    variant='outlined' 
                                    sx={{ width: '100%'}}
                                    size='small'
                                    value={menu._id}
                                    onClick={modalOpener}
                                    disabled
                                    >
                                      Not Lunch Time
                                    </Button>
                                  </>}
                                </>
                                :
                                <Button 
                                variant='outlined' 
                                sx={{ width: '100%'}}
                                size='small'
                                value={menu._id}
                                onClick={modalOpener}
                                disabled
                                >
                                  Restaurant closed
                                </Button>
                              }
                            </>
                            }
                          </Grid>
                        </Grid>
                      </Card>
                    </Grid>
                  : null
                ))}
                <Grid item xs={12} sx={{ marginBottom: '1em', marginTop: '1.5em'}}>
                  <Typography variant='h5' sx={{ fontFamily: 'Raleway', fontWeight: 'bold', color: 'darkgreen', paddingBottom: '.5em', borderBottom: '1px solid #dc5a41' }}>Udon Lunch</Typography>
                </Grid>
                {/* Udon Lunch */}
                {products.menu.map((menu, i) => (
                  menu.Sub_Category === 'Udon Lunch' ?
                    <Grid item xs={12} sm={6} md={4} key={i}>
                      <Card sx={{ padding: '1em 1em'}}>
                        <Grid container>
                          <Grid item xs={12} sx={{ borderBottom: '1.5px solid darkgreen', marginBottom: '1em'}}>
                            <Typography variant='h6' sx={{ fontFamily: 'Raleway', color: '#dc5a41' }}>{menu.name}&nbsp;&nbsp;<span className='order_card_caption'>{menu.caption}</span></Typography>
                          </Grid>
                          <Grid item xs={12} sx={{ marginBottom: '1.5em'}}>
                            <Typography>{menu.description}</Typography>
                          </Grid>
                          <Grid item xs={4}>
                            <Typography sx={{ color: 'darkgreen', fontStyle: 'italic', fontFamily: 'Raleway', fontSize: '1.25em'}}>${menu.price}</Typography>
                          </Grid>
                          <Grid item xs={8}>
                          {props.isAutoOpen ? 
                            <>
                              {lunchHour ? 
                                <Button 
                                  variant='outlined' 
                                  sx={{ width: '100%'}}
                                  size='small'
                                  value={menu._id}
                                  onClick={modalOpener}
                                >
                                  <ShoppingCartIcon sx={{ fontSize: '1.3em'}} />&nbsp;Add to Cart
                                </Button>
                                : 
                                <Button 
                                  variant='outlined' 
                                  sx={{ width: '100%'}}
                                  size='small'
                                  value={menu._id}
                                  onClick={modalOpener}
                                  disabled
                                >
                                  Not Lunch Time
                                </Button>
                              }
                            </> 
                            : 
                            <>
                              {props.manualOpen ?
                                <>
                                  {lunchHour ? 
                                  <>
                                    <Button 
                                    variant='outlined' 
                                    sx={{ width: '100%'}}
                                    size='small'
                                    value={menu._id}
                                    onClick={modalOpener}
                                    >
                                      <ShoppingCartIcon sx={{ fontSize: '1.3em'}} />&nbsp;Add to Cart
                                    </Button>
                                  </> 
                                  : 
                                  <>
                                    <Button 
                                    variant='outlined' 
                                    sx={{ width: '100%'}}
                                    size='small'
                                    value={menu._id}
                                    onClick={modalOpener}
                                    disabled
                                    >
                                      Not Lunch Time
                                    </Button>
                                  </>}
                                </>
                                :
                                <Button 
                                variant='outlined' 
                                sx={{ width: '100%'}}
                                size='small'
                                value={menu._id}
                                onClick={modalOpener}
                                disabled
                                >
                                  Restaurant closed
                                </Button>
                              }
                            </>
                            }
                          </Grid>
                        </Grid>
                      </Card>
                    </Grid>
                  : null
                ))}
              </Grid>
            </TabPanel>
            {/* Apps */}
            <TabPanel value={value} index={3} sx={{ minWidth: '250px' }}>
              <Grid container spacing={2} sx={{ marginTop: '2em', padding: '0 2em', marginBottom: '2em' }}>
                <Grid item xs={12} sx={{ marginBottom: '1em'}}>
                  <Typography variant='h4' sx={{ fontFamily: 'Raleway', fontWeight: 'bold', color: 'darkgreen', paddingBottom: '.5em', borderBottom: '2px solid #dc5a41' }}>Appetizer</Typography>
                </Grid>
                {/* Cold App */}
                <Grid item xs={12} sx={{ marginBottom: '1em'}}>
                  <Typography variant='h5' sx={{ fontFamily: 'Raleway', fontWeight: 'bold', color: 'darkgreen', paddingBottom: '.5em', borderBottom: '1px solid #dc5a41' }}>Cold Appetizer</Typography>
                </Grid>
                {products.menu.map((menu, i) => (
                  menu.Sub_Category === 'Cold' ?
                    <Grid item xs={12} sm={6} md={4} key={i}>
                      <Card sx={{ padding: '1em 1em'}}>
                        <Grid container>
                          <Grid item xs={12} sx={{ borderBottom: '1.5px solid darkgreen', marginBottom: '1em'}}>
                            <Typography variant='h6' sx={{ fontFamily: 'Raleway', color: '#dc5a41' }}>{menu.name}&nbsp;&nbsp;<span className='order_card_caption'>{menu.caption}</span></Typography>
                          </Grid>
                          <Grid item xs={12} sx={{ marginBottom: '1.5em'}}>
                            <Typography>{menu.description}</Typography>
                          </Grid>
                          <Grid item xs={4}>
                            <Typography sx={{ color: 'darkgreen', fontStyle: 'italic', fontFamily: 'Raleway', fontSize: '1.25em'}}>${menu.price}</Typography>
                          </Grid>
                          <Grid item xs={8}>
                          {props.isAutoOpen ? 
                            <>
                              {storeOpen ? 
                                <Button 
                                  variant='outlined' 
                                  sx={{ width: '100%'}}
                                  size='small'
                                  value={menu._id}
                                  onClick={modalOpener}
                                >
                                  <ShoppingCartIcon sx={{ fontSize: '1.3em'}} />&nbsp;Add to Cart
                                </Button>
                                : 
                                <Button 
                                  variant='outlined' 
                                  sx={{ width: '100%'}}
                                  size='small'
                                  value={menu._id}
                                  onClick={modalOpener}
                                  disabled
                                >
                                  Restaurant closed
                                </Button>
                              }
                            </> 
                            : 
                            <>
                              {props.manualOpen ?
                                <Button 
                                variant='outlined' 
                                sx={{ width: '100%'}}
                                size='small'
                                value={menu._id}
                                onClick={modalOpener}
                                >
                                  <ShoppingCartIcon sx={{ fontSize: '1.3em'}} />&nbsp;Add to Cart
                                </Button>
                                :
                                <Button 
                                variant='outlined' 
                                sx={{ width: '100%'}}
                                size='small'
                                value={menu._id}
                                onClick={modalOpener}
                                disabled
                                >
                                  Restaurant closed
                                </Button>
                              }
                            </>
                            }
                          </Grid>
                        </Grid>
                      </Card>
                    </Grid>
                  :  null
                ))}
                {/* Hot App */}
                <Grid item xs={12} sx={{ marginBottom: '1em', marginTop: '1.5em'}}>
                  <Typography variant='h5' sx={{ fontFamily: 'Raleway', fontWeight: 'bold', color: 'darkgreen', paddingBottom: '.5em', borderBottom: '1px solid #dc5a41' }}>Hot Appetizer</Typography>
                </Grid>
                {products.menu.map((menu, i) => (
                  menu.Sub_Category === 'Hot' ?
                    <Grid item xs={12} sm={6} md={4} key={i}>
                      <Card sx={{ padding: '1em 1em'}}>
                        <Grid container>
                          <Grid item xs={12} sx={{ borderBottom: '1.5px solid darkgreen', marginBottom: '1em'}}>
                            <Typography variant='h6' sx={{ fontFamily: 'Raleway', color: '#dc5a41' }}>{menu.name}&nbsp;&nbsp;<span className='order_card_caption'>{menu.caption}</span></Typography>
                          </Grid>
                          <Grid item xs={12} sx={{ marginBottom: '1.5em'}}>
                            <Typography>{menu.description}</Typography>
                          </Grid>
                          <Grid item xs={4}>
                            <Typography sx={{ color: 'darkgreen', fontStyle: 'italic', fontFamily: 'Raleway', fontSize: '1.25em'}}>${menu.price}</Typography>
                          </Grid>
                          <Grid item xs={8}>
                          {props.isAutoOpen ? 
                            <>
                              {storeOpen ? 
                                <Button 
                                  variant='outlined' 
                                  sx={{ width: '100%'}}
                                  size='small'
                                  value={menu._id}
                                  onClick={modalOpener}
                                >
                                  <ShoppingCartIcon sx={{ fontSize: '1.3em'}} />&nbsp;Add to Cart
                                </Button>
                                : 
                                <Button 
                                  variant='outlined' 
                                  sx={{ width: '100%'}}
                                  size='small'
                                  value={menu._id}
                                  onClick={modalOpener}
                                  disabled
                                >
                                  Restaurant closed
                                </Button>
                              }
                            </> 
                            : 
                            <>
                              {props.manualOpen ?
                                <Button 
                                variant='outlined' 
                                sx={{ width: '100%'}}
                                size='small'
                                value={menu._id}
                                onClick={modalOpener}
                                >
                                  <ShoppingCartIcon sx={{ fontSize: '1.3em'}} />&nbsp;Add to Cart
                                </Button>
                                :
                                <Button 
                                variant='outlined' 
                                sx={{ width: '100%'}}
                                size='small'
                                value={menu._id}
                                onClick={modalOpener}
                                disabled
                                >
                                  Restaurant closed
                                </Button>
                              }
                            </>
                            }
                          </Grid>
                        </Grid>
                      </Card>
                    </Grid>
                  :  null
                ))}
              </Grid>
            </TabPanel>
            {/* Soup Salad */}
            <TabPanel value={value} index={4} sx={{ minWidth: '250px' }}>
              <Grid container spacing={2} sx={{ marginTop: '2em', padding: '0 2em', marginBottom: '2em' }}>
                <Grid item xs={12} sx={{ marginBottom: '1em'}}>
                  <Typography variant='h4' sx={{ fontFamily: 'Raleway', fontWeight: 'bold', color: 'darkgreen', paddingBottom: '.5em', borderBottom: '2px solid #dc5a41' }}>Soup & Salad</Typography>
                </Grid>
                {products.menu.map((menu, i) => (
                  menu.category === 'Soup & Salad' ?
                    <Grid item xs={12} sm={6} md={4} key={i}>
                      <Card sx={{ padding: '1em 1em'}}>
                        <Grid container>
                          <Grid item xs={12} sx={{ borderBottom: '1.5px solid darkgreen', marginBottom: '1em'}}>
                            <Typography variant='h6' sx={{ fontFamily: 'Raleway', color: '#dc5a41' }}>{menu.name}&nbsp;&nbsp;<span className='order_card_caption'>{menu.caption}</span></Typography>
                          </Grid>
                          <Grid item xs={12} sx={{ marginBottom: '1.5em'}}>
                            <Typography>{menu.description}</Typography>
                          </Grid>
                          <Grid item xs={4}>
                            <Typography sx={{ color: 'darkgreen', fontStyle: 'italic', fontFamily: 'Raleway', fontSize: '1.25em'}}>${menu.price}</Typography>
                          </Grid>
                          <Grid item xs={8}>
                          {props.isAutoOpen ? 
                            <>
                              {storeOpen ? 
                                <Button 
                                  variant='outlined' 
                                  sx={{ width: '100%'}}
                                  size='small'
                                  value={menu._id}
                                  onClick={modalOpener}
                                >
                                  <ShoppingCartIcon sx={{ fontSize: '1.3em'}} />&nbsp;Add to Cart
                                </Button>
                                : 
                                <Button 
                                  variant='outlined' 
                                  sx={{ width: '100%'}}
                                  size='small'
                                  value={menu._id}
                                  onClick={modalOpener}
                                  disabled
                                >
                                  Restaurant closed
                                </Button>
                              }
                            </> 
                            : 
                            <>
                              {props.manualOpen ?
                                <Button 
                                variant='outlined' 
                                sx={{ width: '100%'}}
                                size='small'
                                value={menu._id}
                                onClick={modalOpener}
                                >
                                  <ShoppingCartIcon sx={{ fontSize: '1.3em'}} />&nbsp;Add to Cart
                                </Button>
                                :
                                <Button 
                                variant='outlined' 
                                sx={{ width: '100%'}}
                                size='small'
                                value={menu._id}
                                onClick={modalOpener}
                                disabled
                                >
                                  Restaurant closed
                                </Button>
                              }
                            </>
                            }
                          </Grid>
                        </Grid>
                      </Card>
                    </Grid>
                  :  null
                ))}
              </Grid>
            </TabPanel>
            {/* Kitchen Entree */}
            <TabPanel value={value} index={5} sx={{ minWidth: '250px' }}>
              <Grid container spacing={2} sx={{ marginTop: '2em', padding: '0 2em', marginBottom: '2em' }}>
                <Grid item xs={12} sx={{ marginBottom: '1em'}}>
                  <Typography variant='h4' sx={{ fontFamily: 'Raleway', fontWeight: 'bold', color: 'darkgreen', paddingBottom: '.5em', borderBottom: '2px solid #dc5a41' }}>Kitchen Entree</Typography>
                </Grid>
                {/* Noodles */}
                <Grid item xs={12} sx={{ marginBottom: '1em'}}>
                  <Typography variant='h5' sx={{ fontFamily: 'Raleway', fontWeight: 'bold', color: 'darkgreen', paddingBottom: '.5em', borderBottom: '1px solid #dc5a41' }}>Noodles</Typography>
                </Grid>
                {products.menu.map((menu, i) => (
                  menu.Sub_Category === 'Noodles' ?
                    <Grid item xs={12} sm={6} md={4} key={i}>
                      <Card sx={{ padding: '1em 1em'}}>
                        <Grid container>
                          <Grid item xs={12} sx={{ borderBottom: '1.5px solid darkgreen', marginBottom: '1em'}}>
                            <Typography variant='h6' sx={{ fontFamily: 'Raleway', color: '#dc5a41' }}>{menu.name}&nbsp;&nbsp;<span className='order_card_caption'>{menu.caption}</span></Typography>
                          </Grid>
                          <Grid item xs={12} sx={{ marginBottom: '1.5em'}}>
                            <Typography>{menu.description}</Typography>
                          </Grid>
                          <Grid item xs={4}>
                            <Typography sx={{ color: 'darkgreen', fontStyle: 'italic', fontFamily: 'Raleway', fontSize: '1.25em'}}>${menu.price}</Typography>
                          </Grid>
                          <Grid item xs={8}>
                          {props.isAutoOpen ? 
                            <>
                              {storeOpen ? 
                                <Button 
                                  variant='outlined' 
                                  sx={{ width: '100%'}}
                                  size='small'
                                  value={menu._id}
                                  onClick={modalOpener}
                                >
                                  <ShoppingCartIcon sx={{ fontSize: '1.3em'}} />&nbsp;Add to Cart
                                </Button>
                                : 
                                <Button 
                                  variant='outlined' 
                                  sx={{ width: '100%'}}
                                  size='small'
                                  value={menu._id}
                                  onClick={modalOpener}
                                  disabled
                                >
                                  Restaurant closed
                                </Button>
                              }
                            </> 
                            : 
                            <>
                              {props.manualOpen ?
                                <Button 
                                variant='outlined' 
                                sx={{ width: '100%'}}
                                size='small'
                                value={menu._id}
                                onClick={modalOpener}
                                >
                                  <ShoppingCartIcon sx={{ fontSize: '1.3em'}} />&nbsp;Add to Cart
                                </Button>
                                :
                                <Button 
                                variant='outlined' 
                                sx={{ width: '100%'}}
                                size='small'
                                value={menu._id}
                                onClick={modalOpener}
                                disabled
                                >
                                  Restaurant closed
                                </Button>
                              }
                            </>
                            }
                          </Grid>
                        </Grid>
                      </Card>
                    </Grid>
                  :  null
                ))}
                {/* Fried Rice */}
                <Grid item xs={12} sx={{ marginBottom: '1em', marginTop: '1.5em'}}>
                  <Typography variant='h5' sx={{ fontFamily: 'Raleway', fontWeight: 'bold', color: 'darkgreen', paddingBottom: '.5em', borderBottom: '1px solid #dc5a41' }}>Fried Rice<span className='order_card_caption_2'>Served with miso soup</span></Typography>
                </Grid>
                {products.menu.map((menu, i) => (
                  menu.Sub_Category === 'Fried Rice' ?
                    <Grid item xs={12} sm={6} md={4} key={i}>
                      <Card sx={{ padding: '1em 1em'}}>
                        <Grid container>
                          <Grid item xs={12} sx={{ borderBottom: '1.5px solid darkgreen', marginBottom: '1em'}}>
                            <Typography variant='h6' sx={{ fontFamily: 'Raleway', color: '#dc5a41' }}>{menu.name}&nbsp;&nbsp;<span className='order_card_caption'>{menu.caption}</span></Typography>
                          </Grid>
                          <Grid item xs={12} sx={{ marginBottom: '1.5em'}}>
                            <Typography>{menu.description}</Typography>
                          </Grid>
                          <Grid item xs={4}>
                            <Typography sx={{ color: 'darkgreen', fontStyle: 'italic', fontFamily: 'Raleway', fontSize: '1.25em'}}>${menu.price}</Typography>
                          </Grid>
                          <Grid item xs={8}>
                          {props.isAutoOpen ? 
                            <>
                              {storeOpen ? 
                                <Button 
                                  variant='outlined' 
                                  sx={{ width: '100%'}}
                                  size='small'
                                  value={menu._id}
                                  onClick={modalOpener}
                                >
                                  <ShoppingCartIcon sx={{ fontSize: '1.3em'}} />&nbsp;Add to Cart
                                </Button>
                                : 
                                <Button 
                                  variant='outlined' 
                                  sx={{ width: '100%'}}
                                  size='small'
                                  value={menu._id}
                                  onClick={modalOpener}
                                  disabled
                                >
                                  Restaurant closed
                                </Button>
                              }
                            </> 
                            : 
                            <>
                              {props.manualOpen ?
                                <Button 
                                variant='outlined' 
                                sx={{ width: '100%'}}
                                size='small'
                                value={menu._id}
                                onClick={modalOpener}
                                >
                                  <ShoppingCartIcon sx={{ fontSize: '1.3em'}} />&nbsp;Add to Cart
                                </Button>
                                :
                                <Button 
                                variant='outlined' 
                                sx={{ width: '100%'}}
                                size='small'
                                value={menu._id}
                                onClick={modalOpener}
                                disabled
                                >
                                  Restaurant closed
                                </Button>
                              }
                            </>
                            }
                          </Grid>
                        </Grid>
                      </Card>
                    </Grid>
                  :  null
                ))}
                {/* Bento */}
                <Grid item xs={12} sx={{ marginBottom: '1em', marginTop: '1.5em'}}>
                  <Typography variant='h5' sx={{ fontFamily: 'Raleway', fontWeight: 'bold', color: 'darkgreen', paddingBottom: '.5em', borderBottom: '1px solid #dc5a41' }}>Bento<span className='order_card_caption_2'>Served with soup, salad, mixed tempura, california roll</span></Typography>
                </Grid>
                {products.menu.map((menu, i) => (
                  menu.Sub_Category === 'Bento' ?
                    <Grid item xs={12} sm={6} md={4} key={i}>
                      <Card sx={{ padding: '1em 1em'}}>
                        <Grid container>
                          <Grid item xs={12} sx={{ borderBottom: '1.5px solid darkgreen', marginBottom: '1em'}}>
                            <Typography variant='h6' sx={{ fontFamily: 'Raleway', color: '#dc5a41' }}>{menu.name}&nbsp;&nbsp;<span className='order_card_caption'>{menu.caption}</span></Typography>
                          </Grid>
                          <Grid item xs={12} sx={{ marginBottom: '1.5em'}}>
                            <Typography>{menu.description}</Typography>
                          </Grid>
                          <Grid item xs={4}>
                            <Typography sx={{ color: 'darkgreen', fontStyle: 'italic', fontFamily: 'Raleway', fontSize: '1.25em'}}>${menu.price}</Typography>
                          </Grid>
                          <Grid item xs={8}>
                          {props.isAutoOpen ? 
                            <>
                              {storeOpen ? 
                                <Button 
                                  variant='outlined' 
                                  sx={{ width: '100%'}}
                                  size='small'
                                  value={menu._id}
                                  onClick={modalOpener}
                                >
                                  <ShoppingCartIcon sx={{ fontSize: '1.3em'}} />&nbsp;Add to Cart
                                </Button>
                                : 
                                <Button 
                                  variant='outlined' 
                                  sx={{ width: '100%'}}
                                  size='small'
                                  value={menu._id}
                                  onClick={modalOpener}
                                  disabled
                                >
                                  Restaurant closed
                                </Button>
                              }
                            </> 
                            : 
                            <>
                              {props.manualOpen ?
                                <Button 
                                variant='outlined' 
                                sx={{ width: '100%'}}
                                size='small'
                                value={menu._id}
                                onClick={modalOpener}
                                >
                                  <ShoppingCartIcon sx={{ fontSize: '1.3em'}} />&nbsp;Add to Cart
                                </Button>
                                :
                                <Button 
                                variant='outlined' 
                                sx={{ width: '100%'}}
                                size='small'
                                value={menu._id}
                                onClick={modalOpener}
                                disabled
                                >
                                  Restaurant closed
                                </Button>
                              }
                            </>
                            }
                          </Grid>
                        </Grid>
                      </Card>
                    </Grid>
                  :  null
                ))}
                {/* Teriyaki */}
                <Grid item xs={12} sx={{ marginBottom: '1em', marginTop: '1.5em'}}>
                  <Typography variant='h5' sx={{ fontFamily: 'Raleway', fontWeight: 'bold', color: 'darkgreen', paddingBottom: '.5em', borderBottom: '1px solid #dc5a41' }}>Teriyaki<span className='order_card_caption_2'>Served with soup, salad, vegetable & rice</span></Typography>
                </Grid>
                {products.menu.map((menu, i) => (
                  menu.Sub_Category === 'Teriyaki' ?
                    <Grid item xs={12} sm={6} md={4} key={i}>
                      <Card sx={{ padding: '1em 1em'}}>
                        <Grid container>
                          <Grid item xs={12} sx={{ borderBottom: '1.5px solid darkgreen', marginBottom: '1em'}}>
                            <Typography variant='h6' sx={{ fontFamily: 'Raleway', color: '#dc5a41' }}>{menu.name}&nbsp;&nbsp;<span className='order_card_caption'>{menu.caption}</span></Typography>
                          </Grid>
                          <Grid item xs={12} sx={{ marginBottom: '1.5em'}}>
                            <Typography>{menu.description}</Typography>
                          </Grid>
                          <Grid item xs={4}>
                            <Typography sx={{ color: 'darkgreen', fontStyle: 'italic', fontFamily: 'Raleway', fontSize: '1.25em'}}>${menu.price}</Typography>
                          </Grid>
                          <Grid item xs={8}>
                          {props.isAutoOpen ? 
                            <>
                              {storeOpen ? 
                                <Button 
                                  variant='outlined' 
                                  sx={{ width: '100%'}}
                                  size='small'
                                  value={menu._id}
                                  onClick={modalOpener}
                                >
                                  <ShoppingCartIcon sx={{ fontSize: '1.3em'}} />&nbsp;Add to Cart
                                </Button>
                                : 
                                <Button 
                                  variant='outlined' 
                                  sx={{ width: '100%'}}
                                  size='small'
                                  value={menu._id}
                                  onClick={modalOpener}
                                  disabled
                                >
                                  Restaurant closed
                                </Button>
                              }
                            </> 
                            : 
                            <>
                              {props.manualOpen ?
                                <Button 
                                variant='outlined' 
                                sx={{ width: '100%'}}
                                size='small'
                                value={menu._id}
                                onClick={modalOpener}
                                >
                                  <ShoppingCartIcon sx={{ fontSize: '1.3em'}} />&nbsp;Add to Cart
                                </Button>
                                :
                                <Button 
                                variant='outlined' 
                                sx={{ width: '100%'}}
                                size='small'
                                value={menu._id}
                                onClick={modalOpener}
                                disabled
                                >
                                  Restaurant closed
                                </Button>
                              }
                            </>
                            }
                          </Grid>
                        </Grid>
                      </Card>
                    </Grid>
                  :  null
                ))}
                {/* Katsu */}
                <Grid item xs={12} sx={{ marginBottom: '1em', marginTop: '1.5em'}}>
                  <Typography variant='h5' sx={{ fontFamily: 'Raleway', fontWeight: 'bold', color: 'darkgreen', paddingBottom: '.5em', borderBottom: '1px solid #dc5a41' }}>Katsu<span className='order_card_caption_2'>Served with soup, salad, vegetable & rice</span></Typography>
                </Grid>
                {products.menu.map((menu, i) => (
                  menu.Sub_Category === 'Katsu' ?
                    <Grid item xs={12} sm={6} md={4} key={i}>
                      <Card sx={{ padding: '1em 1em'}}>
                        <Grid container>
                          <Grid item xs={12} sx={{ borderBottom: '1.5px solid darkgreen', marginBottom: '1em'}}>
                            <Typography variant='h6' sx={{ fontFamily: 'Raleway', color: '#dc5a41' }}>{menu.name}&nbsp;&nbsp;<span className='order_card_caption'>{menu.caption}</span></Typography>
                          </Grid>
                          <Grid item xs={12} sx={{ marginBottom: '1.5em'}}>
                            <Typography>{menu.description}</Typography>
                          </Grid>
                          <Grid item xs={4}>
                            <Typography sx={{ color: 'darkgreen', fontStyle: 'italic', fontFamily: 'Raleway', fontSize: '1.25em'}}>${menu.price}</Typography>
                          </Grid>
                          <Grid item xs={8}>
                          {props.isAutoOpen ? 
                            <>
                              {storeOpen ? 
                                <Button 
                                  variant='outlined' 
                                  sx={{ width: '100%'}}
                                  size='small'
                                  value={menu._id}
                                  onClick={modalOpener}
                                >
                                  <ShoppingCartIcon sx={{ fontSize: '1.3em'}} />&nbsp;Add to Cart
                                </Button>
                                : 
                                <Button 
                                  variant='outlined' 
                                  sx={{ width: '100%'}}
                                  size='small'
                                  value={menu._id}
                                  onClick={modalOpener}
                                  disabled
                                >
                                  Restaurant closed
                                </Button>
                              }
                            </> 
                            : 
                            <>
                              {props.manualOpen ?
                                <Button 
                                variant='outlined' 
                                sx={{ width: '100%'}}
                                size='small'
                                value={menu._id}
                                onClick={modalOpener}
                                >
                                  <ShoppingCartIcon sx={{ fontSize: '1.3em'}} />&nbsp;Add to Cart
                                </Button>
                                :
                                <Button 
                                variant='outlined' 
                                sx={{ width: '100%'}}
                                size='small'
                                value={menu._id}
                                onClick={modalOpener}
                                disabled
                                >
                                  Restaurant closed
                                </Button>
                              }
                            </>
                            }
                          </Grid>
                        </Grid>
                      </Card>
                    </Grid>
                  :  null
                ))}
                {/* Rice Bowl */}
                <Grid item xs={12} sx={{ marginBottom: '1em', marginTop: '1.5em'}}>
                  <Typography variant='h5' sx={{ fontFamily: 'Raleway', fontWeight: 'bold', color: 'darkgreen', paddingBottom: '.5em', borderBottom: '1px solid #dc5a41' }}>Rice Bowl</Typography>
                </Grid>
                {products.menu.map((menu, i) => (
                  menu.Sub_Category === 'Rice Bowl' ?
                    <Grid item xs={12} sm={6} md={4} key={i}>
                      <Card sx={{ padding: '1em 1em'}}>
                        <Grid container>
                          <Grid item xs={12} sx={{ borderBottom: '1.5px solid darkgreen', marginBottom: '1em'}}>
                            <Typography variant='h6' sx={{ fontFamily: 'Raleway', color: '#dc5a41' }}>{menu.name}&nbsp;&nbsp;<span className='order_card_caption'>{menu.caption}</span></Typography>
                          </Grid>
                          <Grid item xs={12} sx={{ marginBottom: '1.5em'}}>
                            <Typography>{menu.description}</Typography>
                          </Grid>
                          <Grid item xs={4}>
                            <Typography sx={{ color: 'darkgreen', fontStyle: 'italic', fontFamily: 'Raleway', fontSize: '1.25em'}}>${menu.price}</Typography>
                          </Grid>
                          <Grid item xs={8}>
                          {props.isAutoOpen ? 
                            <>
                              {storeOpen ? 
                                <Button 
                                  variant='outlined' 
                                  sx={{ width: '100%'}}
                                  size='small'
                                  value={menu._id}
                                  onClick={modalOpener}
                                >
                                  <ShoppingCartIcon sx={{ fontSize: '1.3em'}} />&nbsp;Add to Cart
                                </Button>
                                : 
                                <Button 
                                  variant='outlined' 
                                  sx={{ width: '100%'}}
                                  size='small'
                                  value={menu._id}
                                  onClick={modalOpener}
                                  disabled
                                >
                                  Restaurant closed
                                </Button>
                              }
                            </> 
                            : 
                            <>
                              {props.manualOpen ?
                                <Button 
                                variant='outlined' 
                                sx={{ width: '100%'}}
                                size='small'
                                value={menu._id}
                                onClick={modalOpener}
                                >
                                  <ShoppingCartIcon sx={{ fontSize: '1.3em'}} />&nbsp;Add to Cart
                                </Button>
                                :
                                <Button 
                                variant='outlined' 
                                sx={{ width: '100%'}}
                                size='small'
                                value={menu._id}
                                onClick={modalOpener}
                                disabled
                                >
                                  Restaurant closed
                                </Button>
                              }
                            </>
                            }
                          </Grid>
                        </Grid>
                      </Card>
                    </Grid>
                  :  null
                ))}
              </Grid>
            </TabPanel>
            {/* Su & SA */}
            <TabPanel value={value} index={6} sx={{ minWidth: '250px' }}>
              <Grid container spacing={2} sx={{ marginTop: '2em', padding: '0 2em', marginBottom: '2em' }}>
                <Grid item xs={12} sx={{ marginBottom: '1em'}}>
                  <Typography variant='h4' sx={{ fontFamily: 'Raleway', fontWeight: 'bold', color: 'darkgreen', paddingBottom: '.5em', borderBottom: '2px solid #dc5a41' }}>Sushi & Sashimi</Typography>
                </Grid>
                {/* SU sets */}
                <Grid item xs={12} sx={{ marginBottom: '1em'}}>
                  <Typography variant='h5' sx={{ fontFamily: 'Raleway', fontWeight: 'bold', color: 'darkgreen', paddingBottom: '.5em', borderBottom: '1px solid #dc5a41' }}>Sushi Sets</Typography>
                </Grid>
                {products.menu.map((menu, i) => (
                  menu.Sub_Category === 'Sushi Sets' ?
                    <Grid item xs={12} sm={6} md={4} key={i}>
                      <Card sx={{ padding: '1em 1em'}}>
                        <Grid container>
                          <Grid item xs={12} sx={{ borderBottom: '1.5px solid darkgreen', marginBottom: '1em'}}>
                            <Typography variant='h6' sx={{ fontFamily: 'Raleway', color: '#dc5a41' }}>{menu.name}&nbsp;&nbsp;<span className='order_card_caption'>{menu.caption}</span></Typography>
                          </Grid>
                          <Grid item xs={12} sx={{ marginBottom: '1.5em'}}>
                            <Typography>{menu.description}</Typography>
                          </Grid>
                          <Grid item xs={4}>
                            <Typography sx={{ color: 'darkgreen', fontStyle: 'italic', fontFamily: 'Raleway', fontSize: '1.25em'}}>${menu.price}</Typography>
                          </Grid>
                          <Grid item xs={8}>
                          {props.isAutoOpen ? 
                            <>
                              {storeOpen ? 
                                <Button 
                                  variant='outlined' 
                                  sx={{ width: '100%'}}
                                  size='small'
                                  value={menu._id}
                                  onClick={modalOpener}
                                >
                                  <ShoppingCartIcon sx={{ fontSize: '1.3em'}} />&nbsp;Add to Cart
                                </Button>
                                : 
                                <Button 
                                  variant='outlined' 
                                  sx={{ width: '100%'}}
                                  size='small'
                                  value={menu._id}
                                  onClick={modalOpener}
                                  disabled
                                >
                                  Restaurant closed
                                </Button>
                              }
                            </> 
                            : 
                            <>
                              {props.manualOpen ?
                                <Button 
                                variant='outlined' 
                                sx={{ width: '100%'}}
                                size='small'
                                value={menu._id}
                                onClick={modalOpener}
                                >
                                  <ShoppingCartIcon sx={{ fontSize: '1.3em'}} />&nbsp;Add to Cart
                                </Button>
                                :
                                <Button 
                                variant='outlined' 
                                sx={{ width: '100%'}}
                                size='small'
                                value={menu._id}
                                onClick={modalOpener}
                                disabled
                                >
                                  Restaurant closed
                                </Button>
                              }
                            </>
                            }
                          </Grid>
                        </Grid>
                      </Card>
                    </Grid>
                  :  null
                ))}
                {/* SU SA sets */}
                <Grid item xs={12} sx={{ marginBottom: '1em', marginTop: '1.5em'}}>
                  <Typography variant='h5' sx={{ fontFamily: 'Raleway', fontWeight: 'bold', color: 'darkgreen', paddingBottom: '.5em', borderBottom: '1px solid #dc5a41' }}>Sushi & Sashimi Sets</Typography>
                </Grid>
                {products.menu.map((menu, i) => (
                  menu.Sub_Category === 'Sushi & Sashimi Sets' ?
                    <Grid item xs={12} sm={6} md={4} key={i}>
                      <Card sx={{ padding: '1em 1em'}}>
                        <Grid container>
                          <Grid item xs={12} sx={{ borderBottom: '1.5px solid darkgreen', marginBottom: '1em'}}>
                            <Typography variant='h6' sx={{ fontFamily: 'Raleway', color: '#dc5a41' }}>{menu.name}&nbsp;&nbsp;<span className='order_card_caption'>{menu.caption}</span></Typography>
                          </Grid>
                          <Grid item xs={12} sx={{ marginBottom: '1.5em'}}>
                            <Typography>{menu.description}</Typography>
                          </Grid>
                          <Grid item xs={4}>
                            <Typography sx={{ color: 'darkgreen', fontStyle: 'italic', fontFamily: 'Raleway', fontSize: '1.25em'}}>${menu.price}</Typography>
                          </Grid>
                          <Grid item xs={8}>
                          {props.isAutoOpen ? 
                            <>
                              {storeOpen ? 
                                <Button 
                                  variant='outlined' 
                                  sx={{ width: '100%'}}
                                  size='small'
                                  value={menu._id}
                                  onClick={modalOpener}
                                >
                                  <ShoppingCartIcon sx={{ fontSize: '1.3em'}} />&nbsp;Add to Cart
                                </Button>
                                : 
                                <Button 
                                  variant='outlined' 
                                  sx={{ width: '100%'}}
                                  size='small'
                                  value={menu._id}
                                  onClick={modalOpener}
                                  disabled
                                >
                                  Restaurant closed
                                </Button>
                              }
                            </> 
                            : 
                            <>
                              {props.manualOpen ?
                                <Button 
                                variant='outlined' 
                                sx={{ width: '100%'}}
                                size='small'
                                value={menu._id}
                                onClick={modalOpener}
                                >
                                  <ShoppingCartIcon sx={{ fontSize: '1.3em'}} />&nbsp;Add to Cart
                                </Button>
                                :
                                <Button 
                                variant='outlined' 
                                sx={{ width: '100%'}}
                                size='small'
                                value={menu._id}
                                onClick={modalOpener}
                                disabled
                                >
                                  Restaurant closed
                                </Button>
                              }
                            </>
                            }
                          </Grid>
                        </Grid>
                      </Card>
                    </Grid>
                  :  null
                ))}
              </Grid>
            </TabPanel>
            {/* A La Carte */}
            <TabPanel value={value} index={7} sx={{ minWidth: '250px' }}>
              <Grid container spacing={2} sx={{ marginTop: '2em', padding: '0 2em', marginBottom: '2em' }}>
                <Grid item xs={12} sx={{ marginBottom: '1em'}}>
                  <Typography variant='h4' sx={{ fontFamily: 'Raleway', fontWeight: 'bold', color: 'darkgreen', paddingBottom: '.5em', borderBottom: '2px solid #dc5a41' }}>A La Carte</Typography>
                </Grid>
                {/* Nigiri */}
                <Grid item xs={12} sx={{ marginBottom: '1em'}}>
                  <Typography variant='h5' sx={{ fontFamily: 'Raleway', fontWeight: 'bold', color: 'darkgreen', paddingBottom: '.5em', borderBottom: '1px solid #dc5a41' }}>Nigiri</Typography>
                </Grid>
                {products.menu.map((menu, i) => (
                  menu.Sub_Category === 'Nigiri' ?
                    <Grid item xs={12} sm={6} md={4} key={i}>
                      <Card sx={{ padding: '1em 1em'}}>
                        <Grid container>
                          <Grid item xs={12} sx={{ borderBottom: '1.5px solid darkgreen', marginBottom: '1em'}}>
                            <Typography variant='h6' sx={{ fontFamily: 'Raleway', color: '#dc5a41' }}>{menu.name}&nbsp;&nbsp;<span className='order_card_caption'>{menu.caption}</span></Typography>
                          </Grid>
                          <Grid item xs={12} sx={{ marginBottom: '1.5em'}}>
                            <Typography>{menu.description}</Typography>
                          </Grid>
                          <Grid item xs={4}>
                            <Typography sx={{ color: 'darkgreen', fontStyle: 'italic', fontFamily: 'Raleway', fontSize: '1.25em'}}>${menu.price}</Typography>
                          </Grid>
                          <Grid item xs={8}>
                          {props.isAutoOpen ? 
                            <>
                              {storeOpen ? 
                                <Button 
                                  variant='outlined' 
                                  sx={{ width: '100%'}}
                                  size='small'
                                  value={menu._id}
                                  onClick={modalOpener}
                                >
                                  <ShoppingCartIcon sx={{ fontSize: '1.3em'}} />&nbsp;Add to Cart
                                </Button>
                                : 
                                <Button 
                                  variant='outlined' 
                                  sx={{ width: '100%'}}
                                  size='small'
                                  value={menu._id}
                                  onClick={modalOpener}
                                  disabled
                                >
                                  Restaurant closed
                                </Button>
                              }
                            </> 
                            : 
                            <>
                              {props.manualOpen ?
                                <Button 
                                variant='outlined' 
                                sx={{ width: '100%'}}
                                size='small'
                                value={menu._id}
                                onClick={modalOpener}
                                >
                                  <ShoppingCartIcon sx={{ fontSize: '1.3em'}} />&nbsp;Add to Cart
                                </Button>
                                :
                                <Button 
                                variant='outlined' 
                                sx={{ width: '100%'}}
                                size='small'
                                value={menu._id}
                                onClick={modalOpener}
                                disabled
                                >
                                  Restaurant closed
                                </Button>
                              }
                            </>
                            }
                          </Grid>
                        </Grid>
                      </Card>
                    </Grid>
                  :  null
                ))}
                {/* Sashimi */}
                <Grid item xs={12} sx={{ marginBottom: '1em', marginTop: '1.5em'}}>
                  <Typography variant='h5' sx={{ fontFamily: 'Raleway', fontWeight: 'bold', color: 'darkgreen', paddingBottom: '.5em', borderBottom: '1px solid #dc5a41' }}>Sashimi</Typography>
                </Grid>
                {products.menu.map((menu, i) => (
                  menu.Sub_Category === 'Sashimi' ?
                    <Grid item xs={12} sm={6} md={4} key={i}>
                      <Card sx={{ padding: '1em 1em'}}>
                        <Grid container>
                          <Grid item xs={12} sx={{ borderBottom: '1.5px solid darkgreen', marginBottom: '1em'}}>
                            <Typography variant='h6' sx={{ fontFamily: 'Raleway', color: '#dc5a41' }}>{menu.name}&nbsp;&nbsp;<span className='order_card_caption'>{menu.caption}</span></Typography>
                          </Grid>
                          <Grid item xs={12} sx={{ marginBottom: '1.5em'}}>
                            <Typography>{menu.description}</Typography>
                          </Grid>
                          <Grid item xs={4}>
                            <Typography sx={{ color: 'darkgreen', fontStyle: 'italic', fontFamily: 'Raleway', fontSize: '1.25em'}}>${menu.price}</Typography>
                          </Grid>
                          <Grid item xs={8}>
                          {props.isAutoOpen ? 
                            <>
                              {storeOpen ? 
                                <Button 
                                  variant='outlined' 
                                  sx={{ width: '100%'}}
                                  size='small'
                                  value={menu._id}
                                  onClick={modalOpener}
                                >
                                  <ShoppingCartIcon sx={{ fontSize: '1.3em'}} />&nbsp;Add to Cart
                                </Button>
                                : 
                                <Button 
                                  variant='outlined' 
                                  sx={{ width: '100%'}}
                                  size='small'
                                  value={menu._id}
                                  onClick={modalOpener}
                                  disabled
                                >
                                  Restaurant closed
                                </Button>
                              }
                            </> 
                            : 
                            <>
                              {props.manualOpen ?
                                <Button 
                                variant='outlined' 
                                sx={{ width: '100%'}}
                                size='small'
                                value={menu._id}
                                onClick={modalOpener}
                                >
                                  <ShoppingCartIcon sx={{ fontSize: '1.3em'}} />&nbsp;Add to Cart
                                </Button>
                                :
                                <Button 
                                variant='outlined' 
                                sx={{ width: '100%'}}
                                size='small'
                                value={menu._id}
                                onClick={modalOpener}
                                disabled
                                >
                                  Restaurant closed
                                </Button>
                              }
                            </>
                            }
                          </Grid>
                        </Grid>
                      </Card>
                    </Grid>
                  :  null
                ))}
                {/* seared SU */}
                <Grid item xs={12} sx={{ marginBottom: '1em', marginTop: '1.5em'}}>
                  <Typography variant='h5' sx={{ fontFamily: 'Raleway', fontWeight: 'bold', color: 'darkgreen', paddingBottom: '.5em', borderBottom: '1px solid #dc5a41' }}>Special Seared Sushi</Typography>
                </Grid>
                {products.menu.map((menu, i) => (
                  menu.Sub_Category === 'Special Seared Sushi' ?
                    <Grid item xs={12} sm={6} md={4} key={i}>
                      <Card sx={{ padding: '1em 1em'}}>
                        <Grid container>
                          <Grid item xs={12} sx={{ borderBottom: '1.5px solid darkgreen', marginBottom: '1em'}}>
                            <Typography variant='h6' sx={{ fontFamily: 'Raleway', color: '#dc5a41' }}>{menu.name}&nbsp;&nbsp;<span className='order_card_caption'>{menu.caption}</span></Typography>
                          </Grid>
                          <Grid item xs={12} sx={{ marginBottom: '1.5em'}}>
                            <Typography>{menu.description}</Typography>
                          </Grid>
                          <Grid item xs={4}>
                            <Typography sx={{ color: 'darkgreen', fontStyle: 'italic', fontFamily: 'Raleway', fontSize: '1.25em'}}>${menu.price}</Typography>
                          </Grid>
                          <Grid item xs={8}>
                          {props.isAutoOpen ? 
                            <>
                              {storeOpen ? 
                                <Button 
                                  variant='outlined' 
                                  sx={{ width: '100%'}}
                                  size='small'
                                  value={menu._id}
                                  onClick={modalOpener}
                                >
                                  <ShoppingCartIcon sx={{ fontSize: '1.3em'}} />&nbsp;Add to Cart
                                </Button>
                                : 
                                <Button 
                                  variant='outlined' 
                                  sx={{ width: '100%'}}
                                  size='small'
                                  value={menu._id}
                                  onClick={modalOpener}
                                  disabled
                                >
                                  Restaurant closed
                                </Button>
                              }
                            </> 
                            : 
                            <>
                              {props.manualOpen ?
                                <Button 
                                variant='outlined' 
                                sx={{ width: '100%'}}
                                size='small'
                                value={menu._id}
                                onClick={modalOpener}
                                >
                                  <ShoppingCartIcon sx={{ fontSize: '1.3em'}} />&nbsp;Add to Cart
                                </Button>
                                :
                                <Button 
                                variant='outlined' 
                                sx={{ width: '100%'}}
                                size='small'
                                value={menu._id}
                                onClick={modalOpener}
                                disabled
                                >
                                  Restaurant closed
                                </Button>
                              }
                            </>
                            }
                          </Grid>
                        </Grid>
                      </Card>
                    </Grid>
                  :  null
                ))}
              </Grid>
            </TabPanel>
            {/* Platter */}
            <TabPanel value={value} index={8} sx={{ minWidth: '250px' }}>
              <Grid container spacing={2} sx={{ marginTop: '2em', padding: '0 2em', marginBottom: '2em' }}>
                <Grid item xs={12} sx={{ marginBottom: '1em'}}>
                  <Typography variant='h4' sx={{ fontFamily: 'Raleway', fontWeight: 'bold', color: 'darkgreen', paddingBottom: '.5em', borderBottom: '2px solid #dc5a41' }}>Party Platter</Typography>
                </Grid>
                {products.menu.map((menu, i) => (
                  menu.category === 'Party Platter' ?
                    <Grid item xs={12} sm={6} md={4} key={i}>
                      <Card sx={{ padding: '1em 1em'}}>
                        <Grid container>
                          <Grid item xs={12} sx={{ borderBottom: '1.5px solid darkgreen', marginBottom: '1em'}}>
                            <Typography variant='h6' sx={{ fontFamily: 'Raleway', color: '#dc5a41' }}>{menu.name}&nbsp;&nbsp;<span className='order_card_caption'>{menu.caption}</span></Typography>
                          </Grid>
                          <Grid item xs={12} sx={{ marginBottom: '1.5em'}}>
                            <Typography>{menu.description}</Typography>
                          </Grid>
                          <Grid item xs={4}>
                            <Typography sx={{ color: 'darkgreen', fontStyle: 'italic', fontFamily: 'Raleway', fontSize: '1.25em'}}>${menu.price}</Typography>
                          </Grid>
                          <Grid item xs={8}>
                          {props.isAutoOpen ? 
                            <>
                              {storeOpen ? 
                                <Button 
                                  variant='outlined' 
                                  sx={{ width: '100%'}}
                                  size='small'
                                  value={menu._id}
                                  onClick={modalOpener}
                                >
                                  <ShoppingCartIcon sx={{ fontSize: '1.3em'}} />&nbsp;Add to Cart
                                </Button>
                                : 
                                <Button 
                                  variant='outlined' 
                                  sx={{ width: '100%'}}
                                  size='small'
                                  value={menu._id}
                                  onClick={modalOpener}
                                  disabled
                                >
                                  Restaurant closed
                                </Button>
                              }
                            </> 
                            : 
                            <>
                              {props.manualOpen ?
                                <Button 
                                variant='outlined' 
                                sx={{ width: '100%'}}
                                size='small'
                                value={menu._id}
                                onClick={modalOpener}
                                >
                                  <ShoppingCartIcon sx={{ fontSize: '1.3em'}} />&nbsp;Add to Cart
                                </Button>
                                :
                                <Button 
                                variant='outlined' 
                                sx={{ width: '100%'}}
                                size='small'
                                value={menu._id}
                                onClick={modalOpener}
                                disabled
                                >
                                  Restaurant closed
                                </Button>
                              }
                            </>
                            }
                          </Grid>
                        </Grid>
                      </Card>
                    </Grid>
                  :  null
                ))}
              </Grid>
            </TabPanel>
          </div>
        )
        }
        <Cart allitem={products} cart={cart} setCart={setCart} setCartOpened={setCartOpened} cartOpened={cartOpened}/>
      </div>
      <Modal open={itemOpen} sx={{overflow: 'scroll'}}>
        <Bar>
          <OrderItem modalCloser={modalCloser} product={product} cart={cart} setCart={setCart}/>
        </Bar>
      </Modal>
    </ThemeProvider>
  );
}

const Bar = React.forwardRef((props, ref) => (
  <span {...props} ref={ref}>
    {props.children}
  </span>
))

export default Order;