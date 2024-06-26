const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors'); // Import the cors package

const app = express();
const httpServer = http.createServer(app); // Create an HTTP server instance
const io = socketIo(httpServer, {
    cors: {
        origin: '*', // Allow all origins for testing purposes
        methods: ['GET', 'POST'],
        allowedHeaders: ['Content-Type'],
        credentials: true
    }
});

app.use(cors()); // Use the cors middleware
let currentOnline = 0
io.on('connection', (socket) => {
    console.log('A user connected');
    currentOnline++;
    socket.on('chat message', (msg) => {
        io.emit('chat message', msg);
        console.log(msg);
    });
    io.emit('current online',currentOnline)

    socket.on('disconnect', () => {
        currentOnline--;
        console.log('User disconnected');
    });
});

const PORT = process.env.PORT || 3000;
httpServer.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
