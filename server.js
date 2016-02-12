var socket = require('socket.io-client')('http://indra.webfactional.com')
  , exec = require('child_process').exec
  , key = require('./config.js')

// format a string for passing over command line
// by adding quotes to it
function format (str) {
  return "\"" + str + "\""
}


// setup listener
function listen () {
  socket.on(key, function (msg) {
    console.log('heard', msg)
    exec('python printer-daemon.py ' + format(msg.message), function (err, _) {
      if (err) console.log('error printing!!', err)
    })
  })
}

socket.on('connect', function () {
  listen()
  console.log('connected to indra, listening on key', key)
})
