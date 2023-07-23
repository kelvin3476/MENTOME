const path = require('path'); // For Connecting React

const express = require('express'); // Load Express module
const bodyParser = require('body-parser'); // Load Body-parser module for get argument from Client
const mongoose = require('mongoose'); // Load Mongoose module for connect to MongoDB
require('dotenv').config(); // Load Dotenv module for use env file

const app = express(); // For use Express;

const account = require('./routes/account'); // Load routes for account
const content = require('./routes/content'); // Load routes for content

app.use(bodyParser.urlencoded({ extended: false })); // For get argument from Client
app.use(bodyParser.json());

// Sample for develop
// app.get('/main', (req, res) => {
//   res.sendFile(path.join(__dirname, 'views/getcollection.html'));
// });
// app.get('/login', (req, res) => {
//   res.sendFile(path.join(__dirname, 'views/login.html'));
// });
// app.get('/signup', (req, res) => {
//   res.sendFile(path.join(__dirname, 'views/signup.html'));
// });
// app.get('/content', (req, res) => {
//   res.sendFile(path.join(__dirname, 'views/uploadcomment.html'));
// });
// app.get('/contents', (req, res) => {
//   res.sendFile(path.join(__dirname, 'views/uploadpost.html'));
// });

app.use(account);
app.use(content);

// Connect to React
app.use(express.static(path.join(__dirname, '../frontend/build')));

// Defende Error Page
// app.use('/', (req, res) => {
//   res.redirect('/');
// });

// Connecting MongoDB
mongoose.connect(process.env.CONNECTION_URL_FOR_MONGODB)
  .then(result => {
    console.log('Connected MongoDB!');
  });

// Running Server
app.listen(process.env.PORT, () => {
    console.log('Server is now running!');
});
