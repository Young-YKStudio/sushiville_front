import { useState, useEffect } from 'react';
import moment from 'moment';

// MUI
import { ThemeProvider } from '@mui/material/styles';
import { Grid, CircularProgress, Card, Typography, Button } from '@mui/material';
import axios from 'axios';

// Components
import theme from '../../../theme/theme'

const DetailCard = (props) => {

  // states
  const [ fetchedData, setFetchedData ] = useState();
  
  // useEffect
  useEffect(() => {
    const id = props.value;
    if (!!id) {
      const fetchData = async () => {
        const config = {
          header: {
            "Content-Type": "application/json"
          }
        }
        const request = await axios.get(`${process.env.REACT_APP_SERVER_URL}/api/order/${id}`, config)
        setFetchedData(request.data.order)
        return request
      }
      fetchData();
    }
  },[])

  // handlers
  const closeModal = (e) => {
    props.setModalOpen(false)
  }
  return (
    <ThemeProvider theme={theme}>
      <Card sx={{ width: 400, position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', padding: '2em 2em', maxHeight: '70vh', overflow: 'auto'}}>
        { !fetchedData ? 
          <Grid container sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignContent: 'center'}}>
            <Grid item xs={12} sx={{ paddingLeft: '5px'}}>
              <CircularProgress />
            </Grid>
            <Grid item xs={12} sx={{ marginTop: '.5em'}}>
              <Typography>Loading...</Typography>
            </Grid>
          </Grid> 
        : 
          <Grid container>
            <Grid item xs={12} sx={{ display: 'flex', flexDirection: 'row', borderBottom: '1px solid #dc5a41', marginBottom: '7px'}}>
              <Typography variant='h6' sx={{ marginRight: '1em'}}>Order Number:</Typography>
              <Typography variant='h6' sx={{ color: '#dc5a41'}}>{fetchedData[0].OrderNumber}</Typography>
            </Grid>
            <Grid item xs={12} sx={{ paddingLeft: '1em'}}>
              {fetchedData[0].isPaidAtRestaurant ? 
              <Typography sx={{ fontWeight: 'bold', color: '#dc5a41'}}>
                This order is not paid. Collect payment.
              </Typography> 
              : 
              <Typography sx={{ fontWeight: 'bold', color: 'darkgreen'}}>
                Paid at online.
              </Typography>
              }
            </Grid>
            <Grid item xs={12} sx={{ paddingLeft: '1em', display: 'flex', flexDirection: 'row', marginBottom: '.125em'}}>
              <Typography sx={{ fontSize: '1em', fontWeight: 'light', marginRight: '1em'}}>
                Order Total:
              </Typography>
              <Typography sx={{ fontSize: '1em', fontWeight: 'bold', color: '#dc5a41'}}>
                $ {fetchedData[0].grandTotal.toFixed(2)}
              </Typography>
            </Grid>
            <Grid item xs={12} sx={{ paddingLeft: '1em', display: 'flex', flexDirection: 'row', borderBottom: '1px solid lightgrey', paddingBottom: '.25em'}}>
              <Typography sx={{ fontSize: '.85em', fontWeight: 'light', marginRight: '1em'}}>
                Order Placed:
              </Typography>
              <Typography sx={{ fontSize: '.85em'}}>
                {moment(fetchedData[0].updatedAt).calendar()}
              </Typography>
            </Grid>
            <Grid item xs={12} sx={{ marginBottom: '.5em'}}>
              <Typography variant='body1' sx={{ color: 'darkgreen', marginTop: '.25em', fontWeight: 'bold'}}>
                Ordered Items
              </Typography>
            </Grid>
            <Grid item xs={12} sx={{ paddingLeft: '1em', marginBottom: '.125em'}}>
              {fetchedData[0].orderedItems.map((item, i) => (
                <Grid container key={i} sx={{ marginBottom: '.75em', borderBottom: '.5px solid lightgrey', paddingBottom: '.5em'}}>
                  <Grid item xs={7}>
                    <Typography sx={{ color: '#dc5a41' }}>
                      {item.name}
                    </Typography>
                  </Grid>
                  <Grid item xs={2}>
                    <Typography sx={{ fontStyle: 'italic' }}>x{item.qty}</Typography>
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
              ))}
            </Grid>
            <Grid item xs={12} sx={{ marginBottom: '.5em'}}>
            <Typography variant='body1' sx={{ color: 'darkgreen', marginTop: '.25em', fontWeight: 'bold'}}>
                Added Items
              </Typography>
            </Grid>
            <Grid item xs={12} sx={{ paddingLeft: '1em', marginBottom: '.125em'}}>
              {fetchedData[0].addOns.length > 0 ?
              <>
                {fetchedData[0].addOns.map((item, i) => (
                    <Card key={i} elevation={0}>
                      <Grid container sx={{ paddingLeft: '1em'}}>
                        <Grid item xs={7}>
                          <Typography sx={{ color: 'gray'}}>{item.name}</Typography>
                        </Grid>
                        <Grid item xs={2}>
                          <Typography sx={{ fontStyle: 'italic'}}>x{item.qty}</Typography>
                        </Grid>
                        <Grid item xs={3}>
                          <Typography sx={{ color: 'darkgreen', textAlign: 'right', paddingRight: '1em' }}>$&nbsp;{(item.price.toFixed(2))}</Typography>
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
            { fetchedData[0].comments ?
              <>
                <Grid item xs={12} sx={{ marginBottom: '.5em', marginTop: '1em'}}>
                  <Typography variant='body1' sx={{ color: 'darkgreen', marginTop: '.25em', fontWeight: 'bold'}}>
                    Order Comments
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Card xs={{ padding: '1em 1em', borderBottom: '1px solid lightgray'}} elevation={0}>
                    <Grid container>
                      { fetchedData[0].comments ? 
                        <>
                          <Grid item xs={6}>
                            <Typography sx={{ paddingLeft: '2em', fontStyle: 'italic', color: 'gray'}}>
                              -&nbsp;Comments :
                            </Typography>
                          </Grid>
                          <Grid item xs={6}>
                            <Typography sx={{ color: 'gray'}}>{fetchedData[0].comments}</Typography>
                          </Grid>
                        </> : null
                      }
                    </Grid>
                  </Card>
                </Grid>
              </> : null
            }
          </Grid>
        }
        <Button onClick={closeModal} variant='contained' sx={{ width: '100%', marginTop: '1em'}}>Close</Button>
      </Card>
    </ThemeProvider>
  );
}
export default DetailCard;