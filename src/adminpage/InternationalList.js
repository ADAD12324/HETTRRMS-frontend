import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {  Card, CardContent, CardMedia,Typography, Button,  Grid } from '@material-ui/core';
import { useNavigate } from 'react-router-dom';
const PackageCard = ({ id, name, description, price, imageUrl, onViewDetails }) => {
  const handleViewDetailsClick = () => {
    onViewDetails(id, name, description, price, imageUrl);
  };

  return (
    <Card>
      <CardMedia component="img" image={imageUrl} style={{ height: "200px" }} />
      <CardContent>
        <Typography variant="h5" component="h2">
          {name}
        </Typography>
        <Typography variant="h6" component="p">
          ${price}
        </Typography>
        <Button onClick={handleViewDetailsClick}>View Details</Button>
      </CardContent>
    </Card>
  );
};
const InternationalList = () => {
  const [international, setInternational] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    axios.get('/api/international')
      .then((response) => {
        setInternational(response.data);
        
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  const handleViewDetails = (id, name, description) => {
    const internationalData =international[id];
    
    navigate(`/international/${id}`, { state: { internationalData } });
    navigate(`/international/${id}`, {
      state: { 
        imageUrl: international[id].imageUrl,
        documentUrl: international[id].documentUrl,
        name: name,
        description: description,
        price:international[id].price,
       },
    });
  };

  return (
    <div>
         <Grid container spacing={2} style={{position:"absolute", top:"220px"}}>
                {international.map((pkg, index) => (
  <Grid item xs={12} md={2} key={index}>
   <PackageCard {...pkg} id={index} onViewDetails={handleViewDetails} imageUrl={pkg.imageUrl} />
    
  </Grid>
))}
      </Grid>                                                                                   
    </div>
  );
};

export default InternationalList;