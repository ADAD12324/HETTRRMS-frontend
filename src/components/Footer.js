import React from 'react';
import './footer.css';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import EmailIcon from '@mui/icons-material/Email';


const Footer = () => {
  return (
    <div className="footer">
      <div className="socials">
      <a href="/"><FacebookIcon className="icon"/></a>
      <a href="/"> <InstagramIcon className="icon"/></a>
      <a href="/"> <EmailIcon className="icon"/></a>
        </div>
        {/* <hr></hr> */}
        <div className="linkBox">
       <div className="footerLinks">
          <li>
            <a href="/About"><b>About Us</b></a>
          </li>
          <li>
            <a href="/"><b>Contact Us</b></a>
          </li>
          <li>
            <a href="/"><b>Destination</b></a>
          </li>
          </div>

          <div className="footerLinks">
          <li>
            <a href="/"><b>Support</b></a>
          </li>
          <li>
            <a href="/"><b>Terms & Conditions</b></a>
          </li>
          <li>
            <a href="/"><b>Data Privacy</b></a>
          </li>
        </div>
      </div>
        
      <hr></hr>
    <div className='infoBox'>
      <div className='inline-block'>
        <b>VISIT OR CALL US TO BOOK AT </b>
        <span className='inline-block'>09123456789 | Monday to Saturday (9:00 AM - 6:00 PM)</span>
      </div>
      <div className='inline-block'>
        <b>ADDRESS </b>
        <span className='inline-block'>Achagon Building, 17 Rizal St, Old Albay District, Legazpi City, 4500 Albay</span>
      </div>

      <div className='inline-block'>
        <b>TRAVEL AND TOUR OFFERS IN </b>
        <span className='inline-block'>Local, National and International Packages</span>
      </div>
    </div>


      {/* <hr></hr> */}
      <span className="copyrightText">
      <hr></hr>
        Copyright © 2023 All Rights Reserved by Human Explore Travel and Tours
      </span>
    </div>
  );
};

export default Footer;
