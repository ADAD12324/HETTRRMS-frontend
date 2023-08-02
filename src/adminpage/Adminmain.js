import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import axios from 'axios';
import { Card, CardContent, Typography, Badge } from '@material-ui/core';
import { FaUsers } from 'react-icons/fa';
import {FaBox} from 'react-icons/fa';
import {FaClipboardCheck} from 'react-icons/fa';
import {MdAssignment} from "react-icons/md";
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import CssBaseline from '@material-ui/core/CssBaseline';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import PeopleIcon from '@material-ui/icons/People';
import AddBoxIcon from '@material-ui/icons/AddBox';
import EventIcon from '@material-ui/icons/Event';
import EventNoteIcon from '@material-ui/icons/EventNote';
import NotificationsIcon from '@material-ui/icons/Notifications';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import DashboardIcon from '@material-ui/icons/Dashboard';
import BusinessCenterIcon from '@material-ui/icons/BusinessCenter';
import { useNavigate } from 'react-router-dom';
import paymentproof from "../assets/proofofpay.png";
import AccandDec from "../assets/AAD.png";
import {MdBackup} from "react-icons/md";
import {AiOutlineFolder} from "react-icons/ai";
import '../css/Adminmain.css';
import Loading from '../components/Loading';
const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  card: {
    minWidth: 275,
  },
  menuButton: {
    marginRight: 36,
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9) + 1,
    },
    backgroundColor: '#F7D060',
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    
  },
  drawerPaper: {
    backgroundColor: '#F7D060', 
    width: drawerWidth,
  },
}));

export default function Adminmain() {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };
  const [users, setUsers] = useState(0);
  const [packages, setPackages] = useState(0);
  const [national, setNational] = useState(0);
  const [international, setInternational] = useState(0);
  const [pendingBookingsCount, setPendingBookingsCount] = useState(0);
  const [pendingRequestsCount, setPendingRequestsCount] = useState(0);
  const [reservation, setReservation] = useState(0)
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    // When the component mounts, wait for a short duration and then show the content
    const timer = setTimeout(() => {
      setShowContent(true);
    }, 300); // You can adjust the duration as needed

    // Clean up the timer when the component unmounts
    return () => clearTimeout(timer);
  }, []);
  
  useEffect(() => {
    axios.get('../users')
      .then(res => setUsers(res.data))
      .catch(err => console.error(err));
  }, []);

  useEffect(() => {
    axios.get('../packages')
      .then(res => setPackages(res.data))
      .catch(err => console.error(err));
  }, []);

 useEffect(() => {
    axios.get('../national')
      .then(res => setNational(res.data))
      .catch(err => console.error(err));
  }, []);

  useEffect(() => {
    axios.get('../international')
      .then(res => setInternational(res.data))
      .catch(err => console.error(err));
  }, []);

  useEffect(() => {
    axios.get('../bookings/count?status=pending')
      .then(res => setPendingBookingsCount(res.data.count))
      .catch(err => console.error(err));
  }, []);
  useEffect(() => {
    axios.get('../requests/count?status=pending')
      .then(res => setPendingRequestsCount(res.data.count))
      .catch(err => console.error(err));
  }, []);
  useEffect(() => {
    axios.get('../reservation')
      .then(res => setReservation(res.data))
      .catch(err => console.error(err));
  }, []);
  
  const [totalPendingCount, setTotalPendingCount] = useState(0);

  useEffect(() => {
    setTotalPendingCount(pendingBookingsCount + pendingRequestsCount);
  }, [pendingBookingsCount, pendingRequestsCount]);
  const [unreadCount, setUnreadCount] = useState(parseInt(localStorage.getItem('unreadCount')) || 0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      fetch('/api/notifications')
        .then((response) => response.json())
        .then((data) => {
          const newUnreadCount = data.filter(notification => !notification.read && !localStorage.getItem(`notification_${notification.id}`)).length;
          setUnreadCount(newUnreadCount);
          localStorage.setItem('unreadCount', newUnreadCount);
        })
        .catch((error) => {
          console.error(error);
        });
    }, 60000);

    return () => clearInterval(intervalId);
  }, []);

  const navigate = useNavigate();
  
  if (!showContent) {
    return <Loading />;
  }
  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar style={{background:'#3C4048'}}
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer" 
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, {
              [classes.hide]: open,
            })}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap>
            Admin Dashboard
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
          variant="permanent"
          className={clsx(classes.drawer, {
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
          })}
          classes={{
            paper: clsx({
              [classes.drawerPaper]: open,
              [classes.drawerOpen]: open,
              [classes.drawerClose]: !open,
            }),
          }}
      >
        <div className={classes.toolbar}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </div>

        <List>
  <ListItem button key="Dashboard" onClick={() => {navigate('/admin')}}>
    <ListItemIcon>
      <DashboardIcon />
    </ListItemIcon>
    <ListItemText primary="Dashboard" />
  </ListItem>
  <ListItem button key="User" onClick={() => {navigate('/Showuser')}}>
    <ListItemIcon>
      <PeopleIcon />
    </ListItemIcon>
    <ListItemText primary="User" />
  </ListItem>
  <ListItem button key="Add Package" onClick={() => {navigate('/AddPackages')}}>
    <ListItemIcon>
      <AddBoxIcon />
    </ListItemIcon>
    <ListItemText primary="Add Package" />
  </ListItem>
  <ListItem button key="Reservation" onClick={() => {navigate('/Reservation')}}>
    <ListItemIcon>
      <EventNoteIcon />
    </ListItemIcon>
    <ListItemText primary="Reservation" />
  </ListItem>
  <ListItem button key="Notification" onClick={() => {navigate('/AdminNotification')}}>
    <ListItemIcon>
    <Badge badgeContent={unreadCount} color="secondary">
      <NotificationsIcon/>
    </Badge>
    </ListItemIcon>
    <ListItemText primary="Notification" />
  </ListItem>
  <ListItem button key="Travel/Tour Schedule" onClick={() => {navigate('/TravelandTourSchedule')}}>
    <ListItemIcon>
      <EventIcon />
    </ListItemIcon>
    <ListItemText primary="Travel/Tour Schedule"/>
  </ListItem>
  <ListItem button key="Accept and Decline" onClick={() => {navigate('/AcceptDecline')}}>
    <ListItemIcon>
    <img src={AccandDec} alt='proof' style={{width:'22px', color:'gray'}} />
    </ListItemIcon>
    <ListItemText primary="Accept and Decline"/>
  </ListItem>
  <ListItem button key="Customers Payment Proof " onClick={() => {navigate('/CustomersPayment')}}>
    <ListItemIcon>
    <img src={paymentproof} alt='proof' style={{width:'22px', color:'gray'}} />
    </ListItemIcon>
    <ListItemText primary="Customer Payment Proof"/>
  </ListItem>
  <ListItem button key="Clients Record" onClick={() => {navigate('/ClientsRecord')}}>
    <ListItemIcon>
      <AiOutlineFolder size={25} />
    </ListItemIcon>
    <ListItemText primary="Clients Record"/>
  </ListItem>
  <ListItem button key="Business Partner Record" onClick={() => {navigate('/BusinessPartnerRecord')}}>
    <ListItemIcon>
      <BusinessCenterIcon />
    </ListItemIcon>
    <ListItemText primary="Business Partner Record"/>
  </ListItem>
  <ListItem button key="Backup and Restore" onClick={() => {navigate('/Backup&Restore')}}>
    <ListItemIcon>
    <MdBackup size={25} />
    </ListItemIcon>
    <ListItemText primary="Backup and Restore" />
  </ListItem>
  <ListItem button key="Account" onClick={() => {navigate('/AdminProfile')}}>
    <ListItemIcon>
      <AccountCircleIcon/>
    </ListItemIcon>
    <ListItemText primary="Account" />
  </ListItem>
