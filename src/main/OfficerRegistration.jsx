import axios from 'axios';
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import './register.css'
import './login.css'
import config from './../config';

export default function OfficerRegistration() {
    const [formdata, setFormData] = useState({
        id:'',
        name: '',
        gender: '',
        dateofbirth: '',
        department: '',
        email: '',
        password: '',
        contact: '',
        status: 'registered'
     });
     const [cpassword , setCpassword] = useState('');
     const [message, setMessage] = useState('');
     const [error, setError] = useState('');
 
     const navigate = useNavigate();
 
     const handleCpassword = (e) => {
         setCpassword(e.target.value);
     }
 
     const handleChange = (e) => {
         const { name, value } = e.target;
         setFormData({ ...formdata, [name]: value });
     };
 
     const handleSubmit = async (e) => {
         e.preventDefault();
         try {
             if (formdata.password != cpassword) {
                 setMessage('');
                 setError("Password doesn't match");
                 return;
             }
             const response = await axios.post(`${config.url}/officer/insertofficer`, formdata);
             
             if (response.status === 200) {
                 setFormData({
                    id:'',
                    name: '',
                    gender: '',
                    dateofbirth: '',
                    department: '',
                    email: '',
                    password: '',
                    contact: '',
                    status: 'registered'
                 });
             }
             setMessage(response.data);
             setError('');
             console.log(message);
             setTimeout(() => {
                 navigate("/login");
             }, 1000);
         } catch (error) {
             setMessage('');
             setError(error.message);
         }
     };
 
     return (
         <div>
             {error && <p style={{ color: 'red', textAlign: 'center', marginBottom: '10px' }}>{error}</p>}
             <form onSubmit={handleSubmit}>
             <div className="form-group">
                     <label htmlFor="id">Faculty ID *</label>
                     <input
                         type="text"
                         name="id"
                         onChange={handleChange}
                         placeholder="Enter your Faculty ID"
                         required
                     />
                 </div>
                 <div className="form-group">
                     <label htmlFor="Name">Name *</label>
                     <input
                         type="text"
                         name="name"
                         onChange={handleChange}
                         placeholder="Enter your Name"
                         required
                     />
                 </div>
                 <div className="form-group">
                     <label htmlFor="dateofbirth">Date of Birth *</label>
                     <input
                         type="date"
                         name="dateofbirth"
                         onChange={handleChange}
                         placeholder="Enter your Date of Birth"
                         required
                     />
                 </div>
                 <div className="registration-form-item">
                     <label className="gender-label">Gender *</label>
                     <div className="gender-options">
                         <input
                             type="radio"
                             name="gender"
                             value="male"
                             onChange={handleChange}
                             required
                         /> Male
                    
                   
                         <input
                             type="radio"
                             name="gender"
                             value="female"
                             onChange={handleChange}
                         /> Female
                     
                 
                         <input
                             type="radio"
                             name="gender"
                             value="other"
                             onChange={handleChange}
                         /> Other
                     </div>
                 </div>
            
                 <div className="form-group">
                     <label htmlFor="department">Department *</label>
                     <select name="department"  onChange={handleChange} required>
                          <option value="">Select Department</option>
                          <option value="CSE">CSE</option>
                          <option value="ECE">ECE</option>
                          <option value="CS&IT">CS&IT</option>
                        </select>
                 </div>
                 <div className="form-group">
                     <label htmlFor="contact">Contact *</label>
                     <input
                         type="text"
                         name="contact"
                         onChange={handleChange}
                         pattern="^[6-9]\d{9}$"
                         placeholder="Enter your Contact"
                         required
                     />
                    {formdata.contact && !/^[6-9]\d{9}$/.test(formdata.contact) && (
                    <p className="error-message">Contact number must start with 6, 7, 8, or 9 and be exactly 10 digits.</p>
                    )}
                 </div>
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
                         pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$"
                         placeholder="Enter your password"
                         required
                     />
                      {formdata.password && !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(formdata.password) && (
                        <p className="error-message">
                            Password must be at least 8 characters long, include an uppercase letter, a lowercase letter, a number, and a special character.
                        </p>
                    )}
                 </div>
                 <div className="form-group">
                     <label htmlFor="confirmpassword">Confirm Password *</label>
                     <input
                         type="password"
                         name="confirmpassword"
                         onChange={handleCpassword} 
                         placeholder="Enter your password"
                         required
                     />
                     {cpassword && cpassword !== formdata.password && (
                        <p className="error-message">Passwords do not match. Please try again.</p>
                    )}
                 </div>
                 <button type="submit">Register</button>
 
                 <div className="register-link">
                    <center>
                     <p>
                         Already have an account?{' '}
                         <Link to="/login" style={{ textDecoration: 'none', color: '#007bff' }}>
                             Login
                         </Link>
                     </p>
                     </center>
                 </div>
             </form>
         </div>
     );
 }
 