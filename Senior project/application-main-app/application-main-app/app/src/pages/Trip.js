import React, { useState } from "react";
import { insertIntoTable } from "../util.js";


const Trip = () => {     
  const [city, setCity] = useState(""); 
  const [state, setState] = useState("");
  const [country, setCountry] = useState("");
  const [checkInDate, setCheckInDate] = useState("");
  const [checkOutDate, setCheckOutDate] = useState("");
  const [hotels, setHotels] = useState([]);
  const [weather, setWeather] = useState([]);
  const [loading, setLoading] = useState(false);

  const saveHotel = async (hotelData) => {
    const user_email = localStorage.getItem("user_email");
    const row = {
      user_email: user_email,
      hotelName: hotelData.name,
      checkIn: hotelData.checkInDate,
      checkOut: hotelData.checkOutDate,
      price: hotelData.price,
      photoUrl: hotelData.imgUrl,
    };
  
    const result = await insertIntoTable("SavedTrips", row);
  
    if (result) {
      alert("Hotel saved!");
    } else {
      alert("Failed to save hotel.");
    }
  };
  const fetchHotels = async () => {
    if (!checkInDate || !checkOutDate) {
      alert("Please select both check-in and check-out dates.");
      return;
    }

     if (new Date(checkOutDate) <= new Date(checkInDate)) {
      alert("Check-out date must be after Check-in date.");
      return;
    }

    setLoading(true);
    try {
      const locationRes = await fetch(
        `http://localhost:3001/api/location/city/${city}/country/${country}/state/${state}`
      );
      const locationData = await locationRes.json();
      if (!locationData.length) throw new Error("Location not found");

      const { lat, lon } = locationData[0];

      const hotelRes = await fetch(
        `http://localhost:3001/api/hotel/lat/${lat}/lon/${lon}?checkInDate=${checkInDate}&checkOutDate=${checkOutDate}`
      );
      const hotelData = await hotelRes.json();
      setHotels(hotelData.hotels || []);

      const weatherRes = await fetch(
        `http://localhost:3001/api/weather/lat/${lat}/lon/${lon}?tripStart=${checkInDate}&tripEnd=${checkOutDate}`
      );
      const weatherData = await weatherRes.json();
      setWeather(weatherData.forecast); // only next 5 days
    } catch (error) {
      console.error("Error fetching trip data:", error);
      setHotels([]);
      setWeather([]);
    }
    setLoading(false);
  };

  return (
    <div className="container py-5">
      <div style={{ fontFamily: "'Times New Roman', serif" }}>
      <div className="text-center mb-5">
        <h1 className="display-4">Find Hotels</h1>
      </div>

      <div className="row g-3 mb-4">
        <div className="col-md-6">
          <input
            type="text"
            placeholder="City"
            className="form-control"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
        </div>
        <div className="col-md-6">
          <input
            type="text"
            placeholder="State"
            className="form-control"
            value={state}
            onChange={(e) => setState(e.target.value)}
          />
        </div>
        <div className="col-12">
          <input
            type="text"
            placeholder="Country"
            className="form-control"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
          />
        </div>
        <div className="col-md-6">
          <input
            type="date"
            className="form-control"
            value={checkInDate}
            onChange={(e) => setCheckInDate(e.target.value)}
          />
        </div>
        <div className="col-md-6">
          <input
            type="date"
            className="form-control"
            value={checkOutDate}
            onChange={(e) => setCheckOutDate(e.target.value)}
          />
        </div>
        </div>
        <div className="col-12">
          <button style = {{ marginBottom: '15px' }}
            onClick={fetchHotels}
            className="btn btn-primary w-100"
            disabled={loading}
          >
            {loading ? (
              <div className="spinner-border spinner-border-sm" role="status">
                <span className="visually-hidden">Searching...</span>
              </div>
            ) : (
              "Find Hotels"
            )}
          </button>
        </div>
      </div>

      {/* Weather Forecast */}
      {weather.length > 0 && (
        <div className="mb-5 px-3 py-4 rounded-4 shadow-sm" style={{ background: "linear-gradient(135deg, #e0f7fa, #ffffff)" }}>
          <h2 className="h4 mb-4 text-center text-primary">{weather.length}-Day Weather Forecast</h2>
          <div className="row row-cols-1 row-cols-sm-2 row-cols-md-5 g-4">
            {weather.map((day, idx) => (
              <div key={idx} className="col">
                <div className="card h-100 border-0 shadow-sm text-center rounded-4">
                  <div className="card-body d-flex flex-column justify-content-between">
                    <div className="mb-2">
                      <div className="fw-semibold text-secondary mb-2">
                      {new Date(`${day.date}T00:00:00Z`).toLocaleDateString("en-US", {
                        timeZone: "UTC",
                        weekday: "short",
                        month: "short",
                        day: "numeric",
                      })}
                    </div>
                  </div>
                  <img src={day.iconUrl} />
                  <div className="mt-2">
                    <div className="text-danger fw-bold">High: {day.temp_max}°F</div>
                    <div className="text-info">Low: {day.temp_min}°F</div>
                  </div>
                </div>
              </div>
            </div>
            ))}
          </div>
        </div>
      )}

      {/* Hotel Cards */}
      <div className="row row-cols-1 row-cols-sm-2 row-cols-lg-3 g-4">
        {hotels.map((hotel) => (
          <div key={hotel.hotelId} className="col">
            <div className="card h-100">
              {hotel.photoUrl ? (
                <img
                  src={hotel.photoUrl}
                  alt={hotel.name}
                  className="card-img-top"
                  style={{ height: "200px", objectFit: "cover" }}
                />
              ) : (
                <div className="d-flex align-items-center justify-content-center bg-secondary text-white" style={{ height: "200px" }}>
                  No Image
                </div>
              )}
              <div className="card-body d-flex flex-column">
                <h5 className="card-title">{hotel.name}</h5>
                <p className="card-text">
                  Location: {hotel.geoCode.latitude}, {hotel.geoCode.longitude}
                </p>
                <p className="card-text">
                  Price:{" "}
                  <strong>
                    {hotel.price ? `$${hotel.price}` : "Not Available"}
                  </strong>
                </p>
                <button
                      className="btn btn-outline-primary mt-auto"
                      onClick={() =>
                        saveHotel({
                          name: hotel.name,
                          checkInDate,
                          checkOutDate,
                          price: hotel.price,
                          imgUrl: hotel.photoUrl,
                        })
                      }
                    >
                      Save Hotel
                    </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Trip;
