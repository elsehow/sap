var socket = require('socket.io-client')('http://indra.webfactional.com')
  , spawn = require('child_process').spawn
  , key = require('./config.js')

function daemon () {
  return spawn('python', ['printer-daemon.py'])
}

// setup listener
function listen () {
  socket.on(key, function (msg) {
    daemon().stdin.write(msg.message)
  })
}

socket.on('connect', function () {
  listen()
  console.log('connected to indra, listening on key', key)
})
