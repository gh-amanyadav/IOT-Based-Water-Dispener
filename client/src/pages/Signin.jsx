import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import OAuth from '../components/OAuth';

const SignIn = () => {
  const [formData, setFormData] = useState({});
  const [isForgotPasswordHovered, setIsForgotPasswordHovered] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await fetch('/api/auth/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
      const data = await res.json();
	console.log('signin Data: ', data);
      setLoading(false);
      if (data.success === false) {
        setError(data.message || 'Something went wrong!');
        return;
      }
      navigate('/Report');
    } catch (error) {
      setLoading(false);
      setError('Something went wrong!');
    }
  };

  const navigateToOtp = () => {
    if (formData.email) {
      // Logic for OTP navigation (assuming you have defined it elsewhere)
    } else {
      alert("Please enter your email");
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.form}>
        <div style={styles.header}>
          <h1 style={styles.headerText}>LOGIN</h1>
        </div>
        <form style={styles.formFields} onSubmit={handleSubmit}>
          <input
            onChange={handleChange}
            type="email"
            placeholder='Email'
            id='email'
            style={styles.input}
          />
          <input
            onChange={handleChange}
            type="password"
            placeholder='Password'
            id='password'
            style={styles.input}
          />
          <button
            type="submit"
            style={styles.button}
            disabled={loading}
          >
            {loading ? 'Loading...' : 'Login'}
          </button>
          <button
            type="button"
            style={{ ...styles.forgotButton, ...(isForgotPasswordHovered ? styles.forgotButtonHover : {}) }}
            onClick={navigateToOtp}
            onMouseEnter={() => setIsForgotPasswordHovered(true)}
            onMouseLeave={() => setIsForgotPasswordHovered(false)}
          >
            Forgot Password?
          </button>
          <div style={styles.footer}>
            <p>Don't have an account?</p>
            <Link to="/signup" style={styles.link}>Sign up</Link>
          </div>
        </form>
        <OAuth />
        {error && <p style={styles.error}>{error}</p>}
      </div>
    </div>
  );
};

const styles = {
  container: {
    backgroundColor: '#f5f5f5',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
    padding: '1rem'
  },
  form: {
    background: '#ffffff',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    maxWidth: '400px',
    width: '100%',
    padding: '2rem',
    margin: '1.5rem 0' // Added margin to create space between form container and other elements
  },
  header: {
    backgroundColor: '#007BFF',
    padding: '1rem',
    borderRadius: '8px 8px 0 0',
    textAlign: 'center',
    marginBottom: '1rem' // Added margin to create space between the header and the input fields
  },
  headerText: {
    color: '#ffffff',
    margin: 0,
    fontSize: '2rem'
  },
  formFields: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem'
  },
  input: {
    background: '#f5f5f5',
    border: '1px solid #ddd',
    padding: '0.75rem',
    borderRadius: '4px'
  },
  button: {
    background: '#007BFF',
    color: '#fff',
    padding: '0.75rem',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontWeight: 'bold',
    textAlign: 'center'
  },
  forgotButton: {
    background: '#007BFF',
    color: '#fff',
    padding: '0.75rem',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: '1rem',
    transition: 'background-color 0.3s ease'
  },
  forgotButtonHover: {
    background: '#0056b3'
  },
  footer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: '1.5rem'
  },
  link: {
    color: '#007BFF',
    textDecoration: 'none'
  },
  error: {
    color: '#f00',
    marginTop: '1rem',
    textAlign: 'center'
  }
};


export default SignIn;
