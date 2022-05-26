import { Grid, Typography } from '@mui/material'

const Disclaimer = (props) => {
  return (
    <Grid item xs={12} sx={{ padding: '1em 2em'}}>
      <Typography variant='h5' sx={{borderBottom: '1px solid #dc5a41', fontFamily: 'Raleway'}}>Disclaimer</Typography>
      <Grid container sx={{ padding: '1em 1em'}}>
        <Grid item xs={12}>
          <Typography variant='body1' sx={{ paddingTop: '.25em'}}>
          The information, text, graphics and links, and other items contained in this website are provided "as is" and without warranty or representation of any kind, expressed or implied, including, but not limited to, all warranties of merchantability, fitness for a particular purpose, non-infringement of intellectual property, and freedom from errors, bugs, uninterrupted service, or defects. SushiVille's will not be liable for any damages or injury caused by, including but not limited to, any failure of performance, error, omission, or delay in operation of transmission. Information within this website may contain technical inaccuracies or typographical errors. SushiVille's reserves the right to make changes to better improve and/or correct the information contained within this website, at any time, without notice.
          </Typography>
        </Grid>
      </Grid>
    </Grid>
  );
}
export default Disclaimer;