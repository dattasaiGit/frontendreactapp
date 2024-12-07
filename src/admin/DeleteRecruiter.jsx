import { useEffect, useState } from 'react';
import axios from 'axios';
import config from '../config';
import './admin.css';

export default function Deleterecruiters() {
  const [recruiters, setRecruiters] = useState([]);
  const [error, setError] = useState('');

  const fetchRecruiters = async () => {
    try {
      const response = await axios.get(`${config.url}/admin/viewrecruiters`);
      setRecruiters(response.data);
    } catch (error) {
      setError(error.message);
    }
  };

 

  const deleteRecruiter = async (id,name) => 
    {
            try 
            {
                await axios.delete(`${config.url}/admin/deleterecruiter?id=${id}&name=${name}`);
                fetchRecruiters();
            } 
            catch (error) 
            {
                setError(error.message);
            }
    }

  useEffect(() => {
    fetchRecruiters();
  }, []);

  return (
    <div>
      <h3>Delete Recruiters</h3>
      {recruiters.length > 0 ? (
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
              <th>Status</th>
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
                <td>{recruiter.status}</td>
                <td>
                <a className="delete-button" onClick={() => deleteRecruiter(recruiter.id,recruiter.name)}>
                  <span style={{cursor:'pointer'}} className="material-symbols-outlined">delete</span>
                </a>
              </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <p>No Recruiters found</p>
      )}
    </div>
  );
}