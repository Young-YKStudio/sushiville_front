import { useState, useEffect } from 'react';
import axios from 'axios';

// MUI
import { Grid, Card, Typography, Button, Modal } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import theme from '../../theme/theme';

const OrderDetails = (props) => {
  // states
  const [ error, setError ] = useState('')
  const [ agreed, setAgreed ] = useState(false);
  const [ agreeModal, setAgreeModal ] = useState(false);

  // handlers
  const orderRegHandler = async () => {
    const config = {
      header: {
        "Content-Type": "application/json",
      }
    }

    const request ={
      body: {
        "orderedItems": props.finalCart.Orders,
        "customer": `${sessionStorage.userId}`,
        "grandTotal": props.grandTotal
      }
    }

    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_SERVER_URL}/api/order/create`, request.body, config
      )
      if (data.order) {
        await props.setOrderId(data.order._id)
      }
    } catch (error) {
      setError('Error from posting order');
    }
    props.handleComplete()
    props.handleNext()
  }
  
  const agreementHandler = (e) => {
    setAgreed(!agreed);
  }
  
  const agreeModalCloser = (e) => {
    setAgreeModal(false);
  }
  
  useEffect(() => {
    console.log(agreed, 'from useState', props.orderId);
  },[agreed])

  return (
    <ThemeProvider theme={theme}>
      {props.grandTotal*1 === props.grandTotal ?
      <>
        <Grid item xs={12} md={6} sx={{ marginBottom: '1em' }}>
          <Grid container spacing={1}>
            <Grid item xs={12}>
              <Typography variant='h5' sx={{ fontFamily: 'Raleway', fontWeight: 'bold', color: 'darkgreen', paddingBottom: '.5em', borderBottom: '1px solid #dc5a41', marginBottom: '7px'}}>Order Details</Typography>
            </Grid>
            { props.finalCart && props.subTotal ? 
            <>
              {props.finalCart.Orders.map((item, i) => (
                <Grid item xs={12} key={i}>
                  <Card sx={{ padding: '1em 1em' }}>
                    <Grid container >
                      <Grid item xs={7}>
                        <Typography sx={{ color: '#dc5a41', fontSize: '1.1125em' }}>{item.name}</Typography>
                      </Grid>
                      <Grid item xs={2}>
                        <Typography sx={{ fontStyle: 'italic'}}>x{item.qty}</Typography>
                      </Grid>
                      <Grid item xs={3}>
                        <Typography sx={{ color: 'darkgreen', marginBottom: '.5em' }}>${(item.price.toFixed(2))}</Typography>
                      </Grid>
                      {item.options ? <>
                        { item.options.map((option, i) => (
                          <Grid container direction='row' justifyContent='center' alignItems='center' key={i}>
                            <Grid item xs={7}>
                              {option.selected ? <Typography sx={{ color: 'gray', paddingLeft: '1em', fontStyle: 'italic' }}>-&nbsp;{option.name}</Typography> : null }
                            </Grid>
                            <Grid item xs={2}>
                              {option.selected ? <Typography sx={{ color: 'gray', fontStyle: 'italic' }}>x{item.qty}</Typography> : null }
                            </Grid>
                            <Grid item xs={3}>
                              {option.selected ? <>
                                {option.name === 'Brown Rice' || option.name === 'Soy Paper' || option.name === 'Crunch' || option.name === 'Spicy Mayo' || option.name === 'Eel Sauce' ?
                                  <Typography sx={{ color: 'gray' }}>${(option.price.toFixed(2))}</Typography>
                                  : null
                                }
                              </> : null }
                            </Grid>
                          </Grid>
                        ))}
                      </> : null}
                      {item.caliOrSpTuna ? 
                      <Grid container direction='row' justifyContent='center' alignItems='center'>
                        <Grid item xs={7}>
                          <Typography sx={{ color: 'gray', paddingLeft: '1em', fontStyle: 'italic' }}>-&nbsp;Choice:</Typography>
                        </Grid>
                        <Grid item xs={5}>
                          <Typography sx={{ color: 'gray' }}>{item.caliOrSpTuna}</Typography>
                        </Grid>
                      </Grid> : null}
                      {item.salGoneOrRain ? 
                      <Grid container direction='row' justifyContent='center' alignItems='center'>
                        <Grid item xs={7}>
                          <Typography sx={{ color: 'gray', paddingLeft: '1em', fontStyle: 'italic' }}>-&nbsp;Choice:</Typography>
                        </Grid>
                        <Grid item xs={5}>
                          <Typography sx={{ color: 'gray' }}>{item.salGoneOrRain}</Typography>
                        </Grid>
                      </Grid> : null}
                      {item.name === 'Pick 3 Rolls Lunch' ? 
                      <>
                        {item.rollChoices.map((choice, i) => (
                          <Grid container direction='row' justifyContent='center' alignItems='center' key={i}>
                            <Grid item xs={6}>
                              <Typography sx={{ paddingLeft: '1em', color: 'gray', fontStyle: 'italic'}}>-&nbsp;Roll 1 :</Typography>
                            </Grid>
                            <Grid item xs={6}>
                              <Typography sx={{ color: 'gray' }}>{choice.roll1}</Typography>
                            </Grid>
                            <Grid item xs={6}>
                              <Typography sx={{ paddingLeft: '1em', color: 'gray', fontStyle: 'italic'}}>-&nbsp;Roll 2 :</Typography>
                            </Grid>
                            <Grid item xs={6}>
                              <Typography sx={{ color: 'gray' }}>{choice.roll2}</Typography>
                            </Grid>
                            <Grid item xs={6}>
                              <Typography sx={{ paddingLeft: '1em', color: 'gray', fontStyle: 'italic'}}>-&nbsp;Roll 3 :</Typography>
                            </Grid>
                            <Grid item xs={6}>
                              <Typography sx={{ color: 'gray' }}>{choice.roll3}</Typography>
                            </Grid>
                          </Grid>
                        ))}
                      </> : null }
                      {item.name === 'Pick 2 Rolls Lunch' ? 
                      <>
                        {item.rollChoices.map((choice, i) => (
                          <Grid container direction='row' justifyContent='center' alignItems='center' key={i}>
                            <Grid item xs={6}>
                              <Typography sx={{ paddingLeft: '1em', color: 'gray', fontStyle: 'italic'}}>-&nbsp;Roll 1 :</Typography>
                            </Grid>
                            <Grid item xs={6}>
                              <Typography sx={{ color: 'gray' }}>{choice.roll1}</Typography>
                            </Grid>
                            <Grid item xs={6}>
                              <Typography sx={{ paddingLeft: '1em', color: 'gray', fontStyle: 'italic'}}>-&nbsp;Roll 2 :</Typography>
                            </Grid>
                            <Grid item xs={6}>
                              <Typography sx={{ color: 'gray' }}>{choice.roll2}</Typography>
                            </Grid>
                          </Grid>
                        ))}
                      </> : null }
                      {item.spicyOrSweet ? 
                      <Grid container direction='row' justifyContent='center' alignItems='center'>
                        <Grid item xs={7}>
                          <Typography sx={{ color: 'gray', paddingLeft: '1em', fontStyle: 'italic' }}>-&nbsp;Choice:</Typography>
                        </Grid>
                        <Grid item xs={5}>
                          <Typography sx={{ color: 'gray' }}>{item.spicyOrSweet}</Typography>
                        </Grid>
                      </Grid> : null}
                      {item.porkOrVeg ? 
                      <Grid container direction='row' justifyContent='center' alignItems='center'>
                        <Grid item xs={7}>
                          <Typography sx={{ color: 'gray', paddingLeft: '1em', fontStyle: 'italic' }}>-&nbsp;Choice:</Typography>
                        </Grid>
                        <Grid item xs={5}>
                          <Typography sx={{ color: 'gray' }}>{item.porkOrVeg}</Typography>
                        </Grid>
                      </Grid> : null}
                      {item.comments ? 
                      <Grid container direction='row' justifyContent='center' alignItems='center'>
                        <Grid item xs={7}>
                          <Typography sx={{ color: 'gray', paddingLeft: '1em', fontStyle: 'italic' }}>-&nbsp;Instructions:</Typography>
                        </Grid>
                        <Grid item xs={5}>
                          <Typography sx={{ color: 'gray' }}>{item.comments}</Typography>
                        </Grid>
                      </Grid> : null}
                    </Grid>
                  </Card>
                </Grid>
              ))}
            </> : null}
          </Grid>
        </Grid>
        <Grid item xs={12} md={6} sx={{ marginBottom: '1em'}}>
          <Grid container spacing={1}>
            <Grid item xs={12}>
              <Typography variant='h5' sx={{ fontFamily: 'Raleway', fontWeight: 'bold', color: 'darkgreen', paddingBottom: '.5em', borderBottom: '1px solid #dc5a41', marginBottom: '7px'}}>Total</Typography>
            </Grid>
            <Grid item xs={12}>
              <Grid container sx={{ borderBottom: '1px solid gray', paddingBottom: '1em'}} spacing={1}>
                <Grid item xs={7}>
                  <Typography sx={{ paddingLeft: '2em'}}>Subtotal</Typography>
                </Grid>
                <Grid item xs={5}>
                  <Typography sx={{ textAlign: 'right', paddingRight: '2em'}}>${(props.subTotal).toFixed(2)}</Typography>
                </Grid>
                <Grid item xs={7}>
                  <Typography sx={{ paddingLeft: '2em'}}>Tax (8.875%)</Typography>
                </Grid>
                <Grid item xs={5}>
                  <Typography sx={{ textAlign: 'right', paddingRight: '2em'}}>${(props.tax).toFixed(2)}</Typography>
                </Grid>
                <Grid item xs={7}>
                  <Typography sx={{ paddingLeft: '2em'}}>Online processing fee</Typography>
                </Grid>
                <Grid item xs={5}>
                  <Typography sx={{ textAlign: 'right', paddingRight: '2em'}}>${(props.creditCardFee).toFixed(2)}</Typography>
                </Grid>
              </Grid>
              <Grid container spacing={1} sx={{ paddingTop: '.5em'}}>
                <Grid item xs={7}>
                  <Typography sx={{ paddingLeft: '2em', fontStyle: 'italic', fontSize: '1.125em'}}>Total</Typography>
                </Grid>
                <Grid item xs={5}>
                  <Typography sx={{ textAlign: 'right', paddingRight: '2em', color: '#dc5a41', fontSize: '1.125em'}}>${(props.grandTotal).toFixed(2)}</Typography>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        {/* <Grid item xs={12}>
          <FormGroup sx={{ width: '100%', display: 'center', justifyContent: 'center'}}>
            <FormControlLabel control={<Checkbox onChange={agreementHandler} />} label='I agree with the terms and conditions'/>
          </FormGroup>
        </Grid> */}
        <Grid container spacing={3} sx={{ justifyContent: 'center', marginTop: '.5em'}}>
          <Grid item xs={6} sm={4}>
            <Button variant='contained' sx={{width: '100%'}} onClick={orderRegHandler}>Next</Button>
          </Grid>
          <Grid item xs={6} sm={4}>
            <Button variant='outlined' sx={{ width: '100%' }} onClick={props.closeConfirmation}>Back to Shopping</Button>
          </Grid>
        </Grid>
        <Modal open={agreeModal}>
          <Card sx={{ width: 400, position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', padding: '2em 2em'}}>
            <Grid container>
              <Grid item xs={12} sx={{ borderBottom: '2px solid #dc5a41'}}>
                <Typography variant='h5' sx={{ color: 'darkgreen', paddingLeft: '.5em', paddingBottom: '.25em'}}>Notice</Typography>
              </Grid>
              <Grid item xs={12} sx={{ paddingTop: '1em', paddingLeft: '1em'}}>
                <Typography>Please check terms of condition agreement.</Typography>
              </Grid>
              <Grid item xs={12} sx={{ paddingTop: '2.5em', display: 'center', justifyContent: 'center'}}>
                <Button variant='contained' onClick={agreeModalCloser}>Close</Button>
              </Grid>
            </Grid>
          </Card>
        </Modal>
      </>
      :
      null
      }
    </ThemeProvider>
  );
}
export default OrderDetails;