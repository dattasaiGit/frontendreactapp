import  { useEffect, useState } from 'react';
import axios from 'axios';
import config from './../config';
 

export default function UpdatePlacementOfficerProfile() {
    const [placementOfficer, setPlacementOfficer] = useState({
        id: '',
        name: '',
        gender: '',
        dateofbirth: '',
        department: '',
        email: '',
        contact: '',
        status: ''
    });
    const [message, setMessage] = useState('');
    const [image, setImage] = useState(null); // State for the image file

    useEffect(() => {
        const storedPlacementOfficerData = localStorage.getItem('placementofficer');
        if (storedPlacementOfficerData) {
            const parsedPlacementOfficerData = JSON.parse(storedPlacementOfficerData);
            setPlacementOfficer(parsedPlacementOfficerData);
        }
    }, []);

    const handleChange = (e) => {
        setPlacementOfficer({ ...placementOfficer, [e.target.name]: e.target.value });
    };

    const handleImageChange = (e) => {
        setImage(e.target.files[0]); // Update the image state
    };

    const handleSubmit = async (e) => {
        e.preventDefault(); // to avoid page reloading
        try {
            const formData = new FormData();
            formData.append('id', placementOfficer.id);
            formData.append('image', image);

            // Send the image (if available)
            if (image) {
                await axios.post(`${config.url}/officer/addimage`, formData, {
                    headers: { 'Content-Type': 'multipart/form-data' },
                });
            }

            // Update the profile details
            const response = await axios.put(`${config.url}/officer/updateProfile`, placementOfficer);
            if (response.status === 200) { // if successfully updated
                setMessage(response.data);
                const newvalue = await axios.get(`${config.url}/officer/getprofile?id=${placementOfficer.id}`);
                localStorage.setItem('placementofficer', JSON.stringify(newvalue.data));
                setPlacementOfficer(newvalue.data);
            }
        } catch (error) {
            console.log(error.message); // for debugging purpose
            setMessage(error.message);
        }
    };

    return (
        <div className="back-button">
            <div className="add-student-form">
                <h2>Update Profile</h2>
                {message && <p className="message">{message}</p>}
                <form onSubmit={handleSubmit}>
                    <div>
                        <label>Placement Officer ID</label>
                        <input
                            type="number"
                            name="id"
                            value={placementOfficer.id}
                            placeholder='Enter Placement Officer Id'
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
                            placeholder='Enter Placement Officer Name'
                            value={placementOfficer.name}
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
                                checked={placementOfficer.gender === 'male'}
                                onChange={handleChange}
                                required
                            /> Male
                            <input
                                type="radio"
                                name="gender"
                                value="female"
                                checked={placementOfficer.gender === 'female'}
                                onChange={handleChange}
                            /> Female
                            <input
                                type="radio"
                                name="gender"
                                value="other"
                                checked={placementOfficer.gender === 'other'}
                                onChange={handleChange}
                            /> Other
                        </div>
                    </div>
                    <div>
                        <label>Date Of Birth</label>
                        <input
                            type="date"
                            name="dateofbirth"
                            value={placementOfficer.dateofbirth}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div>
                        <label>Department</label>
                        <input
                            type="text"
                            name="department"
                            placeholder='Enter Department'
                            value={placementOfficer.department}
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
                            value={placementOfficer.email}
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
                            value={placementOfficer.contact}
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
