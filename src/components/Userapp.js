import * as React from 'react';
import { useState, useEffect } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import { Button, Drawer, List, ListItem, ListItemText, Badge, Popover, Divider } from '@material-ui/core';
import NotificationsIcon from '@material-ui/icons/Notifications';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MoreIcon from '@mui/icons-material/MoreVert';
import { FaHome } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Avatar from '@material-ui/core/Avatar';
import { BiLogOutCircle } from "react-icons/bi";
import { TbPackage } from "react-icons/tb";
import { GrStatusUnknown } from "react-icons/gr";
import { RiReservedLine } from "react-icons/ri";
import iconImage from "../assets/proof.png";

export default function Userapp() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [anchorEl1, setAnchorEl1] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const handlePopoverOpen = (event) => {
    setAnchorEl1(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl1(null);
  };

  const open = Boolean(anchorEl1);

  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
      <MenuItem onClick={handleMenuClose}>My account</MenuItem>
    </Menu>
  );

  const mobileMenuId = 'primary-search-account-menu-mobile';
  const [drawerOpen, setDrawerOpen] = useState(false);

  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <p>Profile</p>
      </MenuItem>
    </Menu>
  );

  const navigate = useNavigate();

  useEffect(() => {
    const userId = localStorage.getItem('userId');
    axios
      .get(`https://hettrrms-server.onrender.com/api/notifications/${userId}`)
      .then((response) => {
        const updatedNotifications = response.data.map((notification) => {
          const readStatus = localStorage.getItem(`read_${notification.id}`);
          return {
            ...notification,
            read: readStatus ? JSON.parse(readStatus) : false,
          };
        });
        setNotifications(updatedNotifications);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  useEffect(() => {
    const count = notifications.reduce((acc, notification) => {
      if (!notification.read) {
        return acc + 1;
      }
      return acc;
    }, 0);
    setUnreadCount(count);
  }, [notifications]);

  const handleNotificationClick = (id) => {
    const updatedNotifications = notifications.map((notification) => {
      if (notification.id === id) {
        localStorage.setItem(`read_${notification.id}`, true);
        return {
          ...notification,
          read: true,
        };
      }
      return notification;
    });
    navigate('/Booking');
    setNotifications(updatedNotifications);
  };

  const [userImageUrl, setUserImageUrl] = useState('');

  useEffect(() => {
    axios // Use axios instead of fetch
      .get('https://hettrrms-server.onrender.com/api/user', { credentials: 'include' })
      .then((response) => response.data)
      .then((data) => {
        setUserImageUrl(data.userImageUrl);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const handleLogout = () => {
    axios.get('https://hettrrms-server.onrender.com/api/logout')
      .then(() => {
        localStorage.removeItem('userId');
        navigate('/');
      })
      .catch((error) => {
        console.error(error);
        // Handle error
      });
  };
  

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" style={{ background: '#99A98F' }}>
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            sx={{ mr: 2 }}
          >
            <Button onClick={() => setDrawerOpen(!drawerOpen)} color="inherit">
              <MenuIcon style={{color:'white'}}/>
            </Button>
          </IconButton>
          <h3
            style={{ display:"block", fontFamily: '"Raleway", sans-serif', color:'white', }}
          >
            Human Explore Travel and Tours
          </h3>
          <Box sx={{ flexGrow: 500 }} />
          <IconButton
            size="large"
            edge="end"
            color="inherit"
            aria-label="notifications"
            aria-describedby="notifications-popover"
            onClick={handlePopoverOpen}
            sx={{
              position: 'absolute',
              right: '30px',
            }}
          >
            <Badge badgeContent={unreadCount} color="error">
              <NotificationsIcon style={{color:'white'}}/>
            </Badge>
          </IconButton>
          <Popover
            id="notifications-popover"
            open={open}
            anchorEl={anchorEl1}
            onClose={handlePopoverClose}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'center',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'left',
            }}
          >
            <Box style={{ height: '550px' }} sx={{ p: 2, alignItems: 'flex-start' }}>
              <h2>Notification</h2>
              <ul>
                {notifications.map((notification) => (
                  <li
                    key={notification.id}
                    style={{
                      cursor: 'pointer',
                      border: '1px solid black',
                      padding: '10px',
                      marginBottom: '10px',
                      backgroundColor: notification.read ? 'white' : 'rgba(128, 128, 128, 0.5)',
                    }}
                    onClick={() => handleNotificationClick(notification.id)}
                  >
                    {notification.message}
                  </li>
                ))}
              </ul>
            </Box>
          </Popover>
          <Drawer anchor="left" open={drawerOpen} onClose={() => setDrawerOpen(false)}>
            <Box sx={{ width: 250 }} role="presentation">
              <List>
                <ListItem button onClick={() => { navigate('/User') }}>
                  <FaHome size={20} />
                  <ListItemText primary="Human Explore" />
                </ListItem>
                <ListItem button onClick={() => { navigate('/Local') }}>
                  <TbPackage size={20} />
                  <ListItemText primary="Local" />
                </ListItem>
                <ListItem button onClick={() => { navigate('/National') }}>
                  <TbPackage size={20} />
                  <ListItemText primary="National" />
                </ListItem>
                <ListItem button onClick={() => { navigate('/International') }}>
                  <TbPackage size={20} />
                  <ListItemText primary="International" />
                </ListItem>
                <ListItem button onClick={() => { navigate('/Booking') }}>
                  <GrStatusUnknown size={20} />
                  <ListItemText primary="Booking Status" />
                </ListItem>
                <ListItem button onClick={() => { navigate('/ProofofPayment') }}>
                  <img src={iconImage} alt='proof' style={{ width: '22px' }} />
                  <ListItemText primary="Proof of Payment" />
                </ListItem>
                <ListItem button onClick={() => { navigate('/MyReservation') }}>
                  <RiReservedLine size={20} />
                  <ListItemText primary="My Reservation" />
                </ListItem>  
                
                <Box sx={{ position: 'absolute', bottom: '-175%', width: '100%' }}>
                  <Divider />
                  <ListItem button onClick={handleLogout}>
                    <BiLogOutCircle size={20} />
                    <ListItemText primary="Logout" />
                  </ListItem>
                </Box>
              </List>
            </Box>
          </Drawer>
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: 'none', md: 'flex', flexGrow: 10 } }}>
            <Avatar
              alt="User Avatar"
              src={userImageUrl}
              sx={{ width: 32, height: 32 }}
              style={{ cursor: 'pointer' }}
              onClick={() => { navigate('/UserProfile') }}
            />
          </Box>
          <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
    </Box>
  );
}
