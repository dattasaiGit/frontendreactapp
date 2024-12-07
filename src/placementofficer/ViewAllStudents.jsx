import { useEffect, useState } from 'react';
import axios from 'axios';
import config from '../config';

export default function ViewAllStudents() 
{
  const [students, setStudents] = useState([]); 
  const [error, setError] = useState('');

   const fetchStudents = async () => 
    {
      try 
      {
        const response = await axios.get(`${config.url}/admin/viewstudents`);
        setStudents(response.data);
      } 
      catch (error) 
      {
        setError(error.message);
      }
    };

    const deleteStudent = async (id,name) => 
      {
              try 
              {
                  await axios.delete(`${config.url}/admin/deletestudent?id=${id}&name=${name}`);
                  fetchStudents();
              } 
              catch (error) 
              {
                  setError(error.message);
              }
      }

    useEffect(() => {
      fetchStudents();
    }, []);
  return (
    <div>
      <h3>View All Students</h3>
      {
          students ? 
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
            {students.map(student => (
              <tr key={student.id}>
                <td>{student.id}</td>
                <td>{student.name}</td>
                <td>{student.gender}</td>
                <td>{student.dateofbirth}</td>
                <td>{student.department}</td>
                <td>{student.email}</td>
                <td>{student.contact}</td>
                <td>
                <a className="delete-button" onClick={() => deleteStudent(student.id,student.name)}>
                  <span style={{cursor:'pointer'}} className="material-symbols-outlined">delete</span>
                </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>:
        error?
        <p>{error}</p> :
        <p>No students found</p>
      }
    </div>
  );
}