</List>

      </Drawer>
      <main className={`${classes.content} ${showContent ? 'fadeInAnimation' : ''}`}>
        <div className={classes.toolbar} />
        <div style={{ display: 'flex', flexWrap: 'wrap' }}>
      <Card onClick={() => {navigate('/Showuser')}}
      className='crduser'
      style={{
        color: 'black',
        width: '100%',
        maxWidth: '400px',
        margin: '0 auto',
        marginBottom: '20px',
        backgroundColor: '#F6E1C3',
        textAlign: 'center',
      }}
      >
        <CardContent>
          <FaUsers size={60} />
          <Typography variant="h5" component="h2">
            Total Users
          </Typography>
          <Typography variant="h2" component="p">
            {users}
          </Typography>
        </CardContent>
      </Card>

      <Card
      className='crdlocal'
      onClick={() => {navigate('/AddPackages')}}
      style={{
        color: 'black',
        width: '100%',
        maxWidth: '400px',
        margin: '0 auto',
        marginBottom: '20px',
        backgroundColor: '#EA5455',
        textAlign: 'center',
      }}
      >
        <CardContent>
          <FaBox size={60} />
          <Typography variant="h5" component="h2">
            Local Packages
          </Typography>
          <Typography variant="h2" component="p">
            {packages}
          </Typography>
        </CardContent>
      </Card>

      <Card
      className='crdnational'
      onClick={() => {navigate('/AddPackages')}}
      style={{
        color: 'black',
        width: '100%',
        maxWidth: '400px',
        margin: '0 auto',
        marginBottom: '20px',
        backgroundColor: '#19A7CE',
        textAlign: 'center',
      }}
      >
        <CardContent>
          <FaClipboardCheck size={60} />
          <Typography variant="h5" component="h2">
            National Packages
          </Typography>
          <Typography variant="h2" component="p">
          {national}
          </Typography>
        </CardContent>
      </Card>

      <Card
      className='crdinter'
      onClick={() => {navigate('/AddPackages')}}
      style={{
        color: 'black',
        width: '100%',
        maxWidth: '400px',
        margin: '0 auto',
        marginBottom: '20px',
        backgroundColor: '#E7AB9A',
        textAlign: 'center',
      }}
      >
        <CardContent>
          <MdAssignment size={60} />
          <Typography variant="h5" component="h2">
            International Packages
          </Typography>
          <Typography variant="h2" component="p">
            {international}
          </Typography>
        </CardContent>
      </Card>

      <Card
      className='crdand'
      onClick={() => {navigate('/AcceptDecline')}}
      style={{
        color: 'black',
        width: '100%',
        maxWidth: '400px',
        margin: '0 auto',
        marginBottom: '20px',
        backgroundColor: '#19A7CE',
        textAlign: 'center',
      }}
      >
        <CardContent>
          <FaClipboardCheck size={60} />
          <Typography variant="h5" component="h2">
            Accept and Decline
          </Typography>
          <Typography variant="h2" component="p">
          {totalPendingCount}
          </Typography>
        </CardContent>
      </Card>

      <Card
        className='crdres'
        onClick={() => {navigate('/Reservation')}}
        style={{
          color: 'black',
          width: '100%',
          maxWidth: '400px',
          margin: '0 auto',
          marginBottom: '20px',
          backgroundColor: '#E7AB9A',
          textAlign: 'center',
        }}
      >
        <CardContent>
          <MdAssignment size={60} />
          <Typography variant="h5" component="h2">
            For Reservation
          </Typography>
          <Typography variant="h2" component="p">
            {reservation}
          </Typography>
        </CardContent>
      </Card>
    </div>
      </main>
    </div>
  );
}
