
const WS_PROTO = "ws://"
const WS_ROUTE = "/echo"


function log(topic, message) {
  console.log('[' + topic + '] ' + message)
}

function wsMessageHandler(event) {
  const question = document.getElementById("question")
  const payload = JSON.parse(event.data)
  log("WS Response", "Received message: '" + event.data + "'")
  
  const bot_zone = document.getElementById("answer")
  const message = document.createElement("div")
  message.className = 'message'

  const contentElement = document.createElement("div")
  contentElement.className = 'content'
  contentElement.appendChild(document.createTextNode("VOUS:" + question.value))
  contentElement.appendChild(document.createElement("br"))
  contentElement.appendChild(document.createTextNode("TBOT: " + payload.message))
  message.appendChild(contentElement)
  let child = bot_zone.appendChild(message)
  question.value=""
  child.scrollIntoView()
 
}

function sendMessage(connection, message) {
  log("Client", "sending message \"" + message + "\"")
  log(connection.readyState)
  connection.send(message)
}

function openWebSocket() {
  connection = new WebSocket(WS_PROTO + "localhost:3000" + WS_ROUTE)
  connection.onerror = (error) => {
    log("WS err", error)
  }
  connection.onmessage = wsMessageHandler
  return connection
}

document.addEventListener('DOMContentLoaded', (e) => {
  const question = document.getElementById("question")
  const button = document.getElementById("bot-button")
  const connection = openWebSocket()
  button.addEventListener("click", (event) => {
    const payload = {
      message: question.value,
      forwho:'bot'
    }
    sendMessage(connection, JSON.stringify(payload))
    //question.value = "";
  })
  log("OnLoad", "Add event listeners")
})

