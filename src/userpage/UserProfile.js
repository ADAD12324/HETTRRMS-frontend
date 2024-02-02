import { useState, useEffect } from 'react';
import Avatar from '@material-ui/core/Avatar';
import "../css/UserProfile.css";
import { MdCameraAlt } from 'react-icons/md';
import { AiFillSetting } from "react-icons/ai";
import Userapp from '../components/Userapp';
import Swal from 'sweetalert2';
import Loading from '../components/Loading';


const UserProfile = () => {
  const [id, setId] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);
  const [isImageFormOpen, setIsImageFormOpen] = useState(false);
  const [isEditFormOpen, setIsEditFormOpen] = useState(false);
  const [editFirstName, setEditFirstName] = useState('');
const [editLastName, setEditLastName] = useState('');
const [editPhoneNumber, setEditPhoneNumber] = useState('');
const [editEmail, setEditEmail] = useState('');
const [editBirthdate, setEditBirthdate] = useState('');
const [editAge, setEditAge] = useState('');
const [editGender, setEditGender] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');
  const [isSettingsDropdownOpen, setIsSettingsDropdownOpen] = useState(false);
  const [isPasswordFormOpen, setIsPasswordFormOpen] = useState(false);
  const [editUserData, setEditUserData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    birthdate: '',
    age: '',
    gender: '',
  });

  const [userDetails, setUserDetails] = useState({
    username: '',
    firstName: '',
    lastName: '',
    userId: '',
    email: '',
    phoneNumber: '',
    birthdate: '',
    age: '',
    gender: '',
    userImage: '', // Add this line
  });
  useEffect(() => {
    // Fetch user details from sessionStorage
    const username = sessionStorage.getItem('username');
    const firstName = sessionStorage.getItem('firstname');
    const lastName = sessionStorage.getItem('lastname');
    const userId = sessionStorage.getItem('userId');
    const email = sessionStorage.getItem('email');
    const phoneNumber = sessionStorage.getItem('phoneNumber');
    const birthdate = sessionStorage.getItem('birthdate');
    const age = sessionStorage.getItem('age');
    const gender = sessionStorage.getItem('gender');
    const userImage = sessionStorage.getItem('userImage');
    setId(userId);
    // Initialize edit state variables with user details
    setEditFirstName(firstName || ''); // Provide a default value in case it's null
    setEditLastName(lastName || ''); // Provide a default value in case it's null
    setEditPhoneNumber(phoneNumber || ''); // Provide a default value in case it's null
    setEditEmail(email || ''); // Provide a default value in case it's null
    setEditBirthdate(birthdate || ''); // Provide a default value in case it's null
    setEditAge(age || ''); // Provide a default value in case it's null
    setEditGender(gender || ''); // Provide a default value in case it's null
  
    // Update state with user details
    setUserDetails({
      username,
      firstName,
      lastName,
      userId,
      email,
      phoneNumber,
      birthdate: new Date(birthdate).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      }),
      age,
      gender,
      userImage,
    });
  }, []);
  const handleFileInputChange = (event) => {
    setSelectedFile(event.target.files[0]);
  }

  const handleImageFormSubmit = async (event) => {
    event.preventDefault();
  
    if (!selectedFile) {
      // Handle case when no file is selected
      console.error('No file selected');
      return;
    }
  
    const formData = new FormData();
    formData.append('userImage', selectedFile);
  
    try {
      const response = await fetch(`https://hettrrms-server.onrender.com/api/users/${id}/image`, {
        method: 'PUT',
        body: formData,
        credentials: 'include', // Ensure you send cookies with the request if needed
      });
  
      if (!response.ok) {
        throw new Error('Failed to update user image');
      }
  
      // Display a success message to the user
      Swal.fire({
        icon: 'success',
        title: 'User Image Updated',
        text: 'Your user image has been updated successfully. Please re-login to see the updated profile picture.',
      });
  
      // Clear the selected file and close the form
      setSelectedFile(null);
      setIsImageFormOpen(false);
  
      // Reload user details to update the displayed image
      // You may need to call a function to fetch updated user details here.
    } catch (error) {
      console.error(error);
      // Handle error and show an error message to the user
      Swal.fire({
        icon: 'error',
        title: 'Image Update Failed',
        text: 'Failed to update your user image. Please try again.',
      });
    }
  };
  
  
  
  useEffect(() => {
    setEditUserData({
      firstName: userDetails.firstName || '',
      lastName: userDetails.lastName || '',
      email: userDetails.email || '',
      phoneNumber: userDetails.phoneNumber || '',
      birthdate: userDetails.birthdate || '',
      age: userDetails.age || '',
      gender: userDetails.gender || '',
    });
  }, [userDetails]);
  const handleEditFormSubmit = async (event) => {
    event.preventDefault();
  
    const updateUserDetails = {
      firstName: editFirstName,
      lastName: editLastName,
      email: editEmail,
      phoneNumber: editPhoneNumber,
      birthdate: editBirthdate,
      age: editAge,
      gender: editGender,
    };
    
    try {
      const response = await fetch(`https://hettrrms-server.onrender.com/api/users/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updateUserDetails),
      });
      
  
      if (!response.ok) {
        throw new Error('Failed to update user');
      }
      
      // Update the user information
      setUserDetails({
        ...userDetails,
        firstName: editUserData.firstName,
        lastName: editUserData.lastName,
        email: editUserData.email,
        phoneNumber: editUserData.phoneNumber,
        birthdate: editUserData.birthdate,
        age: editUserData.age,
        gender: editUserData.gender,
      });
      
      Swal.fire({
        icon: 'success',
        title: 'User Details Updated',
        text: 'Your user details have been updated successfully. Please re-login to see the updated details.',
      });
      setIsEditFormOpen(false); 
      
    } catch (error) {
      console.error(error);
      // Handle error appropriately
    }
  };

  const handlePasswordFormSubmit = (event) => {
    event.preventDefault();
  
    // Check if the new password and confirm new password match
    if (newPassword !== confirmNewPassword) {
      console.error('Passwords do not match');
      return;
    }
  
    const requestOptions = {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        currentPassword: currentPassword,
        newPassword: newPassword,
      }),
    };
  
    fetch(`https://hettrrms-server.onrender.com/api/users/${id}/password`, requestOptions)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to update password');
        }
        return response.json();
      })
      .then((data) => {
        console.log('Password updated successfully');
        setIsPasswordFormOpen(false);
  
        // Show success message using SweetAlert
        Swal.fire({
          icon: 'success',
          title: 'Password Updated',
          text: 'Your password has been successfully updated.',
        });
      })
      .catch((error) => {
        console.error(error);
  
        // Show error message using SweetAlert
        Swal.fire({
          icon: 'error',
          title: 'Password Update Failed',
          text: 'Failed to update your password. Please try again.',
        });
      });
  };
  
  
  
 
  
  

  const handleSettingsClick = () => {
    setIsSettingsDropdownOpen(!isSettingsDropdownOpen);
  };
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
    return <Loading/>;
  }
  return (
  <div>
    <Userapp />
    <div className="user-profile">
      

      <div className="text1">My Profile Information</div>
      <div className="settings-icon-container">
        <AiFillSetting size={30} className="settings-icon" onClick={handleSettingsClick} />
        {isSettingsDropdownOpen && (
          <div className="settings-dropdown">
            <ul>
              <li onClick={() => setIsPasswordFormOpen(true)}>Change Password</li>
              <li  onClick={() => setIsEditFormOpen(true)}>Edit Information</li>
            </ul>
          </div>  
        )}
      </div>
      <div className="profbox">
        <h3 className="userid">User Id:{userDetails.userId}</h3>
        <div className="userName">{userDetails.firstName} {userDetails.lastName}</div>
        <div className="avatar-container">
          <Avatar alt="User Avatar" className="avatar" src={userDetails.userImage} style={{ width: '180px', height: '180px' }} onClick={() => setIsImageFormOpen(true)} />
          <div className="avatar-icon" onClick={() => setIsImageFormOpen(true)}>
            <MdCameraAlt size={30} />
          </div>
        </div>
      </div>
      <div className="userinfo">
        <div className="text2">User Information</div>
        <div className="fname"><b>First Name:</b> {userDetails.firstName}</div>
        <div className="lname"><b>Last Name:</b> {userDetails.lastName}</div>
        <div className="bday"><b>Birthdate:</b> {userDetails.birthdate}</div>
        <div className="age"><b>Age:</b> {userDetails.age}</div>
        <div className="gender"><b>Gender:</b> {userDetails.gender}</div>
        <div className="text3">Contact Information</div>
        <div className="phonenum"><b>Phone Number:</b> {userDetails.phoneNumber}</div>
        <div className="email"><b>Email:</b> {userDetails.email}</div>
        
      </div>

      {isImageFormOpen && (
        <form className="formchange" onSubmit={handleImageFormSubmit}>
          <input className='imgprof' type="file" accept='.png, .jpg' onChange={handleFileInputChange} /><br />
          <button className='butimgsave' type="submit">Save</button>
          <br />
          <button className="canimage" type="button" onClick={() => setIsImageFormOpen(false)}>Cancel</button>
        </form>
      )}

{isEditFormOpen && (
  <form className="formedituser" onSubmit={handleEditFormSubmit}>
    <h2>Update Information</h2><div style={{marginTop:'15px'}}></div>
    <input
  className='editfn'
  type="text"
  value={editFirstName}
  onChange={(e) => setEditFirstName(e.target.value)}
  placeholder="First Name"
  required
    /><div style={{marginTop:'10px'}}></div>
    <input
    className='editln'
    type="text"
    value={editLastName}
    onChange={(e) => setEditLastName(e.target.value)}
    placeholder="Last Name"
    required
    /><div style={{marginTop:'10px'}}></div>
    <input
    className='editpn'
      type="text"
      value={editPhoneNumber}
      onChange={(e) => setEditPhoneNumber(e.target.value)}
      placeholder="Phone Number"
      required
    /><div style={{marginTop:'10px'}}></div>
    <input
    className='editem'
      type="email"
      value={editEmail}
      onChange={(e) => setEditEmail(e.target.value)}
      placeholder="Email"
      required
    /><div style={{marginTop:'10px'}}></div>
    <input
    className='editbd'
    style={{marginTop:'10px', width:'62%'}}
      type="date"
      value={editBirthdate}
      onChange={(e) => setEditBirthdate(e.target.value)}
      placeholder="Birthdate"
      required
    /><div style={{marginTop:'10px'}}></div>
    <input
    className='editage'
      type="text"
      value={editAge}
      onChange={(e) => setEditAge(e.target.value)}
      placeholder="Age"
      required
    /><div style={{marginTop:'10px'}}></div>
    <select
        className='editgd'
      value={editGender}
      onChange={(e) => setEditGender(e.target.value)}
      placeholder="Gender"
      required
        >
          <option value="">Select</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">Other</option>
        </select><div style={{marginTop:'10px'}}></div>
    <button className='editsave' type="submit">Save</button>
    <br />
    <button
      type="button"
      className='canedit'
      onClick={() => setIsEditFormOpen(false)}
    >
      Cancel
    </button>
  </form>
)}

{isPasswordFormOpen && (
  <form className="password-form" onSubmit={handlePasswordFormSubmit}>
    <h2>Change Password</h2>
    <div style={{marginTop:'15px'}}></div>
    <input
    className='changepass'
      type="password"
      value={currentPassword}
      onChange={(e) => setCurrentPassword(e.target.value)}
      placeholder="Current Password"
      required
    /><div style={{marginTop:'10px'}}></div>
    <input
    className='changenewpass'
      type="password"
      value={newPassword}
      onChange={(e) => setNewPassword(e.target.value)}
      placeholder="New Password"
      required
    /><div style={{marginTop:'10px'}}></div>
    <input
    className='changeconfirmpass'
      type="password"
      value={confirmNewPassword}
      onChange={(e) => setConfirmNewPassword(e.target.value)}
      placeholder="Confirm New Password"
      required
    /><div style={{marginTop:'10px'}}></div>
    <button className='changesave' type="submit">Save</button>
    <br />
    <button
      type="button"
     className='canchange'
      onClick={() => setIsPasswordFormOpen(false)}
    >
      Cancel
    </button>
  </form>
)}

    </div>
    </div>
  )
}

export default UserProfile;