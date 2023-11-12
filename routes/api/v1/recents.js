// Import necessary modules and dependencies
const express = require('express');
const mysql = require('mysql2/promise'); // Using 'mysql2/promise' for async/await support

// Create an Express router
const router = express.Router();

// Define a route for fetching recent videos
router.get('/api/v1/recentVideos', async (req, res) => {
    try {
        // Extract the 'limit' query parameter from the request
        const limit = req.query.limit ? parseInt(req.query.limit) : 3; // Default to 3 if 'limit' is not provided or not a valid number

        // Create a MySQL connection pool using environment variables
        const pool = mysql.createPool({
            host: process.env.DB_HOSTNAME,
            user: process.env.DB_USERNAME,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME,
        });

        // Attempt to connect to the database
        const connection = await pool.getConnection();

        // Query the database to get the specified number of most recent videos
        const [rows] = await connection.query(
            `SELECT * FROM videos ORDER BY CreatedAt DESC LIMIT ${limit}`
        );

        // Release the database connection
        connection.release();

        // Send JSON response with the list of recent videos
        res.json({ result: 'success', videos: rows });
    } catch (error) {
        console.error(error);
        res.status(500).json({ result: 'error', message: 'Unable to fetch recent videos' });
    }
});

// Export the router for use in your main application file
module.exports = router;
