import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import {  Card, CardContent, CardMedia,Typography, Button,  Grid, Badge } from '@material-ui/core';
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
import axios from 'axios';
import swal from 'sweetalert';
import "./AddPackage.css";
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
    minWidth: 200,
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

export const PackageCard =({ id, name, description, price, imageUrl, itinerary, onViewDetails, isNational, isInternational }) => {
  const handleViewDetailsClick = () => {
    onViewDetails(id, name, description, imageUrl, itinerary); 
  };

  return (
    <Card className='package-card'>
      <CardMedia component="img" image={imageUrl} style={{ height: "200px" }} />
      <CardContent>
        <Typography variant="h5" component="h2">
          {name}
        </Typography>
        <Typography variant="h6" component="p">
          <b>₱</b>{price}
        </Typography>
        {isNational ? (
          <Button onClick={handleViewDetailsClick}>View Details</Button>
        ) : isInternational ? (
          <Button onClick={() => handleViewDetailsClick(id, name, description, price, imageUrl, itinerary)}>View Details</Button>
        ) : (
          <Button onClick={handleViewDetailsClick}>View Details</Button>
        )}
      </CardContent>
    </Card>
  );
};
export default function Addpack() {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };
 
  const navigate = useNavigate();
  const [selectedButton, setSelectedButton] = useState("");

  const handleButtonClick = (buttonName) => {
    setSelectedButton(buttonName);
  };

  
  //the add pack function
const [name, setName] = useState('');
const [description, setDescription] = useState('');
const [price, setPrice] = useState('');
const [image, setImage] = useState(null);
const [imagePreview, setImagePreview] = useState(null);
const [showForm, setShowForm] = useState(false);
const [packages, setPackages] = useState([]);
const [national, setNational] = useState([]);
const [international, setInternational] = useState([]);  
const [itinerary, setItinerary] = useState([{day: '', activities: [{name: '', startTime: '', endTime: ''}]}]);
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
    axios.get('https://hettrrms-server.onrender.com/api/packages')
      .then((response) => {
        setPackages(response.data);
        
      })
      .catch((error) => {
        console.log(error);
      });
      
  }, []);

  useEffect(() => {
    axios.get('https://hettrrms-server.onrender.com/api/national')
      .then((response) => {
        setNational(response.data);
        
      })
      .catch((error) => {
        console.log(error);
      });
      
  }, []);

  
  useEffect(() => {
    axios.get('https://hettrrms-server.onrender.com/api/international')
      .then((response) => {
        setInternational(response.data);
        
      })
      .catch((error) => {
        console.log(error);
      });
      
  }, []);
  
  const handleViewDetails = (id, name, description) => {
    const packageData = packages[id];
   
    navigate(`/packages/${id}`, {
      state: {
        packageData,
        imageUrl: packageData.imageUrl,
        name,
        description,
        price: packageData.price,
        itinerary: JSON.parse(packageData.itinerary), 
      },
    });
  };

  const handleViewDetailsNational = (id, name, description) => {
    const nationalData = national[id];
   
    navigate(`/national/${id}`, {
      state: { 
        nationalData,
        imageUrl: nationalData.imageUrl,
        name,
        description,
        price: nationalData.price,
        itinerary: JSON.parse(nationalData.itinerary), 
       },
    });
  };

  const handleViewDetailsInternational = (id, name, description) => {
    const internationalData = international[id];
    navigate(`/international/${id}`, {
      state: { 
        internationalData,
        imageUrl: internationalData.imageUrl,
        name,
        description,
        price: internationalData.price,
        itinerary: JSON.parse(internationalData.itinerary), 
      },
    });
  };

const handleImageChange = (event) => {
  const selectedFile = event.target.files[0];
  setImage(selectedFile);
  setImagePreview(URL.createObjectURL(selectedFile));
};


