import axios from 'axios';
import { useEffect, useState } from 'react';
import config from '../config'

export default function VerifyUsers() {
    const [recruiters, setRecruiters] = useState([]);
    const [officers, setOfficers] = useState([]);
    const [error, setError] = useState('');
    const [toggle, setToggle] = useState('recruiters'); 

    

    const fetchRecruiters = async () => {
        try {
            const response = await axios.get(`${config.url}/admin/getregisteredRecruiters`);
            setRecruiters(response.data);
        } catch (error) {
            setError(error.message);
        }
    };

    const acceptRecruiter = async (id) => {
        try {
            await axios.put(`${config.url}/admin/verifyRecruiter?id=${id}&status=Accepted`);
            fetchRecruiters();
        } catch (error) {
            setError(error.message);
        }
    };

    const rejectRecruiter = async (id) => {
        try {
            await axios.put(`${config.url}/admin/verifyRecruiter?id=${id}&status=Rejected`);
            fetchRecruiters(); 
        } catch (error) {
            setError(error.message);
        }
    };

    const fetchOfficers = async () => {
        try {
            const response = await axios.get(`${config.url}/admin/getregisteredOfficers`);
            setOfficers(response.data);
        } catch (error) {
            setError(error.message);
        }
    };

    const acceptOfficer = async (id) => {
        try {
            await axios.put(`${config.url}/admin/verifyOfficer?id=${id}&status=Accepted`);
            fetchOfficers(); // Refresh the list after verification
        } catch (error) {
            setError(error.message);
        }
    };

    const rejectOfficer = async (id) => {
        try {
            
            await axios.put(`${config.url}/admin/verifyOfficer?id=${id}&status=Rejected`);
            fetchOfficers(); // Refresh the list after verification
        } catch (error) {
            setError(error.message);
        }
    };

    useEffect(() => {
        if (toggle === 'recruiters') {
            fetchRecruiters();
        } else {
            fetchOfficers();
        }
    }, [toggle]);

    const handleToggle = () => {
        setToggle((prev) => (prev === 'recruiters' ? 'officers' : 'recruiters'));
    };

    return (
        <div>
            <button style={{fontSize:'20px',fontWeight:'bold',backgroundColor:'lightgrey'}} onClick={handleToggle}>
                {toggle === 'recruiters' ? 'Show Officers' : 'Show Recruiters'}
            </button>
            <br/><br/>
            
            {error ? (
                <p>{error}</p>
            ) : toggle === 'recruiters' ? (
                recruiters.length ? (
                    <div><center><h2>Verify Recruiters</h2></center>
                    <table>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Name</th>
                                <th>Gender</th>
                                <th>Company</th>
                                <th>Date of Birth</th>
                                <th>Email</th>
                                <th>Contact</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {recruiters.map((recruiter) => (
                                <tr key={recruiter.id}>
                                    <td>{recruiter.id}</td>
                                    <td>{recruiter.name}</td>
                                    <td>{recruiter.gender}</td>
                                    <td>{recruiter.company}</td>
                                    <td>{recruiter.dateofbirth}</td>
                                    <td>{recruiter.email}</td>
                                    <td>{recruiter.contact}</td>
                                    <td>
                                    <div className="action-buttons">
                                        <a className="admin-button-tick" onClick={() => acceptRecruiter(recruiter.id)}>
                                            <span className="material-symbols-outlined">check</span>
                                        </a>
                                        <a className="admin-button-cross" onClick={() => rejectRecruiter(recruiter.id)}>
                                            <span className="material-symbols-outlined">close</span>
                                        </a>
                                    </div>
                                     </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    </div>
                ) : (
                    <p>No Recruiters found</p>
                )
            ) : officers.length ? (
                <div>
                    <center><h2>Verify Officers</h2></center>
                
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Gender</th>
                            <th>Department</th>
                            <th>Date of Birth</th>
                            <th>Email</th>
                            <th>Contact</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {officers.map((officer) => (
                            <tr key={officer.id}>
                                <td>{officer.id}</td>
                                <td>{officer.name}</td>
                                <td>{officer.gender}</td>
                                <td>{officer.department}</td>
                                <td>{officer.dateofbirth}</td>
                                <td>{officer.email}</td>
                                <td>{officer.contact}</td>
                                <td>
                                <div className="action-buttons">
                                    <a className="admin-button-tick" onClick={() => acceptOfficer(officer.id)}>
                                        <span className="material-symbols-outlined">check</span>
                                    </a>
                                    <a className="admin-button-cross" onClick={() => rejectOfficer(officer.id)}>
                                        <span className="material-symbols-outlined">close</span>
                                    </a>
                                </div>
                            </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                </div>
            ) : (
                <p>No Placement-Officers found</p>
            )}
        </div>
    );
}
