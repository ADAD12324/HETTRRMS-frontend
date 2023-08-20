import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {  Card, CardContent, CardMedia,Typography, Button,  Grid } from '@material-ui/core';
import { useNavigate } from 'react-router-dom';
import Userapp from '../components/Userapp';
import Loading from '../components/Loading';
const PackageCard = ({ id, name, description, price, imageUrl, onViewDetails, itinerary}) => {
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
          <Button onClick={handleViewDetailsClick}>View Details</Button>
      </CardContent>
    </Card>
  );
};
const National = () => {
  const [national, setNational] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    axios.get('https://hettrrms-server.onrender.com/api/national')
      .then((response) => {
        setNational(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  
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

  const image1 = 'https://hettrrms-server.onrender.com/uploads/BANNERS_NATIONAL.jpg';
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    // When the component mounts, wait for a short duration and then show the content
    const timer = setTimeout(() => {
      setShowContent(true);
    }, 300); // You can adjust the duration as needed

    // Clean up the timer when the component unmounts
    return () => clearTimeout(timer);
  }, []);

  if (!showContent) {
    return <Loading />;
  }
  return (
   
    <div>
        <Userapp />
        <img style={{width:'100vw'}} src={image1} alt="Localimg" />
        
         <Grid container spacing={2} style={{ marginTop: '20px' }}>
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
    </div>
  );
};

export default National;