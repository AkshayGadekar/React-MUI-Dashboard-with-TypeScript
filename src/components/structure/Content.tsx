import React from 'react';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import {drawerWidth} from "../../objects/objects";
import Table from "../utilities/Table";
import type {ContentProps} from "../../types/components";
import Routes from "../routes/Auth";

const Content = ({hideDrawer}: ContentProps) => {
    
    return (
        <Box
            component="main"
            sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${!hideDrawer ? drawerWidth : 0}px)` } }}
        >
            <Toolbar />
            <Routes />
        </Box>
    )
}

export default Content;