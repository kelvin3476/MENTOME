// videosync.js
const videoPlayer = document.getElementById('fileDisplay');
console.log('Video player src: ', videoPlayer.src);
let serverEvent = false;

// 이벤트 리스너 추가
videoPlayer.addEventListener('play', (e) => {
    if (serverEvent) {
        serverEvent = false;
    } else {
        socket.emit('play_video', roomName);
    }
});

videoPlayer.addEventListener('pause', (e) => {
    if (serverEvent) {
        serverEvent = false;
    } else {
        socket.emit('pause_video', roomName);
    }
});

videoPlayer.addEventListener('seeked', (e) => {
    if (serverEvent) {
        serverEvent = false;
    } else {
        socket.emit('seek_video', videoPlayer.currentTime, roomName);
    }
});

videoPlayer.addEventListener('timeupdate', (e) => {
    socket.emit('update_time', videoPlayer.currentTime, roomName);
});

// socket.io 이벤트 리스너 추가
socket.on('play_video', (timestamp) => {
    serverEvent = true;
    videoPlayer.currentTime = timestamp;
    videoPlayer.play();
});

socket.on('pause_video', (timestamp) => {
    serverEvent = true;
    videoPlayer.currentTime = timestamp;
    videoPlayer.pause();
});

socket.on('seek_video', (timestamp) => {
    serverEvent = true;
    videoPlayer.currentTime = timestamp;
});

// 동영상2 동기화
const videoPlayer2 = document.getElementById('fileDisplay2');
console.log('Video player src: ', videoPlayer2.src);
let serverEvent2 = false;

// 이벤트 리스너 추가
videoPlayer2.addEventListener('play', (e) => {
    if (serverEvent2) {
        serverEvent2 = false;
    } else {
        socket.emit('play_video2', roomName);
    }
});

videoPlayer2.addEventListener('pause', (e) => {
    if (serverEvent2) {
        serverEvent2 = false;
    } else {
        socket.emit('pause_video2', roomName);
    }
});

videoPlayer2.addEventListener('seeked', (e) => {
    if (serverEvent2) {
        serverEvent2 = false;
    } else {
        socket.emit('seek_video2', videoPlayer2.currentTime, roomName);
    }
});

videoPlayer2.addEventListener('timeupdate', (e) => {
    socket.emit('update_time2', videoPlayer2.currentTime, roomName);
});

// socket.io 이벤트 리스너 추가
socket.on('play_video2', (timestamp) => {
    serverEvent2 = true;
    videoPlayer2.currentTime = timestamp;
    videoPlayer2.play();
});

socket.on('pause_video2', (timestamp) => {
    serverEvent2 = true;
    videoPlayer2.currentTime = timestamp;
    videoPlayer2.pause();
});

socket.on('seek_video2', (timestamp) => {
    serverEvent2 = true;
    videoPlayer2.currentTime = timestamp;
});
