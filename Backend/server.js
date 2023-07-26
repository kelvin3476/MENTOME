// server.js
import dotenv from 'dotenv';
dotenv.config();
import http from 'http';
import { Server } from 'socket.io';
import { instrument } from '@socket.io/admin-ui';
import express from 'express';
import formidable from 'formidable';
import { Upload } from '@aws-sdk/lib-storage';
import { S3Client } from '@aws-sdk/client-s3';
import { Transform } from 'stream';

console.log('Region1: ', process.env.S3_REGION); // 이 줄을 추가하세요.

const path = require('path');

const app = express();
const httpServer = http.createServer(app);
const wsServer = new Server(httpServer, {
    cors: {
        origin: ['https://admin.socket.io'],
        credentials: true,
    },
});

const videoStateMap = new Map();

// setting up the view engine and static file serving
app.set('view engine', 'html');
app.set('public', __dirname + '/public');
app.use(express.static(path.join(__dirname, '../Frontend/public')));
app.use(express.static(path.join(__dirname, '../Frontend/src'), { type: 'text/javascript' }));
app.get('/', (_, res) => res.sendFile(path.join(__dirname, '../Frontend/public/index.html')));
app.get('/*', (_, res) => res.redirect('/'));
app.set('json spaces', 5);

// setup S3 configurations
const PORT = process.env.PORT || 3000;
const accessKeyId = process.env.AWS_ACCESS_KEY_ID;
const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY;
const region = process.env.S3_REGION;
const Bucket = process.env.S3_BUCKET;

// Instrument the admin UI
instrument(wsServer, {
    auth: false,
});

// Function to get public rooms
function publicRooms() {
    const {
        sockets: {
            adapter: { sids, rooms },
        },
    } = wsServer;
    const publicRooms = [];
    rooms.forEach((_, key) => {
        if (sids.get(key) === undefined) {
            publicRooms.push(key);
        }
    });
    return publicRooms;
}

// Function to count rooms
function countRoom(roomName) {
    return wsServer.sockets.adapter.rooms.get(roomName)?.size;
}

// Socket.io event handling
wsServer.on('connection', (socket) => {
    socket.on('join_room', (roomName) => {
        socket.join(roomName);
        socket.to(roomName).emit('welcome');
    });
    socket.on('offer', (offer, roomName) => {
        socket.to(roomName).emit('offer', offer);
    });
    socket.on('answer', (answer, roomName) => {
        socket.to(roomName).emit('answer', answer);
    });
    socket.on('ice', (ice, roomName) => {
        socket.to(roomName).emit('ice', ice);
    });

    // Handle nickname and messages
    socket['nickname'] = 'Anon';
    socket.onAny((event) => {
        console.log(wsServer.sockets.adapter);
        console.log(`socket Event: ${event}`);
    });
    socket.on('enter_room', (roomName, done) => {
        socket.join(roomName);
        done();
        socket.to(roomName).emit('welcome', socket.nickname, countRoom(roomName));
        wsServer.sockets.emit('room_change', publicRooms());
    });
    socket.on('disconnecting', () => {
        socket.rooms.forEach((room) => socket.to(room).emit('bye', socket.nickname, countRoom(room) - 1));
        socket.on('disconnect', () => {
            wsServer.sockets.emit('room_change', publicRooms());
        });
    });
    socket.on('new_message', (msg, room, done) => {
        socket.to(room).emit('new_message', `${socket.nickname}: ${msg}`);
        done();
    });
    socket.on('nickname', (nickname) => (socket['nickname'] = nickname));

    // 파일 업로드 관련 (파일 url 전달)
    socket.on('file_uploaded', (url, roomName) => {
        socket.to(roomName).emit('new_file', url);
    });

    socket.on('file_uploaded2', (url, roomName) => {
        socket.to(roomName).emit('new_file2', url);
    });

    // 동영상 동기화
    socket.on('play_video', (roomName) => {
        let videoState = videoStateMap.get(roomName);
        if (videoState) {
            videoState.isPlaying = true;
        } else {
            videoState = { isPlaying: true, time: 0 };
        }
        videoStateMap.set(roomName, videoState);
        socket.to(roomName).emit('play_video', videoState.time);
    });

    socket.on('pause_video', (roomName) => {
        let videoState = videoStateMap.get(roomName);
        if (videoState) {
            videoState.isPlaying = false;
        } else {
            videoState = { isPlaying: false, time: 0 };
        }
        videoStateMap.set(roomName, videoState);
        socket.to(roomName).emit('pause_video', videoState.time);
    });

    socket.on('seek_video', (timestamp, roomName) => {
        let videoState = videoStateMap.get(roomName);
        if (videoState) {
            videoState.time = timestamp;
        } else {
            videoState = { isPlaying: false, time: timestamp };
        }
        videoStateMap.set(roomName, videoState);
        socket.to(roomName).emit('seek_video', videoState.time);
    });

    socket.on('update_time', (timestamp, roomName) => {
        let videoState = videoStateMap.get(roomName);
        if (videoState) {
            videoState.time = timestamp;
        } else {
            videoState = { isPlaying: false, time: timestamp };
        }
        videoStateMap.set(roomName, videoState);
    });

    // 동영상 동기화2
    socket.on('play_video2', (roomName) => {
        let videoState = videoStateMap.get(roomName);
        if (videoState) {
            videoState.isPlaying2 = true;
        } else {
            videoState = { isPlaying2: true, time2: 0 };
        }
        videoStateMap.set(roomName, videoState);
        socket.to(roomName).emit('play_video2', videoState.time2);
    });

    socket.on('pause_video2', (roomName) => {
        let videoState = videoStateMap.get(roomName);
        if (videoState) {
            videoState.isPlaying2 = false;
        } else {
            videoState = { isPlaying2: false, time2: 0 };
        }
        videoStateMap.set(roomName, videoState);
        socket.to(roomName).emit('pause_video2', videoState.time2);
    });

    socket.on('seek_video2', (timestamp, roomName) => {
        let videoState = videoStateMap.get(roomName);
        if (videoState) {
            videoState.time2 = timestamp;
        } else {
            videoState = { isPlaying2: false, time2: timestamp };
        }
        videoStateMap.set(roomName, videoState);
        socket.to(roomName).emit('seek_video2', videoState.time2);
    });

    socket.on('update_time2', (timestamp, roomName) => {
        let videoState = videoStateMap.get(roomName);
        if (videoState) {
            videoState.time2 = timestamp;
        } else {
            videoState = { isPlaying2: false, time2: timestamp };
        }
        videoStateMap.set(roomName, videoState);
    });

    // 캔버스 동기화
    socket.on('drawing', (data) => {
        // Broadcast the drawing data to other clients in the same room
        socket.to(data.roomName).emit('drawing', data);
    });

    socket.on('clear_canvas', (roomName) => {
        socket.to(roomName).emit('clear_canvas');
    });

});

