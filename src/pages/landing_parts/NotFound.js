import { ThemeProvider } from '@mui/material/styles'
import theme from '../../theme/theme';

import { Grid, Typography, Card } from '@mui/material';

const NotFound = (props) => {
  return (
    <ThemeProvider theme={theme}>
      <Grid container sx={{ paddingTop: '4.5em'}}>
        <Grid item xs={12} sx={{ bgcolor: '#dc5a41', height: '90vh'}}>
          <Card sx={{ position: 'fixed', width: 400, top: '50%', left: '50%', transform: 'translate(-50%, -50%)', padding: '2em 2em'}}>
            <Typography variant='h2' sx={{ textAlign: 'center', color: 'darkgreen', fontWeight: 'bold'}}>404 Error</Typography>
            <Typography variant='h6' sx={{ textAlign: 'center', color: 'darkgreen', paddingTop: '1em'}}>Oops!</Typography>
            <Typography sx={{ textAlign: 'center', color: '#dc5a41', paddingTop: '1em'}}>You just landed in wrong place.</Typography>
            <Typography sx={{ textAlign: 'center', color: '#dc5a41'}}>please check the address again.</Typography>
          </Card>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}
export default NotFound;