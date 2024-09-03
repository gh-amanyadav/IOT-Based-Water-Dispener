import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  updateUserStart,
  updateUserFailure,
  updateUserSuccess,
  deleteUserFailure,
  deleteUserStart,
  deleteUserSuccess,
} from '../redux/user/userSlice';

const Profile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { currentUser, loading, error } = useSelector((state) => state.user);
  
  const [formData, setFormData] = useState({
    username: currentUser?.username || '',
    email: currentUser?.email || '',
    password: '',
  });
  const [updateSuccess, setUpdateSuccess] = useState(false);

  useEffect(() => {
    setFormData({
      username: currentUser?.username || '',
      email: currentUser?.email || '',
      password: '',
    });
  }, [currentUser]);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(updateUserStart());

    try {
      const res = await fetch(`/api/user/update/${currentUser._id}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success) {
        dispatch(updateUserSuccess(data));
        setUpdateSuccess(true);
      } else {
        dispatch(updateUserFailure(data));
      }
    } catch (error) {
      dispatch(updateUserFailure(error));
    }
  };

  const handleDeleteAccount = async () => {
    dispatch(deleteUserStart());

    try {
      const res = await fetch(`/api/user/delete/${currentUser._id}`, { method: 'DELETE' });
      const data = await res.json();
      if (data.success) {
        dispatch(deleteUserSuccess(data));
        navigate('/');
      } else {
        dispatch(deleteUserFailure(data));
      }
    } catch (error) {
      dispatch(deleteUserFailure(error));
    }
  };

  const styles = {
    container: {
      backgroundColor: '#F4F4F4', // Changed background color to a lighter shade
      padding: '2rem',
      minHeight: '100vh',
    },
    card: {
      padding: '1rem',
      maxWidth: '30rem',
      margin: '0 auto',
      backgroundColor: '#ffffff', // Card background color
      borderRadius: '1.5rem',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', // Added shadow for better visual
    },
    title: {
      fontSize: '2rem',
      fontWeight: '600',
      textAlign: 'center',
      margin: '1.5rem 0',
    },
    form: {
      display: 'flex',
      flexDirection: 'column',
      gap: '1rem',
    },
    input: {
      backgroundColor: '#F3F4F6',
      borderRadius: '0.5rem',
      padding: '0.75rem',
      fontSize: '1rem',
      border: '1px solid #D1D5DB',
    },
    submitButton: {
      backgroundColor: '#1F2937',
      color: '#fff',
      padding: '0.75rem',
      borderRadius: '0.5rem',
      fontSize: '1rem',
      textTransform: 'uppercase',
      cursor: 'pointer',
      border: 'none',
      transition: 'opacity 0.3s',
    },
    deleteButton: {
      backgroundColor: '#EF4444',
      color: '#fff',
      padding: '0.5rem 1rem',
      borderRadius: '0.5rem',
      cursor: 'pointer',
      border: 'none',
    },
    buttonContainer: {
      display: 'flex',
      justifyContent: 'space-between',
      marginTop: '1rem',
    },
    errorText: {
      color: '#DC2626',
      textAlign: 'center',
      marginTop: '0.5rem',
    },
    successText: {
      color: '#10B981',
      textAlign: 'center',
      marginTop: '0.5rem',
    },
    loadingText: {
      color: '#9CA3AF',
      textAlign: 'center',
      marginTop: '0.5rem',
    },
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h1 style={styles.title}>Profile</h1>
        <form style={styles.form} onSubmit={handleSubmit}>
          <input
            type="text"
            id="username"
            placeholder="Username"
            value={formData.username}
            style={styles.input}
            onChange={handleChange}
          />
          <input
            type="email"
            id="email"
            placeholder="Email"
            value={formData.email}
            style={styles.input}
            onChange={handleChange}
          />
          <input
            type="password"
            id="password"
            placeholder="Password"
            style={styles.input}
            onChange={handleChange}
          />
          <button type="submit" style={styles.submitButton} disabled={loading}>
            {loading ? 'Updating...' : 'Update'}
          </button>
        </form>
        <div style={styles.buttonContainer}>
          <button onClick={handleDeleteAccount} style={styles.deleteButton}>
            Delete Account
          </button>
        </div>
        {error && <p style={styles.errorText}>Something went wrong!</p>}
        {updateSuccess && <p style={styles.successText}>User updated successfully!</p>}
        {loading && <p style={styles.loadingText}>Please wait...</p>}
      </div>
    </div>
  );
};

export default Profile;
