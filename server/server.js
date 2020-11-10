require('./config/config');

const express = require('express');
const path = require('path');
const socketIO = require('socket.io');
const http = require('http');

const app = express();
const server = http.createServer(app);

// Enable public folder.
app.use(express.static(path.resolve(__dirname, '../public')));

// io => backend communication.
const io = socketIO(server);

io.on('connection', (client) => {
    console.log('User has been connected!');
    // *************************
    // on: Listen information.
    // emit: Send information.
    // *************************
    client.emit('sendMessageServer', { user: 'Admin', message: 'Welcome'})

    client.on('disconnect', () => {
        console.log('User disconnected!');
    })

    client.on('sendMessageClient', (data) => {
        console.log(data);
    });
})




server.listen(process.env.PORT, () => console.log('Listening port:', process.env.PORT));