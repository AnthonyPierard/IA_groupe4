const WS_PROTOS = "ws://"
const WS_ROUTES = "/echogame"


function logs(topic, message) {
  console.log('[' + topic + '] ' + message)
}

function wsMessageHandlers(event) {
  //TODO : traiter une fois qu'on reçois
  child.scrollIntoView()
}

function sendMessages(connections, message) {
  logs("Client", "sending message \"" + message + "\"")
  connections.send(message)
}

function openWebSockets() {
  connections = new WebSocket(WS_PROTOS + "localhost:4000" + WS_ROUTES)
  connections.onerror = (error) => {
    logs("WS", error)
  }
  connections.onmessage = wsMessageHandler
  return connections
}

