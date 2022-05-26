import React from 'react';
import { useState, useEffect } from 'react';
import Confirmation from './Confirmation';


// MUI
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import ShoppingCartCheckoutIcon from '@mui/icons-material/ShoppingCartCheckout';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import Badge from '@mui/material/Badge';
import { styled } from '@mui/material/styles';
import { ThemeProvider } from '@mui/material/styles';
import theme from '../../theme/theme';
import { Card, Typography, Button, IconButton, Grid, Modal } from '@mui/material';


// Badge style
const StyledBadge = styled(Badge)(({ theme }) => ({
  '& .MuiBadge-badge': {
    right: -10,
    top: -15,
    padding: '14px 12px',
    fontSize: '1em',
    borderRadius: '20px'
  },
}));

const Cart = (props) => {

  // states
  const [ cartItemCount, setCartItemCount ] = useState(0);
  const [ cartItems, setCartItems ] = useState([]);
  const [ subTotal, setSubTotal] = useState(0);
  const [ removeItem, setRemoveItem ] = useState('')
  const [ confirmationOpen, setConfirmationOpen ] = useState(false);
  const [ cartModalOpen, setCartModalOpen ] = useState(false);

  
  useEffect(() => {
    async function setItemCount() {
      let cartTotal = props.cart;
      await setCartItems(cartTotal);
      await setCartItemCount((cartTotal).length);
    }
    setItemCount();
    calcTotal();
    console.log(cartItems);
  },[props.cart, subTotal, cartItems, removeItem])

  // calculate
  const calcTotal = () => {
    if (cartItems.length > 0) {
      let cartItemsMainTotal = cartItems.reduce(function (prev, next) { return prev+(next.price*next.qty)}, 0)
      let CartOptionsTotalArray = [];
      let arrySum = 0;
      const pushToArray = cartItems.map((item) => {
        if (item.options) {
          if (item.options.length > 0) {
            let tempOptionArry = [];
            let tempNumArry = [];
            let tempNumArrySum = 0;
            for (let i = 0; i < item.options.length; i++) {
              tempOptionArry = item.options.filter(({selected}) => selected === true)
            }
            for (let i = 0; i < tempOptionArry.length; i++) {
              if (tempOptionArry[i].name === 'Brown Rice') {
                tempNumArry.push(1*item.qty);
              } else if (tempOptionArry[i].name === 'Soy Paper') {
                tempNumArry.push(1*item.qty);
              } else if (tempOptionArry[i].name === 'Crunch') {
                tempNumArry.push(0.5*item.qty);
              } else if (tempOptionArry[i].name === 'Spicy Mayo') {
                tempNumArry.push(0.5*item.qty);
              } else if (tempOptionArry[i].name === 'Eel Sauce') {
                tempNumArry.push(0.5*item.qty);
              }
            }
            tempNumArrySum = tempNumArry.reduce((a, b) => a + b, 0);
            CartOptionsTotalArray.push(tempNumArrySum);
          }
        }
      })
      arrySum = CartOptionsTotalArray.reduce((a, b) => a + b, 0);
      let GrandTotal = cartItemsMainTotal + arrySum
      setSubTotal(GrandTotal.toFixed(2));
    }
  }

  
  // handlers
  const continueOrderHandler = (e) => {
    calcTotal();
    setCartModalOpen(!cartModalOpen);
  }

  const checkOutHandler = (e) => {
    calcTotal();
    setCartModalOpen(!cartModalOpen);
    setConfirmationOpen(!confirmationOpen);
  }

  const closeConfirmation = (e) => {
    setConfirmationOpen(!confirmationOpen);
  }

  const removeItemhandler = (e) => {
    function removeItemFromState() {
      setRemoveItem(e.currentTarget.value);
      if (removeItem) {
        const filteredCartItems = props.cart.filter(item => item.id !== removeItem)
        props.setCart(filteredCartItems);
        setCartItems(filteredCartItems);
        setRemoveItem('');
      }
    }
    removeItemFromState();
    calcTotal();
  }

  const clearCart = (e) => {
    setCartItems([]);
  }
  
  return (
    <ThemeProvider theme={theme}>
      <Modal open={cartModalOpen} sx={{overflow: 'scroll'}}>
        <Bar>
          <Card sx={{ width: 400, padding: '2em 2em', position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
            { cartItemCount === 0 ?
              <Grid container>
                <Grid item xs={12}>
                  <Typography gutterBottom variant='h5' sx={{ borderBottom: '2px solid #dc5a41', paddingBottom: '.25em'}}>
                    Shopping Cart
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography variant='body2' sx={{ marginTop: '2em', marginBottom: '2em'}}>
                    Your cart is currently empty.
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Button onClick={continueOrderHandler} variant='contained' sx={{ width: '100%' }}>
                    <ShoppingCartIcon /> Continue Order
                  </Button>
                </Grid>
              </Grid>
              :
              <Grid container spacing={1}>
                <Grid item xs={12}>
                  <Typography gutterBottom variant='h5' sx={{ borderBottom: '2px solid #dc5a41', paddingBottom: '.25em', color: 'darkgreen', fontWeight: 'bold'}}>
                    Shopping Cart
                  </Typography>
                </Grid>
                {cartItems.map((item, i) => (
                  <Grid item xs={12} key={i} sx={{ borderBottom: '1px solid gray', paddingBottom: '1em'}}>
                    <Grid container direction='row' justifyContent='center' alignItems='center'>
                      <Grid item xs={6}>
                        <Typography sx={{ fontSize: '1.125em' }}>{item.name}</Typography>
                      </Grid>
                      <Grid item xs={2}>
                        <Typography sx={{ fontSize: '1.125em', fontStyle: 'italic' }}>x{item.qty}</Typography>
                      </Grid>
                      <Grid item xs={2}>
                        <Typography sx={{ fontSize: '1.125em', color: 'darkgreen' }}>${(item.price.toFixed(2))}</Typography>
                      </Grid>
                      <Grid item xs={2}>
                        <IconButton onClick={removeItemhandler} value={item.id} sx={{ marginLeft: '10px' }}>
                          <RemoveCircleOutlineIcon sx={{ color: 'gray' }} />
                        </IconButton>
                      </Grid>
                      {item.options ? 
                        <>
                          { item.options.map((option, i) => (
                            <Grid container direction='row' justifyContent='center' alignItems='center' key={i}>
                              <Grid item xs={6}>
                                {option.selected ? <Typography sx={{ color: 'gray', paddingLeft: '1em', fontStyle: 'italic' }}>-&nbsp;{option.name}</Typography> : <></>}
                              </Grid>
                              <Grid item xs={2}>
                                {option.selected ? <Typography sx={{ color: 'gray', fontStyle: 'italic'}}>x{item.qty}</Typography> : <></>}
                              </Grid>
                              <Grid item xs={2}>
                                {option.selected ? 
                                  <>
                                    {option.name === 'Brown Rice' || option.name === 'Soy Paper' || option.name === 'Crunch' || option.name === 'Spicy Mayo' || option.name === 'Eel Sauce' ? 
                                    <Typography sx={{ color: 'gray' }}>${(option.price.toFixed(2))}</Typography> 
                                    : 
                                    <></>
                                    }
                                  </> 
                                  : <></> }
                              </Grid>
                              <Grid item xs={2} />
                            </Grid>
                          ))}
                        </>
                        :
                        <></>
                      }
                      {item.caliOrSpTuna ?
                        <Grid container>
                          <Grid item xs={4}>
                            <Typography sx={{ paddingLeft: '1em', color: 'gray', fontStyle: 'italic' }}>-&nbsp;Choice:</Typography>
                          </Grid>
                          <Grid item xs={8}>
                            <Typography sx={{ color: 'gray' }}>{item.caliOrSpTuna}</Typography>
                          </Grid>
                        </Grid>
                        :
                        <></>
                      }
                      {item.salGoneOrRain ?
                        <Grid container>
                          <Grid item xs={4}>
                            <Typography sx={{ paddingLeft: '1em', color: 'gray', fontStyle: 'italic' }}>-&nbsp;Choice:</Typography>
                          </Grid>
                          <Grid item xs={8}>
                            <Typography sx={{ color: 'gray' }}>{item.salGoneOrRain}</Typography>
                          </Grid>
                        </Grid>
                        :
                        <></>
                      }
                      { item.name === 'Pick 3 Rolls Lunch' ?
                        <>
                        {item.rollChoices.map((choice, i) =>(
                          <Grid container key={i}>
                            <Grid item xs={4}>
                              <Typography sx={{ paddingLeft: '1em', color: 'gray', fontStyle: 'italic' }}>-&nbsp;Roll 1:</Typography>
                            </Grid>
                            <Grid item xs={8}>
                              <Typography sx={{ color: 'gray' }}>{choice.roll1}</Typography>
                            </Grid>
                            <Grid item xs={4}>
                              <Typography sx={{ paddingLeft: '1em', color: 'gray', fontStyle: 'italic' }}>-&nbsp;Roll 2:</Typography>
                            </Grid>
                            <Grid item xs={8}>
                              <Typography sx={{ color: 'gray' }}>{choice.roll2}</Typography>
                            </Grid>
                            <Grid item xs={4}>
                              <Typography sx={{ paddingLeft: '1em', color: 'gray', fontStyle: 'italic' }}>-&nbsp;Roll 3:</Typography>
                            </Grid>
                            <Grid item xs={8}>
                              <Typography sx={{ color: 'gray' }}>{choice.roll3}</Typography>
                            </Grid>
                          </Grid>
                        ))}
                        </> : <></>
                      }
                      { item.name === 'Pick 2 Rolls Lunch' ?
                        <>
                        {item.rollChoices.map((choice, i) =>(
                          <Grid container>
                            <Grid item xs={4}>
                              <Typography sx={{ paddingLeft: '1em', color: 'gray', fontStyle: 'italic' }}>-&nbsp;Roll 1:</Typography>
                            </Grid>
                            <Grid item xs={8}>
                              <Typography sx={{ color: 'gray' }}>{choice.roll1}</Typography>
                            </Grid>
                            <Grid item xs={4}>
                              <Typography sx={{ paddingLeft: '1em', color: 'gray', fontStyle: 'italic' }}>-&nbsp;Roll 2:</Typography>
                            </Grid>
                            <Grid item xs={8}>
                              <Typography sx={{ color: 'gray' }}>{choice.roll2}</Typography>
                            </Grid>
                          </Grid>
                        ))}
                        </> : <></>
                      }
                      {item.spicyOrSweet ? 
                        <Grid container>
                          <Grid item xs={4}>
                            <Typography sx={{ paddingLeft: '1em', color: 'gray', fontStyle: 'italic' }}>-&nbsp;Choice:</Typography>
                          </Grid>
                          <Grid item xs={8}>
                            <Typography sx={{ color: 'gray' }}>{item.spicyOrSweet}</Typography>
                          </Grid>
                        </Grid> 
                        : 
                        <></>
                      }
                      {item.porkOrVeg ? 
                        <Grid container>
                          <Grid item xs={4}>
                            <Typography sx={{ paddingLeft: '1em', color: 'gray', fontStyle: 'italic' }}>-&nbsp;Choice:</Typography>
                          </Grid>
                          <Grid item xs={8}>
                            <Typography sx={{ color: 'gray' }}>{item.porkOrVeg}</Typography>
                          </Grid>
                        </Grid> 
                        : 
                        <></>
                      }
                      {item.comments ?
                        <Grid container>
                          <Grid item xs={4}>
                            <Typography sx={{ paddingLeft: '1em', color: 'gray', fontStyle: 'italic' }}>-&nbsp;Instructions:</Typography>
                          </Grid>
                          <Grid item xs={8}>
                            <Typography sx={{ color: 'gray' }}>{item.comments}</Typography>
                          </Grid>
                        </Grid>
                        :
                        <></>
                      }
                    </Grid>
                  </Grid>
                ))}
                {/* Add subtotal */}
                <Grid item xs={12} sx={{ padding: '1em 1em'}}>
                  <Grid container>
                    <Grid item xs={8}>
                      <Typography sx={{ paddingTop: '4px', color: 'gray', fontStyle: 'italic' }}>Total:</Typography>
                    </Grid>
                    <Grid item xs={4}>
                      <Typography sx={{ fontSize: '1.25em', color: '#dc5a41'}}>${subTotal}</Typography>
                    </Grid>
                  </Grid>
                </Grid>
                {/* Buttons */}
                <Grid item xs={6}>
                  <Button onClick={checkOutHandler} variant='contained' sx={{ width: '100%' }}>
                    <ShoppingCartCheckoutIcon />&nbsp;Check-Out Order
                  </Button>
                </Grid>
                <Grid item xs={6}>
                  <Button onClick={continueOrderHandler} variant='outlined' sx={{ width: '100%' }}>
                    <ShoppingCartIcon />&nbsp;Continue Order
                  </Button>
                </Grid>
              </Grid>
            }
          </Card>
        </Bar>
      </Modal>
      <Modal open={confirmationOpen} sx={{overflow: 'scroll'}}>
        <Bar>
          <Confirmation allItem={props.allitem} cart={cartItems} subTotal={subTotal} closeConfirmation={closeConfirmation} clearCart={clearCart} />
        </Bar>
      </Modal>
      <div className="cartContainer" onClick={continueOrderHandler}>
        <StyledBadge badgeContent={cartItemCount} color='primary'>
          <ShoppingCartIcon sx={{ fontSize: '1.75em'}}/>
        </StyledBadge>
      </div>    
    </ThemeProvider>
  );
}

const Bar = React.forwardRef((props, ref) => (
  <span {...props} ref={ref}>
    {props.children}
  </span>
))

export default Cart;