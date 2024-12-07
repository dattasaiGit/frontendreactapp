import axios from 'axios';
import { useEffect, useState } from 'react';
import { WithContext as ReactTags, SEPARATORS } from 'react-tag-input';
import config from './../config';

export default function AddJob() {
    const [recruiterData, setRecruiterData] = useState(null); // Recruiter data state
    const [job, setJob] = useState({
        title: '',
        company: '',
        role: '',
        location: '',
        employmentType: '',
        deadline: '',
        requirements: '',
        skills: [],
        status: 'open',
        description: '',
        rid: ''
    });
    const [message, setMessage] = useState('');

    // Fetch recruiter data from localStorage
    useEffect(() => {
        const storedRecruiterData = localStorage.getItem('recruiter');
        if (storedRecruiterData) {
            const parsedRecruiterData = JSON.parse(storedRecruiterData);
            setRecruiterData(parsedRecruiterData); // Update recruiter data state
        }
    }, []);

    // Log recruiter ID when recruiterData changes
    useEffect(() => {
        if (recruiterData && recruiterData.id) {
            console.log(recruiterData.id);
        }
    }, [recruiterData]); // Runs when recruiterData changes

    const handleChange = (e) => {
        setJob({ ...job, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${config.url}/recruiter/addjob`, {
                ...job,
                rid: recruiterData?.id,
                company: recruiterData?.company
            });
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
                    rid: ''
                });
            }
        } catch (error) {
            console.log(error.message);
            setMessage(error.message);
        }
    };

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

    return (
        <div className="add-student-form">
            <h2>Add New Job</h2>
            {message && <p className="message">{message}</p>}
            <form onSubmit={handleSubmit}>
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
                <button type="submit">Add Job</button>
                <button type="reset">Clear</button>
            </form>
        </div>
    );
}
