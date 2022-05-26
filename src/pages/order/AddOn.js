import React, { useState, useEffect } from 'react';
import axios from 'axios';

// MUI
import { Card, Typography, Grid, List, Collapse, ListItem, ListItemButton, ListItemText, Select, MenuItem, IconButton, Button, Modal } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import theme from '../../theme/theme';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import DeleteIcon from '@mui/icons-material/Delete';


const AddOn = (props) => {

  // states
  const [ addOns, setAddOns ] = useState([]);
  const [ addOnTotal, setAddOnTotal ] = useState();
  const [ grandTotalWithAddOn, setGrandTotalWithAddOn ] = useState();
  const [ alertModal, setAlertModal ] = useState(false);
  const [ error, setError ] = useState('');
  // states---sauce
  const [ sauceOpen, SetSauceOpen ] = useState(false);
  const [ soyQty, setSoyQty ] = useState('0');
  const [ spMayo, setSpMayo ] = useState('0');
  const [ eelSauce, setEelSauce ] = useState('0');
  const [ gingerD, setGingerD ] = useState('0');
  // states---drinks
  const [ drinksOpen, setDrinksOpen ] = useState(false);
  const [ coke, setCoke ] = useState('0');
  const [ dietCoke, setDietCoke ] = useState('0');
  const [ sprite, setSprite ] = useState('0');
  const [ clubSoda, setClubSoda ] = useState('0');
  const [ gingerAle, setGingerAle ] = useState('0');
  const [ lemonSnapple, setLemonSnapple ] = useState('0');
  const [ peachSnapple, setPeachSnapple ] = useState('0');
  // states---others
  const [ othersOpen, setOthersOpen ] = useState(false);
  const [ whiteRice, setWhiteRice ] = useState('0');
  const [ brownRice, setBrownRice ] = useState('0');
  const [ sushiRice, setSushiRice ] = useState('0');

  // handlers
  const sauceOpenHandler = (e) => {
    SetSauceOpen(!sauceOpen);
  }
  
  const drinksOpenHandler = (e) => {
    setDrinksOpen(!drinksOpen);
  }

  const othersOpenHandler = (e) => {
    setOthersOpen(!othersOpen);
  }

  const soyQtyHandler = (e) => {
    setSoyQty(e.target.value);
  }

  const soyAddHandler = (e) => {
    if (soyQty !== '0') {
      async function addSoyQty() {
        await setAddOns([{
          id: '622e4de10a11c87f85a1f448',
          qty: parseInt(soyQty),
          name: 'Soy Sauce',
          price: 0,
        }, ...addOns]);
        setSoyQty('0');
      }
      addSoyQty();
    }
  }
  
  const spMayoHandler = (e) => {
    setSpMayo(e.target.value);
  }

  const spMayoAddHandler = (e) => {
    if (spMayo !== '0') {
      async function addSpMayoQty() {
        await setAddOns([{
          id: '622e4df10a11c87f85a1f44a',
          qty: parseInt(spMayo),
          name: 'Spicy Mayo',
          price: 0.5,
        }, ...addOns]);
        setSpMayo('0');
      }
      addSpMayoQty();
    }
  }

  const eelSauceHandler = (e) => {
    setEelSauce(e.target.value);
  }

  const eelSauceAddHandler = (e) => {
    if (eelSauce !== '0') {
      async function addEelSauceQty() {
        await setAddOns([{
          id: '622e4dfd0a11c87f85a1f44c',
          qty: parseInt(eelSauce),
          name: 'Eel Sauce',
          price: 0.5,
        }, ...addOns]);
        setEelSauce('0');
      }
      addEelSauceQty();
    }
  }
  
  const gingerDHandler = (e) => {
    setGingerD(e.target.value);
  }

  const gingerDAddHandler = (e) => {
    if (gingerD !== '0') {
      async function addGingerDQty() {
        await setAddOns([{
          id: '622e4e090a11c87f85a1f44e',
          qty: parseInt(gingerD),
          name: 'Ginger Dressing',
          price: 0.5,
        }, ...addOns]);
        setGingerD('0');
      }
      addGingerDQty();
    }
  }

  const cokeHandler = (e) => {
    setCoke(e.target.value);
  }

  const cokeAddHandler = (e) => {
    if (coke !== '0') {
      async function addItem() {
        await setAddOns([{
          id: '622e4e340a11c87f85a1f450',
          qty: parseInt(coke),
          name: 'Coke',
          price: 2,
        }, ...addOns]);
        setCoke('0');
      }
      addItem();
    }
  }

  const dietCokeHandler = (e) => {
    setDietCoke(e.target.value);
  }

  const dietCokeAddHandler = (e) => {
    if (dietCoke !== '0') {
      async function addItem() {
        await setAddOns([{
          id: '622e4e3f0a11c87f85a1f452',
          qty: parseInt(dietCoke),
          name: 'Diet Coke',
          price: 2,
        }, ...addOns]);
        setDietCoke('0');
      }
      addItem();
    }
  }

  const spriteHandler = (e) => {
    setSprite(e.target.value);
  }

  const spriteAddHandler = (e) => {
    if (sprite !== '0') {
      async function addItem() {
        await setAddOns([{
          id: '622e4e490a11c87f85a1f454',
          qty: parseInt(sprite),
          name: 'Sprite',
          price: 2,
        }, ...addOns]);
        setSprite('0');
      }
      addItem();
    }
  }

  const clubSodaHandler = (e) => {
    setClubSoda(e.target.value);
  }

  const clubSodaAddHandler = (e) => {
    if (clubSoda !== '0') {
      async function addItem() {
        await setAddOns([{
          id: '622e4e510a11c87f85a1f456',
          qty: parseInt(clubSoda),
          name: 'Club Soda',
          price: 2,
        }, ...addOns]);
        setClubSoda('0');
      }
      addItem();
    }
  }

  const gingerAleHandler = (e) => {
    setGingerAle(e.target.value);
  }

  const gingerAleAddHandler = (e) => {
    if (gingerAle !== '0') {
      async function addItem() {
        await setAddOns([{
          id: '622e4e5a0a11c87f85a1f458',
          qty: parseInt(gingerAle),
          name: 'Ginger Ale',
          price: 2,
        }, ...addOns]);
        setGingerAle('0');
      }
      addItem();
    }
  }

  const lSnappleHandler = (e) => {
    setLemonSnapple(e.target.value);
  }

  const lSnappleAddHandler = (e) => {
    if (lemonSnapple !== '0') {
      async function addItem() {
        await setAddOns([{
          id: '622e4e680a11c87f85a1f45a',
          qty: parseInt(lemonSnapple),
          name: 'Lemon Snapple',
          price: 3,
        }, ...addOns]);
        setLemonSnapple('0');
      }
      addItem();
    }
  }

  const pSnappleHandler = (e) => {
    setPeachSnapple(e.target.value);
  }

  const pSnappleAddHandler = (e) => {
    if (peachSnapple !== '0') {
      async function addItem() {
        await setAddOns([{
          id: '622e4e700a11c87f85a1f45c',
          qty: parseInt(peachSnapple),
          name: 'Peach Snapple',
          price: 3,
        }, ...addOns]);
        setPeachSnapple('0');
      }
      addItem();
    }
  }

  const wRiceHandler = (e) => {
    setWhiteRice(e.target.value);
  }

  const wRiceAddHandler = (e) => {
    if (whiteRice !== '0') {
      async function addItem() {
        await setAddOns([{
          id: '623ee9c239f2dc011678e6f1',
          qty: parseInt(whiteRice),
          name: 'White Rice Bowl',
          price: 2,
        }, ...addOns]);
        setWhiteRice('0');
      }
      addItem();
    }
  }

  const bRiceHandler = (e) => {
    setBrownRice(e.target.value);
  }

  const bRiceAddHandler = (e) => {
    if (brownRice !== '0') {
      async function addItem() {
        await setAddOns([{
          id: '623ee9f239f2dc011678e6f3',
          qty: parseInt(brownRice),
          name: 'Brown Rice Bowl',
          price: 3,
        }, ...addOns]);
        setBrownRice('0');
      }
      addItem();
    }
  }

  const sRiceHandler = (e) => {
    setSushiRice(e.target.value);
  }

  const sRiceAddHandler = (e) => {
    if (sushiRice !== '0') {
      async function addItem() {
        await setAddOns([{
          id: '623ee9fe39f2dc011678e6f5',
          qty: parseInt(sushiRice),
          name: 'Sushi Rice Bowl',
          price: 2,
        }, ...addOns]);
        setSushiRice('0');
      }
      addItem();
    }
  }

  const alertModalHandler = (e) => {
    setAlertModal(!alertModal);
  }

  const removeItemHandler = (e) => {
    function removeItem() {
      const filtered = addOns.filter(item => item.id !== e.currentTarget.value)
      setAddOns(filtered)
    }
    removeItem();
  }

  // calc total
  const addedItemTotal = () => {
    if (addOns.length > 0) {
      let addOnsTotal = addOns.reduce(
        function (a, b) {
          return a+(b.price*b.qty)
        }, 0
      )
      setAddOnTotal(addOnsTotal);
      let newSubtotal = props.subTotal + addOnsTotal
      let newCardFee = (newSubtotal * 0.03) + .3
      let newTax = newSubtotal * 0.0875
      let newGrandTotal = newSubtotal + newCardFee + newTax
      setGrandTotalWithAddOn(newGrandTotal);
    }
  }

  const orderEditor = async (e) => {
    if (addOns.length === 0) {
      setAlertModal(true);
    } else {
      const config = {
        header: {
          "Content-Type": "application/json"
        }
      }
  
      const request = {
        body: {
          addOns: addOns,
          addOnTotal: addOnTotal,
          grandTotal: grandTotalWithAddOn
        }
      }

      try {
        const { data } = await axios.put(
          `${process.env.REACT_APP_SERVER_URL}/api/order/${props.orderId}`, request.body, config
        )
      } catch (error) {
        setError('Error from updating order')
      }
      props.handleComplete();
      props.handleNext();
    }
  }

  const nextHanlder = (e) => {
    props.handleComplete();
    props.handleNext();
  }

  useEffect(() => {
    addedItemTotal();
    console.log(addOns, grandTotalWithAddOn, addOnTotal);
  },[soyQty, addOns, spMayo, eelSauce, gingerD, coke, dietCoke, sprite, clubSoda, gingerAle, lemonSnapple, peachSnapple, whiteRice, brownRice, sushiRice, grandTotalWithAddOn, addOnTotal])


  return (
    <ThemeProvider theme={theme}>
      <Grid item xs={12} sx={{ marginBottom: '1em' }}>
        <Grid container spacing={1}>
          <Grid item xs={12}>
            <Typography variant='h5' sx={{ fontFamily: 'Raleway', fontWeight: 'bold', color: 'darkgreen', paddingBottom: '.5em', borderBottom: '1px solid #dc5a41'}}>Add On</Typography>
          </Grid>
          {/* Sauce */}
          <Grid item xs={12} md={6}>
            <List>
              <Card>
                <ListItemButton onClick={sauceOpenHandler} sx={{ bgcolor: 'white', borderRadius: '5px'}}>
                  <ListItemText sx={{ color: 'darkgreen' }} primary='Sauces' />
                  { sauceOpen ? <ExpandLess /> : <ExpandMore />}
                </ListItemButton>
                <Collapse in={sauceOpen} timeout='auto' unmountOnExit>
                  <Grid container spacing={3} sx={{ padding: '1em 2em', width: '100%'}}>
                  {/* soy sauce */}
                    <Grid item xs={6}>
                      <Typography sx={{ lineHeight: '2.5em', color: '#dc5a41'}}>Soy Sauce</Typography>
                    </Grid>
                    <Grid item xs={2}>
                      <Typography sx={{ lineHeight: '2.5em', color: 'gray'}}>Free</Typography>
                    </Grid>
                    <Grid item xs={2} sx={{ display: 'center', justifyContent: 'center'}}>
                      <Select
                        labelId='soySauce'
                        value={soyQty}
                        label='Qty'
                        onChange={soyQtyHandler}
                        variant='standard'
                        sx={{ marginTop: '5px', width: '3em', textAlign: 'center'}}
                      >
                        <MenuItem value={'0'}>0</MenuItem>
                        <MenuItem value={'1'}>1</MenuItem>
                        <MenuItem value={'2'}>2</MenuItem>
                        <MenuItem value={'3'}>3</MenuItem>
                        <MenuItem value={'4'}>4</MenuItem>
                        <MenuItem value={'5'}>5</MenuItem>
                        <MenuItem value={'6'}>6</MenuItem>
                        <MenuItem value={'7'}>7</MenuItem>
                        <MenuItem value={'8'}>8</MenuItem>
                        <MenuItem value={'9'}>9</MenuItem>
                      </Select>
                    </Grid>
                    <Grid item xs={2} sx={{ display: 'center', justifyContent: 'center'}}>
                      <IconButton color='primary' onClick={soyAddHandler}><AddOutlinedIcon /></IconButton>
                    </Grid>
                    <Grid item xs={12} sx={{ borderBottom: '1px solid lightgray', paddingBottom: '1em'}}>
                      <Typography sx={{ color: 'gray', fontStyle: 'italic', fontSize: '.75em'}}>Max number of sauce will be determined at preparing.</Typography>
                    </Grid>
                    {/* sp mayo */}
                    <Grid item xs={6} sx={{ borderBottom: '1px solid lightgray', paddingBottom: '1em'}}>
                      <Typography sx={{ lineHeight: '2.5em', color: '#dc5a41'}}>Spicy Mayo</Typography>
                    </Grid>
                    <Grid item xs={2} sx={{ borderBottom: '1px solid lightgray', paddingBottom: '1em'}}>
                      <Typography sx={{ lineHeight: '2.5em', color: 'gray'}}>$0.50</Typography>
                    </Grid>
                    <Grid item xs={2} sx={{ borderBottom: '1px solid lightgray', paddingBottom: '1em', display: 'center', justifyContent: 'center'}}>
                      <Select
                        labelId='spMayo'
                        value={spMayo}
                        label='Qty'
                        onChange={spMayoHandler}
                        variant='standard'
                        sx={{ marginTop: '5px', width: '3em', textAlign: 'center'}}
                      >
                        <MenuItem value={'0'}>0</MenuItem>
                        <MenuItem value={'1'}>1</MenuItem>
                        <MenuItem value={'2'}>2</MenuItem>
                        <MenuItem value={'3'}>3</MenuItem>
                        <MenuItem value={'4'}>4</MenuItem>
                        <MenuItem value={'5'}>5</MenuItem>
                        <MenuItem value={'6'}>6</MenuItem>
                        <MenuItem value={'7'}>7</MenuItem>
                        <MenuItem value={'8'}>8</MenuItem>
                        <MenuItem value={'9'}>9</MenuItem>
                      </Select>
                    </Grid>
                    <Grid item xs={2} sx={{ display: 'center', justifyContent: 'center', borderBottom: '1px solid lightgray', paddingBottom: '1em'}}>
                      <IconButton color='primary' onClick={spMayoAddHandler} ><AddOutlinedIcon /></IconButton>
                    </Grid>
                    {/* eel sauce */}
                    <Grid item xs={6} sx={{ borderBottom: '1px solid lightgray', paddingBottom: '1em'}}>
                      <Typography sx={{ lineHeight: '2.5em', color: '#dc5a41'}}>Eel Sauce</Typography>
                    </Grid>
                    <Grid item xs={2} sx={{ borderBottom: '1px solid lightgray', paddingBottom: '1em'}}>
                      <Typography sx={{ lineHeight: '2.5em', color: 'gray'}}>$0.50</Typography>
                    </Grid>
                    <Grid item xs={2} sx={{ borderBottom: '1px solid lightgray', paddingBottom: '1em', display: 'center', justifyContent: 'center'}}>
                      <Select
                        labelId='eelSauce'
                        value={eelSauce}
                        label='Qty'
                        onChange={eelSauceHandler}
                        variant='standard'
                        sx={{ marginTop: '5px', width: '3em', textAlign: 'center'}}
                      >
                        <MenuItem value={'0'}>0</MenuItem>
                        <MenuItem value={'1'}>1</MenuItem>
                        <MenuItem value={'2'}>2</MenuItem>
                        <MenuItem value={'3'}>3</MenuItem>
                        <MenuItem value={'4'}>4</MenuItem>
                        <MenuItem value={'5'}>5</MenuItem>
                        <MenuItem value={'6'}>6</MenuItem>
                        <MenuItem value={'7'}>7</MenuItem>
                        <MenuItem value={'8'}>8</MenuItem>
                        <MenuItem value={'9'}>9</MenuItem>
                      </Select>
                    </Grid>
                    <Grid item xs={2} sx={{ display: 'center', justifyContent: 'center', borderBottom: '1px solid lightgray', paddingBottom: '1em'}}>
                      <IconButton color='primary' onClick={eelSauceAddHandler}><AddOutlinedIcon /></IconButton>
                    </Grid>
                    {/* ginger dressing */}
                    <Grid item xs={6} sx={{ borderBottom: '1px solid lightgray', paddingBottom: '1em'}}>
                      <Typography sx={{ lineHeight: '2.5em', color: '#dc5a41'}}>Ginger Dressing</Typography>
                    </Grid>
                    <Grid item xs={2} sx={{ borderBottom: '1px solid lightgray', paddingBottom: '1em'}}>
                      <Typography sx={{ lineHeight: '2.5em', color: 'gray'}}>$0.50</Typography>
                    </Grid>
                    <Grid item xs={2} sx={{ borderBottom: '1px solid lightgray', paddingBottom: '1em', display: 'center', justifyContent: 'center'}}>
                      <Select
                        labelId='gingerDressing'
                        value={gingerD}
                        label='Qty'
                        onChange={gingerDHandler}
                        variant='standard'
                        sx={{ marginTop: '5px', width: '3em', textAlign: 'center'}}
                      >
                        <MenuItem value={'0'}>0</MenuItem>
                        <MenuItem value={'1'}>1</MenuItem>
                        <MenuItem value={'2'}>2</MenuItem>
                        <MenuItem value={'3'}>3</MenuItem>
                        <MenuItem value={'4'}>4</MenuItem>
                        <MenuItem value={'5'}>5</MenuItem>
                        <MenuItem value={'6'}>6</MenuItem>
                        <MenuItem value={'7'}>7</MenuItem>
                        <MenuItem value={'8'}>8</MenuItem>
                        <MenuItem value={'9'}>9</MenuItem>
                      </Select>
                    </Grid>
                    <Grid item xs={2} sx={{ display: 'center', justifyContent: 'center', borderBottom: '1px solid lightgray', paddingBottom: '1em'}}>
                      <IconButton color='primary' onClick={gingerDAddHandler}><AddOutlinedIcon /></IconButton>
                    </Grid>
                  </Grid>
                </Collapse>
              </Card>
            </List>
          </Grid>
          {/* Drinks */}
          <Grid item xs={12} md={6}>
            <List>
              <Card>
                <ListItemButton onClick={drinksOpenHandler} sx={{ bgcolor: 'white', borderRadius: '5px'}}>
                  <ListItemText sx={{ color: 'darkgreen' }} primary='Drinks' />
                  { drinksOpen ? <ExpandLess /> : <ExpandMore />}
                </ListItemButton>
                <Collapse in={drinksOpen} timeout='auto' unmountOnExit>
                  <Grid container spacing={3} sx={{ padding: '1em 2em', width: '100%'}}>
                  {/* coke */}
                    <Grid item xs={6} sx={{ borderBottom: '1px solid lightgray', paddingBottom: '1em'}}>
                      <Typography sx={{ lineHeight: '2.5em', color: '#dc5a41'}}>Coke</Typography>
                    </Grid>
                    <Grid item xs={2} sx={{ borderBottom: '1px solid lightgray', paddingBottom: '1em'}}>
                      <Typography sx={{ lineHeight: '2.5em', color: 'gray'}}>$2.00</Typography>
                    </Grid>
                    <Grid item xs={2} sx={{ display: 'center', justifyContent: 'center', borderBottom: '1px solid lightgray', paddingBottom: '1em'}}>
                      <Select
                        labelId='coke'
                        value={coke}
                        label='Qty'
                        onChange={cokeHandler}
                        variant='standard'
                        sx={{ marginTop: '5px', width: '3em', textAlign: 'center'}}
                      >
                        <MenuItem value={'0'}>0</MenuItem>
                        <MenuItem value={'1'}>1</MenuItem>
                        <MenuItem value={'2'}>2</MenuItem>
                        <MenuItem value={'3'}>3</MenuItem>
                        <MenuItem value={'4'}>4</MenuItem>
                        <MenuItem value={'5'}>5</MenuItem>
                        <MenuItem value={'6'}>6</MenuItem>
                        <MenuItem value={'7'}>7</MenuItem>
                        <MenuItem value={'8'}>8</MenuItem>
                        <MenuItem value={'9'}>9</MenuItem>
                      </Select>
                    </Grid>
                    <Grid item xs={2} sx={{ display: 'center', justifyContent: 'center', borderBottom: '1px solid lightgray', paddingBottom: '1em'}}>
                      <IconButton color='primary' onClick={cokeAddHandler}><AddOutlinedIcon /></IconButton>
                    </Grid>
                    {/* diet coke */}
                    <Grid item xs={6} sx={{ borderBottom: '1px solid lightgray', paddingBottom: '1em'}}>
                      <Typography sx={{ lineHeight: '2.5em', color: '#dc5a41'}}>Diet Coke</Typography>
                    </Grid>
                    <Grid item xs={2} sx={{ borderBottom: '1px solid lightgray', paddingBottom: '1em'}}>
                      <Typography sx={{ lineHeight: '2.5em', color: 'gray'}}>$2.00</Typography>
                    </Grid>
                    <Grid item xs={2} sx={{ borderBottom: '1px solid lightgray', paddingBottom: '1em', display: 'center', justifyContent: 'center'}}>
                      <Select
                        labelId='dCoke'
                        value={dietCoke}
                        label='Qty'
                        onChange={dietCokeHandler}
                        variant='standard'
                        sx={{ marginTop: '5px', width: '3em', textAlign: 'center'}}
                      >
                        <MenuItem value={'0'}>0</MenuItem>
                        <MenuItem value={'1'}>1</MenuItem>
                        <MenuItem value={'2'}>2</MenuItem>
                        <MenuItem value={'3'}>3</MenuItem>
                        <MenuItem value={'4'}>4</MenuItem>
                        <MenuItem value={'5'}>5</MenuItem>
                        <MenuItem value={'6'}>6</MenuItem>
                        <MenuItem value={'7'}>7</MenuItem>
                        <MenuItem value={'8'}>8</MenuItem>
                        <MenuItem value={'9'}>9</MenuItem>
                      </Select>
                    </Grid>
                    <Grid item xs={2} sx={{ display: 'center', justifyContent: 'center', borderBottom: '1px solid lightgray', paddingBottom: '1em'}}>
                      <IconButton color='primary' onClick={dietCokeAddHandler}><AddOutlinedIcon /></IconButton>
                    </Grid>
                    {/* sprite */}
                    <Grid item xs={6} sx={{ borderBottom: '1px solid lightgray', paddingBottom: '1em'}}>
                      <Typography sx={{ lineHeight: '2.5em', color: '#dc5a41'}}>Sprite</Typography>
                    </Grid>
                    <Grid item xs={2} sx={{ borderBottom: '1px solid lightgray', paddingBottom: '1em'}}>
                      <Typography sx={{ lineHeight: '2.5em', color: 'gray'}}>$2.00</Typography>
                    </Grid>
                    <Grid item xs={2} sx={{ borderBottom: '1px solid lightgray', paddingBottom: '1em', display: 'center', justifyContent: 'center'}}>
                      <Select
                        labelId='sprite'
                        value={sprite}
                        label='Qty'
                        onChange={spriteHandler}
                        variant='standard'
                        sx={{ marginTop: '5px', width: '3em', textAlign: 'center'}}
                      >
                        <MenuItem value={'0'}>0</MenuItem>
                        <MenuItem value={'1'}>1</MenuItem>
                        <MenuItem value={'2'}>2</MenuItem>
                        <MenuItem value={'3'}>3</MenuItem>
                        <MenuItem value={'4'}>4</MenuItem>
                        <MenuItem value={'5'}>5</MenuItem>
                        <MenuItem value={'6'}>6</MenuItem>
                        <MenuItem value={'7'}>7</MenuItem>
                        <MenuItem value={'8'}>8</MenuItem>
                        <MenuItem value={'9'}>9</MenuItem>
                      </Select>
                    </Grid>
                    <Grid item xs={2} sx={{ display: 'center', justifyContent: 'center', borderBottom: '1px solid lightgray', paddingBottom: '1em'}}>
                      <IconButton color='primary' onClick={spriteAddHandler}><AddOutlinedIcon /></IconButton>
                    </Grid>
                    {/* club soda */}
                    <Grid item xs={6} sx={{ borderBottom: '1px solid lightgray', paddingBottom: '1em'}}>
                      <Typography sx={{ lineHeight: '2.5em', color: '#dc5a41'}}>Club Soda</Typography>
                    </Grid>
                    <Grid item xs={2} sx={{ borderBottom: '1px solid lightgray', paddingBottom: '1em'}}>
                      <Typography sx={{ lineHeight: '2.5em', color: 'gray'}}>$2.00</Typography>
                    </Grid>
                    <Grid item xs={2} sx={{ borderBottom: '1px solid lightgray', paddingBottom: '1em', display: 'center', justifyContent: 'center'}}>
                      <Select
                        labelId='cSoda'
                        value={clubSoda}
                        label='Qty'
                        onChange={clubSodaHandler}
                        variant='standard'
                        sx={{ marginTop: '5px', width: '3em', textAlign: 'center'}}
                      >
                        <MenuItem value={'0'}>0</MenuItem>
                        <MenuItem value={'1'}>1</MenuItem>
                        <MenuItem value={'2'}>2</MenuItem>
                        <MenuItem value={'3'}>3</MenuItem>
                        <MenuItem value={'4'}>4</MenuItem>
                        <MenuItem value={'5'}>5</MenuItem>
                        <MenuItem value={'6'}>6</MenuItem>
                        <MenuItem value={'7'}>7</MenuItem>
                        <MenuItem value={'8'}>8</MenuItem>
                        <MenuItem value={'9'}>9</MenuItem>
                      </Select>
                    </Grid>
                    <Grid item xs={2} sx={{ display: 'center', justifyContent: 'center', borderBottom: '1px solid lightgray', paddingBottom: '1em'}}>
                      <IconButton color='primary' onClick={clubSodaAddHandler}><AddOutlinedIcon /></IconButton>
                    </Grid>
                    {/* ginger ale */}
                    <Grid item xs={6} sx={{ borderBottom: '1px solid lightgray', paddingBottom: '1em'}}>
                      <Typography sx={{ lineHeight: '2.5em', color: '#dc5a41'}}>Ginger Ale</Typography>
                    </Grid>
                    <Grid item xs={2} sx={{ borderBottom: '1px solid lightgray', paddingBottom: '1em'}}>
                      <Typography sx={{ lineHeight: '2.5em', color: 'gray'}}>$2.00</Typography>
                    </Grid>
                    <Grid item xs={2} sx={{ borderBottom: '1px solid lightgray', paddingBottom: '1em', display: 'center', justifyContent: 'center'}}>
                      <Select
                        labelId='gingerAle'
                        value={gingerAle}
                        label='Qty'
                        onChange={gingerAleHandler}
                        variant='standard'
                        sx={{ marginTop: '5px', width: '3em', textAlign: 'center'}}
                      >
                        <MenuItem value={'0'}>0</MenuItem>
                        <MenuItem value={'1'}>1</MenuItem>
                        <MenuItem value={'2'}>2</MenuItem>
                        <MenuItem value={'3'}>3</MenuItem>
                        <MenuItem value={'4'}>4</MenuItem>
                        <MenuItem value={'5'}>5</MenuItem>
                        <MenuItem value={'6'}>6</MenuItem>
                        <MenuItem value={'7'}>7</MenuItem>
                        <MenuItem value={'8'}>8</MenuItem>
                        <MenuItem value={'9'}>9</MenuItem>
                      </Select>
                    </Grid>
                    <Grid item xs={2} sx={{ display: 'center', justifyContent: 'center', borderBottom: '1px solid lightgray', paddingBottom: '1em'}}>
                      <IconButton color='primary' onClick={gingerAleAddHandler}><AddOutlinedIcon /></IconButton>
                    </Grid>
                    {/* lemon snapple */}
                    <Grid item xs={6} sx={{ borderBottom: '1px solid lightgray', paddingBottom: '1em'}}>
                      <Typography sx={{ lineHeight: '2.5em', color: '#dc5a41'}}>Lemon Snapple</Typography>
                    </Grid>
                    <Grid item xs={2} sx={{ borderBottom: '1px solid lightgray', paddingBottom: '1em'}}>
                      <Typography sx={{ lineHeight: '2.5em', color: 'gray'}}>$3.00</Typography>
                    </Grid>
                    <Grid item xs={2} sx={{ borderBottom: '1px solid lightgray', paddingBottom: '1em', display: 'center', justifyContent: 'center'}}>
                      <Select
                        labelId='lSnapple'
                        value={lemonSnapple}
                        label='Qty'
                        onChange={lSnappleHandler}
                        variant='standard'
                        sx={{ marginTop: '5px', width: '3em', textAlign: 'center'}}
                      >
                        <MenuItem value={'0'}>0</MenuItem>
                        <MenuItem value={'1'}>1</MenuItem>
                        <MenuItem value={'2'}>2</MenuItem>
                        <MenuItem value={'3'}>3</MenuItem>
                        <MenuItem value={'4'}>4</MenuItem>
                        <MenuItem value={'5'}>5</MenuItem>
                        <MenuItem value={'6'}>6</MenuItem>
                        <MenuItem value={'7'}>7</MenuItem>
                        <MenuItem value={'8'}>8</MenuItem>
                        <MenuItem value={'9'}>9</MenuItem>
                      </Select>
                    </Grid>
                    <Grid item xs={2} sx={{ display: 'center', justifyContent: 'center', borderBottom: '1px solid lightgray', paddingBottom: '1em'}}>
                      <IconButton color='primary' onClick={lSnappleAddHandler}><AddOutlinedIcon /></IconButton>
                    </Grid>
                    {/* peach snapple */}
                    <Grid item xs={6} sx={{ borderBottom: '1px solid lightgray', paddingBottom: '1em'}}>
                      <Typography sx={{ lineHeight: '2.5em', color: '#dc5a41'}}>Peach Snapple</Typography>
                    </Grid>
                    <Grid item xs={2} sx={{ borderBottom: '1px solid lightgray', paddingBottom: '1em'}}>
                      <Typography sx={{ lineHeight: '2.5em', color: 'gray'}}>$3.00</Typography>
                    </Grid>
                    <Grid item xs={2} sx={{ borderBottom: '1px solid lightgray', paddingBottom: '1em', display: 'center', justifyContent: 'center'}}>
                      <Select
                        labelId='pSnapple'
                        value={peachSnapple}
                        label='Qty'
                        onChange={pSnappleHandler}
                        variant='standard'
                        sx={{ marginTop: '5px', width: '3em', textAlign: 'center'}}
                      >
                        <MenuItem value={'0'}>0</MenuItem>
                        <MenuItem value={'1'}>1</MenuItem>
                        <MenuItem value={'2'}>2</MenuItem>
                        <MenuItem value={'3'}>3</MenuItem>
                        <MenuItem value={'4'}>4</MenuItem>
                        <MenuItem value={'5'}>5</MenuItem>
                        <MenuItem value={'6'}>6</MenuItem>
                        <MenuItem value={'7'}>7</MenuItem>
                        <MenuItem value={'8'}>8</MenuItem>
                        <MenuItem value={'9'}>9</MenuItem>
                      </Select>
                    </Grid>
                    <Grid item xs={2} sx={{ display: 'center', justifyContent: 'center', borderBottom: '1px solid lightgray', paddingBottom: '1em'}}>
                      <IconButton color='primary' onClick={pSnappleAddHandler}><AddOutlinedIcon /></IconButton>
                    </Grid>
                  </Grid>
                </Collapse>
              </Card>
            </List>
          </Grid>
          {/* Others */}
          <Grid item xs={12} md={6}>
            <List>
              <Card>
                <ListItemButton onClick={othersOpenHandler} sx={{ bgcolor: 'white', borderRadius: '5px'}}>
                  <ListItemText sx={{ color: 'darkgreen' }} primary='Others' />
                  { othersOpen ? <ExpandLess /> : <ExpandMore />}
                </ListItemButton>
                <Collapse in={othersOpen} timeout='auto' unmountOnExit>
                  <Grid container spacing={3} sx={{ padding: '1em 2em', width: '100%'}}>
                  {/* brown rice */}
                    <Grid item xs={6} sx={{ borderBottom: '1px solid lightgray', paddingBottom: '1em'}}>
                      <Typography sx={{ lineHeight: '2.5em', color: '#dc5a41'}}>Brown Rice Bowl</Typography>
                    </Grid>
                    <Grid item xs={2} sx={{ borderBottom: '1px solid lightgray', paddingBottom: '1em'}}>
                      <Typography sx={{ lineHeight: '2.5em', color: 'gray'}}>$3.00</Typography>
                    </Grid>
                    <Grid item xs={2} sx={{ display: 'center', justifyContent: 'center', borderBottom: '1px solid lightgray', paddingBottom: '1em'}}>
                      <Select
                        labelId='bRice'
                        value={brownRice}
                        label='Qty'
                        onChange={bRiceHandler}
                        variant='standard'
                        sx={{ marginTop: '5px', width: '3em', textAlign: 'center'}}
                      >
                        <MenuItem value={'0'}>0</MenuItem>
                        <MenuItem value={'1'}>1</MenuItem>
                        <MenuItem value={'2'}>2</MenuItem>
                        <MenuItem value={'3'}>3</MenuItem>
                        <MenuItem value={'4'}>4</MenuItem>
                        <MenuItem value={'5'}>5</MenuItem>
                        <MenuItem value={'6'}>6</MenuItem>
                        <MenuItem value={'7'}>7</MenuItem>
                        <MenuItem value={'8'}>8</MenuItem>
                        <MenuItem value={'9'}>9</MenuItem>
                      </Select>
                    </Grid>
                    <Grid item xs={2} sx={{ display: 'center', justifyContent: 'center', borderBottom: '1px solid lightgray', paddingBottom: '1em'}}>
                      <IconButton color='primary' onClick={bRiceAddHandler}><AddOutlinedIcon /></IconButton>
                    </Grid>
                    {/* white rice */}
                    <Grid item xs={6} sx={{ borderBottom: '1px solid lightgray', paddingBottom: '1em'}}>
                      <Typography sx={{ lineHeight: '2.5em', color: '#dc5a41'}}>White Rice Bowl</Typography>
                    </Grid>
                    <Grid item xs={2} sx={{ borderBottom: '1px solid lightgray', paddingBottom: '1em'}}>
                      <Typography sx={{ lineHeight: '2.5em', color: 'gray'}}>$2.00</Typography>
                    </Grid>
                    <Grid item xs={2} sx={{ borderBottom: '1px solid lightgray', paddingBottom: '1em', display: 'center', justifyContent: 'center'}}>
                      <Select
                        labelId='wRice'
                        value={whiteRice}
                        label='Qty'
                        onChange={wRiceHandler}
                        variant='standard'
                        sx={{ marginTop: '5px', width: '3em', textAlign: 'center'}}
                      >
                        <MenuItem value={'0'}>0</MenuItem>
                        <MenuItem value={'1'}>1</MenuItem>
                        <MenuItem value={'2'}>2</MenuItem>
                        <MenuItem value={'3'}>3</MenuItem>
                        <MenuItem value={'4'}>4</MenuItem>
                        <MenuItem value={'5'}>5</MenuItem>
                        <MenuItem value={'6'}>6</MenuItem>
                        <MenuItem value={'7'}>7</MenuItem>
                        <MenuItem value={'8'}>8</MenuItem>
                        <MenuItem value={'9'}>9</MenuItem>
                      </Select>
                    </Grid>
                    <Grid item xs={2} sx={{ display: 'center', justifyContent: 'center', borderBottom: '1px solid lightgray', paddingBottom: '1em'}}>
                      <IconButton color='primary' onClick={wRiceAddHandler}><AddOutlinedIcon /></IconButton>
                    </Grid>
                    {/* sushi rice */}
                    <Grid item xs={6} sx={{ borderBottom: '1px solid lightgray', paddingBottom: '1em'}}>
                      <Typography sx={{ lineHeight: '2.5em', color: '#dc5a41'}}>Sushi Rice Bowl</Typography>
                    </Grid>
                    <Grid item xs={2} sx={{ borderBottom: '1px solid lightgray', paddingBottom: '1em'}}>
                      <Typography sx={{ lineHeight: '2.5em', color: 'gray'}}>$2.00</Typography>
                    </Grid>
                    <Grid item xs={2} sx={{ borderBottom: '1px solid lightgray', paddingBottom: '1em', display: 'center', justifyContent: 'center'}}>
                      <Select
                        labelId='sRice'
                        value={sushiRice}
                        label='Qty'
                        onChange={sRiceHandler}
                        variant='standard'
                        sx={{ marginTop: '5px', width: '3em', textAlign: 'center'}}
                      >
                        <MenuItem value={'0'}>0</MenuItem>
                        <MenuItem value={'1'}>1</MenuItem>
                        <MenuItem value={'2'}>2</MenuItem>
                        <MenuItem value={'3'}>3</MenuItem>
                        <MenuItem value={'4'}>4</MenuItem>
                        <MenuItem value={'5'}>5</MenuItem>
                        <MenuItem value={'6'}>6</MenuItem>
                        <MenuItem value={'7'}>7</MenuItem>
                        <MenuItem value={'8'}>8</MenuItem>
                        <MenuItem value={'9'}>9</MenuItem>
                      </Select>
                    </Grid>
                    <Grid item xs={2} sx={{ display: 'center', justifyContent: 'center', borderBottom: '1px solid lightgray', paddingBottom: '1em'}}>
                      <IconButton color='primary' onClick={sRiceAddHandler}><AddOutlinedIcon /></IconButton>
                    </Grid>
                  </Grid>
                </Collapse>
              </Card>
            </List>
          </Grid>
          {/* item added */}
          <Grid item xs={12}>
            <List>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Typography variant='h5' sx={{ fontFamily: 'Raleway', fontWeight: 'bold', color: 'darkgreen', paddingBottom: '.5em', borderBottom: '1px solid #dc5a41'}}>Added Items</Typography>
                </Grid>
                { addOns.length > 0 ? 
                <>
                  { addOns.map((addon, i) => (
                    <Grid item xs={6} md={4} key={i}>
                      <Card>
                        <ListItem secondaryAction={<IconButton edge='end' aria-label='delete' onClick={removeItemHandler} value={addon.id}><DeleteIcon /></IconButton>}>
                          <ListItemText primary={addon.name} secondary={
                            <React.Fragment>
                              <Typography component={'span'} variant='body2'>
                                ${(addon.price).toFixed(2)}, Qty: {addon.qty}
                              </Typography>
                            </React.Fragment>
                          } />
                        </ListItem>
                      </Card>
                    </Grid>
                  ))}
                </> 
                : 
                <>
                  <Grid item xs={12}>
                    <Typography variant='body1'>There isn't any item added</Typography>
                  </Grid>
                </>
                }
              </Grid>
            </List>
          </Grid>
          {/* Buttons */}
          <Grid item xs={12} sx={{ marginTop: '1em'}}>
            <Grid container spacing={4}>
              <Grid item xs={4}>
                <Button variant='outlined' onClick={props.handleBack} sx={{ width: '100%'}}>Back</Button>
              </Grid>
              <Grid item xs={4} >
                <Button variant='contained' onClick={orderEditor} sx={{ width: '100%'}} >Add Items</Button>
              </Grid>
              <Grid item xs={4} >
                <Button variant='contained' onClick={nextHanlder} sx={{ width: '100%'}}>Next</Button>
              </Grid>
            </Grid>
          </Grid>
          {/* Alert */}
          <Modal open={alertModal}>
            <Card sx={{ width: 400, position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', padding: '2em 2em'}}>
              <Grid container>
                <Grid item xs={12} sx={{ borderBottom: '2px solid #dc5a41'}}>
                  <Typography variant='h5' sx={{ color: 'darkgreen', paddingLeft: '.5em', paddingBottom: '.25em'}}>Notice</Typography>
                </Grid>
                <Grid item xs={12} sx={{ paddingTop: '1em', paddingLeft: '1em'}}>
                  <Typography>There isn't any item added</Typography>
                </Grid>
                <Grid item xs={12} sx={{ paddingTop: '2.5em', display: 'center', justifyContent: 'center'}}>
                  <Button variant='contained' onClick={alertModalHandler}>Back</Button>
                </Grid>
              </Grid>
            </Card>
          </Modal>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}
export default AddOn;
