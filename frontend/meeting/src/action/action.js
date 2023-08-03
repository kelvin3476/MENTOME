let isResizing = false;
let isDragging = false;
let offsetX, offsetY;
let videoContainer = document.querySelector('.video-container');
let resizer = document.querySelector('.resizer');

resizer.addEventListener('mousedown', initResize, false);
videoContainer.addEventListener('mousedown', initDrag, false);

function initResize(e) {
    e.preventDefault();
    e.stopPropagation(); // Stop event bubbling

    isResizing = true;
    window.addEventListener('mousemove', resize, false);
    window.addEventListener('mouseup', stopResize, false);
}

function resize(e) {
    if (!isResizing) return;
    videoContainer.style.width = e.clientX - videoContainer.offsetLeft + 'px';
    videoContainer.style.height = e.clientY - videoContainer.offsetTop + 'px';
    // 동영상1 리사이즈, 드래그 동기화
    socket.emit("resize_video_container", { width: videoContainer.style.width, height: videoContainer.style.height }, roomName);
}

function stopResize() {
    isResizing = false;
    window.removeEventListener('mousemove', resize, false);
    window.removeEventListener('mouseup', stopResize, false);
}

function initDrag(e) {
    if (e.target === resizer) return; // Prevent drag when resizing
    e.preventDefault();
    e.stopPropagation(); // Stop event bubbling

    isDragging = true;
    offsetX = e.clientX - videoContainer.offsetLeft;
    offsetY = e.clientY - videoContainer.offsetTop;
    window.addEventListener('mousemove', drag, false);
    window.addEventListener('mouseup', stopDrag, false);
}

function drag(e) {
    if (!isDragging) return;
    videoContainer.style.left = e.clientX - offsetX + 'px';
    videoContainer.style.top = e.clientY - offsetY + 'px';
    // 동영상1 리사이즈, 드래그 동기화
    socket.emit("drag_video_container", { left: videoContainer.style.left, top: videoContainer.style.top }, roomName);
}

function stopDrag() {
    isDragging = false;
    window.removeEventListener('mousemove', drag, false);
    window.removeEventListener('mouseup', stopDrag, false);
}


// 동영상1 리사이즈, 드래그 동기화
socket.on("resize_video_container", (data) => {
    videoContainer.style.width = data.width;
    videoContainer.style.height = data.height;
});

socket.on("drag_video_container", (data) => {
    videoContainer.style.left = data.left;
    videoContainer.style.top = data.top;
});