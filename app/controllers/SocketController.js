var http = require('http');
const server = http.createServer();
const io = require('socket.io')(server);

const start = ( port ) => {
    server.listen(port, () => {
        console.log(`Socket Server running on port ${port}`);
    });
}

const useSocket = (req, res, next) => {
    req.io = io;
    next();
}

io.on("connection", (socket) => {
    io.emit("user-connected", { id: socket.id });
    io.to("socket-id").emit("user-connected", { id: socket.id });
})

module.exports = {
    start,
    useSocket,
    io
}
