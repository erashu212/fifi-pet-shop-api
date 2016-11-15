module.exports = (io) => {
    io.on('connection', (client) => {

        client.on('event', (data) => { });

        client.on('disconnect', () => {
        });
    })
}