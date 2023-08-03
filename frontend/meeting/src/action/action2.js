let isResizing2 = false;
let isDragging2 = false;
let offsetX2, offsetY2;
let videoContainer2 = document.querySelector('.video-container2');
let resizer2 = document.querySelector('.resizer2');

resizer2.addEventListener('mousedown', initResize2, false);
videoContainer2.addEventListener('mousedown', initDrag2, false);

function initResize2(ev) {
    ev.preventDefault();
    ev.stopPropagation(); // Stop event bubbling

    isResizing2 = true;
    window.addEventListener('mousemove', resize2, false);
    window.addEventListener('mouseup', stopResize2, false);
}

function resize2(ev) {
    if (!isResizing2) return;
    videoContainer2.style.width = ev.clientX - videoContainer2.offsetLeft + 'px';
    videoContainer2.style.height = ev.clientY - videoContainer2.offsetTop + 'px';
    // 동영상2 리사이즈, 드래그 동기화
    socket.emit("resize_video_container2", { width: videoContainer2.style.width, height: videoContainer2.style.height }, roomName);
}

function stopResize2() {
    isResizing2 = false;
    window.removeEventListener('mousemove', resize2, false);
    window.removeEventListener('mouseup', stopResize2, false);
}

function initDrag2(ev) {
    if (ev.target === resizer2) return; // Prevent drag when resizing
    ev.preventDefault();
    ev.stopPropagation(); // Stop event bubbling

    isDragging2 = true;
    offsetX2 = ev.clientX - videoContainer2.offsetLeft;
    offsetY2 = ev.clientY - videoContainer2.offsetTop;
    window.addEventListener('mousemove', drag2, false);
    window.addEventListener('mouseup', stopDrag2, false);
}

function drag2(ev) {
    if (!isDragging2) return;
    videoContainer2.style.left = ev.clientX - offsetX2 + 'px';
    videoContainer2.style.top = ev.clientY - offsetY2 + 'px';
    // 동영상2 리사이즈, 드래그 동기화
    socket.emit("drag_video_container2", { left: videoContainer2.style.left, top: videoContainer2.style.top }, roomName);

}

function stopDrag2() {
    isDragging2 = false;
    window.removeEventListener('mousemove', drag2, false);
    window.removeEventListener('mouseup', stopDrag2, false);
}


// Listeners for synchronization of video 2
socket.on("resize_video_container2", (data) => {
    videoContainer2.style.width = data.width;
    videoContainer2.style.height = data.height;
});

socket.on("drag_video_container2", (data) => {
    videoContainer2.style.left = data.left;
    videoContainer2.style.top = data.top;
});