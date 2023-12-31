const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const http = require('http');
const app = express();
const port = process.env.PORT || 3000;
const mysql = require('mysql2/promise');
const bcrypt = require('bcrypt');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));

// Include your middleware
const webpages = require('./routes/defaults/webpages'); // Adjust the path as needed
app.use(webpages);

// Require and use middleware modules here
const getVideoRecommendations = require('./routes/api/v1/getVideoRecommendations'); // Adjust the path as needed
app.use('/api/v1/getVideoRecommendations', getVideoRecommendations);

const uploadVideo = require('./routes/api/v1/uploadVideo'); // Adjust the path as needed
app.use('/api/v1/uploadVideo', uploadVideo);

const createAccount = require('./routes/api/v1/createAccount'); // Adjust the path as needed
app.use('/api/v1/createAccount', createAccount);

const recents = require('./routes/api/v1/recents'); // Adjust the path as needed
app.use(recents);

const watchVideo = require('./routes/api/v1/watchVideo'); // Adjust the path as needed
app.use(watchVideo);

const loginAccount = require('./routes/api/v1/loginAccount'); // Adjust the path as needed
app.use(loginAccount);

const deleteUnusedVideos = require('./routes/api/v1/deleteUnusedVideos'); // Adjust the path as needed
app.use(deleteUnusedVideos);

const likeVideo = require('./routes/api/v2/likeVideo'); // Adjust the path as needed
app.use(likeVideo);

const dislikeVideo = require('./routes/api/v2/dislikeVideo'); // Adjust the path as needed
app.use(dislikeVideo);

const changePassword = require('./routes/api/v3/changePassword'); // Adjust the path as needed
app.use(changePassword);

const changeUsername = require('./routes/api/v3/changeUsername'); // Adjust the path as needed
app.use(changeUsername);

const setUserCountry = require('./routes/api/v3/setUserCountry'); // Adjust the path as needed
app.use(setUserCountry);

const setUserProfilePicture = require('./routes/api/v3/setUserProfilePicture'); // Adjust the path as needed
app.use(setUserProfilePicture);

// WebcamJS setup and button integration
// app.get('/record', (req, res) => {
//   res.render('record'); // Render the 'record.ejs' file for recording
// });

// Create the HTTP server with Express.js app
const server = http.createServer(app);

const IP_ADDRESS = process.env["IP_ADDRESS"]; // Replace with your local IP
const SERVER_PORT = 3000;

server.listen(SERVER_PORT, IP_ADDRESS, () => {
  console.log(`Server is running at http://${IP_ADDRESS}:${SERVER_PORT}/`);
});