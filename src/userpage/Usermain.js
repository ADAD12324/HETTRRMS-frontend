import React, { useState, useEffect } from 'react';

const Usermain = () => {
  const [userDetails, setUserDetails] = useState({
    username: '',
    firstName: '',
    lastName: '',
    userId: '',
  });

  useEffect(() => {
    // Fetch user details from sessionStorage
    const username = sessionStorage.getItem('username');
    const firstName = sessionStorage.getItem('firstname');
    const lastName = sessionStorage.getItem('lastname'); // Make sure you're setting "lastname" in the backend
    const userId = sessionStorage.getItem('userId');

    // Update state with user details
    setUserDetails({
      username,
      firstName,
      lastName,
      userId,
    });
  }, []);

  return (
    <div>
      <h1>Welcome, {userDetails.firstName} {userDetails.lastName}!</h1>
      <p>Username: {userDetails.username}</p>
      <p>User ID: {userDetails.userId}</p>
      {/* Other content for the user page */}
    </div>
  );
};

export default Usermain;