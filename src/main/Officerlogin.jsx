import axios from 'axios';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types'; 
import config from './../config';

export default function PlacementOfficerLogin({ onOfficerLogin }) {
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
        `${config.url}/officer/checkofficerlogin?email=${formdata.email}&password=${formdata.password}`
      );
      if (response.data) {
         const p = response.data;
          if(p.status=="registered")
          {
            setMessage("Your account is not activated yet");
          }
          else if(p.status=="Deleted")
          {
            setMessage("Your account has been deleted");
          }
          else
          {
            localStorage.setItem('placementofficer', JSON.stringify(response.data));
            console.log("logged");
            onOfficerLogin();
            navigate('/placementofficerhome');
          }
      } else {
        setMessage('Login Failed');
        console.log(error.message);
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
        <p style={{ color: 'red', textAlign: 'center', marginBottom: '10px' }} className='login-error'> 
          {message}
        </p>
      )}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="email">Email *</label>
          <input
            type="email"
            id="email"
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
            id="password"
            name="password"
            onChange={handleChange}
            placeholder="Enter your password"
            required
          />
        </div>
        <button type="submit">Login as Placement Officer</button>
        <button type="button" className="admin-login-btn">
          <Link
            to="/adminlogin"
            style={{ textDecoration: 'none', color: 'white' }}
          >
            Login as Admin
          </Link>
        </button>
        <div className="forgot-password">
          <a
            href="/forgotpassword"
            style={{ textDecoration: 'none', color: '#007bff' }}
          >
            Forgot Password?
          </a>
        </div>
        <div className="register-link">
          <p>
            Do not have an account?{' '}
            <a
              href="/register"
              style={{ textDecoration: 'none', color: '#007bff' }}
            >
              Register
            </a>
          </p>
        </div>
      </form>
    </div>
  );
}

PlacementOfficerLogin.propTypes = {
  onOfficerLogin: PropTypes.func.isRequired,
};
