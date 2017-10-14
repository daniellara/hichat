const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

const port = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, '../public')));

io.on('connection', (socket) => {
    console.log('New user connected');

    socket.emit('welcomeMessage', {
        from: 'Admin',
        text: 'Welcome to Hi-chat'
    });

    socket.broadcast.emit('welcomeMessage', {
        from: 'Admin',
        text: 'An user has join to the chat'
    });

    socket.on('createMessage', (message) => {
        console.log('New message received:', message);
        io.emit('newMessage', {
            from: message.from,
            text: message.text,
            createdAt: Date.now()
        });
    });

    socket.on('disconnect', () => {
        console.log('User disconnected');
    });
});

server.listen(port, () => {
    console.log(`Server up and running in port: ${port}`);
});