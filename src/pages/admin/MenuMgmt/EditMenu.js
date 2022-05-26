import { useState, useEffect } from 'react';

// MUI
import { ThemeProvider } from '@mui/material/styles'
import theme from '../../../theme/theme';
import { Typography, Grid, Button, Modal, Card, TextField, Switch } from '@mui/material';
import { LoadingButton } from '@mui/lab'
import axios from 'axios';

const EditMenu = (props) => {
  const [ name, setName ] = useState('');
  const [ description, setDescription ] = useState('');
  const [ caption, setCaption ] = useState('');
  const [ price, setPrice ] = useState(0);
  const [ category, setCategory ] = useState('');
  const [ Sub_Category, setSubCategory] = useState('');
  const [ stock_availability, setStock ] = useState(false);
  const [ receivedData, setReceivedData ] = useState([]);
  const [ modalOpen, setModalOpen ] = useState(false);
  const [ selectedID, setSelectedID ] = useState('')
  const [ selectedMenu, setSelectedMenu ] = useState();
  const [ updateIsProcessing, setUpdateIsProcessing ] = useState(false);
  const [ deleteIsProcessing, setDeleteIsProcessing ] = useState(false);
  
  // handlers
  const modalOpener = async (e) => {
    const setStates = async (data) => {
      if (!!data) {
          await setName(data.name)
          await setDescription(data.description)
          await setCaption(data.caption)
          await setPrice(data.price)
          await setCategory(data.category)
          await setSubCategory(data.Sub_Category)
          await setStock(data.stock_availability)
          await setSelectedID(data._id)
        }
      }
    const findOneMenu = async (data) => {
      const foundMenu = receivedData.find(menu => menu._id === data)
      await setSelectedMenu(foundMenu)
      setStates(foundMenu)
    }
    
    findOneMenu(e.target.value)
    setModalOpen(true);
    }
    
    const modalCloser = (e) => {
      setModalOpen(false)
    }
    
    const stockFormatter = (boolean) => {
      if (boolean) {
        return 'in stock'
      } else {
        return 'out of stock'
      }
    }

    const nameInputHandler = (e) => {
      setName(e.currentTarget.value);
    }

    const categoryInputHandler = (e) => {
      setCategory(e.currentTarget.value);
    }

    const subCategoryInputHandler = (e) => {
      setSubCategory(e.currentTarget.value);
    }

    const captionInputHandler = (e) => {
      setCaption(e.currentTarget.value);
    }

    const priceInputHandler = (e) => {
      setPrice(e.currentTarget.value);
    }

    const descriptionInputHandler = (e) => {
      setDescription(e.currentTarget.value);
    }

    const stockInputHandler = (e) => {
      setStock(e.target.checked);
    }

    // Edit request
    const updateButtonHandler = async (e) => {
      setUpdateIsProcessing(true)
      const config = {
        header: {
          "Content-Type": "application/json"
        }
      }

      const request = {
        body: {
          name: name,
          description: description,
          caption: caption,
          price: price,
          category: category,
          Sub_Category: Sub_Category,
          stock_availability: stock_availability
        }
      }

      try {
        const { data } = await axios.put(`${process.env.REACT_APP_SERVER_URL}/api/menu/update/${selectedID}`, request.body, config)
        setUpdateIsProcessing(false)
        modalCloser();
      } catch (err) {
        console.log(err)
      }
    }

    // Delete request
    const deleteButtonHandler = async (e) => {
      setDeleteIsProcessing(true)
      const config = {
        header: {
          "Content-Type": "application/json"
        }
      }

      const request = {
        body: {
          name: name,
          description: description,
          caption: caption,
          price: price,
          category: category,
          Sub_Category: Sub_Category,
          stock_availability: stock_availability
        }
      }

      try {
        const { data } = await axios.delete(`${process.env.REACT_APP_SERVER_URL}/api/menu/delete/${selectedID}`, request.body, config)
        setDeleteIsProcessing(false)
        modalCloser()
      } catch (err) {
        console.log(err)
      }
    }

    // ------------------------------------- receiving all menu from api
    useEffect(() => {
      if (props.receivedData.length > 0) {
        setReceivedData(props.receivedData);
      }
    },[props.receivedData, selectedMenu])

  return (
    <ThemeProvider theme={theme}>
      <Grid container>
        <Grid item xs={12}>
          <Card elevation={2} sx={{ marginTop: '1em'}}>
            <Grid container sx={{ height: '2em', padding: '3ps 3px', minWidth: '900px', bgcolor: 'darkgreen', textAlign: 'center', color: 'white'}}>
              <Grid item sx={{ padding: '3px 3px', borderRight: '1px solid gray'}} xs={2}>
                <Typography>Name</Typography>
              </Grid>
              <Grid item sx={{ padding: '3px 3px', borderRight: '1px solid gray'}} xs={1.5}>
                <Typography>Category</Typography>
              </Grid>
              <Grid item sx={{ padding: '3px 3px', borderRight: '1px solid gray'}} xs={1.5}>
                <Typography>Sub_Category</Typography>
              </Grid>
              <Grid item sx={{ padding: '3px 3px', borderRight: '1px solid gray'}} xs={1}>
                <Typography>Price</Typography>
              </Grid>
              <Grid item sx={{ padding: '3px 3px', borderRight: '1px solid gray'}} xs={1}>
                <Typography>Stock</Typography>
              </Grid>
              <Grid item sx={{ padding: '3px 3px', borderRight: '1px solid gray'}} xs={1}>
                <Typography>Caption</Typography>
              </Grid>
              <Grid item sx={{ padding: '3px 3px', borderRight: '1px solid gray'}} xs={3}>
                <Typography>Description</Typography>
              </Grid>
              <Grid item sx={{ padding: '3px 3px'}} xs={1}>
                <Typography>Edit</Typography>
              </Grid>
            </Grid>
            <Grid container>
              <Grid item xs={12} sx={{ maxHeight: '80vh', overflow: 'auto'}}>
                {receivedData.map((menu, i) => (
                  <Grid container sx={{ minWidth: '900px', borderBottom: '1px solid lightgray', padding: '3px 0'}} key={i}>
                    <Grid item xs={2} sx={{ paddingLeft: 3, display: 'flex', alignItems: 'center'}}>
                      <Typography sx={{ fontSize: '.85em'}}>{menu.name}</Typography>
                    </Grid>
                    <Grid item xs={1.5} sx={{ paddingLeft: 3, display: 'flex', alignItems: 'center'}}>
                      <Typography sx={{ fontSize: '.85em'}}>{menu.category}</Typography>
                    </Grid>
                    <Grid item xs={1.5} sx={{ paddingLeft: 3, display: 'flex', alignItems: 'center'}}>
                      <Typography sx={{ fontSize: '.85em'}}>{menu.Sub_Category}</Typography>
                    </Grid>
                    <Grid item xs={1} sx={{ paddingLeft: 3, display: 'flex', alignItems: 'center'}}>
                      <Typography sx={{ fontSize: '.85em'}}>$ {menu.price.toFixed(2)}</Typography>
                    </Grid>
                    <Grid item xs={1} sx={{ paddingLeft: 3, display: 'flex', alignItems: 'center'}}>
                      <Typography sx={{ fontSize: '.85em'}}>{stockFormatter(menu.stock_availability)}</Typography>
                    </Grid>
                    <Grid item xs={1} sx={{ paddingLeft: 3, display: 'flex', alignItems: 'center'}}>
                      <Typography sx={{ fontSize: '.85em'}}>{menu.caption}</Typography>
                    </Grid>
                    <Grid item xs={3} sx={{ paddingLeft: 3, display: 'flex', alignItems: 'center'}}>
                      <Typography sx={{ fontSize: '.85em'}}>{menu.description}</Typography>
                    </Grid>
                    <Grid item xs={1} sx={{ paddingLeft: 3, display: 'flex', alignItems: 'center'}}>
                      <Button value={menu._id} onClick={modalOpener}>Edit</Button>
                    </Grid>
                  </Grid>
                ))}
              </Grid>
            </Grid>
          </Card>
        </Grid>
      </Grid>
      <Modal open={modalOpen}>
        <Card sx={{ width: 400, position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', padding: '2em 2em'}}>
          <Grid container>
            <Grid item xs={12} sx={{ borderBottom: '2px solid #dc5a41'}}>
              <Typography variant='h5' sx={{ color: 'darkgreen', paddingLeft: '.5em', paddingBottom: '.25em'}}>Menu Edit</Typography>
            </Grid>
            <Grid item xs={12} sx={{ paddingTop: '1em', paddingLeft: '1em', paddingRight: '1em'}}>
              <Grid container>
                <Grid item xs={12}>
                  <Typography variant='body1' sx={{ fontSize: '.75em', fontStyle: 'italic', fontWeight: 'light', marginBottom: '1em'}}>For detailed menu item changes, please contact YK Technology Corporation representative.</Typography>
                  <TextField 
                    value={name}
                    label='Menu Item Name'
                    onChange={nameInputHandler}
                    sx={{ width: '100%', margin: '.5em 0' }}
                    size='small'
                    required
                  />
                  <TextField 
                    value={category}
                    label='Menu Category'
                    onChange={categoryInputHandler}
                    size='small'
                    sx={{ width: '100%', margin: '.5em 0' }}
                  />
                  <TextField 
                    value={Sub_Category}
                    label='Menu sub category'
                    onChange={subCategoryInputHandler}
                    size='small'
                    sx={{ width: '100%', margin: '.5em 0' }}
                  />
                  <TextField 
                    value={caption}
                    label='Menu caption'
                    onChange={captionInputHandler}
                    size='small'
                    sx={{ width: '100%', margin: '.5em 0' }}
                  />
                  <TextField 
                    value={price}
                    type='number'
                    label='Menu price'
                    onChange={priceInputHandler}
                    size='small'
                    sx={{ width: '100%', margin: '.5em 0' }}
                    required
                  />
                  <TextField 
                    value={description}
                    label='Description'
                    size='small'
                    multiline
                    rows={2}
                    onChange={descriptionInputHandler}
                    sx={{ width: '100%', margin: '.5em 0'}}
                  />
                  <Grid container>
                    <Grid item xs={12} sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
                      <Typography sx={{ marginRight: '2em'}}>Stock: </Typography>
                      {stock_availability ?
                        <Typography sx={{marginRight: '1em', color: 'lightgray'}}>Out of Stock</Typography>
                      :
                        <Typography sx={{marginRight: '1em', color: 'darkgreen'}}>Out of Stock</Typography>
                      }
                      <Switch 
                        checked={stock_availability}
                        onChange={stockInputHandler}
                        sx={{ marginRight: '1em'}}
                      />
                      {stock_availability ?
                      <Typography sx={{marginRight: '1em', color: 'darkgreen'}}>Available</Typography>
                      :
                        <Typography sx={{marginRight: '1em', color: 'lightgray'}}>Available</Typography>
                      }
                    </Grid>
                  </Grid>
                  <Typography sx={{ fontSize: '.75em', fontStyle: 'italic', fontWeight: 'light', textAlign: 'center', marginBottom: '1em'}}>Edit page must be refreshed to see the changes in Edit page</Typography>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <Grid container spacing={2}>
                <Grid item xs={4}>
                  <Button variant='outlined' onClick={modalCloser} sx={{ width: '100%'}}>Close</Button>
                </Grid>
                <Grid item xs={4}>
                  <LoadingButton loading={updateIsProcessing} variant='contained' onClick={updateButtonHandler} sx={{ width: '100%'}}>Update</LoadingButton>
                </Grid>
                <Grid item xs={4}>
                  <LoadingButton loading={deleteIsProcessing} onClick={deleteButtonHandler} sx={{ width: '100%'}}>Delete</LoadingButton>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Card>
      </Modal>
    </ThemeProvider>
  )
}
export default EditMenu;