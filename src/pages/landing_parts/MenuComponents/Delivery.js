import { Divider, Paper, Stack, Grid } from '@mui/material';

const DeliveryOrder = (props) => {
  return (
    <Grid>
      <Stack
        direction='row'
        justifyContent='flex-start'
        alignItems='center'
        spacing={8}
        marginTop='2em'
      >
        <a target="_blank" href='https://www.ubereats.com/store/sushi-ville/mKWTjH-SVjSSGVSNwK3KMw?utm_source=google&utm_medium=organic&utm_campaign=place-action-link'><img className='deliveryLogos' src='/images/uberEatsLogo.png' /></a>
        <a target="_blank" href='https://www.doordash.com/store/sushiville-sloatsburg-2571701/?utm_campaign=gpa'><img className='deliveryLogos' src='/images/doorDashLogo.png' /></a>
        <a target="_blank" href='https://www.grubhub.com/restaurant/sushiville-67-orange-turnpike-sloatsburg/3061762?utm_source=google&utm_medium=organic&utm_campaign=place-action-link'><img className='deliveryLogos' src='/images/grubHubLogo.png' /></a>
      </Stack>
    </Grid>
  );
}
export default DeliveryOrder;