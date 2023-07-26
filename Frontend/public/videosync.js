// videosync.js
const videoPlayer = document.getElementById("fileDisplay");
console.log("Video player src: ", videoPlayer.src);
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
socket.on("play_video", (timestamp) => {
    serverEvent = true;
    videoPlayer.currentTime = timestamp;
    videoPlayer.play();
});

socket.on("pause_video", (timestamp) => {
    serverEvent = true;
    videoPlayer.currentTime = timestamp;
    videoPlayer.pause();
});

socket.on("seek_video", (timestamp) => {
    serverEvent = true;
    videoPlayer.currentTime = timestamp;
});

