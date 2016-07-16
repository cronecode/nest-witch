var serialport = require('serialport')// include the library
SerialPort = serialport.SerialPort // make a local instance of it
// get port name from port_name.js
portName = '/dev/cu.usbmodemFD111'

// list serial ports:
serialport.list(function (err, ports) {
  ports.forEach(function(port) {
    console.log(port.comName);
  });
});
