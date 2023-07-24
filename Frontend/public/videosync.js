// 동영상 동기화
const videoPlayer = document.getElementById("fileDisplay");
console.log("Video player src: ", videoPlayer.src);
let serverEvent = false;


// 동영상 동기화
let throttleTimeout;

async function playVideo(timestamp) {
    serverEvent = true;
    return new Promise((resolve) => {
        videoPlayer.onplaying = function() {
            videoPlayer.onplaying = null;
            serverEvent = false;
            resolve();
        };
        videoPlayer.currentTime = timestamp;
        videoPlayer.play();
    });
}

async function pauseVideo(timestamp) {
    serverEvent = true;
    return new Promise((resolve) => {
        videoPlayer.onpause = function() {
            videoPlayer.onpause = null;
            serverEvent = false;
            resolve();
        };
        videoPlayer.currentTime = timestamp;
        videoPlayer.pause();
    });
}

// socket.io 이벤트 리스너 추가
socket.on("play_video", async (timestamp) => {
    await playVideo(timestamp);
    serverEvent = false;
});

socket.on("pause_video", async (timestamp) => {
    await pauseVideo(timestamp);
    serverEvent = false;
});

socket.on("seek_video", (timestamp) => {
    if (!serverEvent) {
        videoPlayer.currentTime = timestamp;
    }
});

videoPlayer.addEventListener("play", (event) => {
    if (!serverEvent) {
        if (throttleTimeout) clearTimeout(throttleTimeout);

        throttleTimeout = setTimeout(() => {
            socket.emit("play_video", videoPlayer.currentTime, roomName);
        }, 200);
    }
});

videoPlayer.addEventListener("pause", (event) => {
    if (!serverEvent) {
        if (throttleTimeout) clearTimeout(throttleTimeout);

        throttleTimeout = setTimeout(() => {
            socket.emit("pause_video", videoPlayer.currentTime, roomName);
        }, 200);
    }
});

videoPlayer.addEventListener("seeked", (event) => {
    if (!serverEvent) {
        if (throttleTimeout) clearTimeout(throttleTimeout);

        throttleTimeout = setTimeout(() => {
            socket.emit("seek_video", videoPlayer.currentTime, roomName);
        }, 200);
    }
});