const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const axios = require('axios');

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/my_project', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const connection = mongoose.connection;
connection.once('open', () => {
    console.log('Mongoose database connection established successfully');
});

// Define routes
app.get('/', (req, res) => {
    console.log(`Server is running on port: ${port}`);
});

// API endpoint for fetching job listings from different sources
app.get('/api/jobs', async (req, res) => {
    try {
        // Example: Fetch data from Indeed API and LinkedIn API
        const indeedJobs = await axios.get('https://example.com/indeed-api-endpoint');
        const linkedinJobs = await axios.get('https://example.com/linkedin-api-endpoint');

        // Combine job listings from various sources
        const jobs = [...indeedJobs.data.jobs, ...linkedinJobs.data.jobs];

        res.json(jobs);
    } catch (error) {
        console.error('Error fetching job listings:', error);
        res.status(500).json({ error: 'Failed to fetch job listings' });
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
