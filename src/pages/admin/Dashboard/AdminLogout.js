import { useNavigate } from 'react-router-dom';

// MUI
import { ThemeProvider } from '@mui/material/styles'
import { Button, Grid } from '@mui/material'

// components
import theme from '../../../theme/theme'

const AdminLogout = (props) => {
  
  const navigate = useNavigate()
  
  const logoutButtonHandler = async (e) => {
    try {
      sessionStorage.clear()
      navigate('/')
      window.location.reload(false)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <ThemeProvider theme={theme}>
      <Grid container>
        <Grid item xs={12} sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', padding: '1.5em 1em'}}>
          <Button onClick={logoutButtonHandler} variant='contained'>Admin Log out</Button>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}
export default AdminLogout;