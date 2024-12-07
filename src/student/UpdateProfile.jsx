import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import config from './../config';

export default function UpdateProfile() {
    const [student, setStudent] = useState({
        id: '',
        name: '',
        gender: '',
        dateofbirth: '',
        department: '',
        email: '',
        contact: ''
    });
    const [message, setMessage] = useState('');
    const [image, setImage] = useState(null); // State for the image file
    const navigate = useNavigate(); // Hook to navigate to different routes

    useEffect(() => {
        const storedStudentData = localStorage.getItem('student');
        if (storedStudentData) {
            const parsedStudentData = JSON.parse(storedStudentData);
            setStudent(parsedStudentData);
        }
    }, []);

    const handleChange = (e) => {
        setStudent({ ...student, [e.target.name]: e.target.value });
    };

    const handleImageChange = (e) => {
        setImage(e.target.files[0]); // Update the image state
    };

    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent page reloading
        try {
            const formData = new FormData();
            formData.append('id', student.id);
            formData.append('image', image);

            // Send the image (if available)
            if (image) {
                await axios.post(`${config.url}/student/addimage`, formData, {
                    headers: { 'Content-Type': 'multipart/form-data' },
                });
            }

            // Update the profile details
            const response = await axios.put(`${config.url}/student/updateProfile`, student);
            if (response.status === 200) { // Successfully updated
                setMessage(response.data);
                const newvalue = await axios.get(`${config.url}/student/getStudent?id=${student.id}`);
                localStorage.setItem('student', JSON.stringify(newvalue.data));
                setStudent(newvalue.data);
            }
        } catch (error) {
            console.error(error.message); // For debugging
            setMessage(error.message);
        }
    };

    return (
        <div className="back-button">
            <a
                onClick={() => navigate(-1)}
                className="fixed left-4 top-20 inline-flex items-center gap-2 px-3 py-2 text-sm bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors duration-200 shadow-sm hover:shadow font-medium"
            >
                <ArrowLeft size={16} />
                Back
            </a>
            <div className="add-student-form">
                <h2>Update Student Profile</h2>
                {message && <p className="message">{message}</p>}
                <form onSubmit={handleSubmit}>
                    <div>
                        <label>Student ID</label>
                        <input
                            type="number"
                            name="id"
                            value={student.id}
                            placeholder="Enter Student Id"
                            onChange={handleChange}
                            required
                            readOnly // Make this field non-editable
                        />
                    </div>
                    <div>
                        <label>Name</label>
                        <input
                            type="text"
                            name="name"
                            placeholder="Enter Student Name"
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
                            placeholder="Enter Student Date of Birth"
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
                            placeholder="Enter Student Email"
                            value={student.email}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div>
                        <label>Contact</label>
                        <input
                            type="text"
                            name="contact"
                            placeholder="Enter Student Contact"
                            value={student.contact}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div>
                        <label>Upload Profile Image</label>
                        <input type="file" onChange={handleImageChange} accept="image/*" />
                    </div>
                    <button type="submit">Update</button>
                    <button type="reset">Clear</button>
                </form>
            </div>
        </div>
    );
}
