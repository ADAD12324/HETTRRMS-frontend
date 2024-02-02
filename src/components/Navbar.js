import * as React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import './Navbar.css';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';
import TravelExploreIcon from '@mui/icons-material/TravelExplore';
import InfoIcon from '@mui/icons-material/Info';
import CallIcon from '@mui/icons-material/Call';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
//import config from './config';


const drawerWidth = 240;

//const backendUrl = config.url;

function Navbar(props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };
  ///const logo1 = `${backendUrl}/images/HUman explore.png`;
  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
     
      <div>Human Explore Travel and Tours </div>
      
      <Divider />
      <List>
          <ListItem disablePadding>
          <Link to="/" className="btnhome" >
            <ListItemButton>
              <HomeIcon />
              <ListItemText primary="Home" />
            </ListItemButton>
            </Link>
          </ListItem>
          <ListItem disablePadding>
          <Link to="/Packages" className="btnpackages" >
            <ListItemButton>
              <TravelExploreIcon />
              <ListItemText primary="Packages" />
            </ListItemButton>
            </Link>
          </ListItem>
          <ListItem disablePadding>
          <Link to="/About" className="btnabout" >
            <ListItemButton>
              <InfoIcon />
              <ListItemText primary="About" />
            </ListItemButton>
            </Link>
          </ListItem>

          <ListItem disablePadding>
          <Link to="/ContactUs" className="btncontact" >
            <ListItemButton>
              <CallIcon />
              <ListItemText style={{color:"black"}} primary="ContactUs" />
            </ListItemButton>
            </Link>
          </ListItem>
          
          <ListItem disablePadding>
          <Link to="/Login" className="btnlogin" >
            <ListItemButton>
              <AccountCircleIcon />
              <ListItemText style={{color:"black"}} primary="Login" />
            </ListItemButton>
            </Link>
          </ListItem>
      </List>
    </Box>
  );


  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar component="nav" style={{backgroundColor:"#092635", fontStyle:"Raleway, sans-serif"}}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            opacity="1"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' }}}
          >
            <MenuIcon />
          </IconButton>
          <div className="navbar_logo">
          <div>Human Explore Travel and Tours </div>
          </div>
        
          <Box sx={{  display: { xs: 'none', sm: 'block'}, left:'350px', position:'relative', marginLeft:'50px' }}>
           
            <Link to="/" className="btnhomebar" ><Button sx={{ color: '#fff', fontFamily:'Raleway, sans-serif' }}>
                 <HomeIcon sx={{ m: 0.5 }} /> Home
              </Button></Link>
              <Link to="/Packages" className="btnpackagesbar"><Button sx={{  color: '#fff', fontFamily:'Raleway, sans-serif' }}>
                 <TravelExploreIcon sx={{ m: 0.5 }} /> Packages
              </Button></Link>
              <Link to="/About" className="btnaboutbar"><Button sx={{color: '#fff', fontFamily:'Raleway, sans-serif' }}>
                <InfoIcon sx={{ m: 0.5 }} /> About
              </Button></Link>
              <Link to="/ContactUs" className="btncontactbar"><Button sx={{  color: '#fff', fontFamily:'Raleway, sans-serif' }}>
              <CallIcon sx={{ m: 0.5 }} /> Contact Us
              </Button></Link>
              <Link to="/Login" className="btnlogin"><Button sx={{ color: '#fff', fontFamily:'Raleway, sans-serif' }}>
              <AccountCircleIcon sx={{ m: 0.5 }} /> Login
              </Button></Link>
              
          </Box>
        </Toolbar>
      </AppBar>
      
      <Box component="nav">
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
      </Box>
      <Box component="main" sx={{ p: 0 }}>
        <Toolbar />
      </Box>
    </Box>
  );
}

Navbar.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

export default Navbar;
