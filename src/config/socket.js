const EventEmitter = require('events').EventEmitter;
const socketEmitter = new EventEmitter();

module.exports = {
    emitter: socketEmitter,
    socket: (io) => {
        io.on('connection', (client) => {

            client.on('event', (data) => { });

            client.on('disconnect', () => {
            });
        })

        socketEmitter.on('product:read', (product) => {
            io.sockets.emit('product:read')
        })

        socketEmitter.on('product:added', (product) => {
            io.sockets.emit('product:added', product)
        })

        socketEmitter.on('product:updated', (product) => {
            io.sockets.emit('product:updated', product)
        })

        socketEmitter.on('product:deleted', (product) => {
            io.sockets.emit('product:deleted', product)
        })

        return io;
    }
}