import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const headerContainerStyle = {
  backgroundColor: '#1C1C1C',
  padding: '1rem 0',
  pointerEvents: 'none', // Disable interactions for the entire header
};

const navStyle = {
  backgroundColor: '#ffffff',
  borderRadius: '1rem',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  maxWidth: '1200px',
  width: '100%',
  padding: '1rem',
};

const titleStyle = {
  flex: 1,
  textAlign: 'center',
  fontSize: '1.7rem',
  fontWeight: 'bold',
  fontStyle: 'italic',
  color: '#1C1C1C',
};

const profileButtonStyle = {
  pointerEvents: 'auto', // Enable interactions for the profile button
};

const profileImageStyle = {
  height: '2.25rem',
  width: '2.25rem',
  borderRadius: '50%',
  objectFit: 'cover',
  cursor: 'pointer',
  transition: 'opacity 0.3s',
};

const Header = () => {
  const { currentUser } = useSelector(state => state.user);

  return (
    <div style={headerContainerStyle}>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <nav style={navStyle}>
          <div style={titleStyle}>
            IOT BASED LIQUID DISPENSER
          </div>
          <ul className='flex gap-4 items-center font-semibold italic text-[18px]'>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default Header;
