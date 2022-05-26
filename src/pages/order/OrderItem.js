import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

// MUI
import { ThemeProvider } from '@mui/material/styles';
import theme from '../../theme/theme';
import { Card, Typography, Button, Chip, Stack, Grid, ToggleButtonGroup, ToggleButton, FormGroup, FormControlLabel, TextField, Collapse, List, ListItemButton, ListItemText, Switch, RadioGroup, Radio, Select, MenuItem, InputLabel, FormControl } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import RemoveOutlinedIcon from '@mui/icons-material/RemoveOutlined';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';

const OrderItem = (props) => {
  
  // states
  const [ item, setItem ] = useState([]);
  const [ dataLoaded, setDataLoaded ] = useState(false);
  const [ loadCount, setLoadCount] = useState(0);
  const [ optionOpen, setOptionOpen ] = useState(false);
  const [ itemQty, setItemQty ] = useState(1);
  const [ brownRice, setBrownRice ] = useState(false);
  const [ soyPaper, setSoyPaper ] = useState(false);
  const [ spicyMayo, setSpicyMayo ] = useState(false);
  const [ eelSauce, setEelSauce ] = useState(false);
  const [ crunch, setCrunch ] = useState(false);
  const [ tunaOrSalmon, setTunaOrSalmon ] = useState('Not Selected');
  const [ spicyOrSweet, setSpicyOrSweet ] = useState('Not Selected');
  const [ porkOrVeg, setPorkOrVeg ] = useState('Not Selected');
  const [ caliOrSpTuna, setCaliOrSpTuna ] = useState('Not Selected');
  const [ salGoneOrRain, setSalGoneOrRain ] = useState('Not Selected');
  const [ instruction, setInstruction ] = useState('');
  const [ roll1, setRoll1 ] = useState('');
  const [ roll2, setRoll2 ] = useState('');
  const [ roll3, setRoll3 ] = useState('');

  const navigate = useNavigate();
  
  useEffect(() => {
    async function fetchData() {
      const config = {
        header: {
          "Content-Type": "application/json"
        }
      }
      
      const { data } = await axios.get(`${process.env.REACT_APP_SERVER_URL}/api/menu/list/${props.product}`, config);
      
      await setItem(data);
      await setDataLoaded(true);
    }
    fetchData();
  },[props.product, loadCount]);

  // Lunch Roll choices
  const lunchRollChoices = [
    'California Roll',
    'Tuna Avocado Roll',
    'Tuna Roll',
    'Smoked Salmon Roll',
    'Mango Roll',
    'Mango avocado Roll',
    'Spicy Tuna Roll',
    'Salmon Avocado Roll',
    'Salmon Roll',
    'Avocado Roll',
    'Cucumber Avocado Roll',
    'Spicy Salmon Roll',
    'Alaska Roll',
    'Yellowtail Roll',
    'Cucumber Roll',
    'AAC Roll',
  ]

  // Handlers
  const addNum = (e) => {
    setItemQty(
      itemQty+1
    )
  };

  const subNum = (e) => {
    if (itemQty > 1) {
      setItemQty(
        itemQty-1
      )
    } else {
      setItemQty(1)
    }
  };

  const handleChange = (e) => {
    e.preventDefault();
    setItemQty(e.target.value);
  };

  const optionOpenHandler = (e) => {
    setOptionOpen(!optionOpen);
  };

  const brownRiceHandler = (e) => {
    if (e.target.checked) {
      setBrownRice(true)
    } else {
      setBrownRice(false)
    }
  };

  const soyPaperHandler = (e) => {
    if (e.target.checked) {
      setSoyPaper(true)
    } else {
      setSoyPaper(false)
    }
  };

  const spicyMayoHandler = (e) => {
    if (e.target.checked) {
      setSpicyMayo(true)
    } else {
      setSpicyMayo(false)
    }
  };

  const eelSauceHandler = (e) => {
    if (e.target.checked) {
      setEelSauce(true)
    } else {
      setEelSauce(false)
    }
  };

  const crunchHandler = (e) => {
    if (e.target.checked) {
      setCrunch(true)
    } else {
      setCrunch(false)
    }
  };

  const tunaSalHandler = (e) => {
    setTunaOrSalmon(e.target.value);
  };

  const instructionHandler = (e) => {
    setInstruction(e.target.value);
  };

  const lunchRoll1Handler = (e) => {
    setRoll1(e.target.value);
  };

  const lunchRoll2Handler = (e) => {
    setRoll2(e.target.value);
  };

  const lunchRoll3Handler = (e) => {
    setRoll3(e.target.value);
  };

  const spicySweetHandler = (e) => {
    setSpicyOrSweet(e.target.value);
  };

  const porkVegHandler = (e) => {
    setPorkOrVeg(e.target.value);
  }

  const caliOrSpTunaHandler = (e) => {
    setCaliOrSpTuna(e.target.value);
  }

  const salGoneOrRainHandler = (e) => {
    setSalGoneOrRain(e.target.value);
  }

  const loadCountHandler = (e) => {
    navigate('/')
    window.location.reload(false)
  }

  const AddToCartHandler = (e) => {
    let id = props.product
    let qty = itemQty
    if (item.menu.category === 'Special Rolls' || item.menu.category === 'Regular Rolls' || item.menu.category === 'Vegetable Rolls') {
      if (item.menu.name === 'Naruto') {
        props.setCart([{
          id: id,
          qty: qty,
          name: item.menu.name,
          price: item.menu.price,
          caption: item.menu.caption,
          category: item.menu.category,
          Sub_Category: item.menu.Sub_Category,
          stock_availability: item.menu.stock_availability,
          description: item.menu.description,
          options: [
            {
              name: 'Spicy Mayo',
              selected: spicyMayo,
              price: 0.5,
              id: '620d327e7b251cf7c3a827ee'
            },
            {
              name: 'Eel Sauce',
              selected: eelSauce,
              price: 0.5,
              id: '620d32727b251cf7c3a827ec'
            },
            {
              name: 'Crunch',
              selected: crunch,
              price: 0.5,
              id: '620d32637b251cf7c3a827ea'
            }],
          comments: instruction
        },...props.cart])
      } else if (item.menu.caption === 'Soy Paper') {
        props.setCart([{
          id: id,
          qty: qty,
          name: item.menu.name,
          price: item.menu.price,
          caption: item.menu.caption,
          category: item.menu.category,
          Sub_Category: item.menu.Sub_Category,
          stock_availability: item.menu.stock_availability,
          description: item.menu.description,
          options: [
            {
              name: 'Brown Rice',
              selected: brownRice,
              price: 1,
              id: '620d32477b251cf7c3a827e6'
            },
            {
              name: 'Spicy Mayo',
              selected: spicyMayo,
              price: 0.5,
              id: '620d327e7b251cf7c3a827ee'
            },
            {
              name: 'Eel Sauce',
              selected: eelSauce,
              price: 0.5,
              id: '620d32727b251cf7c3a827ec'
            },
            {
              name: 'Crunch',
              selected: crunch,
              price: 0.5,
              id: '620d32637b251cf7c3a827ea'
            }],
          comments: instruction
        },...props.cart])
      } else if (item.menu.caption === 'Tuna or Salmon') {
        props.setCart([{
          id: id,
          qty: qty,
          name: item.menu.name,
          price: item.menu.price,
          caption: item.menu.caption,
          category: item.menu.category,
          Sub_Category: item.menu.Sub_Category,
          stock_availability: item.menu.stock_availability,
          description: item.menu.description,
          options: [
            {
              name: 'Brown Rice',
              selected: brownRice,
              price: 1,
              id: '620d32477b251cf7c3a827e6'
            },
            {
              name: 'Soy Paper',
              selected: soyPaper,
              price: 1,
              id: '620d32547b251cf7c3a827e8'
            },
            {
              name: 'Spicy Mayo',
              selected: spicyMayo,
              price: 0.5,
              id: '620d327e7b251cf7c3a827ee'
            },
            {
              name: 'Eel Sauce',
              selected: eelSauce,
              price: 0.5,
              id: '620d32727b251cf7c3a827ec'
            },
            {
              name: 'Crunch',
              selected: crunch,
              price: 0.5,
              id: '620d32637b251cf7c3a827ea'
            }],
          tunaOrSalmon: tunaOrSalmon,
          comments: instruction
        },...props.cart])
      } else {
        props.setCart([{
          id: id,
          qty: qty,
          name: item.menu.name,
          price: item.menu.price,
          caption: item.menu.caption,
          category: item.menu.category,
          Sub_Category: item.menu.Sub_Category,
          stock_availability: item.menu.stock_availability,
          description: item.menu.description,
          options: [
            {
              name: 'Brown Rice',
              selected: brownRice,
              price: 1,
              id: '620d32477b251cf7c3a827e6'
            },
            {
              name: 'Soy Paper',
              selected: soyPaper,
              price: 1,
              id: '620d32547b251cf7c3a827e8'
            },
            {
              name: 'Spicy Mayo',
              selected: spicyMayo,
              price: 0.5,
              id: '620d327e7b251cf7c3a827ee'
            },
            {
              name: 'Eel Sauce',
              selected: eelSauce,
              price: 0.5,
              id: '620d32727b251cf7c3a827ec'
            },
            {
              name: 'Crunch',
              selected: crunch,
              price: 0.5,
              id: '620d32637b251cf7c3a827ea'
            }],
          comments: instruction
        },...props.cart])
      }
    } else if (item.menu.Sub_Category === 'Lunch Roll Combo') {
      props.setCart([{
        id: id,
        qty: qty,
        name: item.menu.name,
        price: item.menu.price,
        caption: item.menu.caption,
        category: item.menu.category,
        Sub_Category: item.menu.Sub_Category,
        stock_availability: item.menu.stock_availability,
        description: item.menu.description,
        rollChoices: [{
          roll1: roll1,
          roll2: roll2,
          roll3: roll3
        }],
        comments: instruction
      },...props.cart])
    } else if (item.menu.caption === 'Spicy or Sweet') {
      props.setCart([{
        id: id,
        qty: qty,
        name: item.menu.name,
        price: item.menu.price,
        caption: item.menu.caption,
        category: item.menu.category,
        Sub_Category: item.menu.Sub_Category,
        stock_availability: item.menu.stock_availability,
        description: item.menu.description,
        spicyOrSweet: spicyOrSweet,
        comments: instruction
      },...props.cart])
    } else if (item.menu.name === 'Gyoza') {
      props.setCart([{
        id: id,
        qty: qty,
        name: item.menu.name,
        price: item.menu.price,
        caption: item.menu.caption,
        category: item.menu.category,
        Sub_Category: item.menu.Sub_Category,
        stock_availability: item.menu.stock_availability,
        description: item.menu.description,
        porkOrVeg: porkOrVeg,
        comments: instruction
      },...props.cart])
    } else if (item.menu.name === 'Sushi Regular' || item.menu.name === 'Sushi & Sashimi Regular Sets' || item.menu.name === 'Sushi Lunch') {
      props.setCart([{
        id: id,
        qty: qty,
        name: item.menu.name,
        price: item.menu.price,
        caption: item.menu.caption,
        category: item.menu.category,
        Sub_Category: item.menu.Sub_Category,
        stock_availability: item.menu.stock_availability,
        description: item.menu.description,
        caliOrSpTuna: caliOrSpTuna,
        comments: instruction
      },...props.cart])
    } else if (item.menu.name === 'Sushi Deluxe' || item.menu.name === "Sushi & Sashimi Deluxe Sets") {
      props.setCart([{
        id: id,
        qty: qty,
        name: item.menu.name,
        price: item.menu.price,
        caption: item.menu.caption,
        category: item.menu.category,
        Sub_Category: item.menu.Sub_Category,
        stock_availability: item.menu.stock_availability,
        description: item.menu.description,
        salGoneOrRain: salGoneOrRain,
        comments: instruction
      },...props.cart])
    } else {
      props.setCart([{
        id: id,
        qty: qty,
        name: item.menu.name,
        price: item.menu.price,
        caption: item.menu.caption,
        category: item.menu.category,
        Sub_Category: item.menu.Sub_Category,
        stock_availability: item.menu.stock_availability,
        description: item.menu.description,
        comments: instruction
      },...props.cart])
    }
    props.modalCloser();
  };

  return (
    <ThemeProvider theme={theme}>
      <Card sx={{ width: 450, padding: '3em 3em', position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
        { dataLoaded ? (
          <Grid container>
            {/* item name */}
            <Grid item xs={12} sx={{ paddingBottom: '.5em', marginBottom: '1em', borderBottom: '2px solid #dc5a41'}}>
              <Typography variant='h5' sx={{ color: 'darkgreen', fontWeight: 'bold'}}>
                {item.menu.name}
              </Typography>
            </Grid>
            {/* item captions */}
            <Grid item xs={12}>
              <Stack direction='row' spacing={1} sx={{ paddingBottom: '.5em', marginBottom: '1em'}}>
                {item.menu.caption === "" ? <></> : <Chip label={item.menu.caption} size="small" variant='outlined' color='primary' sx={{ color: '#dc5a41' }}/>}
                {item.menu.category === "" ? <></> : <Chip label={item.menu.category} size="small" variant='outlined' color='primary' sx={{ color: '#dc5a41' }}/>}
                {item.menu.Sub_Category === "" ? <></> : <Chip label={item.menu.Sub_Category} size="small" variant='outlined' color='primary' sx={{ color: '#dc5a41' }}/>}
                {item.menu.stock_availability ? <Chip label='In-Stock' size='small' variant='outlined' color='primary' /> : <Chip label='Out of Stock' size="small" variant='filled' color='warning' />}
              </Stack>
            </Grid>
            {/* item descriptions */}
            <Grid item xs={12} sx={{ borderBottom: '1px solid gray'}}>
              <Typography sx={{marginBottom: '1em'}}>{item.menu.description}</Typography>
            </Grid>
            {/* item price */}
            <Grid item xs={12}>
              <Grid container sx={{ paddingTop: '1em'}}>
                <Grid item xs={3}>
                  <Typography sx={{lineHeight: '2em', fontStyle: 'italic', color: 'gray' }}>Price: </Typography>
                </Grid>
                <Grid item xs={9}>
                  <Typography variant='h5' color='primary' sx={{marginBottom: '1em'}}>${(item.menu.price).toFixed(2)}</Typography>
                </Grid>
              </Grid>
            </Grid>
            {/* item qty */}
            <Grid item xs={12}>
              <Grid container sx={{ marginBottom: '1em' }}>
                <Grid item xs={3}>
                  <Typography sx={{ lineHeight: '2.5em', fontStyle: 'italic', color: 'gray'}}>Quantity:</Typography>
                </Grid>
                <Grid item xs={9}>
                  <ToggleButtonGroup>
                    <ToggleButton size='small' onClick={subNum} value='on'>
                      <RemoveOutlinedIcon />
                    </ToggleButton>
                    <ToggleButton size='small' disabled value='off'>
                      <input type='number' value={itemQty} onChange={handleChange} style={{ margin: '0 0', padding: '0 0', width: '2em', border: 'none', textAlign: 'center', height: '2em', fontWeight: 'bold'}}/>
                    </ToggleButton>
                    <ToggleButton size='small' onClick={addNum} value='on'>
                      <AddOutlinedIcon />
                    </ToggleButton>
                  </ToggleButtonGroup>
                </Grid>
              </Grid>
            </Grid>
            {/* default options */}
            <Grid item xs={12}>
              <FormGroup>
                {/* Tuna/salmon */}
                { item.menu.caption === 'Tuna or Salmon' ?
                  <Grid container>
                    <Grid item xs={3}>
                      <Typography sx={{ paddingTop: '5px', fontStyle: 'italic', color: 'gray'}}>Choice:</Typography>
                    </Grid>
                    <Grid item xs={9}>
                      <RadioGroup
                        row
                        name='tunaOrSalmon'
                        value={tunaOrSalmon}
                        onChange={tunaSalHandler}
                        sx={{ justifyContent: 'flex-start'}}
                      >
                        <FormControlLabel value='Tuna' control={<Radio />} label='Tuna' />
                        <FormControlLabel value='Salmon' control={<Radio />} label='Salmon' />
                      </RadioGroup>
                    </Grid>
                  </Grid>
                  :
                  <></>
                }
                {/* pick 2 lunch */}
                { item.menu.name === 'Pick 2 Rolls Lunch' ? 
                  <Grid container sx={{ marginTop: '.5em', marginBottom: '1em'}}>
                    <Grid item xs={3}>
                      <Typography sx={{ fontStyle: 'italic', color: 'gray', lineHeight: '3em' }}>Select: </Typography>
                    </Grid>
                    <Grid item xs={9}>
                      <FormControl>
                        <InputLabel>Pick Roll 1</InputLabel>
                        <Select
                          id='pickrolls1'
                          value={roll1}
                          onChange={lunchRoll1Handler}
                          label='Pick roll 1'
                          sx={{ width: '20em', marginBottom: '.5em' }}
                          variant='outlined'
                        >
                          {
                            lunchRollChoices.map((item) => (
                              <MenuItem
                                key={item}
                                value={item}
                              >
                                {item}
                              </MenuItem>
                            ))
                          }
                        </Select>
                      </FormControl>
                      <FormControl>
                        <InputLabel>Pick Roll 2</InputLabel>
                        <Select
                          id='pickrolls2'
                          value={roll2}
                          onChange={lunchRoll2Handler}
                          label='Pick roll 2'
                          sx={{ width: '20em' }}
                          variant='outlined'
                        >
                          {
                            lunchRollChoices.map((item) => (
                              <MenuItem
                                key={item}
                                value={item}
                              >
                                {item}
                              </MenuItem>
                            ))
                          }
                        </Select>
                      </FormControl>
                    </Grid>
                  </Grid> 
                  : 
                  <></>
                }
                {/* pick 3 lunch */}
                { item.menu.name === 'Pick 3 Rolls Lunch' ? 
                  <Grid container sx={{ marginTop: '.5em', marginBottom: '1em'}}>
                    <Grid item xs={3}>
                      <Typography sx={{ fontStyle: 'italic', color: 'gray', lineHeight: '3em' }}>Select: </Typography>
                    </Grid>
                    <Grid item xs={9}>
                      <FormControl>
                        <InputLabel>Pick Roll 1</InputLabel>
                        <Select
                          id='pickrolls1'
                          value={roll1}
                          onChange={lunchRoll1Handler}
                          label='Pick roll 1'
                          sx={{ width: '20em', marginBottom: '.5em' }}
                          variant='outlined'
                        >
                          {
                            lunchRollChoices.map((item) => (
                              <MenuItem
                                key={item}
                                value={item}
                              >
                                {item}
                              </MenuItem>
                            ))
                          }
                        </Select>
                      </FormControl>
                      <FormControl>
                        <InputLabel>Pick Roll 2</InputLabel>
                        <Select
                          id='pickrolls2'
                          value={roll2}
                          onChange={lunchRoll2Handler}
                          label='Pick roll 2'
                          sx={{ width: '20em', marginBottom: '.5em' }}
                          variant='outlined'
                        >
                          {
                            lunchRollChoices.map((item) => (
                              <MenuItem
                                key={item}
                                value={item}
                              >
                                {item}
                              </MenuItem>
                            ))
                          }
                        </Select>
                      </FormControl>
                      <FormControl>
                        <InputLabel>Pick Roll 3</InputLabel>
                        <Select
                          id='pickrolls3'
                          value={roll3}
                          onChange={lunchRoll3Handler}
                          label='Pick roll 3'
                          sx={{ width: '20em' }}
                          variant='outlined'
                        >
                          {
                            lunchRollChoices.map((item) => (
                              <MenuItem
                                key={item}
                                value={item}
                              >
                                {item}
                              </MenuItem>
                            ))
                          }
                        </Select>
                      </FormControl>
                    </Grid>
                  </Grid> 
                  : 
                  <></>
                }
                {/* spicy or sweet */}
                { item.menu.caption === 'Spicy or Sweet' ?
                  <Grid container>
                    <Grid item xs={3}>
                      <Typography sx={{ paddingTop: '5px', fontStyle: 'italic', color: 'gray'}}>Choice:</Typography>
                    </Grid>
                    <Grid item xs={9}>
                      <RadioGroup
                        row
                        name='spicyOrSweet'
                        value={spicyOrSweet}
                        onChange={spicySweetHandler}
                        sx={{ justifyContent: 'flex-start'}}
                      >
                        <FormControlLabel value='Spicy' control={<Radio />} label='Spicy' />
                        <FormControlLabel value='Sweet' control={<Radio />} label='Sweet' />
                      </RadioGroup>
                    </Grid>
                  </Grid>
                  :
                  <></>
                }
                {/* Gyoza */}
                { item.menu.name === 'Gyoza' ?
                  <Grid container>
                    <Grid item xs={3}>
                      <Typography sx={{ paddingTop: '5px', fontStyle: 'italic', color: 'gray'}}>Choice:</Typography>
                    </Grid>
                    <Grid item xs={9}>
                        <RadioGroup
                          row
                          name='porkOrVeg'
                          value={porkOrVeg}
                          onChange={porkVegHandler}
                          sx={{ justifyContent: 'flex-start'}}
                        >
                          <FormControlLabel value='Pork' control={<Radio />} label='Pork' />
                          <FormControlLabel value='Vegetable' control={<Radio />} label='Vegetable' />
                        </RadioGroup>
                      </Grid>
                    </Grid>
                  : <></>
                }
                {/* cali or sp tuna */}
                { item.menu.name === 'Sushi Regular' || item.menu.name === "Sushi & Sashimi Regular Sets" || item.menu.name === 'Sushi Lunch' ?
                  <Grid container>
                    <Grid item xs={3}>
                      <Typography sx={{ paddingTop: '5px', fontStyle: 'italic', color: 'gray'}}>Choice:</Typography>                      
                    </Grid>
                    <Grid item xs={9}>
                      <RadioGroup
                        row
                        name='caliOrSpTuna'
                        value={caliOrSpTuna}
                        onChange={caliOrSpTunaHandler}
                        sx={{ justifyContent: 'flex-start'}}
                      >
                        <FormControlLabel value='California Roll' control={<Radio />} label='California Roll' />
                        <FormControlLabel value='Spicy Tuna Roll' control={<Radio />} label='Spicy Tuna Roll' />
                      </RadioGroup>
                    </Grid>
                  </Grid> : <></>
                }
                {/* salGone or rain */}
                { item.menu.name === 'Sushi Deluxe' || item.menu.name === "Sushi & Sashimi Deluxe Sets" ?
                  <Grid container>
                    <Grid item xs={3}>
                      <Typography sx={{ paddingTop: '5px', fontStyle: 'italic', color: 'gray'}}>Choice:</Typography>                      
                    </Grid>
                    <Grid item xs={9}>
                      <RadioGroup
                        row
                        name='salgoneOrRain'
                        value={salGoneOrRain}
                        onChange={salGoneOrRainHandler}
                        sx={{ justifyContent: 'flex-start'}}
                      >
                        <FormControlLabel value='Salmon Gone Wild Roll' control={<Radio />} label='Salmon Gone Wild Roll' />
                        <FormControlLabel value='Rainbow Roll' control={<Radio />} label='Rainbow Roll' />
                      </RadioGroup>
                    </Grid>
                  </Grid> : <></>
                }
              </FormGroup>
            </Grid>
            {/* options */}
            <Grid item xs={12}>
              <List>
                <ListItemButton onClick={optionOpenHandler} sx={{ backgroundColor: '#f1f1f1', borderRadius: '5px'}}>
                  <ListItemText primary='Options' sx={{ color: '#dc5a41', fontStyle: 'italic' }} />
                  { optionOpen ? <ExpandLess /> : <ExpandMore /> }
                </ListItemButton>
                <Collapse in={optionOpen} timeout='auto' unmountOnExit>
                  <FormGroup>
                    <Grid container sx={{ paddingLeft: '5px', paddingRight: '3px'}}>
                      {/* Rolls */}
                      { item.menu.category === 'Special Rolls' || item.menu.category === 'Regular Rolls' || item.menu.category === 'Vegetable Rolls' ? 
                        <>
                          {/* Naruto */}
                          { item.menu.name === 'Naruto' ? <></> :
                            <>
                              {/* brown rice */}
                              <Grid item xs={6}>
                                <FormControlLabel control={<Switch onChange={brownRiceHandler} />} label='Brown Rice +$1.00' />
                              </Grid>
                              {/* Soy paper */}
                              { item.menu.caption !== 'Soy Paper' ? 
                                <Grid item xs={6}>
                                  <FormControlLabel control={<Switch onChange={soyPaperHandler} />} label='Soy Paper +$1.00' />
                                </Grid>
                                :
                                <></>
                              }
                            </>
                          }
                          {/* crunch */}
                          <Grid item xs={6}>
                            <FormControlLabel control={<Switch onChange={crunchHandler} />} label='Crunch topping +$0.50' />
                          </Grid>
                          {/* spicy mayo */}
                          <Grid item xs={6}>
                            <FormControlLabel control={<Switch onChange={spicyMayoHandler} />} label='Spicy Mayo topping +$0.50' />
                          </Grid>
                          {/* eel sauce */}
                          <Grid item xs={6}>
                            <FormControlLabel control={<Switch onChange={eelSauceHandler} />} label='Eel Sauce topping +$0.50' />
                          </Grid>
                        </>
                        :
                        <></>
                      }
                      {/* Instructions */}
                      <Grid item xs={12} sx={{ paddingTop: '1em'}}>
                        <TextField multiline maxRows={4} value={instruction} onChange={instructionHandler} variant='outlined' placeholder='Special Instructions' sx={{ width: '100%' }} />
                      </Grid>
                    </Grid>
                  </FormGroup>
                </Collapse>
              </List>
            </Grid>
            {/* buttons */}
            <Grid item xs={12}>
              <Grid container spacing={1}>
                <Grid item xs={6}>
                  { item.menu.stock_availability ?
                    <Button
                      variant='contained'
                      onClick={AddToCartHandler}
                      sx={{ width: '100%' }}
                    >
                      <ShoppingCartIcon sx={{ fontSize: '1.3em' }} />&nbsp;Add to Cart
                    </Button>
                  :
                    <Button
                      variant='contained'
                      disabled
                    >
                      Item out of stock
                    </Button>
                  }
                </Grid>
                <Grid item xs={6}>
                  <Button onClick={(e) => props.modalCloser()} sx={{ width: '100%' }}>
                    Close Window
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          )
          :
          <Card elevation={0}>
            <Grid container direction='column'>
              <Grid item xs={12} sx={{ marginBottom: '.5em'}}>
                <Typography variant='h5' sx={{ color: 'darkgreen', fontWeight: 'bold'}}>
                  Loading...
                </Typography>
              </Grid>
              <Grid item xs={12} sx={{ marginBottom: '.5em'}}>
                <Typography variant='p1'>
                  Click Button to load again
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Button onClick={loadCountHandler} variant='contained'>Reload</Button>
              </Grid>
            </Grid>
          </Card>
        }
      </Card>
    </ThemeProvider>
  );
};
export default OrderItem;