var socket = io();
socket.on('connect', function() {
    console.log('Connected to server');
});

socket.on('disconnect', function() {
    console.log('Bye bye...');
});

socket.on('newMessage', function(message) {
    console.log('New message received:', message);
    var li = jQuery('<li></<li>');
    li.text(`${message.from}: ${message.text}`);

    jQuery('#messages').append(li);
});

socket.on('newLocationMessage', function(message) {
    console.log('New message received:', message);
    var li = jQuery('<li></<li>');
    var a = jQuery('<a target="_blank">My location</a>')
    li.text(`${message.from}: `);
    a.attr('href', message.url);
    li.append(a);

    jQuery('#messages').append(li);
});

var messageTextBox = jQuery('[name=message]');

jQuery('#message-form').on('submit', function(e) {
    e.preventDefault();
    socket.emit('createMessage', {
        from: 'User',
        text: messageTextBox.val()
    }, function() {
        messageTextBox.val('');
    });
});

var locationButton = jQuery('#send-location');

locationButton.on('click', function() { 
    if(!navigator.geolocation) {
        return alert('Your browser does not support geolocation :´(');
    }
    locationButton.attr('disabled', 'disabled').text('Sending Location...');
    navigator.geolocation.getCurrentPosition(function(position) {
        socket.emit('createLocationMessage', {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
        });
        locationButton.removeAttr('disabled').text('Send Location');;
    }, function(err) {
        alert('Unable to fetch location');
        locationButton.removeAttr('disabled').text('Send Location');;
    });
});