// 파일 업로드 관련
const parsefile = async (req) => {
    return new Promise((resolve, reject) => {
        let options = {
            maxFileSize: 100 * 1024 * 1024, // 100 megabytes converted to bytes,
            allowEmptyFiles: false,
        };

        const form = formidable(options);

        form.parse(req, (err, fields, files) => {});

        form.on('error', (error) => {
            reject(error.message);
        });

        form.on('data', (data) => {
            if (data.name === 'complete') {
                resolve(data.value);
            }
        });

        // Handling the file upload
        form.on('fileBegin', (formName, file) => {
            file.open = async function () {
                this._writeStream = new Transform({
                    transform(chunk, encoding, callback) {
                        callback(null, chunk);
                    },
                });

                this._writeStream.on('error', (e) => {
                    form.emit('error', e);
                });

                console.log('Region2: ', process.env.S3_REGION);
                new Upload({
                    client: new S3Client({
                        credentials: {
                            accessKeyId,
                            secretAccessKey,
                        },
                        region,
                    }),
                    params: {
                        ACL: 'public-read',
                        Bucket,
                        Key: `${Date.now().toString()}-${this.name}`,
                        Body: this._writeStream,
                    },
                    tags: [], // optional tags
                    queueSize: 4, // optional concurrency configuration
                    partSize: 1024 * 1024 * 5, // optional size of each part, in bytes, at least 5MB
                    leavePartsOnError: false, // optional manually handle dropped parts
                })
                    .done()
                    .then((data) => {
                        const url = `https://${Bucket}.s3.${region}.amazonaws.com/${data.Key}`;
                        form.emit('data', { name: 'complete', value: { ...data, url } });
                    })
                    .catch((err) => {
                        form.emit('error', err);
                    });
            };

            file.end = function (cb) {
                this._writeStream.on('finish', () => {
                    this.emit('end');
                    cb();
                });
                this._writeStream.end();
            };
        });
    });
};

// Handle root route
app.get('/', (req, res) => {
    res.send(`
    // HTML and Javascript code goes here...
  `);
});

// Handle file upload
app.post('/api/upload', async (req, res) => {
    try {
        const data = await parsefile(req);
        const url = data.url; // URL of the uploaded file

        res.status(200).json({
            message: '성공',
            url,
        });
    } catch (error) {
        res.status(400).json({
            message: '오류가 발생했습니다.',
            error,
        });
    }
});

// Start server
httpServer.listen(PORT, () => {
    console.log(`서버가 포트 ${PORT}에서 실행 중입니다.`);
});
