import React, { useState, useEffect, useRef,  useCallback } from 'react';
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
import './users.css';
import axios from 'axios';
import Swal from 'sweetalert';
import moment from "moment";
import paymentproof from "../assets/proofofpay.png";
import AccandDec from "../assets/AAD.png";
import {AiOutlineFolder} from "react-icons/ai";
import {MdBackup} from "react-icons/md";
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


export default function Users() {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [showForm, setShowForm] = useState(false);
  const formRef = useRef(null);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [birthdate, setBirthdate] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [idImage, setIdImage] = useState(null);
  const navigate = useNavigate();
  
  const [errors, setErrors] = useState({});
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    // When the component mounts, wait for a short duration and then show the content
    const timer = setTimeout(() => {
      setShowContent(true);
    }, 300); // You can adjust the duration as needed

    // Clean up the timer when the component unmounts
    return () => clearTimeout(timer);
  }, []);
  const handleSubmit = (event) => {
    event.preventDefault();

    // Validate the form inputs
    const newErrors = {};
    if (firstName.trim() === '') {
      newErrors.firstName = 'Please enter your first name';
    }
    if (lastName.trim() === '') {
      newErrors.lastName = 'Please enter your last name';
    }
    if (email.trim() === '') {
      newErrors.email = 'Please enter your email';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Please enter a valid email';
    }
    if (phoneNumber.trim() === '') {
      newErrors.phoneNumber = 'Please enter your phone number';
    } else if (!/^\d{10}$/.test(phoneNumber)) {
      newErrors.phoneNumber = 'Please enter a valid phone number';
    }
    if (birthdate.trim() === '') {
      newErrors.birthdate = 'Please enter your birthdate';
    }
    if (gender.trim() === '') {
      newErrors.gender = 'Please select your gender';
    }
    if (username.trim() === '') {
      newErrors.username = 'Please enter your username';
    }
    if (password.trim() === '') {
      newErrors.password = 'Please enter your password';
    }
    if (confirmPassword.trim() === '') {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (confirmPassword !== password) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    if (!idImage) {
      newErrors.idImage = 'Please upload your ID image';
    }

    // Update the errors state
    setErrors(newErrors);

    // Submit the form if there are no errors
    if (Object.keys(newErrors).length === 0) {
      const formData = new FormData();
      formData.append('firstName', firstName);
      formData.append('lastName', lastName);
      formData.append('email', email);
      formData.append('phoneNumber', phoneNumber);
      formData.append('birthdate', birthdate);
      formData.append('age', age);
      formData.append('gender', gender);
      formData.append('username', username);
      formData.append('password', password);
      formData.append('confirmPassword', confirmPassword);
      formData.append('idImage', idImage);

      fetch('/api/register', {
        method: 'POST',
        body: formData,
      })
        .then((response) => {
          if (response.ok) {
            alert('User registered successfully');
          } else {
            alert('Error registering user');
          }
        })
        .catch((error) => {
          console.error(error);
          alert('Error registering user');
        });
    }
  };
  

  useEffect(() => {
    function handleClickOutside(event) {
      if (formRef.current && !formRef.current.contains(event.target)) {
        setShowForm(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [formRef]);

 

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };
 
   
  const [users, setUsers] = useState([]);
  

  useEffect(() => {
    fetch('/show')
      .then(response => response.json())
      .then(data => setUsers([...data]));
  }, []);
 
  
  useEffect(() => {
    axios.get('/api/users')
      .then(response => setUsers(response.data))
      .catch(error => console.error(error));
  }, []);

  // Delete a user with the specified ID
  function deleteUser(id) {
    axios.delete(`/api/users/${id}`)
      .then(response => {
        console.log(response.data.message); 
        setUsers(users.filter(user => user.id !== id));
      })
      .catch(error => console.error(error));
  }


  //edit user details
  const [editingUser, setEditingUser] = useState(null);
  const handleEdit = (user) => {
    setEditingUser(user);
  };
  const updateUser = async (id) => {
    try {
      const response = await fetch(`/api/users/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(editingUser),
      });
      if (response.ok) {
        const updatedUser = await response.json();
        setUsers(users.map((user) => (user.id === id ? updatedUser : user)));
        setEditingUser(null);
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'You have successfully edited the user details.',
          showConfirmButton: false,
          timer: 1500
        })
      } else {
        throw new Error('Failed to update user');
      }
    } catch (error) {
      console.error(error);
    }
  };

//search filtering
const [searchTerm, setSearchTerm] = useState("");
const [filteredUsers, setFilteredUsers] = useState([]);

const filterUsers = useCallback((users) => {
  const filteredUsers = users.filter((user) => {
    return (
      user.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });
  setFilteredUsers(filteredUsers);
}, [searchTerm]);

useEffect(() => {
  filterUsers(users);
}, [users, filterUsers]);

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
        <div className={classes.toolbar} />
        <div>
      <input
        className="search"
        type="text"
        placeholder="Search users"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
    </div>
        <table className="user-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Phone Number</th>
            <th>Birthdate</th>
            <th>Age</th>
            <th>Gender</th>
            <th>Username</th>
            <th>Password</th>
            <th>ID Image</th>
            <th>User Image</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
        {filteredUsers.map((user) => (
  <tr key={user.id}>
    <td>{user.id}</td>
    <td>
      {editingUser && editingUser.id === user.id ? (
        <input
        className="fnameed"
          type="text"
          value={editingUser.firstName}
          onChange={(e) =>
            setEditingUser({
              ...editingUser,
              firstName: e.target.value,
            })
          }
        />
      ) : (
        user.firstName
      )}
    </td>
    <td>
      {editingUser && editingUser.id === user.id ? (
        <input
        className='lnameed'
          type="text"
          value={editingUser.lastName}
          onChange={(e) =>
            setEditingUser({
              ...editingUser,
              lastName: e.target.value,
            })
          }
        />
      ) : (
        user.lastName
      )}
    </td>
    <td>
      {editingUser && editingUser.id === user.id ? (
        <input
        className="emailed"
          type="text"
          value={editingUser.email}
          onChange={(e) =>
            setEditingUser({
              ...editingUser,
              email: e.target.value,
            })
          }
        />
      ) : (
        user.email
      )}
    </td>
    <td>
      {editingUser && editingUser.id === user.id ? (
        <input
        className="phoneed"
          type="text"
          value={editingUser.phoneNumber}
          onChange={(e) =>
            setEditingUser({
              ...editingUser,
              phoneNumber: e.target.value,
            })
          }
        />
      ) : (
        user.phoneNumber
      )}
    </td>
    <td>
  {editingUser && editingUser.id === user.id ? (
    <input
    className="bdayed"
      type="date"
      value= {editingUser.birthdate}
      onChange={(e) =>
        setEditingUser({
          ...editingUser,
          birthdate: e.target.value,
        })
      }
    />
  ) : (
    moment(user.birthdate).format('YYYY/MM/DD')
  )}
</td>
    <td>
      {editingUser && editingUser.id === user.id ? (
        <input
        className="ageed"
          type="text"
          value={editingUser.age}
          onChange={(e) =>
            setEditingUser({
              ...editingUser,
              age: e.target.value,
            })
          }
        />
      ) : (
        user.age
      )}
    </td>
    <td>
      {editingUser && editingUser.id === user.id ? (
        <input
        className="gendered"
          type="text"
          value={editingUser.gender}
          onChange={(e) =>
            setEditingUser({
              ...editingUser,
              gender: e.target.value,
            })
          }
        />
      ) : (
        user.gender
      )}
    </td>
    <td>
      {editingUser && editingUser.id === user.id ? (
        <input
        className='usernameed'
          type="text"
          value={editingUser.username}
          onChange={(e) =>
            setEditingUser({
              ...editingUser,
              username: e.target.value,
            })
          }
        />
      ) : (
        user.username
      )}
    </td>
    <td>
     
       {user.password} 
     
    </td>
    <td>
  {user.idImage && (
    <img src={`../uploads/${user.idImage}`} alt={`ID of ${user.firstName}`} style={{width: '350px', height: '160px'}} />
  )}
</td>
<td>
  {user.userImage && (
    <img src={`../uploads/${user.userImage}`} alt={`User Image}`} style={{width: '150px', height: '160px'}} />
  )}
</td>
    <td>{user.role}</td>
    <td>
      {editingUser && editingUser.id === user.id ? (
        <button style={{backgroundColor:'#227C70',color:'#fff', padding:'5px 21px', border:'none', borderRadius:'5px', fontSize:'16px', ':hover':{backgroundColor:'#ff385c'}, cursor:"pointer", marginTop:'5px' }} onClick={() => updateUser(user.id)}>Save</button>
      ) : (
        <button  style={{backgroundColor:'#2C74B3',color:'#fff', padding:'5px 21px', border:'none', borderRadius:'5px', fontSize:'16px', ':hover':{backgroundColor:'#ff385c'}, cursor:"pointer", marginTop:'5px' }} onClick={() => handleEdit(user)}>Edit</button>
      )}<br />
      <button  style={{backgroundColor:'#FC2947',color:'#fff', padding:'5px 10px', border:'none', borderRadius:'5px', fontSize:'16px', cursor:"pointer", marginTop:'5px' }} onClick={() => deleteUser(user.id)}>Delete</button>
    </td>
  </tr>
))}
        </tbody>
      </table>


     
    <div className="App">
      <button className="add" onClick={() => setShowForm(true)}>Add User</button>
      {showForm &&
        <div className="form-overlay1">
          <div className="form-container1" ref={formRef}>
           
          <form onSubmit={handleSubmit}>
            <div className="addnew">Add New User</div>
     <label>
          First Name:
          {errors.firstName && <span style={{ color: "red" }} className="error">{errors.firstName}</span>}
          <input
            className="firstname1"
            type="text"
            value={firstName}
            onChange={(event) => setFirstName(event.target.value)}
          />
        </label><br/><div style={{marginTop:'5px'}}></div>
        <label>
          Last Name:
          {errors.lastName && <span style={{ color: "red" }} className="error">{errors.lastName}</span>}
          <input
            className="lastname1"
            type="text"
            value={lastName}
            onChange={(event) => setLastName(event.target.value)}
          />
        </label><br/><div style={{marginTop:'5px'}}></div>
      <label>
        Email:
        {errors.email && <span style={{color:"red"}} className="error">{errors.email}</span>}
        <input
        className="email1"
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />
      </label><br/><div style={{marginTop:'5px'}}></div>
      <label>
        Phone Number:
        {errors.phoneNumber && <span style={{color:"red"}} className="error">{errors.phoneNumber}</span>}
        <input
        className="phone1"
          type="tel"
          value={phoneNumber}
          onChange={(event) => setPhoneNumber(event.target.value)}
        />
      </label><br/><div style={{marginTop:'5px'}}></div>
      <label>
  Birthdate:
  {errors.birthdate && <span style={{color:"red"}} className="error">{errors.birthdate}</span>}
  <input
  className="birth1"
    type="date"
    value={birthdate}
    onChange={(event) => {
      setBirthdate(event.target.value);
      const dob = new Date(event.target.value);
      const ageDiffMs = Date.now() - dob.getTime();
      const ageDate = new Date(ageDiffMs);
      const age = Math.abs(ageDate.getUTCFullYear() - 1970);
      setAge(age);
    }}
  />
</label><br/><div style={{marginTop:'5px'}}></div>
<label>
  Age:
  {errors.age && <span style={{color:"red"}} className="error">{errors.age}</span>}
  <input
  className="age1"
    type="number"
    value={age}
    onChange={(event) => setAge(event.target.value)}
  />
</label><br/><div style={{marginTop:'5px'}}></div>
      <label>
        Gender:
        {errors.gender && <span style={{color:"red"}} className="error">{errors.gender}</span>}
        <select
        className="gender1"
          value={gender}
          onChange={(event) => setGender(event.target.value)}
        >
          <option value="">Select</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">Other</option>
        </select>
      </label><br/><div style={{marginTop:'5px'}}></div>
      <label>
        Username:
    
        {errors.username && <span style={{color:"red"}} className="error">{errors.username}</span>}
        <input
        className="username1"
          type="text"
          value={username}
          onChange={(event) => setUsername(event.target.value)}
        />
      </label><br /><div style={{marginTop:'5px'}}></div>
      <label>
        Password:
        {errors.password && <span style={{color:"red"}} className="error">{errors.password}</span>}
        <input
        className="password1"
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
      </label><br/><div style={{marginTop:'5px'}}></div>
      <label>
        Confirm Password:
        {errors.confirmPassword && <span style={{color:"red"}} className="error">{errors.confirmPassword}</span>}
        <input
        className='cpassword1'
          type="password"
          value={confirmPassword}
          onChange={(event) => setConfirmPassword(event.target.value)}
        />
      </label><br/><div style={{marginTop:'5px'}}></div>
      <label>
        Valid ID:
        {errors.idImage && <span style={{color:"red"}} className="error">{errors.idImage}</span>}
        <input
        className="valid1"
          type="file"
          accept="image/*"
          onChange={(event) => setIdImage(event.target.files[0])}
        />
      </label><br/>
      <button className='usersub' type="submit" style={{marginBottom:'10px'}}>Submit</button>
    </form>
          </div>
        </div>
      }
    </div>

      </main>
    </div>
  );
}
