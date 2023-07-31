// whiteboard.js

// 브러쉬 색상 선택 및 선굵기 선택
const color = document.getElementById('color'); // 브러쉬 색상 선택
const linewidth = document.querySelector('#line-width'); // 선 굵기 조절

let isDrawing = false;
let lastX = 0;
let lastY = 0;

function drawLine(x1, y1, x2, y2) {
    const canvas = document.getElementById('drawcanvas');
    const canvasCtx = canvas.getContext('2d');
    canvasCtx.beginPath();
    canvasCtx.strokeStyle = color.value;
    canvasCtx.lineWidth = linewidth.value;
    canvasCtx.moveTo(x1, y1);
    canvasCtx.lineTo(x2, y2);
    canvasCtx.stroke();
    canvasCtx.closePath();
}

function drawAndEmit(x1, y1, x2, y2, roomName) {
    drawLine(x1, y1, x2, y2);
    socket.emit('drawing', { x1, y1, x2, y2, roomName });
}

// 지우개
function clearCanvas() {
    const canvas = document.getElementById('drawcanvas');
    const canvasCtx = canvas.getContext('2d');
    canvasCtx.clearRect(0, 0, canvas.width, canvas.height);
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

    // In the client-side code, after the Socket.IO connection is established
    socket.on('drawing', (data) => {
        drawLine(data.x1, data.y1, data.x2, data.y2);
    });


    // 지우개
    const clearCanvasButton = document.getElementById('clearCanvasButton');
    clearCanvasButton.addEventListener('click', () => {
        clearCanvas();
        socket.emit('clear_canvas', roomName);
    });

    socket.on('clear_canvas', () => {
        clearCanvas();
    });

};

/* 변경된 선 굵기 값을 적용 받게 하는 함수 */
function handleChangeWidth(event) {
    canvasCtx.linewidth = event.target.value;
}

/* 변경된 색상 값을 적용 받게 하는 함수 */
function handleChangeColor(event) {
    canvasCtx.strokeStyle = event.target.value; // 선 색상 변경
    canvasCtx.fillStyle = event.target.value; // 채우기 색상 변경
}

linewidth.addEventListener("change", handleChangeWidth);
color.addEventListener("change", handleChangeColor);