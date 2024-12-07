import { useEffect, useState, useCallback } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import config from '../config';

export default function RecruiterProfile() {
    const [recruiter, setRecruiter] = useState(null);
    const [profileImage, setProfileImage] = useState(null); // State to hold the image
    const navigate = useNavigate();

    const fetchProfileImage = useCallback(async (id) => {
        try {
            const response = await axios.get(`${config.url}/recruiter/displayimage?id=${id}`, {
                responseType: 'arraybuffer', // Ensure the response is binary
            });

            // Log the fetched data for debugging
            console.log('Fetched image data:', response.data);

            if (response.data) {
                const base64Image = arrayBufferToBase64(response.data);
                setProfileImage(`data:image/jpeg;base64,${base64Image}`);
            }
        } catch (error) {
            console.error('Error fetching profile image:', error);
        }
    }, []); // Empty dependency array ensures this function is memoized

    useEffect(() => {
        const storedRecruiterData = localStorage.getItem('recruiter');
        if (storedRecruiterData) {
            const parsedData = JSON.parse(storedRecruiterData);
            setRecruiter(parsedData);

            // Fetch the profile image
            fetchProfileImage(parsedData.id);
        }
    }, [fetchProfileImage]); // fetchProfileImage is now stable and safe to include

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

    const handleUpdateClick = () => {
        navigate('/updateProfile');
    };

    return (
        <>
            <div className="back-button">
                <Link to="/recruiterhome">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                    </svg>
                    Back
                </Link>
            </div>
            <div className="profile">
                <h2>Recruiter Profile</h2>
                {recruiter ? (
                    <div className="profile-details">
                        {/* Display Profile Image */}
                        {profileImage ? (
                            <div className="profile-image">
                                <img
                                    src={profileImage}
                                    alt={`${recruiter.name}'s Profile`}
                                    style={{
                                        width: '150px',
                                        height: '150px',
                                        borderRadius: '50%',
                                        objectFit: 'cover',
                                        marginBottom: '20px',
                                    }}
                                />
                            </div>
                        ) : (
                            <div className="profile-image-placeholder">
                                <p>No Image Available</p>
                            </div>
                        )}

                        {/* Profile Details */}
                        <p><strong>ID:</strong> {recruiter.id}</p>
                        <p><strong>Name:</strong> {recruiter.name}</p>
                        <p><strong>Gender:</strong> {recruiter.gender}</p>
                        <p><strong>Date of Birth:</strong> {recruiter.dateofbirth}</p>
                        <p><strong>Company:</strong> {recruiter.company}</p>
                        <p><strong>Email:</strong> {recruiter.email}</p>
                        <p><strong>Contact:</strong> {recruiter.contact}</p>
                        <button onClick={handleUpdateClick}>Update Profile</button>
                    </div>
                ) : (
                    <p className="message">No recruiter data available. Please update your profile.</p>
                )}
            </div>
        </>
    );
}
