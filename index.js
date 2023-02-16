const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const logger = require('morgan');
const debug = require('debug')('serverdesktop:server');
const http = require('http');
const mongoose = require("mongoose");

process.env.APP_BASE_URL = __dirname;

const { file } = require("./app/modules");
file.useenv();

const app = express();

app.use(cors({origin:"*"}))
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
// app.use(express.static(path.join(__dirname, 'public')));

const { UserController, SocketController } = require('./app/controllers');

const { route } = require("./app/routes");
route.use(app);

mongoose.connect(process.env.MONGO_DATABASE_URL, (err) => {
    const dbState = [{
        value: 0,
        label: "Disconnected"
    }, {
        value: 1,
        label: "Connected"
    }, {
        value: 2,
        label: "Connecting"
    }, {
        value: 3,
        label: "Disconnecting"
    }], state = mongoose.connection.readyState;
    console.log(dbState.find(f => f.value == state).label); // connected to db
});

var port = process.env.PORT || '3001';
app.set('port', port);
var server = http.createServer(app);
server.listen(port);
server.on('listening', () => console.log(`Http server started on port ${port}`));
SocketController.start(process.env.SOCKET_PORT || '3002');