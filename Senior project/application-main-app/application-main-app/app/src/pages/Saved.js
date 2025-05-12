import React, { useEffect, useState } from "react";
import {fetchFromTable, deleteFromTable} from "../util";

function Saved() {
  const [savedTrips, setSavedTrips] = useState([]);
  const user_email = localStorage.getItem("user_email");

  useEffect(() => {
    const fetchSavedTrips = async () => {
      if (!user_email) return;
      const data = await fetchFromTable("SavedTrips", "user_email", user_email);
      if (data) {
        setSavedTrips(data);
      }
    };

    fetchSavedTrips();
  }, [user_email]);

  const deleteTrip = async (tripId) => {
    const deleted = await deleteFromTable("SavedTrips", "id", tripId);
  
    if (deleted) {
      setSavedTrips((prevTrips) => prevTrips.filter((trip) => trip.id !== tripId));
      console.log("Trip deleted successfully.");
    } else {
      console.error("Failed to delete trip.");
    }
  };

  return (
    <div
      className="saved-container"
      style={{
        backgroundColor: "black",
        minHeight: "100vh",
        paddingBottom: "2rem",
        color: "white",
      }}
    >
      <div style={{ textAlign: "center", paddingTop: "2rem" }}>
        <h1
          style={{
            fontSize: "50px",
            marginTop: "1rem",
            fontWeight: "normal",
          }}
        >
          Your Saved Trips
        </h1>
      </div>

      <div
        className="trips-grid"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
          gap: "2rem",
          padding: "3rem 4rem",
        }}
      >
        {savedTrips.length > 0 ? (
          savedTrips.map((trip) => (
            <div
              key={trip.id}
              className="trip-card"
              style={{
                backgroundColor: "#1f1f1f",
                borderRadius: "15px",
                padding: "1rem",
                boxShadow: "0 0 15px rgba(255,255,255,0.1)",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                maxWidth: "350px",
                margin: "0 auto",
              }}
              
            >
              <img
                  src={trip.photoUrl || "/placeholder.jpg"}
                  alt={trip.hotelName}
                  style={{
                    width: "100%",
                    aspectRatio: "4 / 3", // ⬅️ forces a 4:3 box
                    objectFit: "cover",
                    borderRadius: "10px",
                  }}
                />

              <h2
                style={{
                  fontSize: "1.5rem",
                  marginTop: "1rem",
                  fontWeight: "normal",
                  textAlign: "center",
                }}
              >
                {trip.hotelName}
              </h2>
              <p>
                <strong>Check-in:</strong> {trip.checkIn}
              </p>
              <p>
                <strong>Check-out:</strong> {trip.checkOut}
              </p>
              <p>
                <strong>Price:</strong> {trip.price ? `$${trip.price}` : "N/A"}
              </p>
              <button
                onClick={() => deleteTrip(trip.id)}
                style={{
                  marginTop: "1rem",
                  backgroundColor: "#ff4d4d",
                  color: "white",
                  border: "none",
                  borderRadius: "8px",
                  padding: "0.5rem 1rem",
                  cursor: "pointer",
                }}
              >
                Delete
              </button>
            </div>
          ))
        ) : (
          <p style={{ textAlign: "center", fontSize: "1.5rem" }}>
            No saved trips yet.
          </p>
        )}
      </div>
    </div>
  );
}

export default Saved;
