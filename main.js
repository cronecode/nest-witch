var express = require('express')
var app = express()
var bodyParser = require('body-parser')
var shuffle = require('./shuffle')

app.set('port', process.env.PORT || 3000)

app.listen(app.get('port'), function() {
    console.log('Listening on port: ' + app.get('port'))
})

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use(express.static(__dirname + '/public/js/rooms'))

app.get('/', function(req, res) {
  res.render('index')
})

//initial room states
app.get('/rooms', function(req, res){
  var rooms = [
    {name: 'BOUDOIR', isLocked: false},
    {name: 'CONTROL ROOM', isLocked: false},
    {name: 'DINING ROOM', isLocked: false},
    {name: 'SACRISTY', isLocked: false},
    {name: 'TERRACE', isLocked: false},
    {name: 'FAINTING ROOM', isLocked: true},
    {name: 'TORTURE CHAMBER', isLocked: true},
    {name: 'THUNDERDOME', isLocked: true},
    {name: 'SHRINE', isLocked: true},
    {name: 'LABYRINTH', isLocked: true},
    {name: 'POWDER ROOM', isLocked: true}
  ]
  var shuffled = shuffle(rooms)
  console.log(shuffled)
  res.send({rooms: shuffled})
})

app.post('/enter', function(req, res){
  var arr = req.body.room.split(' ')
  var str = arr.join('-').toLowerCase()
  var name = './' + str
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
  var ending = req.body.scene
  res.send({status: 200})
})