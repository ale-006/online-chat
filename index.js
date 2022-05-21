const express = require('express');
const app = express()
const http = require('http').Server(app);
const io = require('socket.io')(http);
const port = 3000;

app.use("/static", express.static("static"))

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {
  socket.on('message', msg => {
    io.emit('message', msg);
  });
  socket.on("welcome", msg => {
    io.emit("welcome", msg)
  })
});

http.listen(port, () => {
  console.log(`http://localhost:${port}/`);
});