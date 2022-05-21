const WS_PROTOS = "ws://"
const WS_ROUTES = "/echogame"


function logIA(topic, message) {
  console.log('[' + topic + '] ' + message)
}

function wsMessageIAHandler(event) {
  log("WS_IA Response", "Received message: '" + event.data + "'")
}

function sendIAMessage(connection, message) {
  logIA("Client", "sending message \"" + message + "\"")
  logIA("Connection IA STATE" + connection.readyState)
  connection.send(message)
}

function openIAWebSocket() {
  connection = new WebSocket(WS_PROTOS + "localhost:4000" + WS_ROUTES)
  connection.onerror = (error) => {
    log("WS IA err", error)
  }
  connection.onmessage = wsMessageIAHandler
  return connection
}


