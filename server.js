var socket = require('socket.io-client')('http://indra.webfactional.com')
  , spawn = require('child_process').spawn
  , key = require('./config.js')
  , Kefir = require('kefir')

var SerialPort = require('serialport').SerialPort
var serialPort = new SerialPort('/dev/ttyAMA0', {baudrate: 19200 })   
var Printer = require('thermalprinter');

function logError (e) {
  console.log('--------err--------')
  console.log(e)
}

var printerS = Kefir.stream(function (e) {
  serialPort.on('open', function () {
    var printer = new Printer(serialPort)
    printer.on('ready', function () {
      e.emit(printer)
    })
  })
})

printerS.onError(logError)

var socketS = Kefir.stream(function (e) {
  socket.on('connect', function () {
    e.emit(socket)
  })
})

socketS.onError(logError)

// setup listener
function printOnEvent (socket, printer) {
  socket.on(key, function (msg) {
    printer.printLine(msg.message).printLine('').print()
  })
  return
}

socketS.combine(printerS, printOnEvent).log('ready')
