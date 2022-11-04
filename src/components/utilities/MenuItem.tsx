import React from 'react';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { NavLink } from "react-router-dom";
import { useTheme } from '@mui/material/styles';
import type {MenuItemProps, MenuItemIconProps} from "../../types/utilityComponents";

const MenuItem = (props: MenuItemProps<MenuItemIconProps>) => {
  const theme = useTheme();
  
  const Icon = props.icon;

  const activeStyles = {
    color: '#fff',
    backgroundColor: theme.palette.primary.main
  }
  
  let navigation = {};
  if (props.href) {
    navigation = {
      component: NavLink,
      to: props.href,
      end: true,
      style: ({ isActive }: {isActive: boolean}) => isActive ? activeStyles : undefined            
    };
  }
  
  return (
    <ListItem key={props.label} disablePadding>
      <ListItemButton {...navigation}>
        <ListItemIcon>
          {<Icon />}
        </ListItemIcon>
        <ListItemText primary={props.label} />
      </ListItemButton>
    </ListItem>
  )
}

export default MenuItem;