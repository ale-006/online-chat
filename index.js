const express = require("express");
const app = express()
const http = require("http").Server(app)
const io = require("socket.io")(http)
const db = require("quick.db")

app.set("view engine", "ejs")
app.use("/static", express.static("static"))
app.set("views", "./static")

app.get("/", (req, res) => {
  let msgs = db.get("msgs")
  res.render("index.ejs", {
    msgs
  })
});

app.get("/reset", (req, res) => {
  if(req.query.k == "99") {
    db.delete("msgs")
    res.send("ok")
  } else {
    res.send("incorrect key")
  }
})

io.on("connection", (socket) => {
  socket.on("message", msg => {
    io.emit("message", msg)
    db.push("msgs", {
      text: msg[0],
      author: msg[1],
      color: msg[2],
      date: msg[3]
    })
  })
  socket.on("welcome", msg => {
    io.emit("welcome", msg)
    db.push("msgs", {
      text: (msg[0] || "\"Persona anonima\"") + " è entrat* in chat! 👋",
      author: null,
      color: "#4ff02b",
      date: msg[1]
    })
  })
})

http.listen(3000, () => console.log(`http://localhost:3000/`))