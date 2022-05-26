import { Grid, Typography } from '@mui/material';

const ConditionsOfUse = (props) => {
  return (
    <Grid item xs={12} sx={{ padding: '1em 2em'}}>
      <Typography variant='h5' sx={{borderBottom: '1px solid #dc5a41', fontFamily: 'Raleway'}}>Conditions of Use</Typography>
      <Grid container sx={{ padding: '1em 1em'}}>
        <Grid item xs={12}>
          <Typography variant='h6' sx={{ fontFamily: 'Raleway', color: '#dc5a41' }}>Refund Policy</Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant='body1' sx={{ paddingTop: '.25em'}}>
            It is our goal to satisfy our customers with the highest quality of products and services. If there is any reason you are unsatisfied with your order, please contact us immediately at SushiVille, (845) 712-5006.
          </Typography>
        </Grid>
        <Grid item xs={12} sx={{ marginTop: '1em'}}>
          <Typography variant='h6' sx={{ fontFamily: 'Raleway', color: '#dc5a41' }}>Customer Service Contact</Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant='body1' sx={{ paddingTop: '.25em'}}>
            For any questions or concerns, feel free to contact us at (845) 712-5006 or info@sushivilleny.com
          </Typography>
        </Grid>
      </Grid>
    </Grid>
  );
}
export default ConditionsOfUse;