import  { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import config from './../config';




export default function UpdatePassword() {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();



    useEffect(() => {
        const storedStudentData = localStorage.getItem('student');
        if (storedStudentData) {
            const parsedStudentData = JSON.parse(storedStudentData);
            setPassword(parsedStudentData.password); 
        }
    }, []);



    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === 'password') {
            setPassword(value);
        } else if (name === 'confirmPassword') {
            setConfirmPassword(value);
        }
    };



    const handleSubmit = async (e) => {
        e.preventDefault(); // to avoid page reloading
        if (password !== confirmPassword) {
            setMessage('Passwords do not match');
            return;
        }

        try {
            const storedStudentData = localStorage.getItem('student');
            if (storedStudentData) {
                const student = JSON.parse(storedStudentData);
                student.password = password;

                const response = await axios.put(`${config.url}/student/updatepassword?password=${password}&id=${student.id}`);
                if (response.status === 200) { // if successfully updated
                    setMessage(response.data);
                    localStorage.setItem('student', JSON.stringify(student)); 
                    navigate('/studenthome');
                }
            }
        } catch (error) {
            console.log(error.message); // for debugging purpose
            setMessage(error.message);
        }
    };



    return (
        <div>
            
            <div className="add-student-form">
                <h2>Update Password</h2>
                {message && <p className="message">{message}</p>}
                <form onSubmit={handleSubmit}>
                    <div>
                        <label>New Password</label>
                        <input
                            type="password"
                            name="password"
                            placeholder='Enter New Password'
                            onChange={handleChange}
                            pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$"
                            required
                        />
                       {password && !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(password) && (
                        <p className="error-message1">
                            Password must be at least 8 characters long, include an uppercase letter, a lowercase letter, a number, and a special character.
                        </p>
                    )}
                    </div>
                    <br/>
                    <div>
                        <label>Confirm Password</label>
                        <input
                            type="password"
                            name="confirmPassword"
                            placeholder='Confirm New Password'
                            value={confirmPassword}
                            onChange={handleChange}
                            required
                        />
                    </div>


                    <br/>
                    <button type="submit">Update</button>
                    <button type="reset" >Clear</button>
                </form>
            </div>
        </div>
    );
}