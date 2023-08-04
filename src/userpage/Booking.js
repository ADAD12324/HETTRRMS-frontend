import React, { useState, useEffect } from "react";
import axios from "axios";
import Userapp from "../components/Userapp";
import moment from 'moment';
import '../css/Booking.css';
import Loading from "../components/Loading";
import swal from 'sweetalert';

const Booking = () => {
  const [bookings, setBookings] = useState([]);
  const [showForm, setShowForm] = useState(false); 
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [paymentAmount, setPaymentAmount] = useState("");
  

  const handleFileInputChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  useEffect(() => { 
    const userId = localStorage.getItem('userId');
    axios.get(`/api/bookings/${userId}`)
      .then(response => setBookings(response.data.bookings))
      .catch(error => console.error(error));
  }, []);

  const getStatusStyle = (status) => {
    switch (status) {
      case 'declined':
        return {
          backgroundColor: 'red',
          color: '#fff',
          padding: '0.5rem',
          borderRadius: '5px',
        };
      case 'accepted':
        return {
          backgroundColor: 'green', 
          color: '#fff',
          padding: '0.5rem',
          borderRadius: '5px',
        };
      case 'pending':
        return {
          backgroundColor: 'yellow',
          color: '#DB005B',
          padding: '0.5rem',
          borderRadius: '5px',
        };
      case 'completed':
        return{
          backgroundColor: 'orange',
          color: '#fff',
          padding: '0.5rem',
          borderRadius: '5px',
        };
      default:
        return null;
    }
  };

  const handleSendProof = (booking) => {
    setSelectedBooking(booking);
    setShowForm(true);
    setSelectedFile(null);
    setPaymentAmount("");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append('bookingId', selectedBooking.id);
    formData.append('userId', selectedBooking.user_id);
    formData.append('name', selectedBooking.name1);
    formData.append('email', selectedBooking.email);
    formData.append('destination', selectedBooking.destination);
    formData.append('departureDate', new Date(selectedBooking.departureDate).toISOString());
    formData.append('returnDate', new Date(selectedBooking.returnDate).toISOString());
    formData.append('numTravelers', selectedBooking.numTravelers);
    formData.append('travelers', JSON.stringify(selectedBooking.travelers));
    formData.append('totalPayment', selectedBooking.totalPayment);
    formData.append('needtoPay', selectedBooking.needtoPay);
    formData.append('paymentProof', selectedFile);
    formData.append('paymentAmount', paymentAmount);

    try {
      const response = await fetch('/submit-payment-proof', {
        method: 'POST',
        body: formData,
      });
      const data = await response.json();
      if (response.ok) {
        setShowForm(false);
        swal(
          (data.message),
          "",
          "success"
        );
      } else {
        throw new Error(data.error || 'Failed to submit payment proof');
      }
    } catch (error) {
      console.error(error);
      swal(
        (error.message),
        "",
        "error"
      );
    }
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
    return <Loading />;
  }
  return (
    <div>
      <Userapp />

      <div >
        <h2 style={{marginTop:'30px'}}>Booking Status</h2>
        <table style={{ width: "100%" }}  className={showContent ? 'fade-in show' : 'fade-in'}>
          <thead>
            <tr>
              <th>User ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Booking ID</th>
              <th>Destination</th>
              <th>Departure Date</th>
              <th>Return Date</th>
              <th>Number of Travelers</th>
              <th>Total Payment</th>
              <th>Bills to Pay</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map(booking => (
              <tr key={booking.bookingId}>
                <td>{booking.user_id}</td>
                <td>{booking.name1}</td>
                <td>{booking.email}</td>
                <td>{booking.id}</td>
                <td>{booking.destination}</td>
                <td>{moment(booking.departureDate).format('MMMM DD, YYYY')}</td>
                <td>{moment(booking.returnDate).format('MMMM DD, YYYY')}</td>
                <td>{booking.numTravelers}</td>
                <td>{booking.totalPayment}</td>
                <td>{booking.needtoPay}</td>
                <td>
                  <div style={getStatusStyle(booking.status)}>{booking.status}</div>
                </td>
                <td>
                  {booking.status === 'accepted' && booking.needtoPay !== 0 && (
                    <button style={{ backgroundColor: '#002B5B', color: '#fff', padding: '10px 20px', border: 'none', borderRadius: '5px', fontSize: '16px', cursor: "pointer",  whiteSpace: 'nowrap' }} onClick={() => handleSendProof(booking)}>Send a Proof of Payment</button>
                  )}
                  {booking.status === 'declined' &&
                    <button style={{ backgroundColor: '#002B5B', color: '#fff', padding: '10px 15px', border: 'none', borderRadius: '5px', fontSize: '16px', cursor: "pointer" }} >Try Again</button>
                  }
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {showForm && selectedBooking && (
          <div
          className="form-container"
          style={{
            position: "fixed",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            backgroundColor: "#fff",
            padding: "1rem",
            borderRadius: "5px",
            boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
            zIndex: "999",
            maxWidth: "90%", // Limit the maximum width
          }}
        >   
            <h3>Send a Proof of Payment</h3>
            <form onSubmit={handleSubmit}> 
              <p><b>User ID:</b> {selectedBooking.user_id}</p>
              <p><b>Name:</b> {selectedBooking.name1}</p>
              <p><b>Email:</b> {selectedBooking.email}</p>
              <p><b>Booking ID:</b> {selectedBooking.id}</p>
              <p><b>Destination:</b> {selectedBooking.destination}</p>
              <p><b>Departure Date:</b> {moment(selectedBooking.departureDate).format('MMMM DD, YYYY')}</p>
              <p><b>Return Date:</b> {moment(selectedBooking.returnDate).format('MMMM DD, YYYY')}</p>
              <p><b>Number of Travelers:</b> {selectedBooking.numTravelers}</p>
              <p><b>Bills to Pay:</b> {selectedBooking.needtoPay}</p>
              <p><b>Total Payment:</b> {selectedBooking.totalPayment}</p>
              <p><b>Travelers:</b></p>
              <ul>
                {JSON.parse(selectedBooking.travelers).map((traveler, index) => (
                  <li key={index}><p><b>Name:</b> {traveler.name}</p> <p><b>Age:</b> {traveler.age}</p> </li>
                ))}
              </ul>
              <label>Preferred Amount to Pay:</label>
              <input type="text" value={paymentAmount} onChange={e => setPaymentAmount(e.target.value)} /><br />
              <label>Upload Payment Proof:</label>
              <input type="file" accept="image/*" onChange={handleFileInputChange} />
             <br />
              <button type="submit" className="subprofpay" style={{padding: '10px 22px'}}>Send</button>
              <button type="button" className="canprofpay" onClick={() => setShowForm(false)}>Cancel</button>
            </form>
          </div>
        )}
      </div>
    </div>
  )
}

export default Booking;
