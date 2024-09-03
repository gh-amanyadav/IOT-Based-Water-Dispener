import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { signOut } from '../redux/user/userSlice';
import UserInfo from './UserInfo';
import YearlyReport from './Live_data';
import TotalReport from './Consumption';
import Profile from './Profile';

function Report() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [activeMenu, setActiveMenu] = useState('UserInfo');

  const handleSignOut = async () => {
    try {
      await fetch(`/api/auth/signout`);
      dispatch(signOut());
      navigate('/');
    } catch (error) {
      console.log(error);
    }
  };

  const handleButtonClick = (menu) => {
    setActiveMenu(menu);
    console.log(`Active Menu: ${menu}`); // Debug log
  };

  const styles = {
    container: {
      display: 'flex',
      flexDirection: 'column',
      height: '100vh',
      margin: 0,
      padding: 0,
      fontFamily: 'Arial, sans-serif',
    },
    header: {
      backgroundColor: '#002b36',
      height: '60px',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      position: 'sticky',
      top: 0,
      zIndex: 1000,
      color: 'white',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    },
    sidebar: {
      backgroundColor: '#ffffff',
      height: 'calc(100vh - 60px)',
      padding: '1rem',
      display: 'flex',
      flexDirection: 'column',
      position: 'sticky',
      top: '60px',
      boxShadow: '2px 0 4px rgba(0, 0, 0, 0.1)',
    },
    content: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      height: 'calc(100vh - 60px)',
      padding: '20px',
      flex: 1,
      overflowY: 'auto',
      backgroundColor: '#f4f4f4',
    },
    button: {
      width: '100%',
      padding: '15px 0',
      marginBottom: '1rem',
      backgroundColor: '#007bff',
      border: 'none',
      borderRadius: '6px',
      cursor: 'pointer',
      transition: 'background-color 0.3s, transform 0.2s',
      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
      color: 'white',
      position: 'relative',
    },
    buttonHover: {
      backgroundColor: '#0056b3',
      transform: 'scale(1.02)',
    },
    buttonActive: {
      backgroundColor: '#004080',
    },
    signOutButton: {
      width: '100%',
      padding: '15px 0',
      backgroundColor: '#dc3545',
      border: 'none',
      borderRadius: '6px',
      cursor: 'pointer',
      color: 'white',
      transition: 'background-color 0.3s, transform 0.2s',
      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    },
    signOutButtonHover: {
      backgroundColor: '#c82333',
      transform: 'scale(1.02)',
    },
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1 style={{ color: 'white', fontSize: '24px' }}><b>DASHBOARD</b></h1>
      </div>
      <div style={{ display: 'flex', flexDirection: 'row', flex: 1 }}>
        <div style={{ ...styles.sidebar, width: '200px' }}>
          <button
            style={{
              ...styles.button,
              ...(activeMenu === 'Profile' ? styles.buttonActive : {}),
            }}
            onClick={() => handleButtonClick('Profile')}
            className="sidebar-button"
          >
            Profile
          </button>
          <button
            style={{
              ...styles.button,
              ...(activeMenu === 'UserInfo' ? styles.buttonActive : {}),
            }}
            onClick={() => handleButtonClick('UserInfo')}
            className="sidebar-button"
          >
            User Info
          </button>
          <button
            style={{
              ...styles.button,
              ...(activeMenu === 'ConsumptionAnalysis' ? styles.buttonActive : {}),
            }}
            onClick={() => handleButtonClick('ConsumptionAnalysis')}
            className="sidebar-button"
          >
            Consumption Analysis
          </button>
          <button
            style={{
              ...styles.button,
              ...(activeMenu === 'LiveMenu' ? styles.buttonActive : {}),
            }}
            onClick={() => handleButtonClick('LiveMenu')}
            className="sidebar-button"
          >
            Live Menu
          </button>
          <button
            style={{
              ...styles.signOutButton,
            }}
            onClick={handleSignOut}
            className="signout-button"
          >
            Sign Out
          </button>
        </div>

        <div style={styles.content}>
          {activeMenu === 'LiveMenu' && <YearlyReport />}
          {activeMenu === 'UserInfo' && <UserInfo />}
          {activeMenu === 'ConsumptionAnalysis' && <TotalReport />}
          {activeMenu === 'Profile' && <Profile />}
        </div>
      </div>
    </div>
  );
}

export default Report;
