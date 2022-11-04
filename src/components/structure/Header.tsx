import React from 'react';
import AppBar from '@mui/material/AppBar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import {drawerWidth} from "../../objects/objects";
import type {HeaderProps} from "../../types/components";

const Header = ({handleDrawerToggle, hideDrawer}: HeaderProps) => {
  return (
    <AppBar
        position="fixed"
        sx={{
            width: { sm: `calc(100% - ${!hideDrawer ? drawerWidth : 0}px)` },
            ml: { sm: `${!hideDrawer ? drawerWidth : 0}px` },
        }}
    >
    <Toolbar>
        <IconButton
        color="inherit"
        aria-label="open drawer"
        edge="start"
        onClick={handleDrawerToggle}
        sx={{ mr: 2, display: { 
            //sm: 'none' 
        } }}
        >
        <MenuIcon />
        </IconButton>
        {/* <Typography noWrap component="div">
          Home / Experiences / Queue / List
        </Typography> */}
    </Toolbar>
    </AppBar>
  )
}

export default Header