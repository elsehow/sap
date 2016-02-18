var socket = require('socket.io-client')('http://indra.webfactional.com')
  , spawn = require('child_process').spawn
  , key = require('./config.js')
  , Kefir = require('kefir')
  , SerialPort = require('serialport').SerialPort
  , serialPort = new SerialPort('/dev/ttyAMA0', {baudrate: 19200 })   
  , Printer = require('thermalprinter');

function logError (e) {
  console.log('--------err--------')
  console.log(e)
}

// a stream of printer objects
// which come through when printer is ready to print
var printerS = Kefir.stream(function (e) {
  serialPort.on('open', function () {
    var printer = new Printer(serialPort)
    printer.on('ready', function () {
      e.emit(printer)
    })
  })
})

// a stream of socket objects 
// which come through when socket connects to server
var socketS = Kefir.stream(function (e) {
  socket.on('connect', function () {
    e.emit(socket)
  })
})

// setup listener that prints on event
function printOnEvent (socket, printer) {
  socket.on(key, function (msg) {
    printer.printLine(msg.message).printLine('\n\n').print()
  })
  return
}

// log errors
socketS.onError(logError)
printerS.onError(logError)
// set up listener when printer and socket are both ready
socketS.combine(printerS, printOnEvent).log('connected to server + printer - ready to print')
