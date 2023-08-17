import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, CardContent, CardMedia, Typography, Button, Grid } from '@material-ui/core';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const PackageCard = ({ id, name, description, price, imageUrl, itinerary, onViewDetails, isNational, isInternational }) => {
  const handleViewDetailsClick = () => {
    onViewDetails(id, name, description, price, imageUrl, itinerary);
  };

  return (
    <Card className="package-card">
      <CardMedia component="img" image={imageUrl} style={{ height: "200px" }} />
      <CardContent>
        <Typography variant="h5" component="h2">
          {name}
        </Typography>
        <Typography variant="h6" component="p">
        ₱{price}
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

const Packages = () => {
  const [packages, setPackages] = useState([]);
  const [national, setNational] = useState([]);
  const [international, setInternational] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    axios.get('https://hettrrms-server.onrender.com/api/packages')
      .then(response => {
        setPackages(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  useEffect(() => {
    axios.get('https://hettrrms-server.onrender.com/api/national')
      .then(response => {
        setNational(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  useEffect(() => {
    axios.get('https://hettrrms-server.onrender.com/api/international')
      .then(response => {
        setInternational(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  }, []); 
  const handleViewDetails = (id, name, description) => {
    const packageData = packages[id];

    navigate(`/packages_mainpage/${id}`, {
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

    navigate(`/national_mainpage/${id}`, {
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
    navigate(`/international_mainpage/${id}`, {
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

  return (
    <div>
      <div> 
      <Navbar style={{color:'#fff'}} />
        <div style={{fontFamily:'fantasy', fontSize:'40px', color:'#002B5B'}}>Local Packages</div>
        <Grid container spacing={2} style={{ position: "relative", top: "40px", paddingBottom:'30px'}}>
          {packages.map((pkg, index) => (
            <Grid item xs={12} md={2} key={index}>
              <PackageCard {...pkg} id={index} onViewDetails={handleViewDetails} imageUrl={pkg.imageUrl} />
              {/* <Typography variant="h6" component="h3" gutterBottom>
              {pkg.title}
            </Typography>
            <Typography variant="body1" gutterBottom>
              {pkg.description}
            </Typography>
            <Typography variant="subtitle1" gutterBottom>
              Price: {pkg.price}
            </Typography> */}
            </Grid>
          ))}
        </Grid >
      </div><br /> <br />
      <div  style={{fontFamily:'fantasy', fontSize:'40px', color:'#002B5B'}}>National Packages</div>
      <Grid container spacing={2} style={{ position: "relative", top: "40px", paddingBottom:'30px'}}>
          {national.map((pkg, index) => (
            <Grid item xs={12} md={2} key={index}>
              <PackageCard {...pkg} id={index} onViewDetails={handleViewDetailsNational} imageUrl={pkg.imageUrl} />
              
            </Grid>
          ))}
        </Grid >
  <br /> <br />
        <div  style={{fontFamily:'fantasy', fontSize:'40px', color:'#002B5B'}}>International Packages</div>
        <Grid container spacing={2} style={{ position: "relative", top: "40px", paddingBottom:'30px'}}>
          {international.map((pkg, index) => (
            <Grid item xs={12} md={2} key={index}>
              <PackageCard {...pkg} id={index} onViewDetails={handleViewDetailsInternational} imageUrl={pkg.imageUrl} />
             
            </Grid>
          ))}
        </Grid ><br /> <br />
      <Footer />
    </div>
  );
};

export default Packages;