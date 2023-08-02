import React from 'react'
import './AboutUs.css';
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Carousel from 'react-material-ui-carousel';

function About() {
  return (
    <div>
      <Navbar />
      <div className="about-container">
        <div className="carousel-container">
          <Carousel autoPlay animation="slide">
            <img src="https://picsum.photos/seed/picsum/800/400" alt="slide 1" />
            <img src="https://picsum.photos/seed/picsum/800/400" alt="slide 2" />
            <img src="https://picsum.photos/seed/picsum/800/400" alt="slide 3" />
          </Carousel>
        </div>
        <div className='about-us'>
          <h1 className="About">About Us</h1>
          <p className='paragraph'>
            Welcome to Human Explore Travel and Tours!
          </p>
          <p className='paragraph'>Our team consists of experienced travel advisors who work tirelessly to create custom travel itineraries that cater to your unique preferences and interests.</p>
          <h2>Our Mission</h2>
          <p className='paragraph'>Our mission is to provide our clients with exceptional travel experiences that exceed their expectations. We strive to create personalized itineraries that showcase the beauty and diversity of the world while promoting sustainable tourism practices.</p>
          <h2>Our Team</h2>
          <ul>
            <li>Steven - CEO</li>
            <li>Ad - CTO</li>
            <li>Bern - Senior Travel Advisor</li>
            <li>Jay - Senior Travel Advisor</li>
            <li>Aljen - Marketing Manager</li>
          </ul>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default About