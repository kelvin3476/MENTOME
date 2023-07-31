const http = require('http');

const express = require('express');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

const videoStateMap = new Map();

// Function to get public rooms
function publicRooms() {
    const {
        sockets: {
            adapter: { 
                sids,
                rooms
            }
        }
    } = io;
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
    return io.sockets.adapter.rooms.get(roomName)?.size;
}

exports.socketManagement = io => {
    io.on("connection", (socket) => {
        socket.on("join_room", (roomName) => {
            socket.join(roomName);
            socket.to(roomName).emit("welcome");
        });
        socket.on("offer", (offer, roomName) => {
            socket.to(roomName).emit("offer", offer);
        });
        socket.on("answer", (answer, roomName) => {
            socket.to(roomName).emit("answer", answer);
        });
        socket.on("ice", (ice, roomName) => {
            socket.to(roomName).emit("ice", ice);
        });
    
        // Handle nickname and messages
        socket["nickname"] = "Anon";
        socket.onAny((event) => {
            // console.log(io.sockets.adapter);
            // console.log(`socket Event: ${event}`);
        });
        socket.on("enter_room", (roomName, done) => {
            socket.join(roomName);
            done();
            socket.to(roomName).emit("welcome", socket.nickname, countRoom(roomName));
            io.sockets.emit("room_change", publicRooms());
        });
        socket.on("disconnecting", () => {
            socket.rooms.forEach((room) =>
                socket.to(room).emit("bye", socket.nickname, countRoom(room) - 1)
            );
            socket.on("disconnect", () => {
                io.sockets.emit("room_change", publicRooms());
            });
        });
        socket.on("new_message", (msg, room, done) => {
            socket.to(room).emit("new_message", `${socket.nickname}: ${msg}`);
            done();
        });
        socket.on("nickname", (nickname) => (socket["nickname"] = nickname));
    
        // 파일 업로드 관련 (파일 url 전달)
        socket.on("file_uploaded", (url, roomName) => {
            socket.to(roomName).emit("new_file", url);
        });
    
        socket.on("file_uploaded2", (url, roomName) => {
            socket.to(roomName).emit("new_file2", url);
        });
    
        // 동영상 동기화
        socket.on("play_video", (roomName) => {
            let videoState = videoStateMap.get(roomName);
            if (videoState) {
                videoState.isPlaying = true;
            } else {
                videoState = { isPlaying: true, time: 0 };
            }
            videoStateMap.set(roomName, videoState);
            socket.to(roomName).emit("play_video", videoState.time);
        });
    
        socket.on("pause_video", (roomName) => {
            let videoState = videoStateMap.get(roomName);
            if (videoState) {
                videoState.isPlaying = false;
            } else {
                videoState = { isPlaying: false, time: 0 };
            }
            videoStateMap.set(roomName, videoState);
            socket.to(roomName).emit("pause_video", videoState.time);
        });
    
        socket.on("seek_video", (timestamp, roomName) => {
            let videoState = videoStateMap.get(roomName);
            if (videoState) {
                videoState.time = timestamp;
            } else {
                videoState = { isPlaying: false, time: timestamp };
            }
            videoStateMap.set(roomName, videoState);
            socket.to(roomName).emit("seek_video", videoState.time);
        });
    
        socket.on("update_time", (timestamp, roomName) => {
            let videoState = videoStateMap.get(roomName);
            if (videoState) {
                videoState.time = timestamp;
            } else {
                videoState = { isPlaying: false, time: timestamp };
            }
            videoStateMap.set(roomName, videoState);
        });
    
        // 동영상 동기화2
        socket.on("play_video2", (roomName) => {
            let videoState = videoStateMap.get(roomName);
            if (videoState) {
                videoState.isPlaying2 = true;
            } else {
                videoState = { isPlaying2: true, time2: 0 };
            }
            videoStateMap.set(roomName, videoState);
            socket.to(roomName).emit("play_video2", videoState.time2);
        });
    
        socket.on("pause_video2", (roomName) => {
            let videoState = videoStateMap.get(roomName);
            if (videoState) {
                videoState.isPlaying2 = false;
            } else {
                videoState = { isPlaying2: false, time2: 0 };
            }
            videoStateMap.set(roomName, videoState);
            socket.to(roomName).emit("pause_video2", videoState.time2);
        });
    
        socket.on("seek_video2", (timestamp, roomName) => {
            let videoState = videoStateMap.get(roomName);
            if (videoState) {
                videoState.time2 = timestamp;
            } else {
                videoState = { isPlaying2: false, time2: timestamp };
            }
            videoStateMap.set(roomName, videoState);
            socket.to(roomName).emit("seek_video2", videoState.time2);
        });
    
        socket.on("update_time2", (timestamp, roomName) => {
            let videoState = videoStateMap.get(roomName);
            if (videoState) {
                videoState.time2 = timestamp;
            } else {
                videoState = { isPlaying2: false, time2: timestamp };
            }
            videoStateMap.set(roomName, videoState);
        });
    
        // 캔버스 동기화
        socket.on("drawing", (data) => {
            // Broadcast the drawing data to other clients in the same room
            socket.to(data.roomName).emit("drawing", data);
        });
    
        socket.on("clear_canvas", (roomName) => {
            socket.to(roomName).emit("clear_canvas");
        });
    });
};