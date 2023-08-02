import React, { useState } from "react";
import './ContactUs.css';
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

const ContactUs = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Name: ", name);
    console.log("Email: ", email);
    console.log("Phone Number: ", phone);
    console.log("Message: ", message);
    // You can add more code here to submit the form data to your backend
    // Send the form data to the server using an API or email service
  };

  return (
    <div>
      <Navbar />
    <div className="contact-us-container">
      <h1>Contact Us</h1>
      <form onSubmit={handleSubmit}>
        {/* <label htmlFor="name">Name</label> */}
        <input
          type="text"
          id="name"
          placeholder="Full name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        {/* <label htmlFor="email">Email</label> */}
        <input
          type="email"
          id="email"
          placeholder="Email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        {/* <label htmlFor="phone">Phone Number</label> */}
        <input
          type="tel"
          id="phone"
          placeholder="Phone number"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          required
        />
        {/* <label htmlFor="message">Message</label> */}
        <textarea
          id="message"
          placeholder="Message here"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          required
        ></textarea>
        <button type="submit">Submit</button>

        <div className='inline-block-paragraph'>
        <b>Human Explore Travel and Tours</b><br />
        <span className='inline-block'>Old Albay District, Legazpi City, 4500 Albay</span><br />
        <span className='inline-block'>09123456789 | Monday to Saturday (9:00 AM - 6:00 PM)</span><br />
        <span className='inline-block'>humanexplore17@gmail.com</span>
      </div>

      </form>
    </div>
    <Footer />
  </div>
  );
};

export default ContactUs;

