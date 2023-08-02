import React, { useState } from 'react';
import "../css/Register.css";
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import swal from 'sweetalert';

const Register = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [birthdate, setBirthdate] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [idImage, setIdImage] = useState(null);
  const [userImage, setUserImage] = useState(null);
  const [errors, setErrors] = useState({});

  const handleSubmit = (event) => {
    event.preventDefault();

    // Validate the form inputs
    const newErrors = {};
    if (firstName.trim() === '') {
      newErrors.firstName = 'Please enter your first name';
    }
    if (lastName.trim() === '') {
      newErrors.lastName = 'Please enter your last name';
    }
    if (email.trim() === '') {
      newErrors.email = 'Please enter your email';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Please enter a valid email';
    }
    if (phoneNumber.trim() === '') {
      newErrors.phoneNumber = 'Please enter your phone number';
    } else if (!/^(\+63)?\d{10}$/.test(phoneNumber)) {
      newErrors.phoneNumber = 'Please enter a valid phone number starting with +63';
    }
    if (birthdate.trim() === '') {
      newErrors.birthdate = 'Please enter your birthdate';
    }
    if (gender.trim() === '') {
      newErrors.gender = 'Please select your gender';
    }
    if (username.trim() === '') {
      newErrors.username = 'Please enter your username';
    }
    if (password.trim() === '') {
      newErrors.password = 'Please enter your password';
    }
    if (confirmPassword.trim() === '') {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (confirmPassword !== password) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    if (!idImage) {
      newErrors.idImage = 'Please upload your ID image';
    }
    if (!userImage) {
      newErrors.userImage = 'Please upload your User image';
    }

    // Update the errors state
    setErrors(newErrors);

    // Submit the form if there are no errors
    if (Object.keys(newErrors).length === 0) {
      const formData = new FormData();
      formData.append('firstName', firstName);
      formData.append('lastName', lastName);
      formData.append('email', email);
      formData.append('phoneNumber', phoneNumber);
      formData.append('birthdate', birthdate);
      formData.append('age', age);
      formData.append('gender', gender); 
      formData.append('username', username);
      formData.append('password', password);
      formData.append('confirmPassword', confirmPassword);
      formData.append('idImage', idImage);
      formData.append('userImage', userImage);
      fetch('/api/register', {
        method: 'POST',
        body: formData,
      })
        .then((response) => {
          if (response.ok) {
            swal("You've successfully registered an account.", "", "success");
          } else {
            // Display error message if the username already exists
            response.text().then(async (errorMessage) => {

              if (errorMessage.includes('Username already exists')) {
                newErrors.username = errorMessage;
                setErrors(newErrors);
                swal("Username already exists", "", "error");
              } else {
                swal("Error registering a user.", "", "error");
              }
            });
          }
        })
        .catch((error) => {
          console.error(error);
          alert('Error registering user');
        });
        
    }
  };
  return (
    <div>
      <Navbar />
    <form onSubmit={handleSubmit}>
      <label>
        First Name:
        {errors.firstName && <span style={{color:"red"}} className="error">{errors.firstName}</span>}
        <input
          type="text"
          className="firstname"
          value={firstName}
          onChange={(event) => setFirstName(event.target.value)}
        />
      </label>
      <label>
        Last Name:
        {errors.lastName && <span style={{color:"red"}} className="error">{errors.lastName}</span>}
        <input
          type="text"
          className="lastname"
          value={lastName}
          onChange={(event) => setLastName(event.target.value)}
        />
      </label>
      <label>
        Email:
        {errors.email && <span style={{color:"red"}} className="error">{errors.email}</span>}
        <input
          type="email"
          className="mail"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />
      </label>
      <label>
        Phone Number:
        {errors.phoneNumber && <span style={{color:"red"}} className="error">{errors.phoneNumber}</span>}
        <input
          type="tel"
          className="phoneN"
          value={phoneNumber}
          onChange={(event) => setPhoneNumber(event.target.value)}
        />
      </label>
      <label>
  Birthdate:
  {errors.birthdate && <span style={{color:"red"}} className="error">{errors.birthdate}</span>}
  <input
    type="date"
    className="birthday"
    value={birthdate}
    onChange={(event) => {
      setBirthdate(event.target.value);
      const dob = new Date(event.target.value);
      const ageDiffMs = Date.now() - dob.getTime();
      const ageDate = new Date(ageDiffMs);
      const age = Math.abs(ageDate.getUTCFullYear() - 1970);
      setAge(age);
    }}
  />
</label>
<label>
  Age:
  {errors.age && <span style={{color:"red"}} className="error">{errors.age}</span>}
  <input
  className="aged"
    type="number"
    value={age}
    onChange={(event) => setAge(event.target.value)}
  />
</label>
      <label>
        Gender:
        {errors.gender && <span style={{color:"red"}} className="error">{errors.gender}</span>}
        <select
        className="genders"
          value={gender}
          onChange={(event) => setGender(event.target.value)}
        >
          <option value="">Select</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">Other</option>
        </select>
      </label>
      <label>
  Username:
  {errors.username && <span style={{ color: "red" }} className="error">{errors.username}</span>}
  <input
    type="text"
    className="usern"
    value={username}
    onChange={(event) => setUsername(event.target.value)}
  />
</label>
      <label>
        Password:
        {errors.password && <span style={{color:"red"}} className="error">{errors.password}</span>}
        <input
          type="password"
          className="passw"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
      </label>
      <label>
        Confirm Password:
        {errors.confirmPassword && <span style={{color:"red"}} className="error">{errors.confirmPassword}</span>}
        <input
          type="password"
          className="cpassw"
          value={confirmPassword}
          onChange={(event) => setConfirmPassword(event.target.value)}
        />
      </label>
      <label>
        Valid ID:
        {errors.idImage && <span style={{color:"red"}} className="error">{errors.idImage}</span>}
        <input
          type="file"
          className="id"
          accept="image/*"
          onChange={(event) => setIdImage(event.target.files[0])}
        />
      </label>
      <label>
        Upload Profile Picture:
        {errors.userImage && <span style={{color:"red"}} className="error">{errors.userImage}</span>}
        <input
          type="file"
          className="profpic"
          accept="image/*"
          onChange={(event) => setUserImage(event.target.files[0])}
        />
      </label>
      <button className='regbut' type="submit">Register</button>
    </form>
    <Footer />
  </div>
  );
}

export default Register