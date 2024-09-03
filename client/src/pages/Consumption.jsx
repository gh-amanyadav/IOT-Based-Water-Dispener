import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ReactHTMLTableToExcel from 'react-html-table-to-excel';
import moment from 'moment-timezone';

const Consumption = () => {
  const [tableData, setTableData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [yearly, setYearly] = useState('');
  const [monthly, setMonthly] = useState('');
  const [weekly, setWeekly] = useState('');
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    axios.get('https://iotdevice.apdp.co.in/api/reports/')
      .then(response => {
        const aggregatedData = response.data.reduce((acc, item) => {
          const { deviceId, handWash500, handWash250, bodyWash500, bodyWash250, shampoo500, shampoo250, datetime } = item;

          const handWashTotal = (handWash500 + handWash250);
          const bodyWashTotal = (bodyWash500 + bodyWash250);
          const shampooTotal = (shampoo500 + shampoo250);

          if (!acc[deviceId]) {
            acc[deviceId] = {
              deviceId,
              datetime: moment(datetime).tz('Asia/Kolkata').format('YYYY-MM-DD'),
              handWashTotal: (handWashTotal / 1000).toFixed(3),
              bodyWashTotal: (bodyWashTotal / 1000).toFixed(3),
              shampooTotal: (shampooTotal / 1000).toFixed(3),
            };
          } else {
            acc[deviceId].handWashTotal = (parseFloat(acc[deviceId].handWashTotal) + handWashTotal / 1000).toFixed(3);
            acc[deviceId].bodyWashTotal = (parseFloat(acc[deviceId].bodyWashTotal) + bodyWashTotal / 1000).toFixed(3);
            acc[deviceId].shampooTotal = (parseFloat(acc[deviceId].shampooTotal) + shampooTotal / 1000).toFixed(3);
          }
          return acc;
        }, {});

        setTableData(Object.values(aggregatedData));
      })
      .catch(error => {
        console.error('There was an error fetching the data!', error);
      });
  }, []);

  useEffect(() => {
    // Only filter data if there's a search query
    if (searchQuery || yearly || monthly || weekly) {
      filterTableData(tableData, searchQuery, yearly, monthly, weekly);
    } else {
      setFilteredData([]);
    }
  }, [searchQuery, yearly, monthly, weekly, tableData]);

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  const handleYearlyChange = (year) => {
    setYearly(year);
  };

  const handleMonthlyChange = (month) => {
    setMonthly(month);
  };

  const handleWeeklyChange = (week) => {
    setWeekly(week);
  };

  const filterTableData = (data, query, year, month, week) => {
    let filtered = data;

    if (query) {
      filtered = filtered.filter(item => {
        const deviceId = item.deviceId ? String(item.deviceId).toLowerCase() : '';
        return deviceId === query.toLowerCase();
      });
    }

    if (year) {
      filtered = filtered.filter(item => {
        const itemYear = moment(item.datetime).format('YYYY');
        return itemYear === year.split('-')[0];
      });
    }

    if (month && month !== "Null") {
      filtered = filtered.filter(item => {
        const itemMonth = moment(item.datetime).format('MMMM');
        return itemMonth === month;
      });
    }

    if (week && week !== "Null") {
      const weekNumber = parseInt(week.split(' ')[1], 10);
      const itemMonth = moment().month(month).month();
      
      filtered = filtered.filter(item => {
        const itemDate = moment(item.datetime);
        const itemYear = itemDate.year();
        const itemMonth = itemDate.month();

        if (itemYear !== parseInt(year.split('-')[0]) || itemMonth !== itemMonth) {
          return false;
        }

        const dayOfMonth = itemDate.date();

        let calculatedWeekNumber;
        if (dayOfMonth >= 1 && dayOfMonth <= 7) {
          calculatedWeekNumber = 1;
        } else if (dayOfMonth >= 8 && dayOfMonth <= 14) {
          calculatedWeekNumber = 2;
        } else if (dayOfMonth >= 15 && dayOfMonth <= 21) {
          calculatedWeekNumber = 3;
        } else if (dayOfMonth >= 22 && dayOfMonth <= 28) {
          calculatedWeekNumber = 4;
        } else if (dayOfMonth >= 29) {
          calculatedWeekNumber = 5;
        } else {
          calculatedWeekNumber = null;
        }

        return calculatedWeekNumber === weekNumber;
      });
    }

    setFilteredData(filtered);
  };

  const handleDownloadClick = () => {
    document.getElementById('test-table-xls-button').click();
  };

  const styles = {
    container: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      marginTop: '-20px',
    },
    searchSection: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      width: '100%',
      padding: '2rem 0',
      marginBottom: '10px',
    },
    searchBox: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: '10px',
      width: '100%',
      maxWidth: '800px',
      backgroundColor: 'white',
      borderRadius: '8px',
      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
      padding: '10px',
      flexWrap: 'wrap',
    },
    searchInput: {
      flex: 3,
      padding: '10px',
      fontSize: '16px',
      borderRadius: '4px',
      border: '1px solid #ccc',
      outline: 'none',
      textAlign: 'center',
      width: '100%',
      maxWidth: '200px',
    },
    searchSelect: {
      flex: 1,
      padding: '10px',
      fontSize: '16px',
      borderRadius: '4px',
      border: '1px solid #ccc',
      outline: 'none',
      textAlign: 'center',
      backgroundColor: 'white',
      width: '100%',
      maxWidth: '150px',
    },
    searchButton: {
      padding: '10px 20px',
      backgroundColor: '#007bff',
      borderColor: '#007bff',
      color: 'white',
      fontSize: '16px',
      border: '1px solid #007bff',
      borderRadius: '4px',
      cursor: 'pointer',
      transition: 'background-color 0.3s ease-in-out',
    },
    tableContainer: {
      border: '2px solid #008000',
      padding: '20px',
      borderRadius: '8px',
      marginBottom: '20px',
      backgroundColor: '#f0f8ff',
      width: '100%',
      maxWidth: '1000px',
      overflowX: 'auto', // To handle horizontal overflow
      marginTop: '30px',
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
      border: '1px solid #000',
      padding: '2%',
      backgroundColor: '#d9e6f2',
      textAlign: 'center',
    },
    td: {
      border: '1px solid #000',
      padding: '2%',
      textAlign: 'center',
    },
    header: {
      padding: '10px',
      backgroundColor: '#f5f5f5',
      fontSize: '18px',
      fontWeight: 'bold',
      textAlign: 'center',
    },
  };

  const responsiveStyles = {
    '@media (max-width: 768px)': {
      searchBox: {
        maxWidth: '90%',
        flexDirection: 'column',
      },
      searchInput: {
        maxWidth: '100%',
      },
      searchSelect: {
        maxWidth: '100%',
      },
      searchButton: {
        marginTop: '10px',
      },
      tableContainer: {
        maxHeight: 'calc(100vh - 150px)',
      },
      th: {
        fontSize: '14px',
      },
      td: {
        fontSize: '12px',
      },
    },
    '@media (max-width: 480px)': {
      searchInput: {
        fontSize: '14px',
      },
      searchSelect: {
        fontSize: '14px',
      },
      searchButton: {
        fontSize: '14px',
      },
      th: {
        fontSize: '12px',
      },
      td: {
        fontSize: '10px',
      },
    },
  }; 

  return (
    <div style={styles.container}>
      <div style={styles.searchSection}>
        <div style={styles.searchBox}>
          <input
            type="text"
            placeholder="Search by Device ID"
            style={styles.searchInput}
            value={searchQuery}
            onChange={(e) => handleSearch(e.target.value)}
          />
          <select style={styles.searchSelect} value={yearly} onChange={(e) => handleYearlyChange(e.target.value)}>
            <option value="" disabled>Yearly</option>
            <option value="2024-2025">2024-2025</option>
            <option value="2025-2026">2025-2026</option>
          </select>
          <select style={styles.searchSelect} value={monthly} onChange={(e) => handleMonthlyChange(e.target.value)}>
            <option value="" disabled>Monthly</option>
            <option value="January">January</option>
            <option value="February">February</option>
            <option value="March">March</option>
            <option value="April">April</option>
            <option value="May">May</option>
            <option value="June">June</option>
            <option value="July">July</option>
            <option value="August">August</option>
            <option value="September">September</option>
            <option value="October">October</option>
            <option value="November">November</option>
            <option value="December">December</option>
          </select>
          <select style={styles.searchSelect} value={weekly} onChange={(e) => handleWeeklyChange(e.target.value)}>
            <option value="" disabled>Weekly</option>
            <option value="Week 1">Week 1</option>
            <option value="Week 2">Week 2</option>
            <option value="Week 3">Week 3</option>
            <option value="Week 4">Week 4</option>
            <option value="Week 5">Week 5</option>
          </select>
          {/* <button style={styles.searchButton} onClick={() => filterTableData(tableData, searchQuery, yearly, monthly, weekly)}>Search</button> */}
        </div>
        <div style={styles.tableContainer}>
          <table id="table-to-xls" style={styles.table}>
            <thead>
              <tr style={styles.header}>
                <th style={styles.th}>Device ID</th>
                <th style={styles.th}>Date</th>
                <th style={styles.th}>Total Shampoo (L)</th>
                <th style={styles.th}>Total Body Wash (L)</th>
                <th style={styles.th}>Total Hand Wash (L)</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.length > 0 ? (
                filteredData.map((record, index) => (
                  <tr key={record.deviceId} style={styles.tableRow}>
                    <td style={styles.td}>{record.deviceId}</td>
                    <td style={styles.td}>{record.datetime}</td>
                    <td style={styles.td}>{record.shampooTotal}</td>
                    <td style={styles.td}>{record.bodyWashTotal}</td>
                    <td style={styles.td}>{record.handWashTotal}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" style={styles.td}>No data available</td>
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
    </div>
  );
};

export default Consumption;
