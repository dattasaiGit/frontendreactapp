import { useEffect, useState } from 'react';
import axios from 'axios';
import config from './../config';
import './admin.css';

export default function ViewAllOfficers() {
  const [officers, setOfficers] = useState([]);
  const [filteredOfficers, setFilteredOfficers] = useState([]);
  const [error, setError] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const pageSize = 5; // Number of officers per page

  const fetchOfficers = async () => {
    try {
      const response = await axios.get(`${config.url}/admin/viewofficers`);
      setOfficers(response.data);
      setFilteredOfficers(response.data); // Initially show all officers
      setTotalPages(Math.ceil(response.data.length / pageSize)); // Calculate total pages
    } catch (error) {
      setError(error.message);
    }
  };

  // Filter officers based on search query
  useEffect(() => {
    const query = searchQuery.toLowerCase();
    const filtered = officers.filter(
      officer =>
        officer.id.toString().includes(query) ||
        officer.name.toLowerCase().includes(query) ||
        officer.department.toLowerCase().includes(query) ||
        officer.email.toLowerCase().includes(query)
    );
    setFilteredOfficers(filtered);
    setCurrentPage(1); // Reset to the first page after filtering
    setTotalPages(Math.ceil(filtered.length / pageSize));
  }, [searchQuery, officers]);

  // Calculate officers to show on the current page
  const indexOfLastOfficer = currentPage * pageSize;
  const indexOfFirstOfficer = indexOfLastOfficer - pageSize;
  const currentOfficers = filteredOfficers.slice(indexOfFirstOfficer, indexOfLastOfficer);

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage((prevPage) => prevPage + 1);
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) setCurrentPage((prevPage) => prevPage - 1);
  };

  useEffect(() => {
    fetchOfficers();
  }, []);

  return (
    <div>
      <h3>View All Placement Officers</h3>
      <div className="search-container">
      <input
          type="text"
          placeholder="Search"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="search-input"
        />
        <span className="search-icon">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          </svg>
        </span>
      </div>
      {currentOfficers.length > 0 ? (
        <table className="officer-table">
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
            {currentOfficers.map((officer) => (
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
                  <a
                    className="view-button"
                    onClick={() => console.log(`Viewing officer with ID: ${officer.id}`)}
                  >
                    <span className="material-symbols-outlined">visibility</span>
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
      {filteredOfficers.length > pageSize && (
        <div className="pagination">
        <button
          className="pagination-button pagination-arrow"
          onClick={handlePreviousPage}
          disabled={currentPage === 1}
        >
          &#10094;
        </button>
        <span className="page-info">
          Page {currentPage} of {totalPages}
        </span>
        <button
          className="pagination-button pagination-arrow"
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
        >
          &#10095;
        </button>
      </div>
      )}
    </div>
  );
}
