var express = require('express')
var app = express()
var bodyParser = require('body-parser')
var shuffle = require('./shuffle')

app.set('port', process.env.PORT || 3000)

app.listen(app.get('port'), function() {
    console.log('Listening on port: ' + app.get('port'))
})
/*
var serialport = require('serialport')// include the library
SerialPort = serialport.SerialPort // make a local instance of it
// get port name from port_name.js
portName = '/dev/cu.usbmodemFD111'

var myPort = new SerialPort(portName, {
   baudRate: 9600,
   // look for return and newline at the end of each data packet:
   parser: serialport.parsers.readline("\n")
})

myPort.on('open', showPortOpen)
myPort.on('close', showPortClose)
myPort.on('error', showError)

function showPortOpen() {
   console.log('Serial Port open. Data rate: ' + myPort.options.baudRate)
}
 
function showPortClose() {
   console.log('Serial Port closed.')
}
 
function showError(error) {
   console.log('Serial port error: ' + error)
}
*/
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use(express.static(__dirname + '/public'))

app.get('/', function(req, res) {
  res.render('index')
})

//not a complete list; just the possible starting rooms
//dining room, tepidarium, storm cellar, powder room, boudoir, sacristy, 
app.get('/rooms', function(req, res){
    var rooms = [
      {
        name: 'dining-room',
        description: 'Eat stuff'
      },
      {
        name: 'root-cellar',
        description: 'Store stuff'
      },
      {
        name: 'storm-cellar',
        description: 'Protect stuff'
      },
      {
        name: 'wine-cellar',
        description: 'Drink stuff'
      },
      {
        name: 'sacristy',
        description: 'Worship stuff'
      },
      {
        name: 'shrine',
        description: 'Worship other stuff'
      },
      {
        name: 'thunderdome',
        description: 'Fight stuff'
      },
      {
        name: 'fainting-room',
        description: 'Pass out on stuff'
      },
      {
        name: 'torture-chamber',
        description: 'SUFFER'
      },
      {
        name: 'control-room',
        description: 'OBEY'
      }
    ]

    console.log(rooms)
    var shuffled = shuffle(rooms)
    console.log(shuffled)
    res.send({rooms: shuffled})
})

app.post('/enter', function(req, res){
  var name = './' + req.body.room
  var room = require(name)
  var i = Number(req.body.scene)
  var scene = room.scenes[i]
  res.send({description: scene.description})
})

app.post('/refine', function(req, res){
  var name = './' + req.body.room
  var room = require(name)
  var item = req.body.item
  var message = room.interactions[item].message
  var choices = room.interactions[item].choices
  res.send({message: message, choices: choices})
})

/* ending index
0 sphinx
1 beelzebub
2 redacted
3 wallpaper
4 hot chick
5 poop joke
6 cannibals
7 minotaur
8 unicorn
9 contract law
*/

app.post('/end', function(req, res){
  console.log(req.body)
  var ending = req.body.ending
  console.log('Print ending ' + ending)
  //myPort.write(ending)
  res.send({status: 200})
})