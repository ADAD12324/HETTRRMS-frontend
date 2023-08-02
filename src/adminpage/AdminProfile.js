import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { Typography, Badge } from '@material-ui/core';
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
import '../css/Adminprofile.css';
import Avatar from '@material-ui/core/Avatar';
import { MdCameraAlt } from 'react-icons/md';
import { AiOutlineMail } from "react-icons/ai";
import {AiOutlinePhone} from "react-icons/ai";
import { AiFillSetting } from "react-icons/ai";
import axios from 'axios';
import {MdBackup} from "react-icons/md";
import {AiOutlineFolder} from "react-icons/ai";
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

export default function AdminProfile() {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };
  

  const [unreadCount, setUnreadCount] = useState(parseInt(localStorage.getItem('unreadCount')) || 0);
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
  
  //for admin user 
  const [id, setId] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [userImageUrl, setUserImageUrl] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [birthdate, setBirthdate] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);
  const [isImageFormOpen, setIsImageFormOpen] = useState(false);
  const [isEditFormOpen, setIsEditFormOpen] = useState(false);
  const [editFirstName, setEditFirstName] = useState('');
  const [editLastName, setEditLastName] = useState('');
  const [editPhoneNumber, setEditPhoneNumber] = useState('');
  const [editEmail, setEditEmail] = useState('');
  const [editBirthdate, setEditBirthdate] = useState('');
  const [editAge, setEditAge] = useState('');
  const [editGender, setEditGender] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');
  const [isSettingsDropdownOpen, setIsSettingsDropdownOpen] = useState(false);
  const [isPasswordFormOpen, setIsPasswordFormOpen] = useState(false);

  const handleFileInputChange = (event) => {
    setSelectedFile(event.target.files[0]);
  }

  const handleImageFormSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append('userImage', selectedFile);

    const requestOptions = {
      method: 'PUT',
      body: formData,
      credentials: 'include'
    };

    fetch(`/api/users/${id}/image`, requestOptions)
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to update user image');
        }
        return response.json();
      })
      .then(data => {
        setUserImageUrl(data.userImageUrl);
        setSelectedFile(null);
        setIsImageFormOpen(false);
      })
      .catch(error => console.error(error));
  }

  const handleUpdateUser = () => {
    const requestOptions = {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        id: id,
        firstName: editFirstName,
        lastName: editLastName,
        email: editEmail,
        phoneNumber: editPhoneNumber,
        birthdate: editBirthdate,
        age: editAge,
        gender: editGender,
      }),
    };
  
    fetch(`/api/users/${id}`, requestOptions)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to update user');
        }
        return response.json();
      })
      .then((data) => {
        // Update the user information on the frontend if required
        setFirstName(data.firstName);
        setLastName(data.lastName);
        setPhoneNumber(data.phoneNumber);
        setEmail(data.email);
        setBirthdate(new Date(data.birthdate).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }));
        setAge(data.age);
        setGender(data.gender);
  
        // Update the edit form values
        setEditFirstName(data.firstName);
        setEditLastName(data.lastName);
        setEditPhoneNumber(data.phoneNumber);
        setEditEmail(data.email);
        setEditBirthdate(data.birthdate);
        setEditAge(data.age);
        setEditGender(data.gender);
  
        setIsEditFormOpen(false); // Close the edit form
      })
      .catch((error) => {
        console.error(error);
      });
  };
   
  const handleEditFormSubmit = (event) => {
    event.preventDefault();
    handleUpdateUser();
  };

  const handlePasswordFormSubmit = (event) => {
    event.preventDefault();
  
    // Check if the new password and confirm new password match
    if (newPassword !== confirmNewPassword) {
      // Show an error or handle the password mismatch scenario
      console.error('Passwords do not match');
      return;
    }
  
    // Perform password change logic here
    // You can use the fetch API to send a request to the backend and update the password
    const requestOptions = {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        currentPassword: currentPassword,
        newPassword: newPassword,
        confirmNewPassword: confirmNewPassword,
      }),
    };
  
    fetch(`/api/users/${id}/password`, requestOptions)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to update password');
        }
        return response.json();
      })
      .then((data) => {
        // Password updated successfully
        // You can show a success message or handle the success scenario as required
        console.log('Password updated successfully');
        setIsPasswordFormOpen(false); // Close the password form
      })
      .catch((error) => {
        console.error(error);
      });
  };
  

  useEffect(() => {
    fetch('/api/user', { credentials: 'include' })
      .then((response) => response.json())
      .then((data) => {
        setUserImageUrl(data.userImageUrl);
        setId(data.id);
        setFirstName(data.firstName);
        setLastName(data.lastName)
        setEmail(data.email);
        setPhoneNumber(data.phoneNumber);
        setBirthdate(new Date(data.birthdate).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }));
        setAge(data.age);
        setGender(data.gender);

        // Set the default values for the edit form
        setEditFirstName(data.firstName);
        setEditLastName(data.lastName);
        setEditPhoneNumber(data.phoneNumber);
        setEditEmail(data.email);
        setEditBirthdate(data.birthdate);
        setEditAge(data.age);
        setEditGender(data.gender);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const handleSettingsClick = () => {
    setIsSettingsDropdownOpen(!isSettingsDropdownOpen);
  };
  
  const handleLogout = () => {
    axios.get('/api/logout')
      .then(() => {
        localStorage.removeItem('userId');
        navigate('/');
      })
      .catch((error) => {
        console.error(error);
        // Handle error
      });
  }; 
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
      <main className={`${classes.content} ${showContent ? 'fadeAnim' : ''}`}>
        <div className="prof">Admin Profile</div>
      <div className="divline"></div>
      <div className="settings-icon-container">
        <AiFillSetting size={30} className="settings-icon" onClick={handleSettingsClick} />
        {isSettingsDropdownOpen && (
          <div className="settings-dropdown">
            <ul>
              <li onClick={() => setIsPasswordFormOpen(true)}>Change Password</li>
              <li  onClick={() => setIsEditFormOpen(true)}>Edit Information</li>
              <li onClick={handleLogout}>Logout</li>
            </ul>
          </div>  
        )}
      </div>
      <div className="avatar-container1">
          <Avatar alt="User Avatar" className="avatar1" src={userImageUrl} style={{ width: '180px', height: '180px' }} onClick={() => setIsImageFormOpen(true)} />
          <div className="avatar-icon1" onClick={() => setIsImageFormOpen(true)}>
            <MdCameraAlt size={30} />
          </div>
        </div>
        <div className="fullname"> {firstName} {lastName}</div>
        <div className="emailprof">Email <AiOutlineMail size={20} /> : {email}</div>
        <div className="phoneprof">PhoneNumber <AiOutlinePhone size={20} /> : {phoneNumber}</div>
        <div className="bdayprof">Company Start Date : <AiOutlinePhone size={20} /> : {birthdate}</div> 
        <div className="ageprof">Years in Service: <AiOutlinePhone size={20} /> : {age}</div>
        <div className="genderprof" type="hidden">Gender: <AiOutlinePhone size={20} /> : {gender}</div>

      {isImageFormOpen && (
        <form className="formchange" onSubmit={handleImageFormSubmit}>
          <input type="file" accept='.png, .jpg' onChange={handleFileInputChange} />
          <button type="submit">Save</button>
          <br />
          <button type="button" onClick={() => setIsImageFormOpen(false)}>Cancel</button>
        </form>
      )}

{isEditFormOpen && (
  <form className="formedituser" onSubmit={handleEditFormSubmit}>
    <h2>Update Information</h2>
    <input
      type="text"
      value={editFirstName}
      onChange={(e) => setEditFirstName(e.target.value)}
      placeholder="First Name"
      required
    />
    <input
      type="text"
      value={editLastName}
      onChange={(e) => setEditLastName(e.target.value)}
      placeholder="Last Name"
      required
    />
    <input
      type="text"
      value={editPhoneNumber}
      onChange={(e) => setEditPhoneNumber(e.target.value)}
      placeholder="Phone Number"
      required
    />
    <input
      type="email"
      value={editEmail}
      onChange={(e) => setEditEmail(e.target.value)}
      placeholder="Email"
      required
    />
    <input
    style={{marginTop:'10px', width:'400px'}}
      type="date"
      value={editBirthdate}
      onChange={(e) => setEditBirthdate(e.target.value)}
      placeholder="Birthdate"
      required
    />
    <input
      type="text"
      value={editAge}
      onChange={(e) => setEditAge(e.target.value)}
      placeholder="Age"
      required
    />
    <input
      type="text"
      value={editGender}
      onChange={(e) => setEditGender(e.target.value)}
      placeholder="Gender"
      required
    />
    <button type="submit">Save</button>
    <br />
    <button
      type="button"
      style={{
        position: 'relative',
        backgroundColor: '#FC2947',
        color: '#fff',
        padding: '10px 12px',
        border: 'none',
        borderRadius: '5px',
        fontSize: '16px',
        ':hover': { backgroundColor: '#ff385c' },
        cursor: 'pointer',
        marginTop: '5px',
      }}
      onClick={() => setIsEditFormOpen(false)}
    >
      Cancel
    </button>
  </form>
)}

{isPasswordFormOpen && (
  <form className="password-form" onSubmit={handlePasswordFormSubmit}>
    <h2>Change Password</h2>
    <input
      type="password"
      value={currentPassword}
      onChange={(e) => setCurrentPassword(e.target.value)}
      placeholder="Current Password"
      required
    />
    <input
      type="password"
      value={newPassword}
      onChange={(e) => setNewPassword(e.target.value)}
      placeholder="New Password"
      required
    />
    <input
      type="password"
      value={confirmNewPassword}
      onChange={(e) => setConfirmNewPassword(e.target.value)}
      placeholder="Confirm New Password"
      required
    />
    <button type="submit">Save</button>
    <br />
    <button
      type="button"
      style={{
        position: 'relative',
        backgroundColor: '#FC2947',
        color: '#fff',
        padding: '10px 12px',
        border: 'none',
        borderRadius: '5px',
        fontSize: '16px',
        ':hover': { backgroundColor: '#ff385c' },
        cursor: 'pointer',
        marginTop: '5px',
      }}
      onClick={() => setIsPasswordFormOpen(false)}
    >
      Cancel
    </button>
  </form>
)}
      </main>
    </div>
  );
}
