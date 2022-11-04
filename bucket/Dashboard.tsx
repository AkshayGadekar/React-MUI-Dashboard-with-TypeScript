import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import useMediaQuery from '@mui/material/useMediaQuery';
import DrawerMenus from "../components/structure/Drawer";
import { useTheme } from '@mui/material/styles';
import Table from "../components/utilities/Table";

const drawerWidth = 240;

interface Props {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window?: () => Window;
}

const Dashboard = (props: Props) => {
  const { window } = props;
  const theme = useTheme();
  
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
  return {};
  return (
    <Box sx={{ display: 'flex' }}>
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
          <Typography noWrap component="div">
            Home / Experiences / Queue / List
          </Typography>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: !hideDrawer ? drawerWidth : 0 }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          <DrawerMenus />
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: !hideDrawer ? 'block' : 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
          open
        >
          <DrawerMenus />
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${!hideDrawer ? drawerWidth : 0}px)` } }}
      >
        <Toolbar />
        <Table />
      </Box>
    </Box>
  );
}

export default Dashboard;