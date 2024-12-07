import axios from 'axios';
import  { useEffect, useState } from 'react';
import './admin.css';
import config from '../config';

export default function ViewDeletedUsers() {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState('');

  const fetchUsers = async () => {
    try {
      const response = await axios.get(`${config.url}/admin/getArchive`);
      setUsers(response.data);
    } catch (error) {
      setError(error.message);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const undo = async (id) => {
    try {
      await axios.put(`${config.url}/admin/undo?id=${id}`);
      fetchUsers();
    } catch (error) {
      setError(error.message);
    }
  };

  const permanentDelete = async (id) => {
    try {
      await axios.delete(`${config.url}/admin/permanentdelete?id=${id}`);
      fetchUsers();
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div>
      <h3>View Deleted Users</h3>
      {users.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>User ID</th>
              <th>Role</th>
              <th>Deleted On</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.uid}</td>
                <td>{user.role}</td>
                <td>
                  {user.deletedon
                    ? new Date(user.deletedon).toLocaleString() // Convert Unix timestamp to readable date
                    : 'N/A'}
                </td>
                <td>
                  <a
                    className="undo-button"
                    style={{cursor:'pointer'}}
                    onClick={() => undo(user.id)}
                  >
                    <span className="material-symbols-outlined">undo</span> Undo&nbsp;&nbsp;&nbsp;
                  </a>
                  <a
                    className="delete-button"
                    style={{cursor:'pointer'}}
                    onClick={() => permanentDelete(user.id)}
                  >
                    <span className="material-symbols-outlined">delete</span> Delete
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <p>No Deleted Users Found</p>
      )}
    </div>
  );
}