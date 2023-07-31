const path = require('path');
const http = require('http');

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const socketIo = require('socket.io');
require('dotenv').config();

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

app.use(bodyParser.urlencoded({ extended: false })); // For get argument from Client
app.use(bodyParser.json()); // For get argument from Client

app.use(express.static(path.join(__dirname, '../frontend/main/build'))); // Connect to React
app.use(express.static(path.join(__dirname, '../frontend/meeting'))); // test meeting room

const socketController = require('./controllers/socket');

const accountRouter = require('./routes/account');
const contentRouter = require('./routes/content');
const noticeRouter = require('./routes/notice');
const s3Router = require('./routes/s3');

socketController.socketManagement(io);

app.use(accountRouter);
app.use(contentRouter);
app.use(noticeRouter);
app.use(s3Router);

app.get('/meeting', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/meeting/index.html'));
});

app.use('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/main/build/index.html'));
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
