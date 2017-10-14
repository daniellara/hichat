var socket = io();
socket.on('connect', function() {
    console.log('Connected to server');
});

socket.on('disconnect', function() {
    console.log('Bye bye...');
});

socket.on('newMessage', function(message) {
    console.log('New message received:', message);
});

socket.on('welcomeMessage', function(message) {
    console.log(message.text);
});