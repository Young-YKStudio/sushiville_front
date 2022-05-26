import { useState, useEffect } from 'react';
import moment from 'moment';

// Mui
import { ThemeProvider } from '@mui/material/styles';
import theme from '../../theme/theme';
import { Typography, Grid, Button, Modal, Card, CircularProgress } from '@mui/material';

// placed -> Paid -> confirmed -> Ready -> Finished
// orderNumber, date, totalamount, status, customer, orderedItems, Addons

// TODO: return with chips
const statusFilter = (isConfirmed, isFinished, isPlaced, isReady ) => {
  if (isFinished) {
    return 'Fulfilled'
  } else if(isReady && !isFinished) {
    return 'Ready to Pick up'
  } else if(isConfirmed && !isFinished && !isReady) {
    return 'Preparing order'
  } else if (isPlaced && !isConfirmed && !isFinished && !isReady) {
    return 'Confirm waiting'
  } else {
    return 'Pending...'
  }
}

const paymentFilter = (isPaidAtRestaurant) => {
  if(isPaidAtRestaurant) {
    return 'Pay on Pickup'
  } else {
    return 'Online Payment'
  }
}

const OrderManagement = (props) => {

  // states
  const [ loading, setLoading ] = useState(true);
  const [ allOrders, setAllOrders ] = useState([]);
  const [ oneOrder, setOneOrder ] = useState([]);
  const [ detailOpen, setDetailOpen ] = useState(false);

  // handlers
  const detailHandler = (e) => {
    const findOneOrder = async (id) => {
      const foundOrder = allOrders.find(order => order._id === id)
      await setOneOrder(foundOrder);
    }
    findOneOrder(e.currentTarget.value);
    setDetailOpen(true);
  }

  const closeModal = (e) => {
    setDetailOpen(false);
  }

  useEffect(() => {
    setLoading(true);
    async function getOrders() {
      await setAllOrders(props.allOrders);
    }

    const setReceivedOrder = async () => {
      if (allOrders.length > 0 ) {
        await setLoading(false)
      } 
    }
    getOrders();
    setReceivedOrder();
    if (allOrders) {
      setLoading(false)
    }
  },[allOrders, oneOrder])

  return (
    <ThemeProvider theme={theme}>
      { !loading ?
        <>
          <Grid container>
            <Grid item xs={12}>
              <Typography variant='h5' sx={{ fontFamily: 'Raleway', fontWeight: 'bold', color: 'darkgreen', paddingBottom: '.5em', borderBottom: '1px solid #dc5a41'}}>Order History</Typography>
            </Grid>
            <Grid item xs={12}>
              <Card elevation={2} sx={{ marginTop: '1em' }}>
                <Grid container sx={{ padding: '3px 3px', minWidth: '900px', bgcolor:'darkgreen', textAlign: 'center', color: 'white'}}>
                  <Grid item xs={1} sx={{ padding: '3px 3px', borderRight: '1px solid gray'}}>
                    <Typography>Number</Typography>
                  </Grid>
                  <Grid item xs={2} sx={{ padding: '3px 3px', borderRight: '1px solid gray'}}>
                    <Typography>Status</Typography>
                  </Grid>
                  <Grid item xs={2} sx={{ padding: '3px 3px', borderRight: '1px solid gray'}}>
                    <Typography>Customer</Typography>
                  </Grid>
                  <Grid item xs={1} sx={{ padding: '3px 3px', borderRight: '1px solid gray'}}>
                    <Typography>Total</Typography>
                  </Grid>
                  <Grid item xs={2} sx={{ padding: '3px 3px', borderRight: '1px solid gray'}}>
                    <Typography>Payment</Typography>
                  </Grid>
                  <Grid item xs={2} sx={{ padding: '3px 3px', borderRight: '1px solid gray'}}>
                    <Typography>Date</Typography>
                  </Grid>
                  <Grid item xs={2} sx={{ padding: '3px 3px'}}>
                    <Typography>More Info</Typography>
                  </Grid>
                </Grid>
                <Grid item xs={12} sx={{ maxHeight: '80vh', overflow: 'auto' }}>
                  {allOrders.map((order, i) => (
                    <Grid container key={i} sx={{ width: '100%', minWidth: '900px', textAlign: 'center', borderBottom: '1px solid lightgray'}}>
                      <Grid item xs={1} sx={{ padding: '3px 3px', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                        <Typography sx={{ lineHeight: '1.9em', fontSize: '.85em'}}>{order.OrderNumber}</Typography>
                      </Grid>
                      <Grid item xs={2} sx={{ padding: '3px 3px', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                        <Typography sx={{ lineHeight: '1.9em', fontSize: '.85em'}}>{statusFilter(order.isConfirmed, order.isFinished, order.isPlaced, order.isReady)}</Typography>
                      </Grid>
                      <Grid item xs={2} sx={{ padding: '3px 3px', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                        <Typography sx={{ lineHeight: '1.9em', fontSize: '.85em'}}>{order.customer.username}</Typography>
                      </Grid>
                      <Grid item xs={1} sx={{ padding: '3px 3px', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                        {order.grandTotal ? <Typography sx={{ lineHeight: '1.9em', fontSize: '.85em'}}>$ {(order.grandTotal).toFixed(2)}</Typography> : <Typography sx={{ lineHeight: '1.9em'}}>N/A</Typography>}
                      </Grid>
                      <Grid item xs={2} sx={{ padding: '3px 3px', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                        <Typography sx={{ lineHeight: '1.9em', fontSize: '.85em'}}>{paymentFilter(order.isPaidAtRestaurant)}</Typography>
                      </Grid>
                      <Grid item xs={2} sx={{ padding: '3px 3px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <Typography sx={{ lineHeight: '1.9em', fontSize: '.85em'}}>{moment(order.updatedAt).format('h[:]mm[ ]a[, ]MM[/]DD[/]YY')}</Typography>
                      </Grid>
                      <Grid item xs={2} sx={{ padding: '3px 3px' }}>
                        <Button size='small' value={order._id} onClick={detailHandler}>Details</Button>
                      </Grid>
                    </Grid>
                  ))}
                </Grid>
              </Card>
            </Grid>
            <Modal open={detailOpen}>
              <Card sx={{ width: 400, maxHeight: '80vh', position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', padding: '2em 2em', overflow: 'auto'}}>
                { oneOrder.OrderNumber ? 
                  <>
                    <Grid container>
                      <Grid item xs={12} sx={{ borderBottom: '2px solid #dc5a41' }}>
                        <Grid container>
                          <Grid item xs={8}>
                            <Typography variant='h6' sx={{ color: 'darkgreen'}}>Order Details - #{oneOrder.OrderNumber}</Typography>
                          </Grid>
                          <Grid item xs={4}>
                            <Typography sx={{ paddingTop: '.2em', color: 'gray'}}>{statusFilter(oneOrder.isConfirmed, oneOrder.isFinished, oneOrder.isPlaced, oneOrder.isReady)}</Typography>
                          </Grid>
                        </Grid>
                      </Grid>
                      <Grid item xs={12}>
                        <Grid container sx={{ padding: '1em 1em'}}>
                          <Grid item xs={12} sx={{ borderBottom: '1px solid lightgray', marginBottom: '.5em'}}>
                            <Typography variant='body1' sx={{ color: '#dc5a41' }} >{oneOrder.customer.username}</Typography>
                          </Grid>
                          <Grid item xs={4} sx={{ paddingLeft: '1em', marginBottom: '.5em'}}>
                            <Typography variant='body1' sx={{ color: 'gray'}}>
                              Contact
                            </Typography>
                          </Grid>
                          <Grid item xs={8} sx={{ paddingLeft: '1em', marginBottom: '.5em'}}>
                            <Typography variant='body1' sx={{ color: 'gray'}}>
                              {oneOrder.customer.contact}
                            </Typography>
                          </Grid>
                          <Grid item xs={4} sx={{ paddingLeft: '1em', marginBottom: '.5em'}}>
                            <Typography variant='body1' sx={{ color: 'gray'}}>
                              email
                            </Typography>
                          </Grid>
                          <Grid item xs={8} sx={{ paddingLeft: '1em', marginBottom: '.5em'}}>
                            <Typography variant='body1' sx={{ color: 'gray'}}>
                              {oneOrder.customer.email}
                            </Typography>
                          </Grid>
                          <Grid item xs={4} sx={{ paddingLeft: '1em', marginBottom: '.5em'}}>
                            <Typography variant='body1' sx={{ color: 'gray'}}>
                              Order Placed
                            </Typography>
                          </Grid>
                          <Grid item xs={8} sx={{ paddingLeft: '1em', marginBottom: '.5em'}}>
                            <Typography variant='body1' sx={{ color: 'gray'}}>
                              {oneOrder.customer.createdAt}
                            </Typography>
                          </Grid>
                          <Grid item xs={4} sx={{ paddingLeft: '1em', marginBottom: '.5em'}}>
                            <Typography variant='body1' sx={{ color: 'gray'}}>
                              Payment
                            </Typography>
                          </Grid>
                          <Grid item xs={8} sx={{ paddingLeft: '1em', marginBottom: '1em'}}>
                            <Typography variant='body1' sx={{ color: '#dc5a41', fontWeight: 'bold'}}>
                              {paymentFilter(oneOrder.isPaidAtRestaurant)}
                            </Typography>
                          </Grid>
                          <Grid item xs={12} sx={{ marginBottom: '.5em'}}>
                            <Typography variant='body1' sx={{ color: 'darkgreen', marginTop: '.25em', fontWeight: 'bold'}}>
                              Ordered Items
                            </Typography>
                          </Grid>
                          <Grid item xs={12}>
                            {oneOrder.orderedItems.map((item, i) => (
                              <Grid container key={i} sx={{ borderBottom: '.5px solid lightgray', marginBottom: '.5em', paddingLeft: '1em', paddingBottom: '.5em'}}>
                                <Grid item xs={7}>
                                  <Typography sx={{ color: '#dc5a41'}}>{item.name}</Typography>
                                </Grid>
                                <Grid item xs={2}>
                                  <Typography sx={{ fontStyle: 'italic', color: 'gray'}}>x &nbsp;{item.qty}</Typography>
                                </Grid>
                                <Grid item xs={3}>
                                  <Typography sx={{ fontStyle: 'italic', color: 'gray'}}>$ &nbsp;{item.price.toFixed(2)}</Typography>
                                </Grid>
                                { item.options.length > 0 ? 
                                <>
                                  {item.options.map((option, i) => (
                                    <Grid container key={i}>
                                      {option.selected ? 
                                      <>
                                        <Grid item xs={7} sx={{ paddingLeft: '2em'}}>
                                          <Typography sx={{ fontStyle: 'italic', color: 'gray'}}>{option.name}</Typography>
                                        </Grid>
                                        <Grid item xs={2}>
                                          <Typography sx={{ fontStyle: 'italic', color: 'gray'}}>x &nbsp;{item.qty}</Typography>
                                        </Grid>
                                        <Grid item xs={3}>
                                          <Typography sx={{ fontStyle: 'italic', color: 'gray'}}>$&nbsp;{(option.price.toFixed(2))}</Typography>
                                        </Grid>
                                      </> 
                                      : null}
                                    </Grid>
                                  ))}
                                </> : null}
                                {item.caliOrSpTuna ? 
                                  <Grid container>
                                    <Grid item xs={6} sx={{ paddingLeft: '2em'}}>
                                      <Typography sx={{ fontStyle: 'italic', color: 'gray' }}>-&nbsp;Choice:</Typography>
                                    </Grid>
                                    <Grid item xs={6}>
                                      <Typography sx={{ color: 'gray' }}>{item.caliOrSpTuna}</Typography>
                                    </Grid>
                                  </Grid> : null}
                                {item.salGoneOrRain ?
                                <Grid container>
                                  <Grid item xs={6} sx={{ paddingLeft: '2em'}}>
                                    <Typography sx={{ fontStyle: 'italic', color: 'gray' }}>-&nbsp;Choice:</Typography>
                                  </Grid>
                                  <Grid item xs={6}>
                                    <Typography sx={{ color: 'gray' }}>{item.salGoneOrRain}</Typography>
                                  </Grid>
                                </Grid> 
                                : null
                                }
                                {item.spicyOrWeet ?
                                <Grid container>
                                  <Grid item xs={6} sx={{ paddingLeft: '2em'}}>
                                    <Typography sx={{ fontStyle: 'italic', color: 'gray' }}>-&nbsp;Choice:</Typography>
                                  </Grid>
                                  <Grid item xs={6}>
                                    <Typography sx={{ color: 'gray' }}>{item.spicyOrWeet}</Typography>
                                  </Grid>
                                </Grid> 
                                : null
                                }
                                {item.porkOrVeg ?
                                <Grid container>
                                  <Grid item xs={6} sx={{ paddingLeft: '2em'}}>
                                    <Typography sx={{ fontStyle: 'italic', color: 'gray' }}>-&nbsp;Choice:</Typography>
                                  </Grid>
                                  <Grid item xs={6}>
                                    <Typography sx={{ color: 'gray' }}>{item.porkOrVeg}</Typography>
                                  </Grid>
                                </Grid> 
                                : null
                                }
                                {item.rollChoices.length > 0 ?
                                  <Grid container >
                                    <Grid item xs={6}>
                                      <Typography sx={{ color: 'gray', paddingLeft: '2em', fontStyle: 'italic'}}>-&nbsp;Roll1:</Typography>
                                    </Grid>
                                    <Grid item xs={6}>
                                      <Typography sx={{ color: 'gray' }}>{item.rollChoices[0].roll1}</Typography>
                                    </Grid>
                                    <Grid item xs={6}>
                                      <Typography sx={{ color: 'gray', paddingLeft: '2em', fontStyle: 'italic'}}>-&nbsp;Roll2:</Typography>
                                    </Grid>
                                    <Grid item xs={6}>
                                      <Typography sx={{ color: 'gray' }}>{item.rollChoices[0].roll2}</Typography>
                                    </Grid>
                                    { item.rollChoices[0].roll3 ? <>
                                      <Grid item xs={6}>
                                        <Typography sx={{ color: 'gray', paddingLeft: '2em', fontStyle: 'italic'}}>-&nbsp;Roll2:</Typography>
                                      </Grid>
                                      <Grid item xs={6}>
                                        <Typography sx={{ color: 'gray' }}>{item.rollChoices[0].roll2}</Typography>
                                      </Grid>
                                    </> : null }
                                  </Grid>
                                :
                                  null
                                }
                                {item.comments !== "" ?
                                  <>
                                    <Grid item xs={5}>
                                      <Typography sx={{ color: 'gray', padingLeft: '1.5em', fontStyle: 'italic'}}>-&nbsp;Instructions:</Typography>
                                    </Grid>
                                    <Grid item xs={7}>
                                      <Typography sx={{ color: 'gray' }}>{item.comments}</Typography>
                                    </Grid>
                                  </>
                                  :
                                  null
                                }
                              </Grid>
                            ))}
                          </Grid>
                          <Grid item xs={12} sx={{ marginBottom: '.5em'}}>
                            <Typography variant='body1' sx={{ color: 'darkgreen', marginTop: '.25em', fontWeight: 'bold'}}>
                              Added Items
                            </Typography>
                          </Grid>
                          <Grid item xs={12}>
                            { oneOrder.addOns ? 
                              <>
                                {oneOrder.addOns.map((item, i) => (
                                  <Grid container key={i} sx={{ marginBottom: '.5em', paddingLeft: '1em'}}>
                                    <Grid item xs={7}>
                                      <Typography sx={{ color: 'gray'}}>{item.name}</Typography>
                                    </Grid>
                                    <Grid item xs={2}>
                                      <Typography sx={{ fontStyle: 'italic', color: 'gray'}}>x&nbsp;{item.qty}</Typography>
                                    </Grid>
                                    <Grid item xs={3}>
                                      <Typography sx={{ fontStyle: 'italic', color: 'gray'}}>$&nbsp;{item.price.toFixed(2)}</Typography>
                                    </Grid>
                                  </Grid>
                                ))}
                              </>
                            :
                              <Typography sx={{ paddingLeft: '3em', color: 'gray'}}>
                                No items added.
                              </Typography>
                            }
                          </Grid>
                          <Grid item xs={12} sx={{ marginBottom: '.5em'}}>
                            <Typography variant='body1' sx={{ color: 'darkgreen', fontWeight: 'bold'}}>
                              Order Comments
                            </Typography>
                          </Grid>
                          <Grid item xs={12}>
                            {oneOrder.comments ?
                              <Grid container>
                                <Grid item xs={6}>
                                  <Typography sx={{ paddingLeft: '2em', fontStyle: 'italic', color: 'gray'}}>
                                    -&nbsp;Comments :
                                  </Typography>
                                </Grid>
                                <Grid item xs={6}>
                                  <Typography sx={{ color: 'gray'}}>
                                    {oneOrder.comments}
                                  </Typography> 
                                </Grid>
                              </Grid>
                            : 
                              <Grid container>
                                <Grid item xs={6}>
                                  <Typography sx={{ paddingLeft: '2em', fontStyle: 'italic', color: 'gray'}}>
                                    -&nbsp;Comments :
                                  </Typography>
                                </Grid>
                                <Grid item xs={6}>
                                  <Typography sx={{ color: 'gray'}}>No comments.</Typography>
                                </Grid>
                              </Grid>
                            }
                          </Grid>
                        </Grid>
                      </Grid>
                      <Grid item xs={12}>
                        <Button variant='contained' onClick={closeModal} sx={{ width: '100%', marginTop: '1em'}}>Close</Button>
                      </Grid>
                    </Grid>
                  </> 
                : 
                <Grid container>
                  <Grid item xs={12} sx={{ width: '100%', height: '75vh', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
                    <CircularProgress />
                    <Typography sx={{ marginTop: '1em'}}>Loading...</Typography>
                  </Grid>
                </Grid>
                }
              </Card>
            </Modal>
          </Grid>
        </>
        :
        <Typography>Order </Typography>
      }
    </ThemeProvider>
  );
}
export default OrderManagement;