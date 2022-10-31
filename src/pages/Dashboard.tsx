import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MailIcon from '@mui/icons-material/Mail';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import logo from "../media/images/logo.svg";
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

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

  const menus = [
    {
        label: 'Dashboard',
        icon: InboxIcon,
        parent: false,
        children: false
    },
    {
        label: 'Experiences',
        icon: InboxIcon,
        parent: false,
        children: true
    },
    {
        label: 'Queue',
        icon: InboxIcon,
        parent: true,
        children: false
    },
    {
        label: 'Streaming',
        icon: InboxIcon,
        parent: true,
        children: false
    },
    {
        label: 'Campaigns',
        icon: InboxIcon,
        parent: false,
        children: false
    },
    {
        label: 'Reports',
        icon: InboxIcon,
        parent: false,
        children: false
    }
  ];

  const drawer = (
    <div>
      <Toolbar>
        <Box component="img" src={"https://callqx-portal.ecosmob.net/static/img/logo.svg"} 
        sx={{width: "85%"}} ></Box>
      </Toolbar>
      <Divider />
      <List sx={{pt:0}}>
        {/* {menus.map((menu, index) => (
          <ListItem key={menu.label} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                {React.createElement(menu.icon)}
              </ListItemIcon>
              <ListItemText primary={menu.label} />
            </ListItemButton>
          </ListItem>
        ))} */}
        {/* {
          [<Accordion sx={{
              boxShadow: "none",
              "& .MuiAccordionSummary-root":{px:0, minHeight: "auto!important", "& .MuiAccordionSummary-content":{my:0}},
              "& .MuiAccordionDetails-root": {p: 0, px: 2}
            }}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <ListItem key={'label'} disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    {React.createElement(InboxIcon)}
                  </ListItemIcon>
                  <ListItemText primary={'label'} />
                </ListItemButton>
              </ListItem>
            </AccordionSummary>
            <AccordionDetails>
              <ListItem key={'label1'} disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    {React.createElement(InboxIcon)}
                  </ListItemIcon>
                  <ListItemText primary={'label1'} />
                </ListItemButton>
              </ListItem>
            </AccordionDetails>
          </Accordion>,
          <ListItem key={'label1'} disablePadding>
          <ListItemButton>
            <ListItemIcon>
              {React.createElement(InboxIcon)}
            </ListItemIcon>
            <ListItemText primary={'label1'} />
          </ListItemButton>
        </ListItem>]
        } */}
        <ListItem key={'Dashboard'} disablePadding>
          <ListItemButton>
            <ListItemIcon>
              {React.createElement(InboxIcon)}
            </ListItemIcon>
            <ListItemText primary={'Dashboard'} />
          </ListItemButton>
        </ListItem>
        <Accordion sx={{
            boxShadow: "none",
            "& .MuiAccordionSummary-root":{px:0, minHeight: "auto!important", "& .MuiAccordionSummary-content":{my:0}},
            "& .MuiAccordionDetails-root": {p: 0, px: 2}
          }}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <ListItem key={'Experiences'} disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  {React.createElement(InboxIcon)}
                </ListItemIcon>
                <ListItemText primary={'Experiences'} />
              </ListItemButton>
            </ListItem>
          </AccordionSummary>
          <AccordionDetails>
            <ListItem key={'Queue'} disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  {React.createElement(InboxIcon)}
                </ListItemIcon>
                <ListItemText primary={'Queue'} />
              </ListItemButton>
            </ListItem>
            <ListItem key={'Streaming'} disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  {React.createElement(InboxIcon)}
                </ListItemIcon>
                <ListItemText primary={'Streaming'} />
              </ListItemButton>
            </ListItem>
          </AccordionDetails>
        </Accordion>
        <ListItem key={'Campaigns'} disablePadding>
          <ListItemButton>
            <ListItemIcon>
              {React.createElement(InboxIcon)}
            </ListItemIcon>
            <ListItemText primary={'Campaigns'} />
          </ListItemButton>
        </ListItem>
        <ListItem key={'Reports'} disablePadding>
          <ListItemButton>
            <ListItemIcon>
              {React.createElement(InboxIcon)}
            </ListItemIcon>
            <ListItemText primary={'Reports'} />
          </ListItemButton>
        </ListItem>
        <ListItem key={'Nodes'} disablePadding>
          <ListItemButton>
            <ListItemIcon>
              {React.createElement(InboxIcon)}
            </ListItemIcon>
            <ListItemText primary={'Nodes'} />
          </ListItemButton>
        </ListItem>
        <ListItem key={'Messaging'} disablePadding>
          <ListItemButton>
            <ListItemIcon>
              {React.createElement(InboxIcon)}
            </ListItemIcon>
            <ListItemText primary={'Messaging'} />
          </ListItemButton>
        </ListItem>
        <ListItem key={'Prompts'} disablePadding>
          <ListItemButton>
            <ListItemIcon>
              {React.createElement(InboxIcon)}
            </ListItemIcon>
            <ListItemText primary={'Prompts'} />
          </ListItemButton>
        </ListItem>
      </List>
    </div>
  );

  const container = window !== undefined ? () => window().document.body : undefined;

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
            Home / Experiences / List
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
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: !hideDrawer ? 'block' : 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${!hideDrawer ? drawerWidth : 0}px)` } }}
      >
        <Toolbar />
        <Typography paragraph>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
          tempor incididunt ut labore et dolore magna aliqua. Rhoncus dolor purus non
          enim praesent elementum facilisis leo vel. Risus at ultrices mi tempus
          imperdiet. Semper risus in hendrerit gravida rutrum quisque non tellus.
          Convallis convallis tellus id interdum velit laoreet id donec ultrices.
          Odio morbi quis commodo odio aenean sed adipiscing. Amet nisl suscipit
          adipiscing bibendum est ultricies integer quis. Cursus euismod quis viverra
          nibh cras. Metus vulputate eu scelerisque felis imperdiet proin fermentum
          leo. Mauris commodo quis imperdiet massa tincidunt. Cras tincidunt lobortis
          feugiat vivamus at augue. At augue eget arcu dictum varius duis at
          consectetur lorem. Velit sed ullamcorper morbi tincidunt. Lorem donec massa
          sapien faucibus et molestie ac.
        </Typography>
        <Typography paragraph>
          Consequat mauris nunc congue nisi vitae suscipit. Fringilla est ullamcorper
          eget nulla facilisi etiam dignissim diam. Pulvinar elementum integer enim
          neque volutpat ac tincidunt. Ornare suspendisse sed nisi lacus sed viverra
          tellus. Purus sit amet volutpat consequat mauris. Elementum eu facilisis
          sed odio morbi. Euismod lacinia at quis risus sed vulputate odio. Morbi
          tincidunt ornare massa eget egestas purus viverra accumsan in. In hendrerit
          gravida rutrum quisque non tellus orci ac. Pellentesque nec nam aliquam sem
          et tortor. Habitant morbi tristique senectus et. Adipiscing elit duis
          tristique sollicitudin nibh sit. Ornare aenean euismod elementum nisi quis
          eleifend. Commodo viverra maecenas accumsan lacus vel facilisis. Nulla
          posuere sollicitudin aliquam ultrices sagittis orci a.
        </Typography>
      </Box>
    </Box>
  );
}

export default Dashboard;