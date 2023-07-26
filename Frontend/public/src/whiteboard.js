// whiteboard.js
let isDrawing = false;
let lastX = 0;
let lastY = 0;

function drawLine(x1, y1, x2, y2) {
    const canvas = document.getElementById('drawcanvas');
    const canvasCtx = canvas.getContext('2d');
    canvasCtx.beginPath();
    canvasCtx.strokeStyle = 'black';
    canvasCtx.lineWidth = 2;
    canvasCtx.moveTo(x1, y1);
    canvasCtx.lineTo(x2, y2);
    canvasCtx.stroke();
    canvasCtx.closePath();
}

function drawAndEmit(x1, y1, x2, y2, roomName) {
    drawLine(x1, y1, x2, y2);
    socket.emit('drawing', { x1, y1, x2, y2, roomName });
}

const drawCanvas = document.getElementById('drawcanvas');
const toggleDrawCanvasButton = document.getElementById('toggleDrawCanvasButton');

toggleDrawCanvasButton.addEventListener('click', () => {
    if (drawCanvas.style.display === 'none') {
        // Show the draw canvas
        drawCanvas.style.display = 'block';
    } else {
        // Hide the draw canvas
        drawCanvas.style.display = 'none';
    }
});

window.onload = () => {
    const canvas = document.getElementById('drawcanvas');
    canvas.addEventListener('mousedown', (e) => {
        isDrawing = true;
        [lastX, lastY] = [e.offsetX, e.offsetY];

        // Emit a 'start_drawing' event to the server when the drawing starts
        socket.emit('start_drawing', { x: lastX, y: lastY, roomName });
    });

    canvas.addEventListener('mousemove', (e) => {
        if (!isDrawing) return;
        const x = e.offsetX;
        const y = e.offsetY;
        drawAndEmit(lastX, lastY, x, y, roomName);
        [lastX, lastY] = [x, y];
    });

    canvas.addEventListener('mouseup', () => {
        isDrawing = false;
    });

    canvas.addEventListener('mouseleave', () => {
        isDrawing = false;
    });

    // // In the client-side code, after the Socket.IO connection is established
    socket.on('drawing', (data) => {
        drawLine(data.x1, data.y1, data.x2, data.y2);
    });

    socket.on('start_drawing', (data) => {
        [lastX, lastY] = [data.x, data.y];
        isDrawing = true;
    });
};
