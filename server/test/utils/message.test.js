const expect = require('expect');

const utils = require('../../utils/message');

describe('Utils testing', () => {
    it('should create the correct message object', () => {
        const message = utils.generateMessage('Person', 'Test text');
        expect(message.from).toBe('Person');
        expect(message.text).toBe('Test text');
        expect(message.createdAt).toBeA('number');
    })
});