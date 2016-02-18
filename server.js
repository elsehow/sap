var socket = require('socket.io-client')('http://indra.webfactional.com')
  , spawn = require('child_process').spawn
  , key = require('./config.js')
  , Kefir = require('kefir')

var SerialPort = require('serialport').SerialPort
var serialPort = new SerialPort('/dev/ttyAMA0', {baudrate: 19200 })   
var Printer = require('thermalprinter');

var printerS = Kefir.stream(function (e) {
  serialPort.on('open', function () {
    var printer = new Printer(serialPort)
    printer.on('ready', function () {
      emitter.emit(printer)
    })
  })
}

var socketS = Kefir.stream(function (e) {
  socket.on('connect', function () {
    emitter.emit(socket)
  })
})

// setup listener
function printOnEvent (printer, socket) {
  socket.on(key, function (msg) {
    printer.printLine(msg.message).print()
  })
  console.log('ready')
}


printerS.combine(socketS, printOnEvent)
