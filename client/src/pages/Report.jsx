import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Report() {
  const [activeMenu, setActiveMenu] = useState('ReportMenu');
  const [location, setLocation] = useState('');
  const [deviceID, setDeviceID] = useState('');
  const navigate = useNavigate();

  const styles = {
    container: {
      display: 'flex',
      flexDirection: 'column',
      height: '100vh',
      margin: 0,
      padding: 0,
    },
    header: {
      backgroundColor: '#007bff',
      height: '60px',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    },
    sidebar: {
      backgroundColor: '#f8f9fa',
      height: 'calc(100vh - 60px)',
      padding: '1rem',
      display: 'flex',
      flexDirection: 'column',
    },
    content: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: 'calc(100vh - 60px)',
      padding: '20px',
      flex: 1,
    },
    button: {
      width: '100%',
      padding: '15px 0',
      marginBottom: '0.5rem',
      backgroundColor: '#6c757d',
      color: 'white',
      fontSize: '1.2rem',
      border: 'none',
      cursor: 'pointer',
    },
    buttonActive: {
      backgroundColor: '#343a40',
    },
    formControl: {
      width: '200px',
      margin: '0 auto',
      fontSize: '1.2rem',
      padding: '10px',
      border: '1px solid #ccc',
    },
    section: {
      display: 'flex',
      justifyContent: 'space-around',
      alignItems: 'flex-start',
      height: '100%',
      paddingTop: '3rem',
    },
    textCenter: {
      textAlign: 'center',
      padding: '1rem',
    },
    heading: {
      fontSize: '1.5rem',
      marginBottom: '1rem',
    },
    buttonPrimary: {
      backgroundColor: '#007bff',
      borderColor: '#007bff',
      color: 'white',
      marginTop: '0.5rem',
      fontSize: '1.2rem',
      padding: '10px 20px',
      border: 'none',
      width: '200px',
      cursor: 'pointer',
    },
    inputButtonWrapper: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      marginBottom: '1rem', // Add margin bottom for spacing
    },
  };

  const handleLocationSubmit = async () => {
    try {
      const response = await axios.post('/api/location', { location });
      console.log(response.data);
      alert('Location submitted successfully');
    } catch (error) {
      console.error('Error submitting location:', error);
      alert('Failed to submit location');
    }
  };

  const handleDeviceIdSubmit = async () => {
    try {
      const response = await axios.post('/api/device', { deviceID });
      console.log(response.data);
      alert('Device ID submitted successfully');
    } catch (error) {
      console.error('Error submitting device ID:', error);
      alert('Failed to submit device ID');
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1 style={{ color: 'white', fontSize: '24px' }}><b>REPORT</b></h1>
      </div>
      <div style={{ display: 'flex', flexDirection: 'row', flex: 1 }}>
        <div style={{ ...styles.sidebar, width: '200px' }}>
          <button
            style={{
              ...styles.button,
              ...(activeMenu === 'SearchByScreen' ? styles.buttonActive : {}),
            }}
            onClick={() => setActiveMenu('SearchByScreen')}
          >
            Search By Screen
          </button>
          <button
            style={{
              ...styles.button,
              ...(activeMenu === 'ReportMenu' ? styles.buttonActive : {}),
            }}
            onClick={() => setActiveMenu('ReportMenu')}
          >
            Report Menu
          </button>
        </div>
        <div style={{ ...styles.content, flex: 1 }}>
          {activeMenu === 'ReportMenu' && (
            <div style={styles.section}>
              <div style={styles.textCenter}>
                <h4 style={styles.heading}><b>YEARLY</b></h4>
                <button style={styles.buttonPrimary} onClick={() => navigate('/yearly')}>View</button>
              </div>
              <div style={styles.textCenter}>
                <h4 style={styles.heading}><b>MONTHLY</b></h4>
                <button style={styles.buttonPrimary} onClick={() => navigate('/monthly')}>View</button>
              </div>
              <div style={styles.textCenter}>
                <h4 style={styles.heading}><b>WEEKLY</b></h4>
                <button style={styles.buttonPrimary} onClick={() => navigate('/weekly')}>View</button>
              </div>
            </div>
          )}
          {activeMenu === 'SearchByScreen' && (
            <div style={styles.section}>
              <div style={styles.inputButtonWrapper}>
                <h4 style={styles.heading}><b>LOCATION</b></h4>
                <input
                  type="text"
                  placeholder="Enter Location"
                  style={styles.formControl}
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                />
                <button style={styles.buttonPrimary} onClick={handleLocationSubmit}>Send</button>
              </div>
              <div style={styles.inputButtonWrapper}>
                <h4 style={styles.heading}><b>DEVICE ID</b></h4>
                <input
                  type="text"
                  placeholder="Enter Device ID"
                  style={styles.formControl}
                  value={deviceID}
                  onChange={(e) => setDeviceID(e.target.value)}
                />
                <button style={styles.buttonPrimary} onClick={handleDeviceIdSubmit}>Send</button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Report;
