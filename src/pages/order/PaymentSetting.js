import { useState, useEffect } from 'react';
import axios from 'axios';
import Cardform from './paymentComponents/CardForm';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';

// MUI
import { ThemeProvider } from '@mui/material/styles';
import theme from '../../theme/theme';
import { Grid, Typography, Card, CircularProgress } from '@mui/material';

// Stripe

const PaymentSetting = (props) => {

  const [ orderData, setOrderData ] = useState();
  const [ stripePromise, setStripePromise ] = useState(() => loadStripe('pk_test_51KlJjkKrjDamwGGy6pCBPHGF0QO2KduD8qoOJPwNSVIkJiivT8oULOqdNJ8D7N2NorkiNKdSmJNCjP8HmDAVuCll00y9TL2HIt'))

  // handlers

  function determineOrder(data) {
    if (orderData) {
      if (data.isPaidAtRestaurant == true) {
        props.handleComplete();
        props.handleNext();
      }
    }
  }

  const totalCalcualtor = (text) => {
    const subTotal = props.subTotal
    const taxRate = 0.08875
    let addOnTotal
    let returnText 
    if (text === 'add') {
      addOnTotal = orderData[0].addOnTotal
      return addOnTotal
    } else if (text === 'tax') {
      let taxWithAddOn = ( subTotal + orderData[0].addOnTotal ) * taxRate
      let taxWithoutAddOn = subTotal * taxRate
      orderData[0].addOnTotal > 0 ? returnText = taxWithAddOn : returnText = taxWithoutAddOn 
      return returnText
    } else if (text === 'subTotal') {
      return subTotal
    } else if (text === 'grandTotal') {
      return orderData[0].grandTotal
    } else if (text === 'online') {
      let onlineWithAddOn = ((subTotal + orderData[0].addOnTotal) * 0.03) + 0.3
      let onlineWithoutAddOn = (subTotal * 0.03) + 0.3
      orderData[0].addOnTotal > 0 ? returnText = onlineWithAddOn : returnText = onlineWithoutAddOn
      return returnText
    }
  }

  // useEffect
  useEffect(()=> {
    async function fetchOrderData() {
      const config = {
        header: {
          "Content-Type": "application/json"
        }
      }
      const request = await axios.get(`${process.env.REACT_APP_SERVER_URL}/api/order/${props.orderId}`, config)
      await setOrderData(request.data.order)
      return request
    }
    fetchOrderData();
  },[])

  return (
    <ThemeProvider theme={theme}>
      {!orderData ? 
      <Grid container>
        <Grid item xs={12} sx={{ width: '100%', height: '50vh', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
          <CircularProgress />
          <Typography sx={{ marginTop: '1em'}}>
            Loading...
          </Typography>
        </Grid>
      </Grid> 
      : 
      <>
        {determineOrder(orderData[0])}
        <Grid item xs={12} md={6} sx={{ marginBottom: '1em'}}>
          <Grid container spacing={1}>
            <Grid item xs={12}>
              <Typography variant='h5' sx={{ fontFamily: 'Raleway', fontWeight: 'bold', color: 'darkgreen', paddingBottom: '.5em', borderBottom: '1px solid #dc5a41', marginBottom: '7px' }}>Your Order</Typography>
            </Grid>
            <Grid item xs={12}>
              <Card sx={{ padding: '1em 1em'}}>
                <Grid container>
                  <Grid item xs={12}>
                    <Grid container>
                      <Grid item xs={6}>
                        <Typography variant='h6'>Order Number:</Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <Typography variant='h6' sx={{ color: '#dc5a41', textAlign: 'right', paddingRight: '1em'}}>
                          {orderData[0].OrderNumber}
                        </Typography>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item xs={12} sx={{ marginBottom: '.5em'}}>
                    <Typography>Ordered Items</Typography>
                  </Grid>
                  {orderData[0].orderedItems.map((item, i) => (
                    <Grid item xs={12} key={i}>
                      <Card sx={{ padding: '1em 1em', borderBottom: '1px solid lightgray'}} elevation={0}>
                        <Grid container>
                          <Grid item xs={7}>
                            <Typography sx={{ color: '#dc5a41', fontSize: '1.1125em'}}>{item.name}</Typography>
                          </Grid>
                          <Grid item xs={2}>
                            <Typography sx={{ fontStyle: 'italic' }}>x{item.qty}</Typography>
                          </Grid>
                          <Grid item xs={3}>
                            <Typography sx={{ color: 'darkgreen', marginBottom: '.5em', textAlign: 'right', paddingRight: '1em'}}>$&nbsp;{(item.price.toFixed(2))}</Typography>
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
                  <Grid item xs={12} sx={{ marginBottom: '.5em', marginTop: '1em'}}>
                    <Typography>Added Items</Typography>
                  </Grid>
                  {orderData[0].addOns ?
                  <>
                    {orderData[0].addOns.map((item, i) => (
                      <Grid item xs={12} key={i}>
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
                          </Grid>
                        </Card>
                      </Grid>
                    ))}
                  </>
                  :
                  <>
                    <Grid item xs={12}>
                      <Typography sx={{ paddingLeft: '3em', color: 'gray'}}>No items added.</Typography>
                    </Grid>
                  </>
                  }
                  { orderData[0].comments || orderData[0].isPaidAtRestaurant === true ?
                    <>
                      <Grid item xs={12} sx={{ marginBottom: '.5em', marginTop: '1em'}}>
                        <Typography>Options</Typography>
                      </Grid>
                      <Grid item xs={12}>
                        <Card xs={{ padding: '1em 1em', borderBottom: '1px solid lightgray'}} elevation={0}>
                          <Grid container>
                            { orderData[0].isPaidAtRestaurant === true ?
                              <>
                                <Grid item xs={12}>
                                  <Typography sx={{ paddingLeft: '2em', fontStyle: 'italic', color: 'gray'}}>
                                    -&nbsp;Order is not paid. Pay at pick up the order.
                                  </Typography>
                                </Grid>
                              </> : null
                            }
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
                  {/* subtotal */}
                  <Grid item xs={12} sx={{ paddingTop: '1em', paddingBottom: '1em'}}>
                    <Typography>Total</Typography>
                  </Grid>
                  <Grid item xs={7}>
                    <Typography sx={{ color: 'gray', paddingLeft: '2em'}}>Subtotal</Typography>
                  </Grid>
                  <Grid item xs={5}>
                    <Typography sx={{ textAlign: 'right', paddingRight: '2em', color: 'darkgreen'}}>${(totalCalcualtor('subTotal')).toFixed(2)}</Typography>
                  </Grid>
                  {/* Add on */}
                  { orderData[0].addOns.length > 0 ?
                  <Grid item xs={12}>
                    <Grid container>
                      <Grid item xs={7}>
                        <Typography sx={{ color: 'gray', paddingLeft: '2em'}}>Added Items Total</Typography>
                      </Grid>
                      <Grid item xs={5}>
                        <Typography sx={{ textAlign: 'Right', paddingRight: '2em', color: 'darkgreen'}}>${(totalCalcualtor('add')).toFixed(2)}</Typography>
                      </Grid>
                    </Grid>
                  </Grid> : null}
                  {/* tax */}
                  <Grid item xs={7}>
                    <Typography sx={{ color: 'gray', paddingLeft: '2em'}}>Tax (8.875%)</Typography>
                  </Grid>
                  <Grid item xs={5}>
                    <Typography sx={{ textAlign: 'right', paddingRight: '2em', color: 'darkgreen'}}>${(totalCalcualtor('tax').toFixed(2))}</Typography>
                  </Grid>
                  {/* onlineFee */}
                  <Grid item xs={7}>
                    <Typography sx={{ color: 'gray', paddingLeft: '2em'}}>Online Transaction Fee</Typography>
                  </Grid>
                  <Grid item xs={5}>
                    <Typography sx={{ textAlign: 'right', paddingRight: '2em', color: 'darkgreen'}}>${(totalCalcualtor('online').toFixed(2))}</Typography>
                  </Grid>
                  {/* Grand total */}
                  <Grid item xs={7} sx={{ marginTop: '.25em' }}>
                    <Typography sx={{ paddingLeft: '2em'}}>
                      Amount Due
                    </Typography>
                  </Grid>
                  <Grid item xs={5} sx={{ marginTop: '.25em' }}>
                    <Typography sx={{ textAlign: 'right', paddingRight: '2em', color: '#dc5a41', fontWeight: 'bold'}}>${(totalCalcualtor('grandTotal').toFixed(2))}</Typography>
                  </Grid>
                </Grid>
              </Card>
            </Grid>
          </Grid>
        </Grid>
        {/* Payment */}
        <Grid item xs={12} md={6}>
          <Grid container spacing={1}>
            <Grid item xs={12}>
              <Typography variant='h5' sx={{ fontFamily: 'Raleway', fontWeight: 'bold', color: 'darkgreen', paddingBottom: '.5em', borderBottom: '1px solid #dc5a41', marginBottom: '7px'}}>Payment</Typography>
            </Grid>
            <Grid item xs={12} sx={{ marginBottom: '1em'}}>
              <Grid container spacing={1}>
                <Grid item xs={12}>
                  <Grid container spacing={2}>
                    <Elements stripe={stripePromise}>
                      <Cardform
                        handleNext={props.handleNext}
                        handleComplete={props.handleComplete}
                        total={orderData[0].grandTotal}
                        orderNumber={orderData[0].OrderNumber}
                        orderId={orderData[0]._id}
                      />
                    </Elements>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </>
      }
    </ThemeProvider>
  );
}
export default PaymentSetting;