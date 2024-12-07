import { useEffect, useState } from 'react';
import axios from 'axios';
import config from '../config';
import './admin.css';

export default function DeleteOfficers() {
  const [officers, setOfficers] = useState([]);
  const [error, setError] = useState('');

  const fetchOfficers = async () => {
    try {
      const response = await axios.get(`${config.url}/admin/viewofficers`);
      setOfficers(response.data);
    } catch (error) {
      setError(error.message);
    }
  };

 

  const deleteOfficer = async (id,name) => 
    {
            try 
            {
                await axios.delete(`${config.url}/admin/deleteofficer?id=${id}&name=${name}`);
                fetchOfficers();
            } 
            catch (error) 
            {
                setError(error.message);
            }
    }

  useEffect(() => {
    fetchOfficers();
  }, []);

  return (
    <div>
      <h3>Delete Placement Officers</h3>
      {officers.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Gender</th>
              <th>Date of Birth</th>
              <th>Department</th>
              <th>Email</th>
              <th>Contact</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {officers.map((officer) => (
              <tr key={officer.id}>
                <td>{officer.id}</td>
                <td>{officer.name}</td>
                <td>{officer.gender}</td>
                <td>{officer.dateofbirth}</td>
                <td>{officer.department}</td>
                <td>{officer.email}</td>
                <td>{officer.contact}</td>
                <td>{officer.status}</td>
                <td>
                <a className="delete-button" onClick={() => deleteOfficer(officer.id,officer.name)}>
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
        <p>No placement officers found</p>
      )}
    </div>
  );
}