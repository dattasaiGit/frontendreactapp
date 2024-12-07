import  { useState } from 'react';
import axios from 'axios';
import './PlacementOfficer.css';
import config from './../config';

export default function AddStudent() {
    const [student, setStudent] = useState({
        id: '',
        name: '',
        gender: '',
        dateofbirth: '',
        department: '',
        email: '',
        password: 'klef1234',
        contact: ''
    });
    const [message, setMessage] = useState('');

    const handleChange = (e) => {
        setStudent({ ...student, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault(); // to avoid page reloading
        try {
            const response = await axios.post(`${config.url}/officer/insertstudent`, student);
            if (response.status === 200) { // if successfully added
                setMessage(response.data);
                setStudent({
                    id: '',
                    name: '',
                    gender: '',
                    dateofbirth: '',
                    department: '',
                    email: '',
                    contact: ''
                });
            }
        } catch (error) {
            console.log(error.message); // for debugging purpose
            setMessage(error.message);
        }
    };

    return (
        <div className="add-student-form">
            <h2>Add New Student</h2>
            {message && <p className="message">{message}</p>}
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Student ID</label>
                    <input
                        type="number"
                        name="id"
                        value={student.id}
                        placeholder='Enter Student Id'
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Name</label>
                    <input
                        type="text"
                        name="name"
                        placeholder='Enter Student Name'
                        value={student.name}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Gender *</label>
                    <div className="gender-options">
                        <input
                            type="radio"
                            name="gender"
                            value="male"
                            checked={student.gender === 'male'}
                            onChange={handleChange}
                            required
                        /> Male
                        <input
                            type="radio"
                            name="gender"
                            value="female"
                            checked={student.gender === 'female'}
                            onChange={handleChange}
                        /> Female
                         <input
                            type="radio"
                            name="gender"
                            value="other"
                            checked={student.gender === 'other'}
                            onChange={handleChange}
                        /> Other
                    </div>
                </div>
                <div>
                    <label>Date Of Birth</label>
                    <input
                        type="date"
                        name="dateofbirth"
                        placeholder='Enter Student Date of Birth'
                        value={student.dateofbirth}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Department</label>
                    <select
                        name="department"
                        value={student.department}
                        onChange={handleChange}
                        required
                        >
                        <option value="">---Select Department---</option>
                        <option value="CSE">CSE</option>
                        <option value="ECE">ECE</option>
                        <option value="CS&IT">CS&IT</option>
                    </select>
                </div>
                <div>
                    <label>Email</label>
                    <input
                        type="email"
                        name="email"
                        placeholder='Enter Student Email'
                        value={student.email}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Contact</label>
                    <input
                        type="number"
                        name="contact"
                        placeholder='Enter Student Contact'
                        value={student.contact}
                        onChange={handleChange}
                        required
                    />
                </div>
                <button type="submit">Add</button>
                <button type="reset">Clear</button>
            </form>
        </div>
    );
}