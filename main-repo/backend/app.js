const path = require('path');
const http = require('http');

const express = require('express');
const socketIo = require('socket.io');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

app.use(bodyParser.urlencoded({ extended: false })); // For get argument from Client
app.use(bodyParser.json()); // For get argument from Client

app.use(express.static(path.join(__dirname, '../frontend/build'))); // Connect to React
app.use(express.static(path.join(__dirname, '/views'))); // test meeting room

const connectController = require('./controllers/connect');

const accountRouter = require('./routes/account');
const contentRouter = require('./routes/content');

// Sample Page for Develop
app.get('/meeting', (req, res) => {
  res.sendFile(__dirname + '/views/meeting.html');
});

app.use(accountRouter);
app.use(contentRouter);

connectController.connectManagement(io);

// Defend Error Page
app.use('/', (req, res) => {
  res.redirect('/');
});

// Connecting MongoDB
mongoose.connect(process.env.CONNECTION_URL_FOR_MONGODB)
  .then(result => {
    console.log('Connected MongoDB!');
  });

// Running Server
server.listen(process.env.PORT, () => {
    console.log('Server is now running!');
});