const handleSubmit = (e) => {
  e.preventDefault();

  const formData = new FormData();
  formData.append("name", name);
  formData.append("description", description);
  formData.append("price", price);
  formData.append("image", image);
  formData.append("itinerary", JSON.stringify(itinerary));

  axios
    .post("https://hettrrms-server.onrender.com/api/packages", formData)
    .then((response) => {
      console.log(response.data);
      const newPackage = {
        id: response.data.id,
        name: name,
        description: description,
        price: price,
        imageUrl: response.data.imageUrl,
        itinerary: itinerary,
      };
      setPackages([...packages, newPackage]);
      setName('');
      setDescription('');
      setPrice('');
      setImage(null);
      setImagePreview(null);
     
      swal("Successfully created a new package", "", "success");
    })
    .catch((error) => {
      console.log(error);
    });
};
//for National Packages

const handleSubmitNational = (e) => {
  e.preventDefault();
  const formData = new FormData();
  formData.append("name", name);
  formData.append("description", description);
  formData.append("price", price);
  formData.append("image", image);
  formData.append("itinerary", JSON.stringify(itinerary));
  axios
    .post("https://hettrrms-server.onrender.com/api/national", formData)
    .then((response) => {
      console.log(response.data);
      const newPackage = {
        id: response.data.id,
        name: name,
        description: description,
        price: price,
        imageUrl: response.data.imageUrl, 
        itinerary: itinerary, 

      };
      setPackages([...national, newPackage]);
      setName('');
      setDescription('');
      setPrice('');
      setImage(null);
      setImagePreview(null);
      swal("Successfully created a new national package", "", "success");
    })
    .catch((error) => {
      console.log(error);
    });
};
//for International
const handleSubmitInternational = (e) => {
  e.preventDefault();
  const formData = new FormData();
  formData.append("name", name);
  formData.append("description", description);
  formData.append("price", price);
  formData.append("image", image);
  formData.append("itinerary", JSON.stringify(itinerary));
  axios
    .post("https://hettrrms-server.onrender.com/api/international", formData)
    .then((response) => {
      console.log(response.data);
      const newPackage = {
        id: response.data.id,
        name: name,
        description: description,
        price: price,
        imageUrl: response.data.imageUrl, 
        itinerary: itinerary, 
      };
      setPackages([...international, newPackage]);
      setName('');
      setDescription('');
      setPrice('');
      setImage(null);
      setImagePreview(null);
  
      swal("Successfully created a new international package", "", "success");
    })
    .catch((error) => {
      console.log(error);
    });
    
};



  
  const [unreadCount, setUnreadCount] = useState(parseInt(localStorage.getItem('unreadCount')) || 0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      fetch('https://hettrrms-server.onrender.com/api/notifications')
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
  
  const handleAddDay = () => {
    setItinerary([...itinerary, {day: '', activities: [{name: '', startTime: '', endTime: ''}]}]);
    setShowForm(true);
  };

  const handleAddActivity = (dayIndex) => {
    const updatedDays = [...itinerary];
    updatedDays[dayIndex].activities.push({name: '', startTime: '', endTime: ''});
    setItinerary(updatedDays);
  }
  const handleRemoveActivity = (dayIndex, activityIndex) => {
    const updatedDays = [...itinerary];
    updatedDays[dayIndex].activities.splice(activityIndex, 1);
    setItinerary(updatedDays);
  }

  const handleReset = () => {
    setName('');
    setDescription('');
    setPrice('');
    setImagePreview(null);
    setItinerary([{ day: '', activities: [{ name: '', startTime: '', endTime: '' }] }]);
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
        <div className={classes.toolbar} />
        <div>
        <button
        className={`clickable-button ${selectedButton === "Local" ? "active" : ""}`}
        onClick={() => handleButtonClick("Local")}
      >
        Local Packages
      </button>
      <button
        className={`clickable-button ${selectedButton === "National" ? "active" : ""}`}
        onClick={() => handleButtonClick("National")}
      >
        National Packages
      </button>
      <button
        className={`clickable-button ${selectedButton === "International" ? "active" : ""}`}
        onClick={() => handleButtonClick("International")}
      >
        International Packages
      </button>
      </div>
       {/* Local */}
        {selectedButton === "Local" && <div>
          
                <button style={{backgroundColor:'#00337C',color:'#fff', padding:'10px 15px', border:'none', borderRadius:'5px', fontSize:'16px', ':hover':{backgroundColor:'#ff385c'}, cursor:"pointer", marginTop:'10px' }} onClick={() => setShowForm(true)}>Add Package</button>
                <h1 style={{position:"absolute", top:"210px"}}>Local Travel & Tour Packages</h1>
                <Grid container spacing={2} style={{position:"absolute", top:"300px"}}>
                {packages.map((pkg, index) => (
           <Grid item xs={12} md={2} key={index}>
            <PackageCard {...pkg} id={index} onViewDetails={handleViewDetails} />
    
  </Grid>
))}
      </Grid>
                {showForm && (
                  
      <div className="form-overlay">
       <form onSubmit={handleSubmit} onReset={handleReset}>
        <h2>Add Package</h2>
            <label>
             Package Name:
              <input
              className="packname"
                type="text"
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </label>
            <br />
            
              
              <textarea
              placeholder="Please Input the Package Inclusion"
              className="packinc"
                name="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              />
            
            <br />
            <label>
              Price:
              <input
              className="price1"
                type="number"
                name="price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                required
              />
            </label>
            <br />
            <label> 
              Image:
              <input
              className='imahe'
                type="file"
                name="image"
                accept="image/*"
                onChange={handleImageChange}
                required
              />
            </label>
            <br />
            {imagePreview && (
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  width: "200px",
                  height: "200px",
                  border: "1px solid #ddd",
                  borderRadius: "10px",
                  overflow: "hidden",
                }}
              >
                <img
                  src={imagePreview}
                  alt="Package Preview"
                  style={{ maxWidth: "300px" }}
                />
              </div>

            )}
              <br />
      <h3>Itinerary Maker:</h3>
      {itinerary.map((day, dayIndex) => (
    <div key={dayIndex} style={{ display: "flex", marginTop:'15px' }}>
    <h3>Day {dayIndex + 1}</h3>
   <br />
    {day.activities.map((activity, activityIndex) => (
      <div key={activityIndex}>
        <label>
          Activity Name:
          <input
          className="actname"
            type="text"
            name={`activityName${dayIndex}-${activityIndex}`}
            value={activity.name}
            onChange={(e) => {
              const updatedDays = [...itinerary];
              updatedDays[dayIndex].activities[activityIndex].name = e.target.value;
              setItinerary(updatedDays);
            }}  
            required
          />
        </label>
        <br />
        <label>
          Start Time:
          <input
          className="starttime"
            type="time"
            name={`startTime${dayIndex}-${activityIndex}`}
            value={activity.startTime}
            onChange={(e) => {
              const updatedDays = [...itinerary];
              updatedDays[dayIndex].activities[activityIndex].startTime = e.target.value;
              setItinerary(updatedDays);
            }}
            required
          />
        </label>
        <br />
        <label>
          End Time:
          <input
          className="endtime"
            type="time"
            name={`endTime${dayIndex}-${activityIndex}`}
            value={activity.endTime}
            onChange={(e) => {
              const updatedDays = [...itinerary];
              updatedDays[dayIndex].activities[activityIndex].endTime = e.target.value;
              setItinerary(updatedDays);
            }}
            required
          />
          <br></br>
        </label>
        <button type="button" className="remove" onClick={() => handleRemoveActivity(dayIndex, activityIndex)}>Remove</button>
        <br />
      </div>
    ))}
    <button type="button" className="addact" onClick={() => handleAddActivity(dayIndex)}>Add Activity</button>
  </div>
))}
            <button type="button" className="addday" onClick={handleAddDay}>Add Day</button>
            <br />
            <button className="sub" type="submit">Submit</button>
            <br />
            <button className='can' type="button"onClick={() => { setShowForm(false);handleReset();}}>Cancel</button>
          </form>
        </div>
      )}
      </div>
        
        }
      
      
         {selectedButton === "National" && 
         <div>
          
                <button style={{backgroundColor:'#00337C',color:'#fff', padding:'10px 15px', border:'none', borderRadius:'5px', fontSize:'16px', ':hover':{backgroundColor:'#ff385c'}, cursor:"pointer", marginTop:'10px' }} onClick={() => setShowForm(true)}>Add Package</button>
                <h1 style={{position:"absolute", top:"210px"}}>National Travel & Tour Packages</h1>
                <Grid container spacing={2} style={{position:"absolute", top:"300px"}}>
                {national.map((pkg, index) => (
  <Grid item xs={12} md={2} key={index}>
    <PackageCard
      {...pkg}
      id={index}
      onViewDetails={handleViewDetailsNational}
      imageUrl={pkg.imageUrl}
      isNational={true}
    />
  </Grid>
))}  
      </Grid>
                {showForm && (
                <div className="form-overlay">
       <form onSubmit={handleSubmitNational} onReset={handleReset}>
       <h2>Add Package</h2>
       <label>
             Package Name:
              <input
              className="packname"
                type="text"
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </label>
            <br />
            
              
              <textarea
              placeholder="Please Input the Package Inclusion"
              className="packinc"
                name="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              />
            
            <br />
            <label>
              Price:
              <input
              className="price1"
                type="number"
                name="price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                required
              />
            </label>
            <br />
            <label> 
              Image:
              <input
              className='imahe'
                type="file"
                name="image"
                accept="image/*"
                onChange={handleImageChange}
                required
              />
            </label>
            <br />
            {imagePreview && (
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  width: "200px",
                  height: "200px",
                  border: "1px solid #ddd",
                  borderRadius: "10px",
                  overflow: "hidden",
                }}
              >
                <img
                  src={imagePreview}
                  alt="Package Preview"
                  style={{ maxWidth: "300px" }}
                />
              </div>

            )}
              <br />
      <h3>Itinerary Maker:</h3>
      {itinerary.map((day, dayIndex) => (
    <div key={dayIndex} style={{ display: "flex" }}>
    <h3>Day {dayIndex + 1}</h3>
   <br />
    {day.activities.map((activity, activityIndex) => (
      <div key={activityIndex}>
        <label>
          Activity Name:
          <input
          className="actname"
            type="text"
            name={`activityName${dayIndex}-${activityIndex}`}
            value={activity.name}
            onChange={(e) => {
              const updatedDays = [...itinerary];
              updatedDays[dayIndex].activities[activityIndex].name = e.target.value;
              setItinerary(updatedDays);
            }}  
            required
          />
        </label>
        <br />
        <label>
          Start Time:
          <input
          className="starttime"
            type="time"
            name={`startTime${dayIndex}-${activityIndex}`}
            value={activity.startTime}
            onChange={(e) => {
              const updatedDays = [...itinerary];
              updatedDays[dayIndex].activities[activityIndex].startTime = e.target.value;
              setItinerary(updatedDays);
            }}
            required
          />
        </label>
        <br />
        <label>
          End Time:
          <input
          className="endtime"
            type="time"
            name={`endTime${dayIndex}-${activityIndex}`}
            value={activity.endTime}
            onChange={(e) => {
              const updatedDays = [...itinerary];
              updatedDays[dayIndex].activities[activityIndex].endTime = e.target.value;
              setItinerary(updatedDays);
            }}
            required
          />
          <br></br>
        </label>
        <button type="button" className="remove" onClick={() => handleRemoveActivity(dayIndex, activityIndex)}>Remove</button>
        <br />
      </div>
    ))}
    <button type="button" className="addact" onClick={() => handleAddActivity(dayIndex)}>Add Activity</button>
  </div>
))}
            <button type="button" className="addday" onClick={handleAddDay}>Add Day</button>
     
            <br />
            <button className="sub" type="submit">Submit</button>
            <br />
            <button className='can' type="button"onClick={() => { setShowForm(false);handleReset();}}>Cancel</button>
        </form>
        </div>
      )}
      </div>
        
        }
        {/* International */}
        {selectedButton === "International" && 
         <div>
          
                <button style={{backgroundColor:'#00337C',color:'#fff', padding:'10px 15px', border:'none', borderRadius:'5px', fontSize:'16px', ':hover':{backgroundColor:'#ff385c'}, cursor:"pointer", marginTop:'10px' }} onClick={() => setShowForm(true)}>Add Package</button>
                <h1 style={{position:"absolute", top:"210px"}}>International Travel & Tour Packages</h1>
                <Grid container spacing={2} style={{position:"absolute", top:"300px"}}>
                {international.map((pkg, index) => (
  <Grid item xs={12} md={2} key={index}>
  <PackageCard
    {...pkg}
    id={index}
    onViewDetails={handleViewDetailsInternational}
    imageUrl={pkg.imageUrl}
    isInternational={true}
  />
</Grid>
))}  
      </Grid>
                {showForm && (
                <div className="form-overlay">
       <form onSubmit={handleSubmitInternational} onReset={handleReset}>
       <h2>Add Package</h2>
       <label>
             Package Name:
              <input
              className="packname"
                type="text"
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </label>
            <br />
            
              
              <textarea
              placeholder="Please Input the Package Inclusion"
              className="packinc"
                name="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              />
            
            <br />
            <label>
              Price:
              <input
              className="price1"
                type="number"
                name="price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                required
              />
            </label>
            <br />
            <label> 
              Image:
              <input
              className='imahe'
                type="file"
                name="image"
                accept="image/*"
                onChange={handleImageChange}
                required
              />
            </label>
            <br />
            {imagePreview && (
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  width: "200px",
                  height: "200px",
                  border: "1px solid #ddd",
                  borderRadius: "10px",
                  overflow: "hidden",
                }}
              >
                <img
                  src={imagePreview}
                  alt="Package Preview"
                  style={{ maxWidth: "300px" }}
                />
              </div>

            )}
              <br />
      <h3>Itinerary Maker:</h3>
      {itinerary.map((day, dayIndex) => (
    <div key={dayIndex} style={{ display: "flex" }}>
    <h3>Day {dayIndex + 1}</h3>
   <br />
    {day.activities.map((activity, activityIndex) => (
      <div key={activityIndex}>
        <label>
          Activity Name:
          <input
          className="actname"
            type="text"
            name={`activityName${dayIndex}-${activityIndex}`}
            value={activity.name}
            onChange={(e) => {
              const updatedDays = [...itinerary];
              updatedDays[dayIndex].activities[activityIndex].name = e.target.value;
              setItinerary(updatedDays);
            }}  
            required
          />
        </label>
        <br />
        <label>
          Start Time:
          <input
          className="starttime"
            type="time"
            name={`startTime${dayIndex}-${activityIndex}`}
            value={activity.startTime}
            onChange={(e) => {
              const updatedDays = [...itinerary];
              updatedDays[dayIndex].activities[activityIndex].startTime = e.target.value;
              setItinerary(updatedDays);
            }}
            required
          />
        </label>
        <br />
        <label>
          End Time:
          <input
          className="endtime"
            type="time"
            name={`endTime${dayIndex}-${activityIndex}`}
            value={activity.endTime}
            onChange={(e) => {
              const updatedDays = [...itinerary];
              updatedDays[dayIndex].activities[activityIndex].endTime = e.target.value;
              setItinerary(updatedDays);
            }}
            required
          />
          <br></br>
        </label>
        <button type="button" className="remove" onClick={() => handleRemoveActivity(dayIndex, activityIndex)}>Remove</button>
        <br />
      </div>
    ))}
    <button type="button" className="addact" onClick={() => handleAddActivity(dayIndex)}>Add Activity</button>
  </div>
))}
            <button type="button" className="addday" onClick={handleAddDay}>Add Day</button>
     
            <br />
            <button className="sub" type="submit">Submit</button>
            <br />
            <button className='can' type="button"onClick={() => { setShowForm(false);handleReset();}}>Cancel</button>
        </form>
        
        </div>
      )}
      </div>
        
        } 

   

      </main>
    </div>
  );
}
