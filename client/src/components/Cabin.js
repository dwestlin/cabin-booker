import React, { useState } from "react";
import { bookCabin } from "../api/cabins";

const Cabin = ({ cabin }) => {
  const [showBookingSection, setShowBookingSection] = useState(false);
  const [mailadress, setMailadress] = useState("");
  const [statusMessage, setStatusMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleShowBooking = () => {
    setShowBookingSection((prevState) => !prevState);
  };

  const handleBooking = async (e) => {
    e.preventDefault();
    setStatusMessage("");
    setErrorMessage("");

    try {
      const result = await bookCabin(cabin.id, mailadress);

      if (result.status) {
        setStatusMessage(result.message);
      } else {
        setErrorMessage(result.message);
      }
    } catch (error) {
      setErrorMessage(error.message);
    }
  };
  return (
    <div className="cabin">
      <div className="row">
        <div className="left">
          <div>
            <strong>Titel: </strong>
            <span>{cabin.title}</span>
          </div>
          <div>
            <strong>Adress: </strong>
            <span>{cabin.adress}</span>
          </div>
        </div>
        <div className="right">
          <div>
            <strong>Bäddar: </strong>
            <span>{cabin.maxBeds}</span>
          </div>
          <div>
            <strong>Beskrivning: </strong>
            <span>{cabin.description}</span>
          </div>
          {cabin.isBooked && cabin.bookedBy ? (
            <div>
              <strong>Bokad av: </strong>
              <span>{cabin?.bookedBy}</span>
            </div>
          ) : null}
        </div>
        {!cabin.isBooked ? (
          <div>
            <button className="btn" onClick={handleShowBooking}>
              Boka
            </button>
          </div>
        ) : null}
      </div>
      {showBookingSection && (
        <div className="row">
          <form>
            <input
              name="mailadress"
              placeholder="Mailadress..."
              onChange={(e) => setMailadress(e.target.value)}
            />
            <input type="submit" onClick={handleBooking} />
          </form>
        </div>
      )}
      <div className="status-message">{statusMessage}</div>
      <div className="error-message">{errorMessage}</div>
    </div>
  );
};

export default Cabin;
