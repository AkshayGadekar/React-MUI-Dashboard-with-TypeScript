import React, {useState, useEffect} from 'react';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import Box from '@mui/material/Box';
import Guest from './components/routes/Guest';
import Header from "./components/structure/Header";
import Drawer from "./components/structure/Drawer";
import Content from "./components/structure/Content";
import { useAppSelector, useAppDispatch } from './store/hooks';
import {log} from './funcs/helpers';
import FetchUser from "./components/utilities/FetchUser";

interface Props {
  window?: () => Window;
}

export default function App(props: Props) {

  const { window } = props;
  const theme = useTheme();
  let hasToken = !!localStorage.getItem('access_token');

  const userInfo = useAppSelector(state => state.user);
  const isLoggedIn = userInfo.isLoggedIn;
  const user = userInfo.user;
  log('app rendered', userInfo);

  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [hideDrawer, setHideDrawer] = React.useState(false);

  const matchesSM = useMediaQuery(theme.breakpoints.down('sm'));

  const handleDrawerToggle = () => {
    if (!matchesSM) {
        setHideDrawer(!hideDrawer);
    } else {
        setMobileOpen(!mobileOpen);
    }
  };

  const container = window !== undefined ? () => window().document.body : undefined;
  
  return (
    <Box sx={{ display: 'flex' }}>
      {hasToken
      ?
        (
          Object.keys(user).length 
          ?
            <> 
              <Header handleDrawerToggle={handleDrawerToggle} hideDrawer={hideDrawer} />
              <Drawer container={container} mobileOpen={mobileOpen} handleDrawerToggle={handleDrawerToggle} hideDrawer={hideDrawer} />
              <Content hideDrawer={hideDrawer} />
            </>
          : 
            <FetchUser />
        )
      :
        <Guest />
      }
    </Box>
  );

}
