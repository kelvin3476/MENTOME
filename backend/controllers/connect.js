const User = require('../models/user');

exports.connectManagement = io => {
    io.on('connection', socket => {
        console.log('Connected User :', socket.id);
    
        socket.on('sendMessageToServer', (message) => {
            io.emit('sendMessageToClient', message);
        });

        socket.on('sendRoomMessageToServer', (message) => {
            let userRoom = getUserRoom(socket);
            io.to(userRoom).emit('sendRoomMessageToClient', message);
        });

        socket.on('joinRoom', (name) => {
            let roomName = 'Room_' + name;
            if (!socket.rooms.has(roomName)) {
                socket.rooms.add(roomName);
            }
            socket.join(roomName);
            io.to(roomName).emit('sendRoomMessageToClient', `${socket.id}님이 ${name}방에 입장하였습니다.`);
        });
    
        socket.on('disconnect', () => {
            console.log('Disconnected User :', socket.id);
        });
    });
};

const getRoomName = () => {
    const getCookies = req.get('Cookie');
    const cookies = Object.fromEntries(getCookies.split('; ').map(cookie => cookie.split('=')));
    if (cookies.logInUser) {
        User.findOne({ userId: cookies.logInUser })
            .then(user => {
                console.log(user.notice);
            });
    }
};

const getUserRoom = socket => {
    rooms = Array.from(socket.rooms);
    for (room of rooms) {
        if (room.includes('Room_')) {
            return room;
        }
    }
};
