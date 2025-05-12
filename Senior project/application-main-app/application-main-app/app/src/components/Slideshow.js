
import React, { useState, useEffect } from 'react';
import '../static/Slideshow.css';

const locations = [
  {
    name: 'Paris',
    image: `/images/places/paris.jpg`
  },
  {
    name: 'New York',
    image: `/images/places/newyork.jpg`
  },
  {
    name: 'Tokyo',
    image: `/images/places/tokyo.jpg`
  },
  {
    name: 'London',
    image: `/images/places/london.jpeg`,
  },
  {
    name: 'Bora Bora',
    image: `/images/places/borabora.jpg`,
  },
  {
    name: 'Turks and Caicos',
    image: `/images/places/turksandcaicos.jpg`,
  },
  {
    name: 'Mykonos',
    image: `/images/places/mykonos.jpg`,
  },
];

function Slideshow() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % locations.length);
    }, 3000); 

    return () => clearInterval(interval); 
  }, []);

  return (
    <div className="slideshow-container">
      <div className="slide"
        style={{
          height: '600px', 
          margin: '50px auto 0', 
          borderRadius: '10px',
          overflow: 'hidden',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)'
        }}
      >
        <img src={locations[currentIndex].image} alt={locations[currentIndex].name} />
        <h2>{locations[currentIndex].name}</h2>
      </div>
    </div>
  );
}

export default Slideshow;