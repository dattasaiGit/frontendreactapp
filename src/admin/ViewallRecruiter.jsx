import { useEffect, useState } from 'react';
import axios from 'axios';
import './admin.css';
import config from '../config';

export default function ViewAllRecruiters() {
  const [recruiters, setRecruiters] = useState([]);
  const [filteredRecruiters, setFilteredRecruiters] = useState([]);
  const [error, setError] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1); // Start from page 1
  const pageSize = 6; // Number of items per page

  // Fetch recruiters from API
  const fetchRecruiters = async () => {
    try {
      const response = await axios.get(`${config.url}/admin/viewrecruiters`);
      setRecruiters(response.data);
      setFilteredRecruiters(response.data); // Set initial filtered list
    } catch (error) {
      setError(error.message);
    }
  };

  useEffect(() => {
    fetchRecruiters();
  }, []);

  // Filter recruiters based on search query
  useEffect(() => {
    const query = searchQuery.toLowerCase();
    const filtered = recruiters.filter(
      (recruiter) =>
        recruiter.id.toString().includes(query) ||
        recruiter.name.toLowerCase().includes(query) ||
        recruiter.company.toLowerCase().includes(query) ||
        recruiter.email.toLowerCase().includes(query)
    );
    setFilteredRecruiters(filtered);
    setCurrentPage(1); // Reset to first page on search
  }, [searchQuery, recruiters]);

  // Calculate total pages dynamically
  const totalPages = Math.ceil(filteredRecruiters.length / pageSize);

  // Get current recruiters for pagination
  const indexOfLastRecruiter = currentPage * pageSize;
  const indexOfFirstRecruiter = indexOfLastRecruiter - pageSize;
  const currentRecruiters = filteredRecruiters.slice(indexOfFirstRecruiter, indexOfLastRecruiter);

  // Handle pagination
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  console.log(paginate)
  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };
  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  const viewRecruiter = (id) => {
    console.log(`Viewing recruiter with ID: ${id}`);
  };

  return (
    <div>
      <h3>View All Recruiters</h3>
      {/* Search Input */}
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
      {/* Recruiters Table */}
      {currentRecruiters.length > 0 ? (
        <table className="recruiter-table">
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
            {currentRecruiters.map((recruiter) => (
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
                  <a
                    className="view-button"
                    onClick={() => viewRecruiter(recruiter.id)}
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
        <p>No Recruiters found</p>
      )}
      {filteredRecruiters.length > pageSize && (
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
