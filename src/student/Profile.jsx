import { useEffect, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import config from './../config';

export default function Profile() {
    const [student, setStudent] = useState(null);
    const [profileImage, setProfileImage] = useState(null);
    const navigate = useNavigate();

    // Memoize fetchProfileImage with useCallback
    const fetchProfileImage = useCallback(async (id) => {
        try {
            const response = await axios.get(`${config.url}/student/displayimage?id=${id}`, {
                responseType: 'arraybuffer', // Expecting image as binary
            });

            console.log('Fetched image data:', response.data);

            if (response.data) {
                const base64Image = arrayBufferToBase64(response.data);
                setProfileImage(`data:image/jpeg;base64,${base64Image}`);
            }
        } catch (error) {
            console.error('Error fetching profile image:', error);
        }
    }, []); // No dependencies since it doesn't depend on any state or props

    // Function to convert ArrayBuffer to Base64
    const arrayBufferToBase64 = (buffer) => {
        let binary = '';
        let bytes = new Uint8Array(buffer);
        let length = bytes.byteLength;

        for (let i = 0; i < length; i++) {
            binary += String.fromCharCode(bytes[i]);
        }

        return btoa(binary); // Convert binary to Base64
    };

    useEffect(() => {
        const storedStudentData = localStorage.getItem('student');
        if (storedStudentData) {
            const parsedStudentData = JSON.parse(storedStudentData);
            setStudent(parsedStudentData);

            // Fetch the profile image
            fetchProfileImage(parsedStudentData.id);
        }
    }, [fetchProfileImage]); // Adding fetchProfileImage as a dependency

    const handleUpdateClick = () => {
        navigate('/updateprofile'); // Navigate to the profile update page
    };

    return (
        <div className="profile">
            <h2>Student Profile</h2>
            {student ? (
                <div className="profile-details">
                    {/* Display Profile Image */}
                    {profileImage ? (
                        <div className="profile-image">
                            <img
                                src={profileImage}
                                alt={`${student.name}'s Profile`}
                                style={{
                                    width: '150px',
                                    height: '150px',
                                    borderRadius: '50%',
                                    objectFit: 'cover',
                                    marginBottom: '20px',
                                    marginLeft: '280px',
                                }}
                            />
                        </div>
                    ) : (
                        <div className="profile-image-placeholder">
                            <p>No Image Available</p>
                        </div>
                    )}

                    {/* Profile Details */}
                    <p><strong>ID:</strong> {student.id}</p>
                    <p><strong>Name:</strong> {student.name}</p>
                    <p><strong>Gender:</strong> {student.gender}</p>
                    <p><strong>Date of Birth:</strong> {student.dateofbirth}</p>
                    <p><strong>Department:</strong> {student.department}</p>
                    <p><strong>Email:</strong> {student.email}</p>
                    <p><strong>Contact:</strong> {student.contact}</p>
                    <button onClick={handleUpdateClick}>Update Profile</button>
                </div>
            ) : (
                <p>No student data available. Please update your profile.</p>
            )}
        </div>
    );
}
