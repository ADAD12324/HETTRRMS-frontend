import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import ReportProblemIcon from '@mui/icons-material/ReportProblem';
import Swal from 'sweetalert2'; 
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import swal from 'sweetalert';
import "../css/Login.css";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import config from '../components/config';

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const navigate = useNavigate();
  const backendUrl = config.url;
  const validateLoginForm = require("./validateLoginForm");
  
  const handleFormSubmit = async (event) => {
    event.preventDefault();
  
    try {
      const response = await axios.post(`${backendUrl}/api/login`, { username, password });
  
      if (response.data.error) {
        setErrors([response.data.error]);
      } else {
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("username", username);
        localStorage.setItem("userId", response.data.userId);
  
        if (response.data.role === 'user') {
          navigate('/user');
        } else if (response.data.role === 'admin') {
          navigate('/admin');
        }
  
        displayToast('success', 'Signed in successfully');
      }
    } catch (error) {
      console.error(error);
      swal("Failed to login, Please try again.", "", "error");
    }
  };
  
  const displayToast = (icon, title) => {
    const Toast = Swal.mixin({
      toast: true,
      position: 'bottom-right',
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer);
        toast.addEventListener('mouseleave', Swal.resumeTimer);
      }
    });
  
    Toast.fire({
      icon: icon,
      title: title
    });
  };
  
  const videoUrl=`${backendUrl}/images/ulol.mp4`;

  return (
    <div className="login-page">
      <Navbar />
      <video className="video-background" autoPlay loop muted>
        <source className="videomp4" src={videoUrl} type="video/mp4" />
      </video>
      <div className="login-container">
        <form className="loginform" onSubmit={handleFormSubmit}>
          <AccountCircleIcon style={{ fontSize: '80px' }} />
          <div className="login1">Login</div>
          {errors.length > 0 && (
            <ul>
              <ReportProblemIcon style={{ color: "red", position: 'relative', left: '70px' }} />
              {errors.map((error) => (
                <li style={{ color: "red" }} key={error}>{error}</li>
              ))}
            </ul>
          )}
          <div className="input-container">
            <input
              placeholder="Username"
              type="text"
              className="username"
              value={username}
              onChange={(event) => setUsername(event.target.value)}
            />
          </div>
          <div className="input-container">
            <input
              placeholder="Password"
              className="logpass"
              type="password"
              id="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
          </div>
          <button className='logsubmit' type="submit">Log in</button>
          <Link className="regbtn" to="/Register">Sign Up?</Link>
          <Link className="forgot-password-link" to="/forgot-password">Forgot Password?</Link>
        
        </form>
      </div>
      <Footer className="footer"/>
    </div>
  );
};

export default Login;