import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ReactHTMLTableToExcel from 'react-html-table-to-excel';

const Report = () => {
  const [tableData, setTableData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    // Fetch data from the API when the component mounts
    axios.get('https://iotdevice.apdp.co.in/api/reports')
      .then(response => {
        const filtered = filterLastYearData(response.data);
        setTableData(filtered);
        setFilteredData(filtered);
      })
      .catch(error => {
        console.error('There was an error fetching the data!', error);
      });
  }, []);

  const filterLastYearData = (data) => {
    const oneYearAgo = new Date();
    oneYearAgo.setDate(oneYearAgo.getDate() - 365); // Filter data from the last 365 days

    return data
      .filter(item => new Date(item.datetime) >= oneYearAgo) // Filter last year's data
      .sort((a, b) => new Date(b.datetime) - new Date(a.datetime)); // Sort in reverse chronological order
  };

  const handleSearch = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    filterTableData(query);
  };

  const filterTableData = (query) => {
    if (!query.trim()) {
      // If the query is empty, reset to show all data
      setFilteredData(tableData);
      return;
    }

    const filtered = tableData.filter(item => {
      const deviceId = item.deviceId ? String(item.deviceId).toLowerCase() : '';
      return deviceId === query.toLowerCase(); // Only show rows with exact match
    });

    setFilteredData(filtered);
  };

  const handleDownloadClick = () => {
    document.getElementById('test-table-xls-button').click();
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
    searchBoxContainer: {
      display: 'flex',
      alignItems: 'center',
      marginBottom: '20px',
    },
    searchBox: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: '20px',
      width: '100%',
      maxWidth: '800px',
      zIndex: 100,
      backgroundColor: '#ffffff',
      borderRadius: '8px',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
      padding: '10px',
    },
    searchInput: {
      flex: 3,
      padding: '10px',
      fontSize: '16px',
      borderRadius: '6px',
      border: '1px solid #ced4da',
      outline: 'none',
      transition: 'border-color 0.3s',
    },
    searchInputFocus: {
      borderColor: '#007bff',
    },
    searchSelect: {
      flex: 1,
      padding: '10px',
      fontSize: '16px',
      borderRadius: '6px',
      border: '1px solid #ced4da',
      backgroundColor: '#ffffff',
      transition: 'border-color 0.3s',
    },
    tableContainer: {
      border: '2px solid #008000',
      padding: '20px',
      borderRadius: '8px',
      marginBottom: '20px',
      backgroundColor: '#f0f8ff',
      flex: 1,
      minWidth: '400px',
    },
    downloadContainer: {
      border: '5px solid white',
      padding: '20px',
      borderRadius: '8px',
      backgroundColor: '#ffffff',
      marginTop: '20px',
      width: '20%',
      display: 'flex',
      justifyContent: 'center',
    },
    downloadButton: {
      backgroundColor: isHovered ? '#005700' : 'white',
      color: 'black',
      border: '2px solid #008000',
      padding: '10px 20px',
      borderRadius: '4px',
      cursor: 'pointer',
      fontSize: '1rem',
      fontWeight: 'bold',
      transition: 'background-color 0.3s ease',
    },
    table: {
      border: '1px solid #000',
      borderCollapse: 'collapse',
      margin: '0 auto',
      width: '100%',
    },
    th: {
      backgroundColor: '#d9e6f2',
      border: '1px solid #000',
      padding: '8px',
      textAlign: 'center',
    },
    td: {
      border: '1px solid #000',
      padding: '8px',
      textAlign: 'center',
    },
  };

  return (
    <div style={styles.searchSection}>
      <div style={styles.searchBoxContainer}>
        <div style={styles.searchBox}>
          <input
            type="text"
            value={searchQuery}
            onChange={handleSearch}
            placeholder="Search by Device ID"
            style={styles.searchInput}
          />
        </div>
      </div>
      <div style={styles.tableContainer}>
        <table id="table-to-xls" style={styles.table}>
          <thead>
            <tr>
              <th style={styles.th}>S.No</th>
              <th style={styles.th}>Device ID</th>
              <th style={styles.th}>DateTime</th>
              <th style={styles.th}>HandWash (500ml)</th>
              <th style={styles.th}>BodyWash (500ml)</th>
              <th style={styles.th}>Shampoo (500ml)</th>
              <th style={styles.th}>HandWash (250ml)</th>
              <th style={styles.th}>BodyWash (250ml)</th>
              <th style={styles.th}>Shampoo (250ml)</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.length > 0 ? (
              filteredData.map((row, index) => (
                <tr key={index}>
                  <td style={styles.td}>{index + 1}</td>
                  <td style={styles.td}>{row.deviceId}</td>
                  <td style={styles.td}>{new Date(row.datetime).toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}</td>
                  <td style={styles.td}>{row.handWash500 < 0 ? 0 : row.handWash500}</td>
                  <td style={styles.td}>{row.bodyWash500 < 0 ? 0 : row.bodyWash500}</td>
                  <td style={styles.td}>{row.shampoo500 < 0 ? 0 : row.shampoo500}</td>
                  <td style={styles.td}>{row.handWash250 < 0 ? 0 : row.handWash250}</td>
                  <td style={styles.td}>{row.bodyWash250 < 0 ? 0 : row.bodyWash250}</td>
                  <td style={styles.td}>{row.shampoo250 < 0 ? 0 : row.shampoo250}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="9" style={styles.td}>No data available</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <div style={styles.downloadContainer}>
        <button
          style={styles.downloadButton}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onClick={handleDownloadClick}
        >
          Download
          <ReactHTMLTableToExcel
            id="test-table-xls-button"
            className="download-table-xls-button"
            table="table-to-xls"
            filename="consumption_report"
            sheet="consumption_report"
            buttonText=""
            style={{ display: 'none' }} // Hide the actual button
          />
        </button>
      </div>
    </div>
  );
};

export default Report;
