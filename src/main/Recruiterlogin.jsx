import axios from 'axios';
import { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import config from './../config';
import { PropTypes } from 'prop-types';

export default function Recruiterlogin({ onRecruiterLogin }) {
    const [formdata , setFormData] = useState({
        email: '',
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
                `${config.url}/recruiter/checkrecruiterlogin?email=${formdata.email}&password=${formdata.password}`
            );
            if (response.data) {
               const r = response.data;
              if(r.status=="registered")
              {
                setMessage("Your account is not activated yet");
              }
              else if(r.status=="Deleted")
              {
                setMessage("Your account has been deleted");
              }
              else
              {
                localStorage.setItem('recruiter', JSON.stringify(response.data));
                onRecruiterLogin(); // Call the parent function
                console.log("check");
                navigate('/recruiterhome');
              }
            } else {
                console.log("Not logged");
                console.log(error)
                setMessage("Login Failed");
                setError("");
            }

        } catch (error) {
            setMessage("");
            setError(error.message);
        }
    };

  return (
    <div>
      {message && <p style={{ color: 'red', textAlign: 'center', marginBottom: '10px' }} className='login-error'>{message}</p>}
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
        <button type="submit">Login as Recruiter</button>

        <button type="button" className="admin-login-btn">
          <a href="/adminlogin" style={{ textDecoration: 'none', color: 'white' }}>Login as Admin</a>
        </button>

        <div className="forgot-password">
          <a href="/forgotpassword" style={{ textDecoration: 'none', color: '#007bff' }}>
            Forgot Password?
          </a>
        </div>

        <div className="register-link">
          <p>
            Do not have an account?{' '}
            <a className="login-a" href="/register" style={{ textDecoration: 'none', color: '#007bff' }}>
              Register
            </a>
          </p>
        </div>
      </form>
    </div>
  );
}

Recruiterlogin.propTypes = {
  onRecruiterLogin: PropTypes.func.isRequired,
};
