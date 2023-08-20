import React, { useState, useEffect } from "react";
import axios from "axios";
import Userapp from "../components/Userapp";
import moment from "moment";
import '../css/Proof.css';
import Loading from "../components/Loading";

const Proof = () => {
  const [proofs, setProofs] = useState([]);

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    axios
      .get(`https://hettrrms-server.onrender.com/api/paymentproof/${userId}`)
      .then((response) => setProofs(response.data.proofs))
      .catch((error) => console.error(error));
  }, []);
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
      <div className="container">
        <ul className="proof-list">
          <div className="proof-title">
            My Proof of Payment for Bookings
          </div> 
          {proofs.map((proof) => (
            <li key={proof.booking_id} className="proof-item">
              <div className="proof-details">
          <p>
            <b>UserId:</b> {proof.user_id}
          </p>
          <p>
            <b>Name:</b> {proof.name}
          </p>
          <p>
            <b>Email:</b> {proof.email}
          </p>
          <p>
            <b>bookingId:</b> {proof.booking_id}
          </p>
          <p>
            <b>PaymentID:</b> {proof.id}
          </p>
          <p>
            <b>Destination:</b> {proof.destination}
          </p>
          <p>
            <b>Departure Date:</b> {moment(proof.departure_date).format('MMMM DD YYYY')}
          </p>
          <p>
            <b>Return Date:</b> {moment(proof.return_date).format('MMMM DD YYYY')}
          </p>
          <p>
            <b>Number of Travelers:</b> {proof.numTravelers}
          </p>
          <p>
            <b>Total Payment:</b> {proof.total_payment}
          </p>
          <p>
            <b>Amount Pay:</b> {proof.amountpaid}
          </p>
          <p>
            <b>Bills need to Pay :</b> {proof.needtoPay}
          </p>
          <p>
              <b>Travelers:</b>
            </p>
            <ul>
              {JSON.parse(proof.travelers).map((traveler, index) => (
                <li key={index}>
                  <p>
                    <b>Name:</b> {traveler.name}
                  </p>{" "}
                  <p>
                    <b>Age:</b> {traveler.age}
                  </p>{" "}
                </li>
              ))}
            </ul>
            <p>
            <b>Submitted At:</b> {moment(proof.submitted_at).format('MMMM DD YYYY, hh:mm:ss A')}
                      </p>
        </div>
        
          
            
        <div className="proof-image">
                <div>
                  <p>
                    <b>Payment Proof:</b>
                  </p>
                  <img
                    src={`../${proof.payment_proof_path}`}
                    alt="Payment proof"
                    className="proof-image"
                  />
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Proof;