import { useEffect, useState } from 'react';
import axios from 'axios';

import './admin.css';
import config from '../config';

export default function ViewAllStudents() {
  const [students, setStudents] = useState([]);
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [error, setError] = useState('');
  const [currentPage, setCurrentPage] = useState(1); // Pages start from 1
  const pageSize = 6;
  const [searchQuery, setSearchQuery] = useState('');

  // Fetch students data from API
  const fetchStudents = async () => {
    try {
      const response = await axios.get(`${config.url}/admin/viewstudents`);
      setStudents(response.data);
      setFilteredStudents(response.data); // Initially set filteredStudents to all students
    } catch (error) {
      setError(error.message);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  // Filter students based on search query
  useEffect(() => {
    const query = searchQuery.toLowerCase();
    const filtered = students.filter(
      (student) =>
        student.id.toString().includes(query) ||
        student.name.toLowerCase().includes(query) ||
        student.department.toLowerCase().includes(query) ||
        student.email.toLowerCase().includes(query)
    );
    setFilteredStudents(filtered);
    setCurrentPage(1); // Reset to the first page after filtering
  }, [searchQuery, students]);

  // Calculate total pages dynamically
  const totalPages = Math.ceil(filteredStudents.length / pageSize);

  // Get students for the current page
  const indexOfLastStudent = currentPage * pageSize;
  const indexOfFirstStudent = indexOfLastStudent - pageSize;
  const currentStudents = filteredStudents.slice(indexOfFirstStudent, indexOfLastStudent);

  // Handle page navigation
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

  return (
    <div>
      <h3>View All Students</h3>
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
      {currentStudents.length > 0 ? (
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
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {currentStudents.map((student) => (
              <tr key={student.id}>
                <td>{student.id}</td>
                <td>{student.name}</td>
                <td>{student.gender}</td>
                <td>{student.dateofbirth}</td>
                <td>{student.department}</td>
                <td>{student.email}</td>
                <td>{student.contact}</td>
                <td>
                  <a href="viewstudent" className="view-button">
                    <span className="material-symbols-outlined">visibility</span>
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        error ? <p>{error}</p> : <p>No students found</p>
      )}
      {filteredStudents.length > pageSize && (
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
