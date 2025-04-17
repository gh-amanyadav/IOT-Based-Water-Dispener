import React, { useState, useEffect } from 'react';
import moment from 'moment-timezone';
import api from '../utils/axios';
import styled from 'styled-components';

// Function to get token from cookies
const getTokenFromCookies = () => {
  const cookies = document.cookie.split(';');
  for (let i = 0; i < cookies.length; i++) {
    const cookie = cookies[i].trim();
    if (cookie.startsWith('token=')) {
      return cookie.substring(6);
    }
  }
  return null;
};

const TableContainer = styled.div`
  width: 100%;
  height: calc(100vh - 250px);
  overflow-x: auto;
  overflow-y: auto;
  border-radius: 8px;
  background-color: #ffffff;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  -webkit-overflow-scrolling: touch;

  @media (max-width: 768px) {
    height: calc(100vh - 300px);
  }
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  min-width: 600px; // Ensure table doesn't get too narrow on mobile

  @media (max-width: 768px) {
    min-width: 800px; // Allow horizontal scrolling on mobile
  }
`;

const TableHeader = styled.th`
  background-color: #007bff;
  color: white;
  border: 1px solid #007bff;
  padding: 12px;
  font-weight: bold;
  font-size: 16px;
  text-align: center;
  position: sticky;
  top: 0;
  z-index: 1;

  @media (max-width: 768px) {
    padding: 8px;
    font-size: 14px;
  }
`;

const TableCell = styled.td`
  border: 1px solid #dee2e6;
  padding: 10px;
  font-size: 14px;
  text-align: center;

  @media (max-width: 768px) {
    padding: 8px;
    font-size: 12px;
  }
`;

const TableRow = styled.tr`
  &:nth-child(even) {
    background-color: #f9f9f9;
  }

  @media (max-width: 768px) {
    &:hover {
      background-color: #f0f0f0;
    }
  }
`;

const Button = styled.button`
  padding: 10px 15px;
  border: none;
  border-radius: 4px;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.3s;
  margin: 5px;
  
  @media (max-width: 768px) {
    padding: 8px 12px;
    font-size: 12px;
  }
`;

const CreateUserButton = styled(Button)`
  background-color: #28a745;
  color: white;
  
  &:hover {
    background-color: #218838;
  }
`;

const CancelButton = styled(Button)`
  background-color: #dc3545;
  color: white;
  
  &:hover {
    background-color: #c82333;
  }
`;

const SaveButton = styled(Button)`
  background-color: #28a745;
  color: white;
  
  &:hover {
    background-color: #218838;
  }
`;

const BackButton = styled(Button)`
  background-color: #6c757d;
  color: white;
  
  &:hover {
    background-color: #5a6268;
  }
`;

const FormContainer = styled.div`
  width: 100%;
  height: calc(100vh - 250px);
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  padding: 20px;
  overflow-y: auto;

  @media (max-width: 768px) {
    height: calc(100vh - 300px);
    padding: 15px;
  }
`;

const FormSection = styled.div`
  margin-bottom: 20px;
  padding-bottom: 15px;
  border-bottom: 1px solid #e5e5e5;
`;

const FormTitle = styled.h3`
  margin-bottom: 15px;
  color: #007bff;
  font-size: 18px;
`;

const FormRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
  margin-bottom: 10px;
  
  @media (max-width: 768px) {
    flex-direction: column;
    gap: 10px;
  }
`;

const FormGroup = styled.div`
  flex: 1;
  min-width: 200px;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
