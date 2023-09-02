import React, { useState, useEffect } from "react";
import axios from "axios";
import Userapp from '../components/Userapp'
import moment  from "moment";
import '../css/userreserve.css';
import swal from 'sweetalert';
import {AiOutlineCheck} from "react-icons/ai";
import Loading from "../components/Loading";
const UserReservation = () => {
  const [reservations, setReservations] = useState([]);
  const [showChangeDateForm, setShowChangeDateForm] = useState(false); 
  const [selectedBookingId, setSelectedBookingId] = useState(null);
  const [selectedUserId, setSelectedUserId] = useState(null);

  const handleRequestChangeDate = (bookingId, userId) => {
    setSelectedBookingId(bookingId);
    setSelectedUserId(userId);
    setShowChangeDateForm(true);
  };

  const handleSubmitChangeDate = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    formData.set("bookingId", selectedBookingId);
    formData.set("userId", selectedUserId);
  
    const requestData = {
      userId: selectedUserId, // Add the userId field
      bookingId: selectedBookingId,
      departureDate: formData.get("departureDate"), // Get departureDate from formData
      returnDate: formData.get("returnDate"), // Get returnDate from formData
    };
  
    axios.post("https://hettrrms-server.onrender.com/api/request-date-change", requestData) // Send requestData instead of formData
      .then((response) => {
        console.log(response.data);
        swal("Successfully request a change date wait for the response of the admin", "", "success");
        setShowChangeDateForm(false);
      })
      .catch((error) => {
        console.error(error);
        // handle error response
      });
  };
  

  const handleCloseChangeDateForm = () => {
    setShowChangeDateForm(false);
  };

  useEffect(() => {
    const userId = sessionStorage.getItem('userId');
    axios.get(`https://hettrrms-server.onrender.com/api/reservations/${userId}`)
      .then(response => setReservations(response.data.proofs))
      .catch(error => console.error(error));
  }, []);

  const today = new Date();

  const handleComplete = (reservation) => {
    const data = {
      userId: reservation.user_id,
      bookingId: reservation.booking_id,
      name:reservation.name,
      email:reservation.email,
      destination:reservation.destination,
      departureDate:reservation.departure_date,
      returnDate:reservation.return_date,
      numTravelers:reservation.num_travelers,
      totalPayment:reservation.total_payment,
      travelers:reservation.travelers,
    };
  
    axios.post('https://hettrrms-server.onrender.com/api/generate-record', data)
      .then((response) => {
        console.log(response.data);
        // Handle success
      })
      .catch((error) => {
        console.error(error);
        // Handle error
      });
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
      <h2 style={{ textAlign: "center" }}>
        My Reservation
      </h2>
      <ul className="reservation-list">
        {reservations.map((proof) => {
          const returnDate = new Date(proof.return_date);
          const isPast = today > returnDate;
          const departureDate = new Date(proof.departure_date);
          const oneWeekBeforeDeparture = moment(departureDate).subtract(7, 'days');
          const isCurrentDate = today.toDateString() === returnDate.toDateString();

          // Execute handleComplete automatically when the return date is equal to the current date
          if (isCurrentDate) {
            handleComplete(proof);
          }
          
          return (
            <li
              key={proof.bookingId}
              className="reservation-item"
            >
              <div className="reservation-info">
                
                <p><b>UserID:</b> {proof.user_id}</p>
                <p><b>Name:</b> {proof.name}</p>
                <p><b>Email:</b> {proof.email}</p>
                <p><b>bookingId:</b> {proof.booking_id}</p>
                <p><b>PaymentID:</b> {proof.id}</p>
                <p><b>Destination:</b> {proof.destination}</p>
                <p><b>Departure Date:</b>{''} {moment(proof.departure_date).format('MMMM DD, YYYY')}</p>
                <p><b>Return Date:</b>{''} {moment(proof.return_date).format('MMMM DD, YYYY')}</p>
                <p><b>Number of Travelers:</b> {proof.num_travelers}</p>
                <p><b>Total Payment:</b> {proof.total_payment}</p>
                <p><b>Travelers:</b></p>
                <ul>
                  {JSON.parse(proof.travelers).map((traveler, index) => (
                    <li key={index}>
                      <p><b>Name:</b> {traveler.name}</p>{" "}
                      <p><b>Age:</b> {traveler.age}</p>{" "}
                    </li>
                  ))}
                </ul>
              </div>
              {isPast && (
                  <button
                  className="butrequest completed"
                >
                  Completed <AiOutlineCheck />
                </button>
              )}
              {today < oneWeekBeforeDeparture && !isPast && (
                <button
                className="butrequest"
                  onClick={() => handleRequestChangeDate(proof.booking_id, proof.user_id)}
                >
                  Request Change Date
                </button>
              )}
            </li>
          );
        })}
      </ul>
      {showChangeDateForm && (
        <div className="change-date-form">
          <h2>Request Change Date</h2>
          <form onSubmit={handleSubmitChangeDate}>
            <p><b>User ID:</b> {selectedUserId} </p>
            <p><b>Booking ID:</b> {selectedBookingId}</p>
            <label htmlFor="departure-date">New Departure Date:</label>
            <input  className="changedepdate" type="date" id="departure-date" name="departureDate" required /><br /><div style={{marginTop:'5px'}}></div>

            <label htmlFor="return-date">New Return Date:</label>
            <input className="changeretdate" type="date" id="return-date" name="returnDate" required /><br /><div style={{marginTop:'5px'}}></div>

            <button className="changesub" type="submit">Submit</button><br /><div style={{marginTop:'5px'}}></div>
            <button type="button" className="cel" onClick={handleCloseChangeDateForm}>Cancel</button>
          </form>
        </div>
      )}
      
    </div>
  );
};

export default UserReservation;
