import { useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

// Mui
import { Grid, Typography, Card, CircularProgress, TextField, Button, ListItemButton, ListItemText, Collapse, List, Modal, Switch, FormGroup, FormControlLabel, Checkbox } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { ThemeProvider } from '@mui/material/styles';
import theme from '../../theme/theme';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import CheckCircleOutlineRoundedIcon from '@mui/icons-material/CheckCircleOutlineRounded';

const OrderFinal = (props) => {
  // states
  const [ orderData, setOrderData ] = useState();
  const [ comments, setComments ] = useState('');
  const [ loading, setLoading ] = useState(false);
  const [ payAtRestaurant, setPayAtRestaurant ] = useState(false);
  const [ isUpdated, setIsUpdated ] = useState(false);
  const [ optionOpen, setOptionOpen ] = useState(false);
  const [ modalOpen, setModalOpen ] = useState(false);
  const [ agreed, setAgreed ] = useState(false);
  const [ agreeModal, setAgreeModal ] = useState(false);

  // handlers
  const commentHandler = (e) => {
    setComments(e.currentTarget.value);
  }

  const payAtHandler = (e) => {
    setPayAtRestaurant(!payAtRestaurant)
  }

  const optionOpenHandler = (e) => {
    setOptionOpen(!optionOpen);
  }

  const modalCloser = () => {
    setModalOpen(false);
  }

  const nextHanlder = async (e) => {
    if (!agreed) {
      agreeModalOpener();
    } else {
      setLoading(true);

      const config = {
        header: {
          "Content-Type": "application/json"
        }
      }

      const request = {
        body: {
          comments: comments,
          isPaidAtRestaurant: payAtRestaurant,
          grandTotal: finalPriceHandler(payAtRestaurant),
          isAgreed: agreed
        }
      }

      try {
        const { data } = await axios.put(`${process.env.REACT_APP_SERVER_URL}/api/order/${props.orderId}`, request.body, config)
        if(data.order) {
          props.handleComplete();
          props.handleNext();
        }
      } catch (error) {
        console.log(error)
      }
    }
  }

  const agreementHandler = (e) => {
    setAgreed(!agreed);
  }

  const agreeModalOpener = () => {
    setAgreeModal(true);
  }

  const agreeModalCloser = (e) => {
    setAgreeModal(false);
  }

  // TODO: calculate Addon
  const finalPriceHandler = (state) => {
    if (!!orderData) {
      if (state === true) {
        let subtotal = props.subTotal;
        let addOnTotal = 0;
        !!orderData[0].addOnTotal ? addOnTotal = orderData[0].addOnTotal : addOnTotal = 0 ;
        let tax = (props.subTotal + addOnTotal) * 0.08875;
        let finalprice = subtotal + tax + addOnTotal
        return finalprice
      } else {
        let subtotal = props.subTotal;
        let addOnTotal = 0
        !!orderData[0].addOnTotal ? addOnTotal = orderData[0].addOnTotal : addOnTotal = 0;
        let tax = (props.subTotal + addOnTotal) * 0.08875;
        let onlineFee = ((subtotal + addOnTotal) *0.03)+0.3;
        let finalPrice = subtotal + tax + onlineFee + addOnTotal
        return finalPrice
      }
    }
  }

  const updateButtonHandler = async (e) => {
    if ( comments !== '' || payAtRestaurant === true ) {
      
      setModalOpen(true);
      setLoading(true);
      
      const config = {
        header: {
          "Content-Type": "application/json"
        }
      }

      const request = {
        body: {
          comments: comments,
          isPaidAtRestaurant: payAtRestaurant,
          grandTotal: finalPriceHandler(payAtRestaurant)
        }
      }

      try {
        const { data } = await axios.put(
          `${process.env.REACT_APP_SERVER_URL}/api/order/${props.orderId}`, request.body, config
        )
        if(data.order) {
          setLoading(false);
          setIsUpdated(!isUpdated);
        }
      } catch (error) {
        console.log(error)
      }
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
  },[agreed])

  return (
    <ThemeProvider theme={theme}>
      { !orderData ? <CircularProgress /> :<>
        <Grid item xs={12} md={6} sx={{ marginBottom: '1em'}}>
        <Grid container spacing={1}>
          <Grid item xs={12}>
            <Typography variant='h5' sx={{ fontFamily: 'Raleway', fontWeight: 'bold', color: 'darkgreen', paddingBottom: '.5em', borderBottom: '1px solid #dc5a41', marginBottom: '7px'}}>Your Order</Typography>
          </Grid>
          <Grid item xs={12}>
            <Card sx={{ padding: '1em 1em '}}>
              <Grid container>
                <Grid item xs={12}>
                  <Grid container>
                    <Grid item xs={6}>
                      <Typography variant='h6'>Order Number:</Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography variant='h6' sx={{color: '#dc5a41', textAlign: 'right', paddingRight: '1em'}}>{orderData[0].OrderNumber}</Typography>
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
              </Grid>
            </Card>
          </Grid>
        </Grid>
        </Grid>
        {/* optioins */}
        <Grid item xs={12} md={6} sx={{ marginBottom: '1em'}}>
          <Grid container spacing={1}>
            <Grid item xs={12}>
              <Typography variant='h5' sx={{ fontFamily: 'Raleway', fontWeight: 'bold', color: 'darkgreen', paddingBottom: '.5em', borderBottom: '1px solid #dc5a41', marginBottom: '7px'}}>Options</Typography>
            </Grid>
            <Grid item xs={12}>
              <List>
                <Card sx={{ padding: '.25em 1em'}}>
                  <ListItemButton onClick={optionOpenHandler} sx={{ color: 'darkgreen' }}>
                    <ListItemText primary='Options' />
                    { optionOpen ? <ExpandLess /> : <ExpandMore /> }
                  </ListItemButton>
                  <Collapse in={optionOpen} timeout='auto' unmountOnExit>
                    <Grid container sx={{ padding: '0 1.5em'}}>
                      <Grid item xs={12}>
                        <Typography sx={{ marginBottom: '.5em', color: 'gray', fontWeight: 'bold'}}>Comment</Typography>
                        <TextField 
                          multiline
                          rows={4}
                          label='Comments on your order'
                          value={comments}
                          onChange={commentHandler}
                          placeholder='Comments on your order'
                          sx={{ width: '100%'}}
                        />
                      </Grid>
                      <Grid item xs={12} sx={{ marginTop: '1em'}}>
                        <Typography sx={{ marginBottom: '.5em', color: 'gray', fontWeight: 'bold'}}>Pay at Pick up?</Typography>
                      </Grid>
                      { payAtRestaurant ? <>
                        <Grid item xs={4}>
                          <Typography sx={{ lineHeight: '2.25em', textAlign: 'right', color: 'gray'}}>Online</Typography>
                        </Grid>
                        <Grid item xs={4} sx={{ display: 'center', justifyContent: 'center'}}>
                          <Switch onChange={payAtHandler}/>
                        </Grid>
                        <Grid item xs={4}>
                          <Typography sx={{ lineHeight: '2.25em', color: 'darkgreen' }}>Pick up</Typography>
                        </Grid>
                      </> : <>
                        <Grid item xs={4}>
                          <Typography sx={{ lineHeight: '2.25em', textAlign: 'right', color: 'darkgreen'}}>Online</Typography>
                        </Grid>
                        <Grid item xs={4} sx={{ display: 'center', justifyContent: 'center'}}>
                          <Switch onChange={payAtHandler}/>
                        </Grid>
                        <Grid item xs={4}>
                          <Typography sx={{ lineHeight: '2.25em', color: 'gray' }}>Pick up</Typography>
                        </Grid>
                      </>}
                    </Grid>
                    <Grid item xs={12} sx={{ marginTop: '1em', padding: '0 2em', marginBottom: '1em'}}>
                      <Typography variant='body1' sx={{ textAlign: 'center'}}>Please update options before placing.</Typography>
                      <Button variant='outlined' onClick={updateButtonHandler} sx={{ marginTop: '1em', width: '100%'}}>update order</Button>
                    </Grid>
                  </Collapse>
                </Card>
              </List>
            </Grid>
          </Grid>

          {/* modal */}
          <Modal open={modalOpen}>
            <Card sx={{ width: 400, position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', padding: '2em 2em'}}>
              <Grid container>
                <Grid item xs={12} sx={{ borderBottom: '2px solid #dc5a41' }}>
                  <Typography variant='h5' sx={{ color: 'darkgreen', paddingLeft: '.5em', paddingBottom: '.25em'}}>Notice</Typography>
                </Grid>
                { loading ? <>
                  <Grid item xs={12} sx={{ paddingTop: '1em', textAlign: 'center'}}>
                    <CircularProgress />
                  </Grid>
                  <Grid item xs={12}>
                    <Typography>Loading...</Typography>
                  </Grid>
                  <Button onClick={modalCloser}>temp close</Button>
                </> : <>
                  <Grid item xs={12} sx={{ paddingTop: '1em', textAlign: 'center'}}>
                    <CheckCircleOutlineRoundedIcon sx={{ fontSize: '4em', color: 'darkgreen'}} />
                  </Grid>
                  <Grid item xs={12} sx={{ paddingTop: '1em', textAlign: 'center'}}>
                    <Typography>Order has been updated successfully.</Typography>
                  </Grid>
                  <Grid item xs={12} sx={{ display: 'center', justifyContent: 'center', marginTop: '1.5em'}}>
                    <Button onClick={modalCloser} variant='contained'>Close</Button>
                  </Grid>
                </>}
              </Grid>
            </Card>
          </Modal>
          {/* agree Modal */}
          <Modal open={agreeModal}>
            <Card sx={{ width: 400, position: 'fixed', top: '50%', left: '50%', transform : 'translate(-50%, -50%)', padding: '2em 2em'}}>
              <Grid container>
                <Grid item xs={12} sx={{ borderBottom: '2px solid #dc5a41'}}>
                  <Typography variant='h5' sx={{ color: 'darkgreen', paddingLeft: '.5em', paddingBottom: '.25em'}}>Notice</Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography variant='body1' sx={{ padding: '2em 2em'}}>
                    You need to agree to the terms and conditions to continue
                  </Typography>
                </Grid>
                <Grid item xs={12} sx={{ display: 'center', justifyContent: 'center'}}>
                  <Button onClick={agreeModalCloser} variant='contained'>Close</Button>
                </Grid>
              </Grid>
            </Card>
          </Modal>
        </Grid>
        {/* Total */}
        <Grid item xs={12} md={6}>
          <Grid container spacing={1} sx={{ marginTop: '2em'}}>
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
                {orderData[0].addOnTotal ?
                  <>
                    <Grid item xs={7}>
                      <Typography sx={{ paddingLeft: '2em'}}>Add-ons</Typography>
                    </Grid>
                    <Grid item xs={5}>
                      <Typography sx={{ textAlign: 'right', paddingRight: '2em'}}>${(orderData[0].addOnTotal).toFixed(2)}</Typography>
                    </Grid>
                    <Grid item xs={7}>
                      <Typography sx={{ paddingLeft: '2em'}}>Tax (8.875%)</Typography>
                    </Grid>
                    <Grid item xs={5}>
                      <Typography sx={{ textAlign: 'right', paddingRight: '2em'}}>${
                        ((props.subTotal + orderData[0].addOnTotal)*0.08875).toFixed(2)
                      }</Typography>
                    </Grid>
                    {!payAtRestaurant ?
                    <>
                      <Grid item xs={7}>
                        <Typography sx={{ paddingLeft: '2em'}}>Online processing fee</Typography>
                      </Grid>
                      <Grid item xs={5}>
                        <Typography sx={{ textAlign: 'right', paddingRight: '2em'}}>${
                          (((props.subTotal+orderData[0].addOnTotal)*0.03)+0.3).toFixed(2)
                        }</Typography>
                      </Grid>
                    </>
                    : null}
                  <Grid container spacing={1} sx={{ paddingTop: '.5em'}}>
                    <Grid item xs={7}>
                      <Typography sx={{ paddingLeft: '2em', fontStyle: 'italic', fontSize: '1.125em'}}>Total</Typography>
                    </Grid>
                    <Grid item xs={5}>
                      <Typography sx={{ textAlign: 'right', paddingRight: '2em', color: '#dc5a41', fontSize: '1.125em'}}>${finalPriceHandler(payAtRestaurant).toFixed(2)}</Typography>
                    </Grid>
                  </Grid>
                  </> 
                :
                <>
                  <Grid item xs={7}>
                    <Typography sx={{ paddingLeft: '2em'}}>Tax (8.875%)</Typography>
                  </Grid>
                  <Grid item xs={5}>
                    <Typography sx={{ textAlign: 'right', paddingRight: '2em'}}>${
                      (props.subTotal*0.08875).toFixed(2)
                    }</Typography>
                  </Grid>
                  {!payAtRestaurant ?
                    <>
                      <Grid item xs={7}>
                        <Typography sx={{ paddingLeft: '2em'}}>Online processing fee</Typography>
                      </Grid>
                      <Grid item xs={5}>
                        <Typography sx={{ textAlign: 'right', paddingRight: '2em'}}>${
                          ((props.subTotal*0.03)+.3).toFixed(2)
                        }</Typography>
                      </Grid>
                    </>
                    : null}
                  <Grid container spacing={1} sx={{ paddingTop: '.5em'}}>
                    <Grid item xs={7}>
                      <Typography sx={{ paddingLeft: '2em', fontStyle: 'italic', fontSize: '1.125em'}}>Total</Typography>
                    </Grid>
                    <Grid item xs={5}>
                      <Typography sx={{ textAlign: 'right', paddingRight: '2em', color: '#dc5a41', fontSize: '1.125em'}}>${(finalPriceHandler(payAtRestaurant)).toFixed(2)}</Typography>
                    </Grid>
                  </Grid>
                </>
                }
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        {/* Terms of conditions */}
        <Grid item xs={12} md={6} >
          <Grid container spacing={1} sx={{ marginTop: '2em'}}>
            <Grid item xs={12}>
              <Typography variant='h5' sx={{ fontFamily: 'Raleway', fontWeight: 'bold', color: 'darkgreen', paddingBottom: '.5em', borderBottom: '1px solid #dc5a41', marginBottom: '7px'}}>Agreement</Typography>
            </Grid>
            <Grid container spacing={1} sx={{ padding : '1em 1em', height: '9.75em', paddingLeft: '2em'}}>
              <Grid item xs={12}>
                <FormGroup sx={{ width: '100%' }}>
                  <FormControlLabel control={<Checkbox onChange={agreementHandler} />} label={`I agree with the terms and conditions`} />
                </FormGroup>
              </Grid>
              <Grid item xs={12} sx={{ marginTop: '3em'}}>
                <Link target='_blank' to='../policy-agreement'><Typography variant='body2' sx={{ fontSize: '.75em', color: 'gray', textAlign: 'center'}}>Terms and Conditions</Typography></Link>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        {/* button */}
        <Grid item xs={12} sx={{ marginTop: '1em'}}>
          <Grid container spacing={4} >
            <Grid item xs={6}>
              <Button variant='outlined' onClick={props.handleBack} sx={{ width: '100%'}}>Back</Button>
            </Grid>
            <Grid item xs={6}>
              <LoadingButton loading={loading} variant='contained' onClick={nextHanlder} sx={{ width: '100%'}}>Next</LoadingButton>
            </Grid>
          </Grid>
        </Grid>
      </>
      }
    </ThemeProvider>
  );
}
export default OrderFinal;