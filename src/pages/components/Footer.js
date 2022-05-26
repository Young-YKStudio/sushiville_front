import { Card, Stack, CardContent, Typography, IconButton, Grid } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import EmailIcon from '@mui/icons-material/Email';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import { Link, useNavigate } from 'react-router-dom';

import theme from '../../theme/theme'

const Footer = (props) => {
  const navigate = useNavigate();
  return (
    <ThemeProvider theme={theme}>
      <Grid container sx={{ padding: '2em 5em', bgcolor: '#2c3545' }} spacing={2}>
        <Grid item xs={12} sm={6} md={4} sx={{ padding: '.5em .5em', display: 'flex', flexDirection: 'row', justifyContent: 'center', flexWrap: 'nowrap', minWidth: 280}}>
          <Typography variant='h6' sx={{ color: 'gray', marginBottom: '.25em', textOrientation: 'sideways', writingMode: 'vertical-lr', transform: 'rotate(180deg)', textAlign: 'right'}}>Hours</Typography>
          <Grid container>
            <Grid item xs={7} sx={{ paddingLeft: '.5em', minWidth: '130px'}}>
              <Typography variant='body1' sx={{ fontSize: '.75em', color: 'white', marginBottom: '.25em'}}>
                Mon, Wed, Thur, Sun :
              </Typography>
              <Typography variant='body1' sx={{ fontSize: '.75em', color: 'white', marginBottom: '.25em'}}>
                Tue :
              </Typography>
              <Typography variant='body1' sx={{ fontSize: '.75em', color: 'white', marginBottom: '.25em'}}>
                Fri, Sat :
              </Typography>
            </Grid>
            <Grid item xs={5}>
              <Typography variant='body1' sx={{ fontSize: '.75em', color: 'white', marginBottom: '.25em'}}>
                12pm - 9pm
              </Typography>
              <Typography variant='body1' sx={{ fontSize: '.75em', color: 'white', marginBottom: '.25em'}}>
                Closed
              </Typography>
              <Typography variant='body1' sx={{ fontSize: '.75em', color: 'white', marginBottom: '.25em'}}>
                12pm - 9:30pm
              </Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} sm={6} md={4} sx={{ padding: '.5em .5em', display: 'flex', flexDirection: 'row', justifyContent: 'center', flexWrap: 'nowrap'}}>
          <Typography variant='h6' sx={{ color: 'gray', marginBottom: '.25em', textOrientation: 'sideways', writingMode: 'vertical-lr', transform: 'rotate(180deg)', textAlign: 'right'}}>Find Us</Typography>
          <Grid container>
            <Grid item xs={12} sx={{ paddingLeft: '.5em'}}>
              <Typography variant='body1' sx={{ fontSize: '.75em', color: 'white', marginBottom: '.25em'}}>
                67 Orange Turnpike
              </Typography>
              <Typography variant='body1' sx={{ fontSize: '.75em', color: 'white', marginBottom: '.25em'}}>
                Sloatsburg, NY 10974
              </Typography>
              <Typography variant='body1' sx={{ fontSize: '.75em', color: 'white', marginBottom: '.25em'}}>
                (845) 712-5006
              </Typography>
              <Typography variant='body1' sx={{ fontSize: '.75em', color: 'white', marginBottom: '.25em'}}>
              info@sushivilleny.com
              </Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} sm={6} md={4} sx={{ padding: '.5em .5em', display: 'flex', flexDirection: 'row', justifyContent: 'center', flexWrap: 'nowrap'}}>
          <Typography variant='h6' sx={{ color: 'gray', marginBottom: '.25em', textOrientation: 'sideways', writingMode: 'vertical-lr', transform: 'rotate(180deg)', textAlign: 'right', zIndex: 0}}>Legal</Typography>
          <Grid container>
            <Grid item xs={12} sx={{ paddingLeft: '.5em'}}>
              <Link to='/policy-agreement'><Typography variant='body1' sx={{ fontSize: '.75em', color: 'white', '&:hover' : {color: '#dc5a41'}, marginBottom: '.25em' }}>Terms of Conditions</Typography></Link>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Typography variant='body1' sx={{ fontSize: '.65em', color: 'white', textAlign: 'center'}}>
            © 2022 Sushiville. All Rights Reserved. developed & designed by YK Technology Corporation
          </Typography>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}
export default Footer;