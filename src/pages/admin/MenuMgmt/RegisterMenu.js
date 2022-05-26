import axios from 'axios';
import { useState } from 'react';

// MUI components

import { TextField, Card, Grid, Button, Typography, FormControl, Select, MenuItem, InputLabel, Modal } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton'
import { ThemeProvider } from '@mui/material/styles';
import CheckCircleOutlineRounded from '@mui/icons-material/CheckCircleOutlineRounded';
import theme from '../../../theme/theme';

const RegisterMenu = (props) => {

  const [ name, setName ] = useState('');
  const [ description, setDescription ] = useState('');
  const [ caption, setCaption ] = useState('');
  const [ price, setPrice ] = useState(0);
  const [ category, setCategory ] = useState('');
  const [ Sub_Category, setSubCategory] = useState('');
  const [ stock_availability, setStock ] = useState(true);
  const [ processing, setProcessing ] = useState(false);
  const [ openModal, setOpenModal ] = useState(false);
  const [ error, setError ] = useState('');

  const categories = [
    {name: ''},
    {name: 'A La Carte'},
    {name: 'Appetizer'},
    {name: 'Lunch Special'},
    {name: 'Kitchen Entree'},
    {name: 'Party Platter'},
    {name: 'Regular Rolls'},
    {name: 'Vegetable Rolls'},
    {name: 'Soup & Salad'},
    {name: 'Special Rolls'},
    {name: 'Sushi & Sashimi'},
    {name: 'Drink'}
  ]

  // Handlers
  const nameInputHandler = (e) => {
    setName(e.currentTarget.value)
  }
  const captionInputHandler = (e) => {
    setCaption(e.currentTarget.value)
  }
  const descriptionInputHandler = (e) => {
    setDescription(e.currentTarget.value)
  }
  // TODO: format input for $ xx.xx
  const priceInputHandler = (e) => {
    setPrice(e.currentTarget.value)
  }
  // TODO: make a pull down menu for input
  const categoryInputHandler = (e) => {
    setCategory(e.target.value)
  }
  const subCategoryInputHandler = (e) => {
    setSubCategory(e.currentTarget.value)
  }

  const modalCloser = (e) => {
    setOpenModal(false);
  }

  const registerHandler = async (e) => {
    e.preventDefault();

    setProcessing(true);

    const config = {
      header: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${sessionStorage.authToken}`
      }
    }
  
  
    try {
      const {data} = await axios.post(
        `${process.env.REACT_APP_SERVER_URL}/api/menu`,
        { name, description, price, category, caption, Sub_Category, stock_availability },
        config
      );
      if (!!data.menu) {
        setOpenModal(true)
        setProcessing(false)
        resettingStates();
      }
      
    } catch (error) {
      setError('An Error occured during register the menu item');
      setTimeout(()=>{
        setError('');
      },10000)
    }
  }

  const resettingStates = () => {
    setName('');
    setDescription('');
    setCaption('');
    setPrice(0);
    setCategory('');
    setSubCategory('');
  }


  return (
    <ThemeProvider theme={theme}>
      <Grid container>
        <Grid item xs={12} sx={{ padding: '0 2em'}}>
          <Typography variant='h5' sx={{ fontFamily: 'RaleWay', fontWeight: 'bold', color: 'darkgreen'}}>
            Register Menu
          </Typography>
          <Typography variant='body1' sx={{ color: 'gray', fontSize: '.75em', fontStyle: 'italic', paddingTop: '5px'}}>
            For detailed menu item entry, please contact YK Technology Corporation representative.
          </Typography>
        </Grid>
        {/* form container */}
        <Grid item xs={12}>
          <Grid container spacing={2} sx={{ padding: '2em 2em'}}>
            <Grid item xs={12} md={6}>
              <TextField 
                value={name}
                label='Item Name'
                onChange={nameInputHandler}
                sx={{ width: '100%' }}
                required
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField 
                value={caption}
                label='Caption'
                onChange={captionInputHandler}
                sx={{ width: '100%' }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField 
                value={description}
                label='Description'
                onChange={descriptionInputHandler}
                sx={{ width: '100%' }}
                required
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField 
                value={price}
                label='Price'
                type='number'
                onChange={priceInputHandler}
                sx={{ width: '100%' }}
                required
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControl sx={{width: '100%'}}>
                <InputLabel>Category</InputLabel>
                <Select
                  value={category}
                  label='Category'
                  onChange={categoryInputHandler}
                  required
                >
                  {categories.map((category, i) => (
                    <MenuItem
                      value={category.name}
                      key={i}
                    >
                      {category.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField 
                value={Sub_Category}
                label='Sub Category'
                onChange={subCategoryInputHandler}
                sx={{ width: '100%'}}
              />
            </Grid>
            <Grid item xs={12}>
              <LoadingButton 
                variant='contained' 
                onClick={registerHandler}
                loading={processing}
              >
                Register
              </LoadingButton>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Modal open={openModal}>
        <Card sx={{ width: 400, position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', padding: '2em 2em'}}>
          <Grid container>
            <Grid item xs={12} sx={{ borderBottom: '2px solid #dc5a41'}}>
              <Typography variant='h5' sx={{ color: 'darkgreen', paddingLeft: '.5em', paddingBottom: '.25em'}}>Notice</Typography>
            </Grid>
            <Grid item xs={12} sx={{ paddingTop: '1em', paddingLeft: '1em', display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
              <Typography variant='h6' sx={{ color: '#dc5a41'}}>Registered the item successfully!</Typography>
              <CheckCircleOutlineRounded sx={{ fontSize: '6em', paddingTop: '5px', color: 'green'}}/>
            </Grid>
            <Grid item xs={12} sx={{ paddingTop: '2.5em', display: 'center', justifyContent: 'center'}}>
              <Button variant='contained' onClick={modalCloser}>Close modal</Button>
            </Grid>
          </Grid>
        </Card>
      </Modal>
    </ThemeProvider>
    // <div className="Register_admin_Container">
    //   <form onSubmit={registerHandler} className='register_admin_form'>
    //     <h3 className="register_title">Register Menu</h3>
    //     { error && <span className="error_message">{error}</span> }
    //     <div className="form-group">

    //     <div className="form-group">
    //       <label htmlFor="description">Description:</label>
    //       <input
    //         type='text'
    //         id='description'
    //         placeholder="Enter description"
    //         value={description}
    //         onChange={(e) => setDescription(e.target.value)}
    //       />
    //     </div>

    //     <div className="form-group">
    //       <label htmlFor="price">Price: <span className="form_caption">(delete 0 for input)</span></label>
    //       <input
    //         type='number'
    //         required
    //         id='price'
    //         placeholder="Enter price"
    //         value={price}
    //         onChange={(e) => setPrice(e.target.value)}
    //       />
    //     </div>

    //     <div className="form-group">
    //       <label htmlFor="category">Category:</label>
    //       <input
    //         type='text'
    //         required
    //         id='category'
    //         placeholder="Enter category"
    //         value={category}
    //         onChange={(e) => setCategory(e.target.value)}
    //       />
    //     </div>

    //     <div className="form-group">
    //       <label htmlFor="Sub_Category">Sub Category:</label>
    //       <input
    //         type='text'
    //         id='Sub_Category'
    //         placeholder="Enter sub category"
    //         value={Sub_Category}
    //         onChange={(e) => setSubCategory(e.target.value)}
    //       />
    //     </div>

    //     <button type="submit" className="form_button_primary">Register</button>

    //   </form>
    // </div>
  )
}

export default RegisterMenu;

