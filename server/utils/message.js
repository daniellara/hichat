function generateMessage(from, text) {
    return {
        from,
        text,
        createdAt: Date.now()
    }
};

function generateLocationMessage(from, latitude, longitude) {
    return {
        from,
        url: `https://www.google.com/maps?q=${latitude},${longitude}`,
        createdAt: Date.now()
    };
};

module.exports = {
    generateMessage,
    generateLocationMessage
}