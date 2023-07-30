const socket = io();


const messages = document.getElementById('messages');
const sendMessage = document.getElementById('sendMessage');
const messageInput = document.getElementById('messageInput');
const sendRoomMessage = document.getElementById('sendRoomMessage');
const roomMessageInput = document.getElementById('roomMessageInput');
const joinRoom = document.getElementById('joinRoom');
const roomName = document.getElementById('roomName');



sendMessage.addEventListener('submit', event => {
    event.preventDefault();
    if (messageInput.value) {
        socket.emit('sendMessageToServer', messageInput.value);
        messageInput.value = '';
    }
});

socket.on('sendMessageToClient', message => {
    let item = document.createElement('li');
    item.textContent = message;
    messages.appendChild(item);
});

sendRoomMessage.addEventListener('submit', event => {
    event.preventDefault();
    if (roomMessageInput.value) {
        socket.emit('sendRoomMessageToServer', roomMessageInput.value);
        roomMessageInput.value = '';
    }
});

socket.on('sendRoomMessageToClient', message => {
    let item = document.createElement('li');
    item.textContent = message;
    messages.appendChild(item);
});

joinRoom.addEventListener('submit', event => {
    event.preventDefault();
    if (roomName.value) {
        socket.emit('joinRoom', roomName.value);
        roomName.value = '';
    }
});

const autoJoinRoom = () => {
    const roomName = document.cookie;
    if (roomName) {
        console.log(roomName.split('=')[1]);
        socket.emit('joinRoom', roomName);
    }
}

