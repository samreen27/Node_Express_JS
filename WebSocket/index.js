const express = require('express')
const http = require('http')
const { Server } = require('socket.io')

const app = express()
const server = http.createServer(app)

//This Server instance io will handle all socket requests and express will handle http requests
const io = new Server(server)

app.use(express.static('./public'))

// app.get('/', (req, res) => {
//     res.sendFile(__dirname + '/index.html');
//   });

//socket.io
io.on('connection', (socket) => {
    console.log('A new User is connected', socket.id)
    socket.on('disconnect', () => {
        console.log('user disconnected');
      });
    socket.on("chat message",(message)=> {
        io.emit("server-message", message)
        //socket.broadcast.emit(message)
        console.log("A message from user::",message)})

})





server.listen(3000, ()=> console.log('Server started at 3000'))