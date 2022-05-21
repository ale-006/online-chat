var nickk;
var socket = io();

var messages = document.getElementById('messages');
var form = document.getElementById('form');
var input = document.getElementById('input');
var color = document.getElementById("color")
var nickname = document.getElementById("nick")

form.addEventListener('submit', function(e) {
    e.preventDefault();
    if(!nickname.value) {
      alert("⚠️ Devi inserire un nickname per poter inviare messaggi!")
    }
    if(input.value && nickname.value) {
        let inp;
        if(document.getElementById("nov").checked) {
            inp = input.value.replace("a", "").replace("e", "").replace("i", "").replace("o", "").replace("u", "")
        } else {
            inp = input.value
        }
      let info = [inp, nickname.value, color.value]
      socket.emit('message', info);
      input.value = '';
      input.click()
    }
});

socket.on('message', function(msg) {
    var item = document.createElement('li');
    item.textContent = msg[1] + ": " + msg[0];
    item.style.backgroundColor = msg[2]
    messages.appendChild(item);
    window.scrollTo(0, document.body.scrollHeight + 55);
});

socket.on("welcome", function(nick) {
  var item = document.createElement("li")
  item.textContent = (nick || "\"Persona anonima\"") + " è entrat* in chat! 👋"
  item.style.backgroundColor = "#4ff02b"
  messages.appendChild(item)
  window.scrollTo(0, document.body.scrollHeight + 55)
})

function sendWelcome() {
  let nickname = prompt("👋 Ciao! Inserisci un nickname per continuare...")
  socket.emit("welcome", nickname)
  nickk = nickname
  document.getElementById("nick").value = nickname
}