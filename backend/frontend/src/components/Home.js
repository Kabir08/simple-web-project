import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Home.css';

function Home() {
    const [jobs, setJobs] = useState([]);
    const [selectedTab, setSelectedTab] = useState('Jobs');

    useEffect(() => {
        if (selectedTab === 'Jobs') {
            axios.get('http://localhost:5000/api/jobs')
                .then(response => {
                    setJobs(response.data);
                })
                .catch(error => {
                    console.error('There was an error fetching the job listings!', error);
                });
        }
    }, [selectedTab]);

    const handleTabClick = (tab) => {
        setSelectedTab(tab);
    };

    return (
        <div>
            <h1>Let's find Jobs</h1>
            <p>This site is a full stack project to get myself a job</p>
            <div className="tabs">
                <button 
                    className={`tab-button ${selectedTab === 'Jobs' ? 'active' : ''}`} 
                    onClick={() => handleTabClick('Jobs')}
                >
                    Jobs
                </button>
                <button 
                    className={`tab-button ${selectedTab === 'Profile' ? 'active' : ''}`} 
                    onClick={() => handleTabClick('Profile')}
                >
                    Profile and Questions
                </button>
                <button 
                    className={`tab-button ${selectedTab === 'Connections' ? 'active' : ''}`} 
                    onClick={() => handleTabClick('Connections')}
                >
                    Connections
                </button>
            </div>
            {selectedTab === 'Jobs' && (
                <div className="job-table">
                    <table>
                        <thead>
                            <tr>
                                <th>Company</th>
                                <th>Title</th>
                                <th>Location</th>
                                <th>Link</th>
                            </tr>
                        </thead>
                        <tbody>
                            {jobs.map(job => (
                                <tr key={job._id}>
                                    <td>{job.company}</td>
                                    <td>{job.title}</td>
                                    <td>{job.location}</td>
                                    <td><a href={job.link} target="_blank" rel="noopener noreferrer">Apply</a></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}

export default Home;
