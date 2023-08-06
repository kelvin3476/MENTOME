const form = welcome.querySelector('form');
const room = document.getElementById('room');
const userName = document.cookie.split('; ').find(row => row.startsWith('logInUser=')).split('=')[1];

room.hidden = true;

function addMessage(message) {
    const p = room.querySelector('p');
    const li = document.createElement('li');
    li.innerText = message;
    p.appendChild(li);
}

function handleMessageSubmit(event) {
    event.preventDefault();
    const input = room.querySelector('#msg input');
    const value = input.value;
    socket.emit('new_message', input.value, roomName, () => {
        addMessage(`${userName}: ${value}`);
    });
    input.value = '';
}

function handleNicknameSubmit(event) {
    event.preventDefault();
    const input = room.querySelector('#name input');
    socket.emit('nickname', input.value);
}

function handleToggleChat() {
    let div = document.getElementById('chat-info');
    if (div.style.display === 'none') {
        div.style.display = 'block';
    } else {
        div.style.display = 'none';
    }
}

function showRoom() {
    welcome.hidden = true;
    room.hidden = false;
    const h3 = room.querySelector('h3');
    h3.innerText = `${roomName}`;
    const msgForm = room.querySelector('#msg');
    const nameForm = room.querySelector('#name');
    msgForm.addEventListener('submit', handleMessageSubmit);
    nameForm.addEventListener('submit', handleNicknameSubmit);

    // 파일 업로드 관련
    fileUploadForm.style.display = 'block';
    fileUploadForm2.style.display = 'block';

    // pose (스켈레톤) 이미지 관련
    video.addEventListener('loadedmetadata', function () {
        canvasCtx5.width = video.videoWidth;
        canvasCtx5.height = video.videoHeight;
    });
}

function handleRoomSubmit() {
    socket.emit('enter_room', roomName, showRoom);
}

form.addEventListener('submit', handleRoomSubmit);

socket.on('welcome', (user, newCount) => {
    const h3 = room.querySelector('h3');
    // h3.innerText = `Room ${roomName} (${newCount})`;
    h3.innerText = `Room ${roomName}`;
    // addMessage(`${user} arrived!`);
});

socket.on('bye', (left, newCount) => {
    const h3 = room.querySelector('h3');
    // h3.innerText = `Room ${roomName} (${newCount})`;
    h3.innerText = `Room ${roomName}`;
    addMessage(`${left} left ㅠㅠ`);
});

socket.on('new_message', addMessage);

socket.on('room_change', (rooms) => {
    const roomList = welcome.querySelector('p');
    roomList.innerHTML = '';
    if (rooms.length === 0) {
        return;
    }
    rooms.forEach((room) => {
        const li = document.createElement('li');
        li.innerText = room;
        roomList.append(li);
    });
});