`;

const Input = styled.input`
  width: 100%;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
  
  &:focus {
    border-color: #007bff;
    outline: none;
    box-shadow: 0 0 0 2px rgba(0,123,255,0.25);
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  margin-top: 20px;
`;

const TopBar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin-bottom: 10px;
`;

const SearchBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 1;
  max-width: 400px;
  z-index: 100;
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  padding: 10px;

  @media (max-width: 768px) {
    padding: 8px;
    max-width: 250px;
  }
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 10px;
  font-size: 16px;
  border-radius: 6px;
  border: 1px solid #ced4da;
  outline: none;
  transition: border-color 0.3s;
  text-align: center;

  @media (max-width: 768px) {
    padding: 8px;
    font-size: 14px;
  }
`;

const ErrorMessage = styled.div`
  color: #dc3545;
  background-color: #f8d7da;
  border: 1px solid #f5c6cb;
  border-radius: 4px;
  padding: 10px;
  margin: 10px 0;
`;

const SuccessMessage = styled.div`
  color: #28a745;
  background-color: #d4edda;
  border: 1px solid #c3e6cb;
  border-radius: 4px;
  padding: 10px;
  margin: 10px 0;
`;

const UserInfo = () => {
  const [tableData, setTableData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isCreatingUser, setIsCreatingUser] = useState(false);
  const [statusMessage, setStatusMessage] = useState({ type: '', message: '' });
  const [newUser, setNewUser] = useState({
    username: '',
    location: '',
    deviceId: '',
    phoneNo: '',
    datetime: new Date()
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        console.log('Fetching data from /records endpoint');
        const response = await api.get('/records');
        console.log('API Response:', response);
        
        if (response.data) {
          setTableData(response.data);
          setFilteredData(response.data);
        } else {
          console.error('No data received from API');
          setError('No data available');
        }
      } catch (error) {
        console.error('Error fetching data:', error);
        if (error.response) {
          console.error('Error response:', error.response);
          if (error.response.status === 401) {
            setError('Session expired. Please sign in again.');
            localStorage.removeItem('token');
            window.location.href = '/signin';
          } else {
            setError(error.response.data?.message || 'Error fetching data');
          }
        } else {
          setError('Network error. Please try again.');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (searchQuery.trim() === '') {
      setFilteredData(tableData);
    } else {
      const filtered = tableData.filter(record => 
        record.location?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        record.username?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        record.deviceId?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        record.phoneNo?.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredData(filtered);
    }
  }, [searchQuery, tableData]);

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleCreateUserClick = () => {
    setIsCreatingUser(true);
    setStatusMessage({ type: '', message: '' });
  };

  const handleCancelCreate = () => {
    setIsCreatingUser(false);
    setNewUser({
      username: '',
      location: '',
      deviceId: '',
      phoneNo: '',
      datetime: new Date()
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewUser(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleCreateUser = async () => {
    try {
      setLoading(true);
      setStatusMessage({ type: '', message: '' });
      
      // Check if any required field is empty
      if (!newUser.username || !newUser.location || !newUser.deviceId || !newUser.phoneNo) {
        setStatusMessage({ type: 'error', message: 'All fields are required' });
        setLoading(false);
        return;
      }
      
      // Construct query params directly - avoid any automatic JSON stringification
      // The API expects: data=location,username,deviceId,phoneNo
      const location = encodeURIComponent(newUser.location);
      const username = encodeURIComponent(newUser.username);
      const deviceId = encodeURIComponent(newUser.deviceId);
      const phoneNo = encodeURIComponent(newUser.phoneNo);
      
      // Build the URL manually to avoid any automatic processing
      const url = `/records/record?data=${location},${username},${deviceId},${phoneNo}`;
      
      console.log("Sending request to:", url); // Log for debugging
      
      // Using the direct URL approach to avoid any data format transformation
      const response = await api.get(url);
      
      if (response.data) {
        // Fetch updated records after creating a new one
        const updatedRecords = await api.get('/records');
        setTableData(updatedRecords.data);
        
        setStatusMessage({ type: 'success', message: 'User record created successfully' });
        
        // Reset form and return to list after a short delay
        setTimeout(() => {
          setNewUser({
            username: '',
            location: '',
            deviceId: '',
            phoneNo: '',
            datetime: new Date()
          });
          setIsCreatingUser(false);
        }, 2000);
      }
    } catch (error) {
      console.error('Error creating user record:', error);
      let errorMessage = 'Failed to create user record. Please try again.';
      
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        errorMessage = error.response.data?.message || `Error: ${error.response.status}`;
        console.error('Error response:', error.response.data);
      } else if (error.request) {
        // The request was made but no response was received
        errorMessage = 'No response from server. Please check your network connection.';
      }
      
      setStatusMessage({ type: 'error', message: errorMessage });
    } finally {
      setLoading(false);
    }
  };

  const renderUserTable = () => (
    <>
      <TopBar>
        <SearchBox>
          <SearchInput
            type="text"
            placeholder="Search"
            value={searchQuery}
            onChange={handleSearch}
          />
        </SearchBox>
        <CreateUserButton onClick={handleCreateUserClick}>
          Create User
        </CreateUserButton>
      </TopBar>
      
      {loading && <div style={{ textAlign: 'center', padding: '20px' }}>Loading data...</div>}
      
      {error && (
        <div style={{ color: 'red', textAlign: 'center', padding: '20px' }}>
          Error: {error}
        </div>
      )}
      
      <TableContainer>
        <Table>
          <thead>
            <tr>
              <TableHeader>S.No</TableHeader>
              <TableHeader>Date & Time</TableHeader>
              <TableHeader>Location</TableHeader>
              <TableHeader>Username</TableHeader>
              <TableHeader>Device ID</TableHeader>
              <TableHeader>Phone No</TableHeader>
            </tr>
          </thead>
          <tbody>
            {filteredData.length > 0 ? (
              filteredData.map((record, index) => (
                <TableRow key={record._id || index}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>
                    {record.datetime ? moment(record.datetime).tz('Asia/Kolkata').format('YYYY-MM-DD HH:mm:ss') : 'N/A'}
                  </TableCell>
                  <TableCell>{record.location || 'N/A'}</TableCell>
                  <TableCell>{record.username || 'N/A'}</TableCell>
                  <TableCell>{record.deviceId || 'N/A'}</TableCell>
                  <TableCell>{record.phoneNo || 'N/A'}</TableCell>
                </TableRow>
              ))
            ) : (
              <tr>
                <TableCell colSpan="6" style={{ textAlign: 'center' }}>No data found</TableCell>
              </tr>
            )}
          </tbody>
        </Table>
      </TableContainer>
    </>
  );

  const renderCreateUserForm = () => (
    <FormContainer>
      <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Create New User Record</h2>
      
      {statusMessage.type && (
        statusMessage.type === 'error' 
          ? <ErrorMessage>{statusMessage.message}</ErrorMessage>
          : <SuccessMessage>{statusMessage.message}</SuccessMessage>
      )}
      
      <FormSection>
        <FormTitle>User Information</FormTitle>
        <FormRow>
          <FormGroup>
            <Label>Username *</Label>
            <Input 
              type="text" 
              name="username" 
              value={newUser.username}
              onChange={handleInputChange}
              placeholder="Enter username"
              required
            />
          </FormGroup>
          <FormGroup>
            <Label>Phone Number *</Label>
            <Input 
              type="text" 
              name="phoneNo" 
              value={newUser.phoneNo}
              onChange={handleInputChange}
              placeholder="Enter phone number"
              required
            />
          </FormGroup>
        </FormRow>
      </FormSection>
      
      <FormSection>
        <FormTitle>Device Information</FormTitle>
        <FormRow>
          <FormGroup>
            <Label>Device ID *</Label>
            <Input 
              type="text" 
              name="deviceId" 
              value={newUser.deviceId}
              onChange={handleInputChange}
              placeholder="Enter device ID"
              required
            />
          </FormGroup>
          <FormGroup>
            <Label>Location *</Label>
            <Input 
              type="text" 
              name="location" 
              value={newUser.location}
              onChange={handleInputChange}
              placeholder="Enter location"
              required
            />
          </FormGroup>
        </FormRow>
      </FormSection>
      
      <p style={{ fontSize: '12px', color: '#666', marginTop: '5px' }}>* All fields are required</p>
      
      <ButtonGroup>
        <CancelButton onClick={handleCancelCreate}>
          Cancel
        </CancelButton>
        <SaveButton onClick={handleCreateUser} disabled={loading}>
          {loading ? 'Creating...' : 'Create User Record'}
        </SaveButton>
      </ButtonGroup>
    </FormContainer>
  );

  return (
    <div style={{ width: '100%', height: '100%' }}>
      {isCreatingUser ? renderCreateUserForm() : renderUserTable()}
    </div>
  );
};

export default UserInfo;
