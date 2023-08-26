import React, { useEffect, useState } from 'react';
import Userapp from '../components/Userapp';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardMedia, Typography, Button, Grid } from '@material-ui/core';
import axios from 'axios';
import "../css/usermain.css";
import Loading from '../components/Loading';


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

const Usermain = () => {
  const [packages, setPackages] = useState([]);
  const [national, setNational] = useState([]);
  const [international, setInternational] = useState([]);
  const navigate = useNavigate();

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

  const username = localStorage.getItem('username');
  const img1 = 'https://hettrrms-server.onrender.com/images/banner.jpg';
  const [searchTerm, setSearchTerm] = useState('');
  const filteredPackages = packages.filter(pkg => pkg.name.toLowerCase().includes(searchTerm.toLowerCase()));
  const filteredNational = national.filter(pkg => pkg.name.toLowerCase().includes(searchTerm.toLowerCase()));
  const filteredInternational = international.filter(pkg => pkg.name.toLowerCase().includes(searchTerm.toLowerCase()));
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
    <div className="usermain">
      <Userapp />
      <img src={img1} alt='img1' className="img1" />
      <div className="quote-overlay">
        <span className="quote-text">"Travel is an investment in yourself."</span>
      </div>
      <h1 className='usertxt'>Hi! Welcome {username}</h1>

      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search destination packages..."
        className="search-input"
      />

      <div className="package-section">
        <h4 className="section-title">Local Packages</h4>
        <Grid container spacing={2} className="package-container">
          {filteredPackages.map((pkg, index) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
              <PackageCard {...pkg} id={index} onViewDetails={handleViewDetails} imageUrl={pkg.imageUrl} />
            </Grid>
          ))}
        </Grid>
      </div>

      <div className="package-section">
        <h4 className="section-title">National Packages</h4>
        <Grid container spacing={2} className="package-container">
          {filteredNational.map((pkg, index) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
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

      <div className="package-section">
        <h4 className="section-title">International Packages</h4>
        <Grid container spacing={2} className="package-container">
          {filteredInternational.map((pkg, index) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
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
      </div>
    </div>
  );
};

export default Usermain;