import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import ReportProblemIcon from '@mui/icons-material/ReportProblem';
import Swal from 'sweetalert2';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import swal from 'sweetalert';
import {MdBackspace} from "react-icons/md";
import '../css/Forgot.css';

const ForgotPassword = () => {
  const [username, setUsername] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener('mouseenter', Swal.stopTimer);
      toast.addEventListener('mouseleave', Swal.resumeTimer);
    },
  });

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    // Send the password reset request to the server
    try {
      const response = await axios.post('/api/forgot-password', { username });

      if (response.data.success) {
        setSuccess(true);
        Toast.fire({
          icon: 'success',
          title: 'Password reset email sent',
        });
      } else {
        setError(response.data.message);
      }
    } catch (error) {
      console.log(error);
      swal(
        'Failed to send password reset email. Please try again.',
        '',
        'error'
      );
    }
  };

  return (
    <div>
      <Navbar />
      <div className="forgot-password-container">
        <form className="forgot-password-form" onSubmit={handleFormSubmit}>
          <div className="forgot-password-title">Forgot Password?</div>
          <div className="input-container">
            <div htmlFor="username">Username:</div>
            <input
              type="text"
              className="username-input"
              value={username}
              onChange={(event) => setUsername(event.target.value)}
            />
          </div>
          {error && (
            <div className="error-message">
              <ReportProblemIcon className="error-icon" />
              <span className="error-text">{error}</span>
            </div>
          )}
          {success ? (
            <p>Temporary Password has been sent to your registered email. Please check your email.</p>
          ) : (
            <button className='respass' type="submit">Reset Password</button>
          )}
          <Link className="back-to-login" to="/login">
            <MdBackspace size={30} style={{position:'relative', right:'40%'}}/>
          </Link>
        </form>
      </div>
      <Footer className="footer" />
    </div>
  );
};

export default ForgotPassword;
