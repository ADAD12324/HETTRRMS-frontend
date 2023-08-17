import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {  Card, CardContent, CardMedia,Typography, Button,  Grid } from '@material-ui/core';
import { useNavigate } from 'react-router-dom';
import Userapp from '../components/Userapp';
import Loading from '../components/Loading';

const PackageCard = ({ id, name, description, price, imageUrl, itinerary, onViewDetails }) => {
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
 
const Local = () => {
  const [packages, setPackages] = useState([]);
    const navigate = useNavigate();
 
    useEffect(() => {
      axios.get('/api/packages')
        .then((response) => {
          setPackages(response.data);
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
  const image1 = 'https://hettrrms.onrender.com/uploads/Local Tour Package.jpg';
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
        {packages.map((pkg, index) => (
          <Grid item xs={12} md={2} key={index}>
            <PackageCard {...pkg} id={index} onViewDetails={handleViewDetails} imageUrl={pkg.imageUrl} />
          </Grid>
        ))}
      </Grid>                                                                           
    </div>
  );
};

export default Local;