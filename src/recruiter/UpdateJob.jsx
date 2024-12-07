import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { WithContext as ReactTags, SEPARATORS } from 'react-tag-input';
import { ArrowLeft } from 'lucide-react';
import config from './../config';


export default function UpdateJob() {

    const navigate = useNavigate(); 

    const [job, setJob] = useState({
        
        title: '',
        company: '',
        role: '',
        location: '',
        employmentType: '',
        deadline: '',
        requirements: '',
        skills: [],
        status: '',
        description: '',
        recruiter: ''
    });
    const [message, setMessage] = useState('');

    const handleChange = (e) => {
        setJob({ ...job, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault(); // to avoid page reloading
        try {
            const response = await axios.post(`${config.url}/recruiter/updatejob`,job);
            if (response.status === 200) {
                setMessage(response.data);
                setJob({
                    title: '',
                    company: '',
                    role: '',
                    location: '',
                    employmentType: '',
                    deadline: '',
                    requirements: '',
                    skills: [],
                    description: '',
                    recruiter: ''
                });
            }
        } catch (error) {
            console.log(error.message); // for debugging purposes
            setMessage(error.message);
        }
    };

    // Predefined suggestions for skills
    const suggestions = [
        { id: 'JAVA', text: 'JAVA' },
        { id: 'Python', text: 'Python' },
        { id: 'English', text: 'English' },
        { id: 'JavaScript', text: 'JavaScript' },
        { id: 'React', text: 'React' },
        { id: 'Node.js', text: 'Node.js' },
        { id: 'SQL', text: 'SQL' },
        { id: 'HTML', text: 'HTML' },
        { id: 'CSS', text: 'CSS' },
        { id: 'Machine Learning', text: 'Machine Learning' }
    ];

    // Handling tag addition, deletion, and updates
    const handleDelete = (index) => {
        const newSkills = [...job.skills];
        newSkills.splice(index, 1);
        setJob({ ...job, skills: newSkills });
    };

    const handleAddition = (tag) => {
        setJob({ ...job, skills: [...job.skills, tag.text] });
    };

    const handleTagClick = (index) => {
        console.log('The tag at index ' + index + ' was clicked');
    };

    const updateJob = async () => 
        {
            try 
            {
               const response = await axios.put(`${config.url}/recruiter/updatejob`,job);
               if(response.status===200)
               {
                const magic = JSON.parse(sessionStorage.getItem("job"));
                    if (magic == null) {
                        console.log("Empty");
                    } else {
                        console.log(magic.id);
                    }
    
                    setMessage(response.data);
                    setJob(response.data);
                }
            } 
            catch (error) 
            {
                setMessage(error.message);
            }
        };

  return (
         <div className="back-button">
            <a
                onClick={() => navigate(-1)}
                className="fixed left-4 top-20 inline-flex items-center gap-2 px-3 py-2 text-sm bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors duration-200 shadow-sm hover:shadow font-medium"
            >
            <ArrowLeft size={16} />
            Back
            </a>
        <div className="add-student-form">
             
            <h2>Update Job</h2>
            {message && <p className="message">{message}</p>}
            <form onSubmit={handleSubmit}>
            <div>
                    <label>Job Id</label>
                    <input
                        type="number"
                        name="id"
                        value={job.id}
                        placeholder="Enter Job Id"
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Job Title</label>
                    <input
                        type="text"
                        name="title"
                        value={job.title}
                        placeholder="Enter Job Title"
                        onChange={handleChange}
                        required
                    />
                </div>
                
                <div>
                    <label>Role</label>
                    <input
                        type="text"
                        name="role"
                        value={job.role}
                        placeholder="Enter Job Role"
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Location</label>
                    <input
                        type="text"
                        name="location"
                        value={job.location}
                        placeholder="Enter Job Position"
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Employment Type</label>
                    <select
                        name="employmentType"
                        value={job.employmentType}
                        onChange={handleChange}
                        required
                    >
                        <option value="">---Select Employment Type---</option>
                        <option value="Full-time">Full-time</option>
                        <option value="Part-time">Part-time</option>
                        <option value="Internship">Internship</option>
                    </select>
                </div>
                <div>
                    <label>Deadline</label>
                    <input
                        type="date"
                        name="deadline"
                        value={job.deadline}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Requirements</label>
                    <input
                        type="text"
                        name="requirements"
                        value={job.requirements}
                        placeholder="Enter Job Requirements"
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Skills</label>
                    <ReactTags
                        tags={job.skills.map(skill => ({ id: skill, text: skill }))}
                        suggestions={suggestions}
                        separators={[SEPARATORS.ENTER, SEPARATORS.COMMA]}
                        handleDelete={handleDelete}
                        handleAddition={handleAddition}
                        handleTagClick={handleTagClick}
                        inputFieldPosition="bottom"
                        maxTags={10}
                    />
                </div>
                <div>
                    <label>Description</label>
                    <textarea
                        name="description"
                        value={job.description}
                        placeholder="Enter Job Description"
                        onChange={handleChange}
                        required
                    />
                </div>
                <button type="submit" onClick={updateJob}>Update Job</button>
                <button type="reset">Clear</button>
            </form>
        </div>
        </div>
    );
}
