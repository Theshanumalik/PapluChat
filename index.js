const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const socketio = require("socket.io");
const io = socketio(server);
const user = {};
app.use(express.static('frontend'))
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/frontend/index.html');
});
io.on('connection', (socket) => {
    socket.on('new-user-joined', (name)=>{
      user[socket.id] = name;
      console.log(name, 'connected')
      socket.broadcast.emit('user-connected', name);
    })
    socket.on('chat message', (msg) => {
        console.log(user[socket.id]+ ' '+ msg);
        socket.broadcast.emit('messege', {msg, name: user[socket.id]});
    });
  socket.on('disconnect', ()=>{
      console.log('Disconnected', user[socket.id]);
      socket.broadcast.emit('user-leave', {msg: ' has left', name: user[socket.id]});
  } )
});
app.get('/notexist', (req, res)=>{
  res.sendFile(__dirname + '/frontend/invalid.html');
})
server.listen(3000, () => {
  console.log('listening on *:3000');
});