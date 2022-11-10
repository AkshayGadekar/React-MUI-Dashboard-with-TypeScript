import React from 'react';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import {drawerWidth} from "../../objects/objects";
import type {ContentProps} from "../../types/components";
import Routes from "../routes/Auth";

const Content = ({hideDrawer}: ContentProps) => {
    
    return (
        <Box
            component="main"
            sx={{ backgroundColor: 'rgba(0,0,0,0.02)', width: { sm: `calc(100% - ${!hideDrawer ? drawerWidth : 0}px)` }, 
            height: '100vh',flexGrow: 1, p: 3 }}
        >
            <Toolbar />
            <Routes />
        </Box>
    )
}

export default Content;