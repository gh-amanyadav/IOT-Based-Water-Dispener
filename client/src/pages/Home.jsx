import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const containerStyle = {
  minHeight: '100vh',
  display: 'flex',
  backgroundColor: '#f5f5f5'
};

const imageContainerStyle = {
  flex: 1,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
};

const imageStyle = {
  objectFit: 'contain',
  width: '80%',
  maxWidth: '500px'
};

const formContainerStyle = {
  flex: 1,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center'
};

const formStyle = {
  backgroundColor: 'white',
  opacity: 0.9,
  height: 'auto',
  borderRadius: '0.5rem',
  overflow: 'hidden',
  padding: '2.5rem',
  width: '100%',
  maxWidth: '32rem',
  boxShadow: '0 10px 30px rgba(0, 0, 0, 0.2)'
};

const buttonStyle = (bgColor, hoverColor, isHovered) => ({
  padding: '1rem',
  fontWeight: 600,
  borderRadius: '0.5rem',
  backgroundColor: isHovered ? hoverColor : bgColor,
  color: 'white',
  fontSize: '1.125rem',
  textAlign: 'center',
  textDecoration: 'none',
  display: 'block',
  marginBottom: '1rem',
  transition: 'background-color 0.3s ease, box-shadow 0.3s ease',
  cursor: 'pointer',
  boxShadow: isHovered ? '0 10px 15px rgba(0, 0, 0, 0.1)' : 'none'
});

const welcomeTextStyle = {
  fontSize: '2.5rem',
  fontWeight: 'bold',
  textAlign: 'center',
  marginBottom: '1rem'
};

const Home = () => {
  const [isSignInHovered, setIsSignInHovered] = useState(false);
  const [isSignUpHovered, setIsSignUpHovered] = useState(false);

  return (
    <div style={containerStyle}>
      <div style={imageContainerStyle}>
        <img 
          src='https://img.freepik.com/premium-vector/hand-free-sanitizer-wall-mounted-soap-automatic-dispenser-automated-contactless-restroom-equipment-with-sensors-touch-less-hand-sanitizer-blue-color-soap-dispenser-vector-illustration_288189-646.jpg?w=740'
          alt='Liquid Dispenser'
          style={imageStyle}
        />
      </div>

      <div style={formContainerStyle}>
        <div style={formStyle}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div style={welcomeTextStyle}>Welcome</div>
            <Link 
              to="/signin"
              style={buttonStyle('#2563eb', '#1e40af', isSignInHovered)}
              onMouseEnter={() => setIsSignInHovered(true)}
              onMouseLeave={() => setIsSignInHovered(false)}
            >
              Sign In
            </Link>
            <Link 
              to="/signup"
              style={buttonStyle('#2563eb', '#1e40af', isSignUpHovered)}
              onMouseEnter={() => setIsSignUpHovered(true)}
              onMouseLeave={() => setIsSignUpHovered(false)}
            >
              Sign Up
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
