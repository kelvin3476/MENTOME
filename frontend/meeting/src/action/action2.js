let isResizing2 = false;
let isDragging2 = false;
let offsetX2, offsetY2;

let videoContainer2 = document.getElementById('uploadedFile2');
let resizer2 = videoContainer2.querySelector('.resizer2');

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
    videoContainer2.style.top = ev.clientY - 365 - offsetY2 + 'px';
}

function stopDrag2() {
    isDragging2 = false;
    window.removeEventListener('mousemove', drag2, false);
    window.removeEventListener('mouseup', stopDrag2, false);
}
