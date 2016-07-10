var express = require('express')
var app = express()
var bodyParser = require('body-parser')

app.set('port', process.env.PORT || 3000)

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use(express.static(__dirname + '/public'))

app.get('/', function(req, res) {
  res.render('index')
})

app.get('/enter/:room/:scene', function(req, res){
  var name = './' + req.params.room
  var room = require(name)
  var i = req.params.scene
  var scene = room.scenes[i]
  res.send({scene: scene})
})

app.get('/refine/:room/:item', function(req, res){
  var name = './' + req.params.room
  var room = require(name)
  var item = req.params.item
  var message = room.interactions[item].message
  var choices = room.interactions[item].choices
  res.send({message: message, choices: choices})
})

app.listen(app.get('port'), function() {
    console.log('Listening on port: ' + app.get('port'))
})