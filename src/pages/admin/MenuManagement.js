import axios from "axios";
import { useState, useEffect } from "react";
import EditMenu from './MenuMgmt/EditMenu';
import RegisterMenu from './MenuMgmt/RegisterMenu';

// MUI
import { ThemeProvider } from "@mui/material/styles";
import theme from '../../theme/theme';
import { Typography, Grid, Button, CircularProgress, Modal } from "@mui/material";


const MenuManagement = (props) => {

  const [ register, setRegister ] = useState(false);
  const [ receivedData, setReceivedData ] = useState([]);
  const [ loading, setLoading ] = useState(true);

  useEffect(() => {
    async function fetchData() {
      const config = {
        header: {
          "Content-Type": "application/json",
        }
      }

      const request = await axios.get(`${process.env.REACT_APP_SERVER_URL}/api/menu/allmenu`, config);
      setReceivedData(request.data.menu);
      return request
    }
    fetchData();
  },[])
  
  const buttonHandler = (e) => {
    setRegister(!register)
  }

  // TODO: loading spinner

  return (
    <ThemeProvider theme={theme}>
      { register ?
        <Grid container spacing={2} sx={{ marginBottom: '2em'}}>
          <Grid item  xs={6} >
            <Button variant="contained" sx={{ width: '100%'}} onClick={buttonHandler}>Edit Menu</Button>
          </Grid>
          <Grid item xs={6}>
            <Button disabled variant="contained" sx={{ width: '100%'}}>Register Menu</Button>
          </Grid>
        </Grid>
        :
        <Grid container spacing={2} sx={{ marginBottom: '2em'}}>
          <Grid item  xs={6} >
            <Button disabled variant="contained" sx={{ width: '100%'}}>Edit Menu</Button>
          </Grid>
          <Grid item xs={6}>
            <Button variant="contained" sx={{ width: '100%'}} onClick={buttonHandler}>Register Menu</Button>
          </Grid>
        </Grid>
      }
      {register ? <RegisterMenu /> : <EditMenu receivedData={receivedData} />}
    </ThemeProvider>
  );
}
export default MenuManagement;