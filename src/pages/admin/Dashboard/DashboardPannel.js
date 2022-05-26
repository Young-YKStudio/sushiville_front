import { useState } from "react";

// MUI
import { ThemeProvider } from '@mui/material/styles';
import { Typography, Grid, Accordion, AccordionSummary, AccordionDetails } from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

// components
import theme from '../../../theme/theme';
import Setting from "./Setting";
import DashboardHeader from "./DashboardHeader";
import AdminLogout from "./AdminLogout";
import DashBoardSocket from "./DashBoradSocket";

// view current orders using socket io


const DashBoardPannel = (props) => {
  // states
  const [ expanded, setExpanded ] = useState(false);

  // handlers
  const pannelHandler = (panel) => (e, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <ThemeProvider theme={theme}>
      <Grid container>
        <DashboardHeader />
        <DashBoardSocket/>
      </Grid>
      <Grid container>
        <Grid item xs={12}>
          <Typography variant='h5' sx={{ fontFamily: 'Raleway', fontWeight: 'bold', color: 'darkgreen', paddingBottom: '.5em', borderBottom: '1px solid #dc5a41'}}>Settings</Typography>
        </Grid>
        <Grid item xs={12} md={8} sx={{ margin: '3em auto' }}>
          {/* store open/close */}
          <Accordion
            expanded={expanded === 'panel7'}
            onChange={pannelHandler('panel7')}
            elevation={3}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
            >
              <Typography sx={{ width: '33%', flexShrink: 0, fontSize: '1.25em', color: 'darkgreen'}}>Store open/close</Typography>
            </AccordionSummary>
            <AccordionDetails sx={{ bgcolor: 'rgba(255, 240, 174, 0.75)'}}>
              <Setting 
              />
            </AccordionDetails>
          </Accordion>
          {/* Admin Logout */}
          <Accordion
            expanded={expanded === 'panel8'}
            onChange={pannelHandler('panel8')}
            elevation={3}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
            >
              <Typography sx={{ width: '33%', flexShrink: 0, fontSize: '1.25em', color: 'darkgreen'}}>Admin Logout</Typography>
            </AccordionSummary>
            <AccordionDetails sx={{ bgcolor: 'rgba(255, 240, 174, 0.75)' }}>
              <AdminLogout />
            </AccordionDetails>
          </Accordion>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}
export default DashBoardPannel;