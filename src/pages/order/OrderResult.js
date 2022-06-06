import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { io } from 'socket.io-client';

// Mui
import { Grid, Typography, CircularProgress, Card, Button } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import theme from '../../theme/theme';
import CheckCircleOutlineRounded from '@mui/icons-material/CheckCircleOutlineRounded';

const OrderResult = (props) => {
  // states
  const [ orderData, setOrderData ] = useState();
  const navigate = useNavigate();

  // handlers
  const closeButtonHandler = async (e) => {
    await navigate('/');
  }

  const priceFomatter= (text) => {
    if (text === 'subtotal') {
      return props.subTotal
    } else if (text === 'tax') {
      let returnText = 0
      let taxWithAddOn = (props.subTotal + orderData[0].addOnTotal) * 0.08875
      let taxWithoutAddOn = props.subTotal*0.08875
      orderData[0].addOnTotal > 0 ? returnText = taxWithAddOn : returnText = taxWithoutAddOn
      return returnText
    } else if (text === 'online') {
      let returnText = 0
      let onlineWithAddOn = ((props.subTotal + orderData[0].addOnTotal)*0.03)+0.3
      let onlineWithoutAddOn = (props.subTotal*0.03)+0.3
      orderData[0].addOnTotal > 0 ? returnText = onlineWithAddOn : returnText = onlineWithoutAddOn
      return returnText
    } else if (text === 'grandTotal') {
      return orderData[0].grandTotal
    } else if (text === 'addOn') {
      return orderData[0].addOnTotal
    }
  }


  // useEffect
  useEffect(() => {
    async function fetchData() {
      const config = {
        header: {
          "Content-Type": "application/json"
        }
      }
      const request = await axios.get(`${process.env.REACT_APP_SERVER_URL}/api/order/${props.orderId}`, config)
      setOrderData(request.data.order)
      return request
    }
    fetchData()
  },[])
  
  useEffect(() => {
    if (orderData) {
      // TODO: update server url
      const socket = io('https://sushiville-socket.herokuapp.com/', {
        withCredentials: true,
        transports: ['websocket'],
        secure: true,
      })

      try {
        socket.emit('newOrder', orderData[0])
      } catch (err) {
        console.log(err)
      }
    }
  },[orderData])

  return (
    <ThemeProvider theme={theme}>
      { !orderData ? 
      <Grid item xs={12}>
        <Grid container spacing={2} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
          <Grid item xs={12} sx={{ marginTop: '2em'}}>
            <CircularProgress />
          </Grid>
          <Grid item xs={12} sx={{ marginTop: '1em', marginBottom: '2em'}}>
            <Typography>Loading ...</Typography>
          </Grid>
        </Grid>
      </Grid> 
      :
      <>
        <Grid item xs={12} md={6}>
          <Card sx={{ padding: '1.5em 1.5em'}}>
          <Grid container spacing={1}>
            <Grid item xs={12}>
              <Typography variant='h5' sx={{ fontFamily: 'Raleway', fontWeight: 'bold', color: 'darkgreen', paddingBottom: '.5em', borderBottom: '1px solid #dc5a41', marginBottom: '7px'}}>Your Order</Typography>
            </Grid>
            <Grid item xs={12}>
              <Grid container>
                <Grid item xs={6}>
                  <Typography variant='h6'>Order Number:</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant='h6' sx={{color: '#dc5a41', textAlign: 'right', paddingRight: '1em'}}>{orderData[0].OrderNumber}</Typography>
                </Grid>
                { orderData[0].isPaidAtRestaurant == true ? 
                <Grid item xs={12} sx={{ borderBottom: '1px solid #dc5a41', paddingBottom: '1em'}}>
                  <Typography variant='h6' sx={{ color: '#dc5a41', paddingTop: '.5em'}}>
                    Your order is not paid yet. <br />Please prepare to pay at pick up.
                  </Typography>
                </Grid> 
                : null}
              </Grid>
            </Grid>
            <Grid item xs={12} sx={{ marginBottom: '.5em'}}>
              <Typography>Ordered Items</Typography>
            </Grid>
            {orderData[0].orderedItems.map((item, i) => (
              <Grid item xs={12} key={i} sx={{ borderBottom: '1px solid #dc5a41', paddingBottom: '1em'}}>
                <Card sx={{ padding: '1em 1em', borderBottom: '1px solid lightgray'}} elevation={0}>
                  <Grid container>
                    <Grid item xs={7}>
                      <Typography sx={{ color: '#dc5a41', fontSize: '1.1125em'}}>{item.name}</Typography>
                    </Grid>
                    <Grid item xs={2}>
                      <Typography sx={{ fontStyle: 'italic'}}>x{item.qty}</Typography>
                    </Grid>
                    <Grid item xs={3}>
                      <Typography sx={{ color: 'darkgreen', marginBottom: '.5em', textAlign: 'right', paddingRight: '1em' }}>$&nbsp;{(item.price.toFixed(2))}</Typography>
                    </Grid>
                    { item.options.length > 0 ?
                      <>
                        {item.options.map((option, i) => (
                          <Grid container direction='row' justifyContent='center' alignItems='center' key={i}>
                            <Grid item xs={7}>
                              {option.selected ?
                                <Typography sx={{ color: 'gray', paddingLeft: '1.5em', fontStyle: 'italic'}}>-&nbsp;{option.name}</Typography>
                              :
                                null
                              }
                            </Grid>
                            <Grid item xs={2}>
                              {option.selected ?
                                <Typography sx={{ color: 'gray', fontStyle: 'italic' }}>x{item.qty}</Typography>
                              :
                                null
                              }
                            </Grid>
                            <Grid item xs={3}>
                              {option.selected ?
                                <Typography sx={{ color: 'gray', textAlign: 'right', paddingRight: '2em' }}>$&nbsp;{(option.price.toFixed(2))}</Typography>
                              :
                                null
                              }
                            </Grid>
                          </Grid>
                        ))}
                      </>
                      :
                      null
                    }
                    { item.caliOrSpTuna ? 
                      <Grid container direction='row' justifyContent='center' alignItems='center'>
                        <Grid item xs={6}>
                          <Typography sx={{ color: 'gray', paddingLeft: '1.5em', fontStyle: 'italic'}}>-&nbsp;Choice:</Typography>
                        </Grid>
                        <Grid item xs={6}>
                          <Typography sx={{ color: 'gray'}}>{item.caliOrSpTuna}</Typography>
                        </Grid>
                      </Grid> 
                    : null }
                    { item.salGoneOrRain ? 
                      <Grid container direction='row' justifyContent='center' alignItems='center'>
                        <Grid item xs={6}>
                          <Typography sx={{ color: 'gray', paddingLeft: '1.5em', fontStyle: 'italic'}}>-&nbsp;Choice:</Typography>
                        </Grid>
                        <Grid item xs={6}>
                          <Typography sx={{ color: 'gray'}}>{item.salGoneOrRain}</Typography>
                        </Grid>
                      </Grid> 
                    : null }
                    { item.spicyOrSweet ? 
                      <Grid container direction='row' justifyContent='center' alignItems='center'>
                        <Grid item xs={6}>
                          <Typography sx={{ color: 'gray', paddingLeft: '1.5em', fontStyle: 'italic'}}>-&nbsp;Choice:</Typography>
                        </Grid>
                        <Grid item xs={6}>
                          <Typography sx={{ color: 'gray'}}>{item.spicyOrSweet}</Typography>
                        </Grid>
                      </Grid> 
                    : null }
                    { item.porkOrVeg ? 
                      <Grid container direction='row' justifyContent='center' alignItems='center'>
                        <Grid item xs={6}>
                          <Typography sx={{ color: 'gray', paddingLeft: '1.5em', fontStyle: 'italic'}}>-&nbsp;Choice:</Typography>
                        </Grid>
                        <Grid item xs={6}>
                          <Typography sx={{ color: 'gray'}}>{item.porkOrVeg}</Typography>
                        </Grid>
                      </Grid> 
                    : null }
                    { item.rollChoices.length > 0 ? <>
                      <Grid container direction='row' justifyContent='center' alignItems='center'>
                        <Grid item xs={5}>
                          <Typography sx={{ color: 'gray', paddingLeft: '1.5em', fontStyle: 'italic'}}>-&nbsp;Roll1:</Typography>
                        </Grid>
                        <Grid item xs={7}>
                          <Typography sx={{ color: 'gray' }}>{item.rollChoices[0].roll1}</Typography>
                        </Grid>
                        <Grid item xs={5}>
                          <Typography sx={{ color: 'gray', paddingLeft: '1.5em', fontStyle: 'italic'}}>-&nbsp;Roll2:</Typography>
                        </Grid>
                        <Grid item xs={7}>
                          <Typography sx={{ color: 'gray' }}>{item.rollChoices[0].roll2}</Typography>
                        </Grid>
                        { item.rollChoices[0].roll3 ? <>
                          <Grid item xs={5}>
                            <Typography sx={{ color: 'gray', paddingLeft: '1.5em', fontStyle: 'italic'}}>-&nbsp;Roll2:</Typography>
                          </Grid>
                          <Grid item xs={7}>
                            <Typography sx={{ color: 'gray' }}>{item.rollChoices[0].roll2}</Typography>
                          </Grid>
                        </> : null }
                      </Grid>
                    </> : null }
                    { item.comments !== "" ? <>
                      <Grid item xs={5}>
                        <Typography sx={{ color: 'gray', paddingLeft: '1.5em', fontStyle: 'italic'}}>-&nbsp;Instructions:</Typography>
                      </Grid>
                      <Grid item xs={7}>
                        <Typography sx={{ color: 'gray' }}>{item.comments}</Typography>
                      </Grid>
                    </> : null }
                  </Grid>
                </Card>
              </Grid>
            ))}
            <Grid item xs={12} sx={{ marginBottom: '.5em', marginTop: '.25em'}}>
              <Typography>Added Items</Typography>
            </Grid>
            <Grid item xs={12} sx={{ borderBottom: '1px solid #dc5a41', paddingBottom: '1em'}}>
            {orderData[0].addOns.length > 0 ?
            <>
              {orderData[0].addOns.map((item, i) => (
                  <Card key={i} sx={{ padding: '1em 1em', borderBottom: '1px solid lightgray'}} elevation={0}>
                    <Grid container>
                      <Grid item xs={7}>
                        <Typography sx={{ color: '#dc5a41', fontSize: '1.1125em'}}>{item.name}</Typography>
                      </Grid>
                      <Grid item xs={2}>
                        <Typography sx={{ fontStyle: 'italic'}}>x{item.qty}</Typography>
                      </Grid>
                      <Grid item xs={3}>
                        <Typography sx={{ color: 'darkgreen', marginBottom: '.5em', textAlign: 'right', paddingRight: '1em' }}>$&nbsp;{(item.price.toFixed(2))}</Typography>
                      </Grid>
                    </Grid>
                  </Card>
              ))}
            </>
            :
            <>
              <Grid item xs={12} sx={{ paddingBottom: '1em'}}>
                <Typography sx={{ paddingLeft: '2em', color: 'gray'}}>No items added.</Typography>
              </Grid>
            </>
            }
            </Grid>
            { orderData[0].comments ?
              <>
                <Grid item xs={12} sx={{ marginBottom: '.5em', marginTop: '1em'}}>
                  <Typography>Options</Typography>
                </Grid>
                <Grid item xs={12}>
                  <Card xs={{ padding: '1em 1em', borderBottom: '1px solid lightgray'}} elevation={0}>
                    <Grid container>
                      { orderData[0].comments ? 
                        <>
                          <Grid item xs={6}>
                            <Typography sx={{ paddingLeft: '2em', fontStyle: 'italic', color: 'gray'}}>
                              -&nbsp;Comments :
                            </Typography>
                          </Grid>
                          <Grid item xs={6}>
                            <Typography sx={{ color: 'gray'}}>{orderData[0].comments}</Typography>
                          </Grid>
                        </> : null
                      }
                    </Grid>
                  </Card>
                </Grid>
              </> : null
            }
            {/* TOTAL */}
            <Grid item xs={12}>
              <Typography>Total</Typography>
            </Grid>
            <Grid item xs={7}>
              <Typography sx={{ color: 'gray', paddingLeft: '2em'}}>Subtotal</Typography>
            </Grid>
            <Grid item xs={5}>
              <Typography sx={{ textAlign: 'right', paddingRight: '2em', color: 'darkgreen'}}>${(priceFomatter('subtotal')).toFixed(2)}</Typography>
            </Grid>
            { orderData[0].addOnTotal > 0 ? 
            <Grid item xs={12}>
              {orderData[0].addOns.map((item, i) => (
                <Grid container key={i}>
                  <Grid item xs={7}>
                    <Typography sx={{ color: 'gray', paddingLeft: '2em'}}>{item.name}</Typography>
                  </Grid>
                  <Grid item xs={5}>
                    <Typography sx={{ textAlign: 'Right', paddingRight: '2em', color: 'darkgreen'}}>${priceFomatter('addOn').toFixed(2)}</Typography>
                  </Grid>
                </Grid>
              ))}
            </Grid> : null }
            <Grid item xs={7}>
              <Typography sx={{ color: 'gray', paddingLeft: '2em'}}>Tax (8.875%)</Typography>
            </Grid>
            <Grid item xs={5}>
              <Typography sx={{textAlign: 'right', paddingRight: '2em', color: 'darkgreen'}}>${(priceFomatter('tax').toFixed(2))}</Typography>
            </Grid>
            {/* Online process fee */}
            {orderData[0].isPaidAtRestaurant == false ? 
            <>
              <Grid item xs={7}>
                <Typography sx={{ color: 'gray', paddingLeft: '2em'}}>Online Processing Fee</Typography>
              </Grid>
              <Grid item xs={5}>
                <Typography sx={{textAlign: 'right', paddingRight: '2em', color: 'darkgreen'}}>${(priceFomatter('online').toFixed(2))}</Typography>
              </Grid>
            </> 
            : null}
            <Grid item xs={7}>
              <Typography sx={{ paddingLeft: '2em'}}>Grand Total</Typography>
            </Grid>
            <Grid item xs={5}>
              <Typography sx={{textAlign: 'right', paddingRight: '1.75em', color: '#dc5a41', fontWeight: 'bold', fontSize: '1.125em'}}>${(priceFomatter('grandTotal')).toFixed(2)}</Typography>
            </Grid>
          </Grid>
          </Card>
        </Grid>
        {/* Right side */}
        <Grid item xs={12} md={6} sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
          <CheckCircleOutlineRounded sx={{ fontSize: '6em', color: 'green', marginTop: '.5em'}} />
          <Typography variant='h6' sx={{ paddingTop: '1em'}}>Your order has been placed!</Typography>
          <Typography variant='body1' sx={{ paddingTop: '1em', fontSize: '.9em', color: 'gray'}}>We have sent confirmation email to you. <br /> Please show the email at pick up.</Typography>
          <Button onClick={closeButtonHandler} variant='contained' sx={{ marginTop: '2em', marginBottom: '2em'}}>Close</Button>
        </Grid>
      </> 
      }
    </ThemeProvider>
  );
}
export default OrderResult;