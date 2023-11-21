// Import necessary modules and dependencies
const express = require('express');
const mysql = require('mysql2/promise'); // Using 'mysql2/promise' for async/await support

// Create an Express router
const router = express.Router();

// Define the route for watching videos
router.get('/watch', async (req, res) => {
    try {
        // Get the video ID from the query parameter
        const videoId = req.query.v;

        // Create a MySQL connection pool using environment variables
        const pool = mysql.createPool({
            host: process.env.DB_HOSTNAME,
            user: process.env.DB_USERNAME,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME,
        });

        // Attempt to connect to the database
        const connection = await pool.getConnection();

        // Retrieve video details from the database, including the title
        const [videoRows] = await connection.query('SELECT Title, URL FROM videos WHERE VideoID = ?', [videoId]);

        // Check if the video exists
        if (videoRows.length === 0) {
            connection.release();
            return res.status(404).json({ result: 'error', message: 'Video not found' });
        }

        // Get the video details, including the title
        const video = videoRows[0];

        // Construct the video URL to fetch from the public/uploads directory
        const videoUrl = `${video.URL}`;

        // Render the "watchVideo" view and pass the video details, including the title
        res.render('watchVideo', { videoUrl, videoTitle: video.Title });

        // Release the database connection
        connection.release();
    } catch (error) {
        console.error(error);
        res.status(500).json({ result: 'error', message: 'Unable to process the request' });
    }
});

// Export the router for use in your main application file
module.exports = router;
