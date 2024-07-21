import React from 'react';
import ReactHTMLTableToExcel from 'react-html-table-to-excel';

function Report() {
  // Sample table data
  const tableData = [
    { id: 1, deviceId: 102320, date: '12/22/2023', time: '11:10:32 AM', totalDisp1: 9, totalDisp2: 2, totalDisp3: 7 },
    { id: 2, deviceId: 403125, date: '12/22/2023', time: '11:10:25 AM', totalDisp1: 6, totalDisp2: 1, totalDisp3: 7 },
    { id: 3, deviceId: 101471, date: '12/22/2023', time: '11:00:53 AM', totalDisp1: 33, totalDisp2: 0, totalDisp3: 6 },
    { id: 4, deviceId: 403125, date: '12/22/2023', time: '10:54:47 AM', totalDisp1: 6, totalDisp2: 0, totalDisp3: 6 },
    { id: 5, deviceId: 102362, date: '12/22/2023', time: '10:41:22 AM', totalDisp1: 5, totalDisp2: 0, totalDisp3: 6 },
    { id: 6, deviceId: 403125, date: '12/22/2023', time: '10:54:22 AM', totalDisp1: 6, totalDisp2: 0, totalDisp3: 6 },
    { id: 7, deviceId: 403125, date: '12/22/2023', time: '11:53:24 AM', totalDisp1: 6, totalDisp2: 0, totalDisp3: 7 },
    { id: 8, deviceId: 403126, date: '12/22/2023', time: '11:53:28 AM', totalDisp1: 6, totalDisp2: 0, totalDisp3: 7 },
    { id: 9, deviceId: 102395, date: '12/22/2023', time: '11:43:52 AM', totalDisp1: 6, totalDisp2: 1, totalDisp3: 9 },
    { id: 10, deviceId: 102320, date: '12/22/2023', time: '11:43:50 AM', totalDisp1: 6, totalDisp2: 0, totalDisp3: 7 },
    { id: 11, deviceId: 101471, date: '12/22/2023', time: '11:43:54 AM', totalDisp1: 33, totalDisp2: 0, totalDisp3: 4 },
    { id: 12, deviceId: 102247, date: '12/21/2023', time: '4:42:01 PM', totalDisp1: 5, totalDisp2: 0, totalDisp3: 5 },
    { id: 13, deviceId: 102247, date: '12/21/2023', time: '4:42:05 AM', totalDisp1: 5, totalDisp2: 0, totalDisp3: 2 },
    { id: 14, deviceId: 102368, date: '12/22/2023', time: '4:41:51 PM', totalDisp1: 3, totalDisp2: 0, totalDisp3: 5 },
    { id: 15, deviceId: 102247, date: '12/21/2023', time: '4:35:01 PM', totalDisp1: 5, totalDisp2: 0, totalDisp3: 2 },
    { id: 16, deviceId: 102368, date: '12/21/2023', time: '4:34:59 PM', totalDisp1: 3, totalDisp2: 0, totalDisp3: 2 },
    { id: 17, deviceId: 102247, date: '12/21/2023', time: '4:29:31 PM', totalDisp1: 3, totalDisp2: 0, totalDisp3: 6 },
    { id: 18, deviceId: 102368, date: '12/21/2023', time: '4:26:49 PM', totalDisp1: 3, totalDisp2: 0, totalDisp3: 6 },
    { id: 19, deviceId: 102368, date: '12/21/2023', time: '4:54:47 PM', totalDisp1: 3, totalDisp2: 0, totalDisp3: 0 },
    { id: 20, deviceId: 202247, date: '12/21/2023', time: '11:52:25 PM', totalDisp1: 4, totalDisp2: 0, totalDisp3: 2 },
    // Add more rows as needed
  ];

  const styles = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        marginTop: '20px',
    },
    header: {
        backgroundColor: '#007bff', // Blue background
        padding: '20px',
        width: '100%',
        marginBottom: '30px',
        textAlign: 'center',
    },
    sidebar: {
        backgroundColor: '#f8f9fa', // Light gray background
        padding: '20px',
        width: '200px',
        borderRight: '1px solid #ccc', // Gray border
    },
    tableContainer: {
        border: '2px solid #008000', // Green border
        padding: '20px',
        borderRadius: '8px',
        marginBottom: '20px',
        backgroundColor: '#f0f8ff', // Light blue background
        flex: 1,
        minWidth: '400px', // Minimum width for responsiveness
    },
    downloadContainer: {
        border: '2px solid #008000', // Gray border
        padding: '20px',
        borderRadius: '8px',
        backgroundColor: '#ffffff', // White background
        marginTop: '20px',
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
    },
    downloadButton: {
        backgroundColor: '#008000', // Green color
        color: 'black',
        border: '2px solid #008000', // Green border
        padding: '10px 20px',
        borderRadius: '4px',
        cursor: 'pointer',
        fontSize: '1rem',
        fontWeight: 'bold',
    },
};

return (
    <div style={styles.container}>
        <div style={styles.header}>
            <h1 style={{ color: 'white', fontSize: '24px' }}><b>REPORT</b></h1>
        </div>
      <table id="table-to-xls" style={{ border: '1px solid #000', borderCollapse: 'collapse', margin: '0 auto' }}>
        <thead>
          <tr>
            <th style={{ border: '1px solid #000', padding: '8px' }}>Id</th>
            <th style={{ border: '1px solid #000', padding: '8px' }}>Device Id</th>
            <th style={{ border: '1px solid #000', padding: '8px' }}>Date</th>
            <th style={{ border: '1px solid #000', padding: '8px' }}>Time</th>
            <th style={{ border: '1px solid #000', padding: '8px' }}>Total_Disp_1</th>
            <th style={{ border: '1px solid #000', padding: '8px' }}>Total_Disp_2</th>
            <th style={{ border: '1px solid #000', padding: '8px' }}>Total_Disp_3</th>
          </tr>
        </thead>
        <tbody>
          {tableData.map((row, index) => (
            <tr key={index}>
              <td style={{ border: '1px solid #000', padding: '8px' }}>{row.id}</td>
              <td style={{ border: '1px solid #000', padding: '8px' }}>{row.deviceId}</td>
              <td style={{ border: '1px solid #000', padding: '8px' }}>{row.date}</td>
              <td style={{ border: '1px solid #000', padding: '8px' }}>{row.time}</td>
              <td style={{ border: '1px solid #000', padding: '8px' }}>{row.totalDisp1}</td>
              <td style={{ border: '1px solid #000', padding: '8px' }}>{row.totalDisp2}</td>
              <td style={{ border: '1px solid #000', padding: '8px' }}>{row.totalDisp3}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div style={{ marginTop: '20px' }}>
      <div style={styles.downloadContainer}>
        <ReactHTMLTableToExcel
          id="test-table-xls-button"
          className="download-table-xls-button"
          table="table-to-xls"
          filename="report"
          sheet="report"
          buttonText="Download"
          style={styles.downloadButton}
        />
      </div>
    </div>
    </div>
  );
}

export default Report;
