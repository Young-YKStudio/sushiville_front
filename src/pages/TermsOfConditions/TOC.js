import { Grid, Typography } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import theme from '../../theme/theme';
import ConditionsOfUse from './ConditionsOfUse';
import PrivacyPolicy from './PrivacyPolicy';
import Disclaimer from './Disclaimer';

const TOC = (props) => {
  return (
    <ThemeProvider theme={theme}>
      <Grid container sx={{ padding: '4.25em 4em' }}>
        <Grid item xs={12} sx={{ padding: '1em 1em'}}>
          <Typography variant='h4' sx={{ fontFamily: 'Raleway', fontWeight: 'bold', color: 'darkgreen'}}>Legal</Typography>
        </Grid>
        <ConditionsOfUse />
        <PrivacyPolicy />
        <Disclaimer />
      </Grid>
    </ThemeProvider>
  );
}
export default TOC;