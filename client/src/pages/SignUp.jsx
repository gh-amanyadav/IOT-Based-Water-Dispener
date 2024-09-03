import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import OAuth from '../components/OAuth';

const SignUp = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({});
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [validationError, setValidationError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const usernamePattern = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*?&]{3,}$/;

    if (!usernamePattern.test(formData.username)) {
      setValidationError("Username must contain at least one letter, and one number.");
      return;
    }

    if (formData.password !== formData['confirm-password']) {
      setValidationError("Passwords do not match.");
      return;
    }

    try {
      setLoading(true);
      setError(false);
      setValidationError("");
      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      const data = await res.json();
      setLoading(false);
      if (data.success === false) {
        setError(true);
        return;
      }

      navigate('/signin');
    } catch (error) {
      setLoading(false);
      setError(true);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.form}>
        <div style={styles.header}>
          <h1 style={styles.headerText}>SIGN UP</h1>
        </div>
        <form style={styles.formFields} onSubmit={handleSubmit}>
          <input
            onChange={handleChange}
            type="text"
            placeholder='Username'
            id='username'
            style={styles.input}
          />
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
          <input
            onChange={handleChange}
            type="password"
            placeholder='Confirm Password'
            id='confirm-password'
            style={styles.input}
          />
          <button
            type="submit"
            style={styles.button}
            disabled={loading}
          >
            {loading ? 'Loading...' : 'Sign Up'}
          </button>
          <OAuth />
        </form>
        {validationError && <p style={styles.error}>{validationError}</p>}
        <div style={styles.footer}>
          <p>Have an account?</p>
          <Link to="/signin" style={styles.link}>Sign in</Link>
        </div>
        {error && <p style={styles.error}>{error.message || 'Something went wrong!'}</p>}
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

export default SignUp;
