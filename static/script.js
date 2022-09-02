var nickk;
var socket = io();
var daLeggere = 0
var chat = {
  startDate: new Date().getTime(),
  stopDate: null,
  messages: []
}

var messages = document.getElementById('messages');
var form = document.getElementById('form');
var input = document.getElementById('input');
var color = document.getElementById("color")
var nickname = document.getElementById("nick")
var m = ["gennaio", "febbraio", "marzo", "aprile", "maggio", "giugno", "luglio", "agosto", "settembre", "ottobre", "novembre", "dicembre"]

form.addEventListener('submit', function(e) {
    e.preventDefault();
    if(!nickname.value) {
      alert("⚠️ Devi inserire un nickname per poter inviare messaggi!")
    }
    if(input.value && nickname.value) {
      let m = ["gennaio", "febbraio", "marzo", "aprile", "maggio", "giugno", "luglio", "agosto", "settembre", "ottobre", "novembre", "dicembre"]
        let inp = "";
        if(document.getElementById("nov").checked) {
          let args = input.value.split(/\s+/)
          args.forEach(a => {
            let aa = a.replace(/[aeiou]/g, "")
            inp += " []" + aa
          })
        } else {
            inp = input.value
        }
      let info = [inp, nickname.value, color.value, new Date().getDate()+" "+m[new Date().getMonth()]+" "+new Date().getFullYear()+" - "+new Date().getHours()+":"+new Date().getMinutes()]
      socket.emit('message', info);
      input.value = '';
      input.click()
    }
});

socket.on('message', function(msg) {
  let m = ["gennaio", "febbraio", "marzo", "aprile", "maggio", "giugno", "luglio", "agosto", "settembre", "ottobre", "novembre", "dicembre"]
  let h = `<div style="background-color: ${msg[2]}"><p>${msg[1]}: ${msg[0]}</p><br><p class="time">${new Date().getDate()+" "+m[new Date().getMonth()]+" "+new Date().getFullYear()+" - "+new Date().getHours()+":"+new Date().getMinutes()}</p></div>`
    messages.innerHTML += h
    window.scrollTo(0, document.body.scrollHeight + 55);
    if(document.visibilityState == "hidden") {
      daLeggere++
      document.title = `(${daLeggere}) chat-online`
    }
    chat.messages.push({
      author: msg[1],
      text: msg[0],
      time: new Date().getTime()
    })
});

socket.on("welcome", function(data) {
  let h = `<div style="background-color: #4ff02b"><p>${data[0] || "\"Persona anonima\""} è entrat* in chat! 👋</p><br><p class="time">${new Date().getDate()+" "+m[new Date().getMonth()]+" "+new Date().getFullYear()+" - "+new Date().getHours()+":"+new Date().getMinutes()}</p></div>`
  messages.innerHTML += h
  window.scrollTo(0, document.body.scrollHeight + 55)
})

function sendWelcome() {
  let nickname = prompt("👋 Ciao! Inserisci un nickname per continuare...")
  let m = ["gennaio", "febbraio", "marzo", "aprile", "maggio", "giugno", "luglio", "agosto", "settembre", "ottobre", "novembre", "dicembre"]
  socket.emit("welcome", [nickname, new Date().getDate()+" "+m[new Date().getMonth()]+" "+new Date().getFullYear()+" - "+new Date().getHours()+":"+new Date().getMinutes()])
  nickk = nickname
  document.getElementById("nick").value = nickname
}

document.addEventListener("visibilitychange", e => {
  if(document.visibilityState == "visible") {
    document.title = "chat-online"
    daLeggere = 0
  }
})

let down = document.getElementById("download")
down.addEventListener("click", e => {
  chat.stopDate = new Date().getTime()
  let w = window.open("./chat.html", "__blank")
  w.document.write(JSON.stringify(chat))
})