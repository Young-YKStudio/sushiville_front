import { Link } from 'react-router-dom';
import SetMealIcon from '@mui/icons-material/SetMeal';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import { ThemeProvider } from '@mui/material/styles'
import { Button, Box } from '@mui/material';

import theme from '../../theme/theme';
import DeliveryOrder from './MenuComponents/Delivery';

const IntroAndOrder = (props) => {

  return (
    <ThemeProvider  theme={theme}>
      <div className="IntroAndOrder_Container">
        <div className="IO_TextBox">
          <h4>Authentic <br /> Japanese Cuisine</h4>
          <p>Freshness Served Daily.</p>
          <Box sx={{
            display: 'flex',
            flexDirection: 'row',
            width: '26em',
            justifyContent: 'space-between',
          }}>
            <Link to='/order'><Button className='IO_buttons' variant='contained'><SetMealIcon/>&nbsp;Order Take Out</Button></Link>
            <Link to='/Reservation'><Button className='IO_buttons' variant='contained'><EventAvailableIcon />&nbsp;Make Reservation</Button></Link>
          </Box>
          <DeliveryOrder />
        </div>
      </div>
    </ThemeProvider>
  );
}
export default IntroAndOrder;