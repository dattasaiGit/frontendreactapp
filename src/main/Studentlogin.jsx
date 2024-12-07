import axios from 'axios';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types'; // Import PropTypes
import config from '../config';

export default function Studentlogin({ onStudentLogin }) {
  const [formdata, setFormData] = useState({
    email: '',
    password: '',
  });
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formdata, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${config.url}/student/checkstudentlogin?email=${formdata.email}&password=${formdata.password}`
      );

      if (response.data) {
        if (response.data.status === 'Deleted') {
          setMessage('Your Account is Deleted');
          setError('');
          console.log(error)
          return;
        }

        localStorage.setItem('student', JSON.stringify(response.data));
        console.log('Login successful:', response.data);
        onStudentLogin();

        if (response.data.password === 'klef1234') {
          navigate('/studentchangepassword');
          return;
        }

        navigate('/studenthome');
      } else {
        setMessage('Login Failed');
        setError('');
      }
    } catch (err) {
      setMessage('');
      setError(err.message);
    }
  };

  return (
    <div>
      {message && (
        <p
          style={{ color: 'red', textAlign: 'center', marginBottom: '10px' }}
          className="login-error"
        >
          {message}
        </p>
      )}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="email">Email *</label>
          <input
            type="email"
            name="email"
            onChange={handleChange}
            placeholder="Enter your Email"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password *</label>
          <input
            type="password"
            name="password"
            onChange={handleChange}
            placeholder="Enter your password"
            required
          />
        </div>
        <button type="submit">Login as Student</button>

        <button type="button" className="admin-login-btn">
          <Link
            to="/adminlogin"
            style={{ textDecoration: 'none', color: 'white' }}
          >
            Login as Admin
          </Link>
        </button>

        <div className="forgot-password">
          <Link to="/forgotpassword" style={{ textDecoration: 'none', color: '#007bff' }}>
            Forgot Password?
          </Link>
        </div>

        <div className="register-link">
          <p>
            Do not have an account?{' '}
            <Link to="/register" style={{ textDecoration: 'none', color: '#007bff' }}>
              Register
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
}

Studentlogin.propTypes = {
  onStudentLogin: PropTypes.func.isRequired,
};
