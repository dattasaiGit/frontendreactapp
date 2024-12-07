import axios from 'axios';
import PropTypes from 'prop-types';
import { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import reg from '.././main/images/reg.jpeg';
import admin from '.././main/images/admin.png'
import config from './../config';

export default function Adminlogin({ onAdminLogin }) {
    const [formdata , setFormData] = useState({
        username: '',
        password: ''
    });
    const [message , setMessage] = useState('');
    const [error , setError] = useState('');

    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formdata, [name]: value });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(
                `${config.url}/admin/checkadminlogin?username=${formdata.username}&password=${formdata.password}`
            );
            if (response.data) {
                localStorage.setItem('admin', JSON.stringify(response.data));
                console.log(response.data);
                console.log("logged");
                onAdminLogin(); 
                console.log("check");
                navigate('/adminhome');
            } else {
                console.log("Not logged");
                console.log(error);
                setMessage("Login Failed");
                setError("");
            }

        } catch (error) {
          
            setMessage("");
            setError(error.message);
        }
    };

  return (
    <div className="card">
      <div className="photo-section">
        <img src={reg} alt="Login Illustration"/>
      </div>
      <div className="form-section">
        <h2 style={{ textAlign : 'center' }}>Admin Login</h2><br/>
      <img className='admin-photo' src={admin} alt="admin"/>
      {message && <p style={{ color: 'red', textAlign: 'center', marginBottom: '10px' }} className='login-error'>{message}</p>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="username">Username *</label>
          <input
            type="text"
            name="username"
            onChange={handleChange}
            placeholder="Enter your Username"
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
        <button type="submit">Login as Admin</button>
        <div className="forgot-password">
          <a href="/forgotpassword" style={{ textDecoration: 'none', color: '#007bff' }}>
            Forgot Password?
          </a>
        </div>
      </form>
      </div>
    </div>
  );
}

Adminlogin.propTypes = {
  onAdminLogin: PropTypes.func.isRequired,
};