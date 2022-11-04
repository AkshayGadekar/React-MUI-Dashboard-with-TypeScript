import React from 'react'
import Toolbar from '@mui/material/Toolbar';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MuiDrawer from '@mui/material/Drawer';
import menus from "../../objects/menus";
import MenuItem from '../utilities/MenuItem';
import {drawerWidth} from "../../objects/objects";
import type {DrawerProps} from "../../types/components";

const Drawer = ({container, mobileOpen, handleDrawerToggle, hideDrawer}: DrawerProps) => {
  const DrawerMenus = (
    <Box>
      <Toolbar>
        <Box component="img" src={"https://callqx-portal.ecosmob.net/static/img/logo.svg"} 
        sx={{width: "75%"}} ></Box>
      </Toolbar>
      <Divider />
      <List sx={{pt:0}}>
        {
          menus.map((menu, index) => {
            let menuHTML: JSX.Element;

            if (menu.children == null) {
              return menuHTML = <MenuItem key={index} href={menu.href} label={menu.label} icon={menu.icon} />;
            }
            
            const subMenus = menu.children;
            
            return menuHTML = <Accordion key={index} sx={{
              boxShadow: "none",
              marginTop: '0!important',
              marginBottom: '0!important',
              "&::before": {
                opacity: 0
              },
              "& .MuiAccordionSummary-root": {
                paddingLeft: 0, paddingRight: 0, minHeight: "auto!important",
                "& .MuiAccordionSummary-content":{marginTop: 0, marginBottom: 0}
              },
              "& .MuiAccordionDetails-root": {
                padding: 0,
                "& .MuiListItemButton-root": {paddingLeft: 4}
              }
            }}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls={`${menu.label}-content`}
                id={`${menu.label}-header`}
              >
                <MenuItem label={menu.label} icon={menu.icon} />
              </AccordionSummary>
              <AccordionDetails>
                {
                  subMenus.map((submenu, subindex) => <MenuItem key={subindex} href={submenu.href} label={submenu.label} icon={submenu.icon} />)
                }
              </AccordionDetails>
            </Accordion>
          })
        }
      </List>
    </Box>
  );

  return (
    <Box
        component="nav"
        sx={{ width: { sm: !hideDrawer ? drawerWidth : 0 }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
      <MuiDrawer
        container={container}
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true,
        }}
        sx={{
          display: { xs: 'block', sm: 'none' },
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
        }}
      >
        {DrawerMenus}
      </MuiDrawer>
      <MuiDrawer
        variant="permanent"
        sx={{
          display: { xs: 'none', sm: !hideDrawer ? 'block' : 'none' },
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
        }}
        open
      >
        {DrawerMenus}
      </MuiDrawer>
    </Box>
  )
}

export default Drawer
