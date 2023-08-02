import React, { useState } from 'react';
import axios from 'axios';
const Sms = () => {
  const [recipient, setRecipient] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    // Make an HTTP POST request to the backend API
    axios.post('http://localhost:3000/send-sms', { recipient, message })
      .then((response) => {
        console.log(response.data);
        // Display success message to the user
        alert('SMS sent successfully!');
      })
      .catch((error) => {
        console.error(error);
        // Display error message to the user
        alert('Failed to send SMS');
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={recipient}
        onChange={(e) => setRecipient(e.target.value)}
        placeholder="Recipient's phone number"
      />
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Message"
      />
      <button type="submit">Send SMS</button>
    </form>
  );
}

export default Sms