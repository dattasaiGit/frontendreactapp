import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import config from '../config';

export default function PlacementOfficerProfile() {
    const [placementOfficer, setPlacementOfficer] = useState(null);
    const [profileImage, setProfileImage] = useState(null); // State to hold the image
    const navigate = useNavigate();

    useEffect(() => {
        const storedPlacementOfficerData = localStorage.getItem('placementofficer');
        if (storedPlacementOfficerData) {
            const parsedPlacementOfficerData = JSON.parse(storedPlacementOfficerData);
            setPlacementOfficer(parsedPlacementOfficerData);

            // Fetch the profile image
            const fetchProfileImage = async (id) => {
                try {
                    const response = await axios.get(
                        `${config.url}/officer/displayimage?id=${id}`,
                        { responseType: 'arraybuffer' } // Ensure the response is binary
                    );

                    if (response.data) {
                        const base64Image = arrayBufferToBase64(response.data);
                        setProfileImage(`data:image/jpeg;base64,${base64Image}`);
                    }
                } catch (error) {
                    console.error('Error fetching profile image:', error);
                }
            };

            fetchProfileImage(parsedPlacementOfficerData.id);
        }
    }, []); // No dependencies since the fetch logic is inside the effect

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
        navigate('/updateprofile'); // Replace with the route where your update form is located
    };

    return (
        <div className="placementofficer-profile">
            <h2>Placement Officer Profile</h2>
            {placementOfficer ? (
                <div className="profile-details">
                    {/* Display Profile Image */}
                    {profileImage ? (
                        <div className="profile-image">
                            <img
                                src={profileImage}
                                alt={`${placementOfficer.name}'s Profile`}
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
                    <p><strong>ID:</strong> {placementOfficer.id}</p>
                    <p><strong>Name:</strong> {placementOfficer.name}</p>
                    <p><strong>Gender:</strong> {placementOfficer.gender}</p>
                    <p><strong>Date of Birth:</strong> {placementOfficer.dateofbirth}</p>
                    <p><strong>Department:</strong> {placementOfficer.department}</p>
                    <p><strong>Email:</strong> {placementOfficer.email}</p>
                    <p><strong>Contact:</strong> {placementOfficer.contact}</p>
                    <button onClick={handleUpdateClick}>Update Profile</button>
                </div>
            ) : (
                <p>No placement officer data available. Please update your profile.</p>
            )}
        </div>
    );
}
