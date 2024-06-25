const express = require('express');
const http = require('http').Server(express);
const socketIo = require('socket.io');

const app = express();
const io = require('socket.io')(http,{
    cors:{origin:"*"}
});

io.on('connection', (socket) => {
    console.log('a user connected');

    socket.on('chat message', (msg) => {
        io.emit('chat message', msg);
        console.log(msg)

    });

    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
});

const PORT = process.env.PORT || 3000;
http.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
