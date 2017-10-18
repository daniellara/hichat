const expect = require('expect');

const utils = require('../../utils/message');

describe('Utils testing', () => {
    it('should create the correct message object', () => {
        const message = utils.generateMessage('Person', 'Test text');
        expect(message.from).toBe('Person');
        expect(message.text).toBe('Test text');
        expect(message.createdAt).toBeA('number');
    });

    it('should create the correct geolocation message', () => {
        const geolocationMessage = utils.generateLocationMessage('Admin', 1, 1);
        expect(geolocationMessage.from).toBe('Admin');
        expect(geolocationMessage.url).toBe('https://www.google.com/maps?q=1,1');
        expect(geolocationMessage.createdAt).toBeA('number');
    });
});