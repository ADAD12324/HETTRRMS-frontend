import React, { useState } from 'react';
import { useLocation } from "react-router-dom";
import "../css/PackageDetails.css";
import { useNavigate } from 'react-router-dom';
import { GiAirplaneDeparture } from "react-icons/gi";

function formatTime(timeString) {
  const date = new Date(`2023-01-01T${timeString}`);
  return date.toLocaleTimeString([], { hour: 'numeric', minute: 'numeric', hour12: true });
}

const PackageDetails = () => {
  const location = useLocation();
  const { name, description, price, imageUrl, itinerary } = location.state;
  const descriptionItems = (description ?? '').split('\n');
  const parsedItinerary = JSON.parse(itinerary);
  const navigate = useNavigate(); 

  const [selectedDay, setSelectedDay] = useState(0);

  const handleDayClick = (index) => {
    setSelectedDay(index);
  };

  return (
    <div className="back">
      <div>
        {imageUrl && (
          <div>
            <img className="heading" src={imageUrl} alt="Package" />
            <h1>{name}</h1>
            <h2>Price: ₱{price}</h2>
            <button className="but1" onClick={() => navigate(`/Book?name=${encodeURIComponent(name)}&price=${price}`)}><GiAirplaneDeparture />BOOK NOW</button>
            <div className="box1">
              <h2 style={{ textAlign: 'center' }}>Package Inclusion</h2>
              <ul>
                {descriptionItems.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </div>
            <h3>Note: "WE ARE FOR GOOD QUALITY SERVICES!"</h3>
            <h3>CONDITIONS:</h3>
            <div className="box2">
              <ul>
                <li>Contracting Service of tour must be made one month before the tour.</li>
                <li>List of the participants with b-day shall be given to the agency two months before the tour.</li>
                <li>50% of payments shall be done 1 month for airline reservation and the rest shall be pay <br /> 2 weeks before the tour.</li>
                <li>Tour Operator has the right to alter the itineraries as maybe deemed necessary through<br /> unavoidable circumstances.</li>
                <li>Any unused services cannot be refunded.</li>
              </ul>
            </div>
            <br />
            <div>
              {parsedItinerary.map((day, index) => (
                <button
                  key={index}
                  className={`day-button ${index === selectedDay ? 'active' : ''}`}
                  onClick={() => handleDayClick(index)}
                >
                  {`Day ${index + 1}`}
                </button>
              ))}
            </div>
            <div className="box3">
              <h2 style={{ textAlign: 'center' }}>Itineraries</h2>
              <table>
                <thead>
                  <tr>
                    <th>Activity</th>
                    <th>Start Time</th>
                    <th>End Time</th>
                  </tr>
                </thead>
                <tbody>
                  {parsedItinerary[selectedDay].activities.map((activity, index) => (
                    <tr key={index}>
                      <td>{activity.name}</td>
                      <td>{formatTime(activity.startTime)}</td>
                      <td>{formatTime(activity.endTime)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PackageDetails;
