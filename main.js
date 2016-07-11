var express = require('express')
var app = express()
var bodyParser = require('body-parser')
var shuffle = require('./shuffle')

app.set('port', process.env.PORT || 3000)

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use(express.static(__dirname + '/public'))

app.get('/', function(req, res) {
  res.render('index')
})

//not a complete list; just the possible starting rooms
app.get('/rooms', function(req, res){
    var rooms = [
      {
        name: 'dining room',
        description: 'The dining room comprises a massive communal TABLE, long enough to seat forty guests. At the head and foot of this table are two rather tense-looking persons; their utensils stick up from clenched fists, and their food is untouched.'
      },
      {
        name: 'root cellar',
        description: 'ROOT CELLAR'
      },
      {
        name: 'storm cellar',
        description: 'STORM CELLAR'
      },
      {
        name: 'wine cellar',
        description: 'WINE CELLAR'
      }
    ]
    var shuffled = shuffle(rooms)
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

app.listen(app.get('port'), function() {
    console.log('Listening on port: ' + app.get('port'))
})