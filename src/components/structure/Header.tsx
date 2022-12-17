import React from 'react';
import AppBar from '@mui/material/AppBar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import {drawerWidth} from "../../objects/objects";
import type {HeaderProps} from "../../types/components";
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Avatar from '@mui/material/Avatar';
import {useAppDispatch} from '../../store/hooks';
import {loggedIn} from "../../store/slices/userSlice";

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
        <UserMenu />
    </Toolbar>
    </AppBar>
  )
}

export default Header

const UserMenu = () => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const dispatch = useAppDispatch();
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const logout = () => {
    handleClose();
    dispatch(loggedIn(false));
  };

  return (
    <Box ml={'auto'}>
      <Button 
        onClick={handleClick}
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        sx={{cursor: 'pointer'}}
      >
        <Avatar src="/broken-image.jpg" />
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuItem onClick={handleClose}>Profile</MenuItem>
        <MenuItem onClick={handleClose}>My account</MenuItem>
        <MenuItem onClick={logout}>Logout</MenuItem>
      </Menu>
    </Box>
  );
}