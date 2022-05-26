import React, { useState, useEffect } from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { Box, Stack, Button, Grid } from '@mui/material';
import { makeStyles } from '@mui/styles';
// import 'react-tabs/style/react-tabs.css'

import ALaCarte from './ALaCarte';
import Appetizer from './Appetizer';
import KitchenEntree from './KitchenEntree';
import LunchSpecial from './LunchSpecial';
import RegularRolls from './RegularRolls';
import SoupSalad from './SoupSalad';
import SpecialRolls from './SpecialRolls';
import SushiSashimi from './SushiSashimi';
import PartyPlatterItems from './PartyPlatter';
import axios from 'axios';
import { ThemeProvider } from '@emotion/react';

import theme from '../../../theme/theme';

const Menu = (props) => {

  const [ fetchedData, SetFetchedData ] = useState([]);
  const [ selected, setSelected ] = useState();

  // MUI styles
  const useStyles = makeStyles((theme) => {

  })

  useEffect(() => {
    async function fetchData() {
      const config = {
        header: {
          "Content-Type": "application/json"
        }
      }
      const request = await axios.get(`${process.env.REACT_APP_SERVER_URL}/api/menu/allmenu`, config);
      SetFetchedData(request.data.menu);
      return request
    }
    fetchData();
  },[])

  const classes = useStyles();

  return (
    <nav className="Menu_Container">
      <div className='Tab_Container'>
        <ThemeProvider theme={theme}>
          <h1 className='tab_Title' >MENU</h1>
          <Tabs>
            <TabList>
              {/* <Stack spacing={2}> */}
                <Tab>Special Rolls</Tab>
                <Tab>Regular Rolls</Tab>
                <Tab>Lunch Special</Tab>
                <Tab>Appetizer</Tab>
                <Tab>Soup & Salad</Tab>
                <Tab>Kitchen Entree</Tab>
                <Tab>Sushi & Sashimi</Tab>
                <Tab>A La Carte</Tab>
                <Tab>Party Platter</Tab>
              {/* </Stack> */}
            </TabList>
            <TabPanel>
              <div className='panelContainer'>
                <SpecialRolls fetchedData={fetchedData}/>
              </div>
            </TabPanel>
            <TabPanel>
              <div className='panelContainer'>
                <RegularRolls fetchedData={fetchedData} />
              </div>
            </TabPanel>
            <TabPanel>
              <div className='panelContainer'>
                <LunchSpecial fetchedData={fetchedData} />
              </div>
            </TabPanel>
            <TabPanel>
              <div className='panelContainer'>
                <Appetizer fetchedData={fetchedData} />
              </div>
            </TabPanel>
            <TabPanel>
              <div className='panelContainer'>
                <SoupSalad fetchedData={fetchedData} />
              </div>
            </TabPanel>
            <TabPanel>
              <div className='panelContainer'>
                <KitchenEntree fetchedData={fetchedData} />
              </div>
            </TabPanel>
            <TabPanel>
              <div className='panelContainer'>
                <SushiSashimi fetchedData={fetchedData} />
              </div>
            </TabPanel>
            <TabPanel>
              <div className='panelContainer'>
                <ALaCarte fetchedData={fetchedData} />
              </div>
            </TabPanel>
            <TabPanel>
              <div className='panelContainer'>
                <PartyPlatterItems fetchedData={fetchedData} />
              </div>
            </TabPanel>
          </Tabs>
        </ThemeProvider>
      </div>
    </nav>
  );
}
export default Menu;