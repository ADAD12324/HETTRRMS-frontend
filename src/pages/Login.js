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
import {BallTriangle} from 'react-loader-spinner'; 
const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const validateLoginForm = require("./validateLoginForm");
  
  const handleFormSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    // Validate the form inputs
    const validationErrors = validateLoginForm(username, password);

    if (validationErrors.length > 0) {
      setErrors(validationErrors);
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post("/api/login", { username, password });

      // Check if login was successful
      if (response.data.error) {
        setErrors([response.data.error]); // Assuming the error message is sent as { error: 'message' }
      } else {
        // Store user data in sessionStorage
        sessionStorage.setItem("username", response.data.username); // Use username from backend response
        sessionStorage.setItem("userId", response.data.userId);
        sessionStorage.setItem("firstname", response.data.firstName);
        sessionStorage.setItem("lastname", response.data.lastName);
        sessionStorage.setItem("email", response.data.email);
        sessionStorage.setItem("phoneNumber", response.data.phoneNumber);
        sessionStorage.setItem("birthdate", response.data.birthdate);
        sessionStorage.setItem("age", response.data.age);
        sessionStorage.setItem("gender", response.data.gender);
        sessionStorage.setItem("userImage", response.data.userImage);
        
        if (response.data.role === 'user') {
          navigate('/user');
        } else if (response.data.role === 'admin') {
          navigate('/admin');
        }

        displayToast('success', 'Signed in successfully');
      }
    } catch (error) {
      console.log(error);
      swal("Failed to login, Please try again.", "", "error");
    }
    finally {
      setLoading(false); 
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
  
  const videoUrl='/images/ulol.mp4';

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
              <ReportProblemIcon style={{ color: "red", position: 'relative', left: '95px' }} />
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
          <button className='logsubmit' type="submit" disabled={loading}>{loading ? (
             <div style={{position:'relative', left:'40%'}}> <BallTriangle
              height={30}
              width={30}
              radius={5}
              color="#4fa94d"
              ariaLabel="ball-triangle-loading"
              wrapperClass={{}}
              wrapperStyle=""
              visible={true}
            /></div>
            ) : (
              'Log in'
            )}</button>
          <Link className="regbtn" to="/Register">Sign Up?</Link>
          <Link className="forgot-password-link" to="/forgot-password">Forgot Password?</Link>
        
        </form>
      </div>
      <Footer className="footer"/>
    </div>
  );
};

export default Login;