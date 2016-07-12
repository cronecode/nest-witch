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
        name: 'dining-room',
        description: 'The dining room comprises a massive communal TABLE, long enough to seat forty guests. At the head and foot of this table are two rather tense-looking persons; their utensils stick up from clenched fists, and their food is untouched.'
      },
      {
        name: 'root-cellar',
        description: 'ROOT CELLAR'
      },
      {
        name: 'storm-cellar',
        description: 'STORM CELLAR'
      },
      {
        name: 'wine-cellar',
        description: 'WINE CELLAR'
      },
      {
        name: 'fainting-room',
        description: 'The SOUND is irritating, certainly, but easily dampened by a few more glasses of the daring Shiraz. Your fellow diners have tastefully fainted into their appetizers.'
      },
      {
        name: 'torture-chamber',
        description: 'The SOUND shakes the foundation of your very soul. You press your hands against your ears and howl pitifully. Your dessert course is entirely untouched.'
      },
      {
        name: 'thunderdome',
        description: 'You gather your tactical equipment – clear eyes, full heart, rolled napkin – and climb onto the dining table. The sadistic housefly responsible for the SOUND circles you, waiting.'
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

app.listen(app.get('port'), function() {
    console.log('Listening on port: ' + app.get('port'))
})