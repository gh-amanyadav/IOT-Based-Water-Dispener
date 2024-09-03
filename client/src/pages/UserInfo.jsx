import React, { useState, useEffect } from 'react';
import axios from 'axios';
import moment from 'moment-timezone';

const UserInfo = () => {
  const [tableData, setTableData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    // Fetch data from the API when the component mounts
    axios.get('https://iotdevice.apdp.co.in/api/records')
      .then(response => {
        const data = response.data;
        setTableData(data);
        setFilteredData(data);
      })
      .catch(error => {
        console.error('There was an error fetching the data!', error);
      });
  }, []);

  useEffect(() => {
    // Filter the records based on the search query
    const filterRecords = () => {
      if (searchQuery.trim() === '') {
        setFilteredData(tableData);
      } else {
        const queryLower = searchQuery.toLowerCase();
        const filtered = tableData.filter(record => {
          return (
            record.location.toLowerCase() === queryLower ||
            record.username.toLowerCase() === queryLower ||
            record.deviceId.toLowerCase() === queryLower ||
            record.phoneNo.toLowerCase() === queryLower
          );
        });
        setFilteredData(filtered);
      }
    };

    filterRecords();
  }, [searchQuery, tableData]);

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const styles = {
    searchSection: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      width: '100%',
      flex: 1,
      position: 'relative',
      marginBottom: '10px',
    },
    searchBox: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center', // Center content horizontally
      width: '100%',
      maxWidth: '400px',
      zIndex: 100,
      backgroundColor: '#ffffff',
      borderRadius: '8px',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
      padding: '10px',
    },
    searchInput: {
      width: '100%', // Make input take full width of the searchBox
      padding: '10px',
      fontSize: '16px',
      borderRadius: '6px',
      border: '1px solid #ced4da',
      outline: 'none',
      transition: 'border-color 0.3s',
      textAlign: 'center', // Center text within the input
    },
    searchInputFocus: {
      borderColor: '#007bff',
    },
    tableContainer: {
      width: '100%',
      maxHeight: 'calc(100vh - 200px)',
      overflowY: 'auto',
      borderRadius: '8px',
      backgroundColor: '#ffffff',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
      marginTop: '20px',
    },
    table: {
      width: '100%',
      borderCollapse: 'collapse',
    },
    tableHeader: {
      backgroundColor: '#007bff',
      color: 'white', // Text color for table headers
      border: '1px solid #007bff',
      padding: '12px',
      fontWeight: 'bold',
      fontSize: '16px',
      textAlign: 'center',
    },
    tableCell: {
      border: '1px solid #dee2e6',
      padding: '10px',
      fontSize: '14px',
      textAlign: 'center',
    },
    tableData: {
      padding: '10px',
      borderBottom: '1px solid #dee2e6',
    },
    tableRow: {
      '&:nth-child(even)': {
        backgroundColor: '#f9f9f9',
      },
    },
  };

  return (
    <div style={styles.searchSection}>
      <div style={styles.searchBox}>
        <input
          type="text"
          placeholder="Search"
          style={styles.searchInput}
          value={searchQuery}
          onChange={handleSearch}
        />
      </div>
      <div style={styles.tableContainer}>
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.tableHeader}>S.No</th>
              <th style={styles.tableHeader}>Date & Time</th>
              <th style={styles.tableHeader}>Location</th>
              <th style={styles.tableHeader}>Username</th>
              <th style={styles.tableHeader}>Device ID</th>
              <th style={styles.tableHeader}>Phone No</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.reverse().map((record, index) => (
              <tr key={record._id} style={styles.tableRow}>
                <td style={styles.tableCell}>{index + 1}</td>
                <td style={styles.tableCell}>
                  {record.datetime ? moment(record.datetime).tz('Asia/Kolkata').format('YYYY-MM-DD HH:mm:ss') : 'N/A'}
                </td>
                <td style={styles.tableCell}>{record.location}</td>
                <td style={styles.tableCell}>{record.username}</td>
                <td style={styles.tableCell}>{record.deviceId}</td>
                <td style={styles.tableCell}>{record.phoneNo}</td>
              </tr>
            ))}
            {searchQuery && filteredData.length === 0 && (
              <tr>
                <td style={styles.tableCell} colSpan="6">No matching records found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserInfo;
