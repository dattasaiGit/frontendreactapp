import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import config from './../config';

export default function UpdateRecruiterProfile() {
    const [recruiter, setRecruiter] = useState({
        id: '',
        name: '',
        gender: '',
        dateofbirth: '',
        company: '',
        email: '',
        contact: '',
        status: ''
    });
    const [message, setMessage] = useState('');
    const [image, setImage] = useState(null); // State for the image file
    const navigate = useNavigate(); // Hook to navigate to different routes

    useEffect(() => {
        const storedRecruiterData = localStorage.getItem('recruiter');
        if (storedRecruiterData) {
            const parsedRecruiterData = JSON.parse(storedRecruiterData);
            setRecruiter(parsedRecruiterData);
        }
    }, []);

    const handleChange = (e) => {
        setRecruiter({ ...recruiter, [e.target.name]: e.target.value });
    };

    const handleImageChange = (e) => {
        setImage(e.target.files[0]); // Update the image state
    };

    const handleSubmit = async (e) => {
        e.preventDefault(); // to avoid page reloading
        try {
            const formData = new FormData();
            formData.append('id', recruiter.id);
            formData.append('image', image);

            // Send the image (if available)
            if (image) {
                await axios.post(`${config.url}/recruiter/addimage`, formData, {
                    headers: { 'Content-Type': 'multipart/form-data' },
                });
            }

            // Update the profile details
            const response = await axios.put(`${config.url}/recruiter/updateProfile`, recruiter);
            if (response.status === 200) { // if successfully updated
                setMessage(response.data);
                const newvalue = await axios.get(`${config.url}/recruiter/getprofile?id=${recruiter.id}`);
                localStorage.setItem('recruiter', JSON.stringify(newvalue.data));
                setRecruiter(newvalue.data);
            }
        } catch (error) {
            console.log(error.message); // for debugging purpose
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
                <h2>Update Recruiter Profile</h2>
                {message && <p className="message">{message}</p>}
                <form onSubmit={handleSubmit}>
                    <div>
                        <label>Recruiter ID</label>
                        <input
                            type="number"
                            name="id"
                            value={recruiter.id}
                            placeholder='Enter Recruiter ID'
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
                            placeholder='Enter Recruiter Name'
                            value={recruiter.name}
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
                                checked={recruiter.gender === 'male'}
                                onChange={handleChange}
                                required
                            /> Male
                            <input
                                type="radio"
                                name="gender"
                                value="female"
                                checked={recruiter.gender === 'female'}
                                onChange={handleChange}
                            /> Female
                            <input
                                type="radio"
                                name="gender"
                                value="other"
                                checked={recruiter.gender === 'other'}
                                onChange={handleChange}
                            /> Other
                        </div>
                    </div>
                    <div>
                        <label>Date Of Birth</label>
                        <input
                            type="date"
                            name="dateofbirth"
                            value={recruiter.dateofbirth}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div>
                        <label>Company</label>
                        <input
                            type="text"
                            name="company"
                            placeholder='Enter Company'
                            value={recruiter.company}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div>
                        <label>Email</label>
                        <input
                            type="email"
                            name="email"
                            placeholder='Enter Email'
                            value={recruiter.email}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div>
                        <label>Contact</label>
                        <input
                            type="number"
                            name="contact"
                            placeholder='Enter Contact'
                            value={recruiter.contact}
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
