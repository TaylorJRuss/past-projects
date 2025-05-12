import React from 'react'
import { useNavigate } from 'react-router-dom';
import Slideshow from '../components/Slideshow';

function Home() {

  const navigate = useNavigate()

  const handleClick = () => {
    navigate('/take-a-trip');
  }

  let teamMembers = [
    {
      name: 'Brendan Leon',
      imageUrl: '/images/team/brendan_leon.jpg',
    },
    {
      name: 'Maiya Rehal',
      imageUrl: '/images/team/maiya_rehal.jpg',
    },
    {
      name: 'Vlad Rodgers',
      imageUrl: '/images/team/vlad.jpg',
    },
    {
      name: 'Nick Jones',
      imageUrl: `/images/team/nick_jones.jpg`,
    },
    {
      name: 'Taylor Russell',
      imageUrl: '/images/team/taylor.jpeg',
    },
    {
      name: 'Bailey Hatoum',
      imageUrl: '/images/team/Bailey.JPG',
    },
  ];


  return (
    <div
      className="home-container"
      style={{
        backgroundColor: 'black',
        minHeight: '100vh',
        color: 'white',
        paddingBottom: '2rem'
      }}
    >
      <div style={{ textAlign: 'center' }}>
        <h1 className="welcome-text" style = {{ color: 'white', margin: '35px 15px 0', fontSize: '50px', textDecoration: 'none', fontWeight: 'normal' }}>
          Welcome to SkyWay!
        </h1>
      </div>

      <div>
        <Slideshow />
      </div>

      <div style={{ textAlign: 'center', marginTop: '2rem' }}>
        <button 
          className="cta-button" 
          onClick={handleClick}
          style={{
            position: 'relative',
            top: '-150px',
            backgroundColor: 'white',
            color: 'black',
            border: '2px solid white',
            borderRadius: '15px',
            padding: '12px 24px',
            fontSize: '50px',
            fontFamily: "'Just Another Hand', cursive",
            cursor: 'pointer',
            marginTop: '-40px'
          }}
        >Plan Your Dream Getaway!</button>
      </div>

      <h2 className="team-header" style={{ textAlign: 'left', marginTop: '-5rem', marginLeft: '9rem', fontSize: '75px', fontWeight: 'normal'}}>
        Meet Our Team!
      </h2>

      <div className="team-grid" style={{display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '2rem', justifyItems: 'center', marginTop: '2rem'}}>
        {teamMembers.map((member, index) => (
          <div key={index} className="team-member">
            <div className="profile-pic" style={{width: '150px', height: '150px', borderRadius: '50%', backgroundColor: 'white', marginBottom: '-1rem'}}>
              <img
                src={member.imageUrl}
                alt={member.name}
                style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '50%' }}
              />
            </div>
            <p style={{ fontSize: '3rem', fontWeight: 'normal' }}>{member.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;