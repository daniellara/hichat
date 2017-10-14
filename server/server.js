const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const utils = require('./utils/message');

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

const port = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, '../public')));

io.on('connection', (socket) => {
    console.log('New user connected');

    socket.emit('newMessage', utils.generateMessage('Admin', 'Welcome to Hi-Chat!'));

    socket.broadcast.emit('newMessage', utils.generateMessage('Admin', 'An user has joined to Hi-Chat!'));

    socket.on('createMessage', (message) => {
        console.log('New message received:', message);
        io.emit('newMessage', utils.generateMessage(message.from, message.text));
    });

    socket.on('disconnect', () => {
        console.log('User disconnected');
    });
});

server.listen(port, () => {
    console.log(`Server up and running in port: ${port}`);
});