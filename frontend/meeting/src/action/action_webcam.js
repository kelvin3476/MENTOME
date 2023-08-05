let isResizing_wb = false;
let myStream_wb = document.querySelector('#myStream');
let resizer_wb = document.querySelector('.wb_resizer');

resizer_wb.addEventListener('mousedown', initResize, false);

function initResize(e) {
    e.preventDefault();
    e.stopPropagation(); // Stop event bubbling

    isResizing_wb = true;
    window.addEventListener('mousemove', resize, false);
    window.addEventListener('mouseup', stopResize, false);
}

function resize(e) {
    if (!isResizing_wb) return;

    const newWidth = e.clientX - myStream_wb.offsetLeft;
    const newHeight = (newWidth /32) *9;

    // Apply styles to the video container, and videos
    myStream_wb.style.width = newWidth + 'px';
    myStream_wb.style.height = newHeight + 'px';

    let videos = myStream_wb.querySelectorAll('video');
    videos.forEach(function(video) {
        video.style.width = (newWidth / 2) + 'px';
        video.style.height = newHeight + 'px';
    });
    
    
    const webcamData = {
        width: newWidth,
        height: newHeight,
        videoWidth: (newWidth / 2),
        videoHeight: newHeight
    };
    socket.emit("resize_wb",webcamData,roomName);
    
}

function stopResize() {
    isResizing_wb = false;
    window.removeEventListener('mousemove', resize, false);
    window.removeEventListener('mouseup', stopResize, false);
}


// 클라이언트 코드
socket.on('resize_wb', function(webcamData) {
    myStream_wb.style.width = webcamData.width + 'px';
    myStream_wb.style.height = webcamData.height + 'px';

    let videos = myStream_wb.querySelectorAll('video');
    videos.forEach(function(video) {
        video.style.width = webcamData.videoWidth + 'px';
        video.style.height = webcamData.videoHeight + 'px';
    });
});
