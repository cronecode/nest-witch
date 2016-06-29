var express = require('express')
var app = express()
var bodyParser = require('body-parser')
var pug = require('pug')
var episodes = require('./episodeIndex')
var matchmaker = require('./matchmaker')
var print = require('./print')

var current = matchmaker.current

app.set('port', process.env.PORT || 3000)

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.set('views', './views')
app.set('view engine', 'pug')
app.use(express.static(__dirname + '/public'))

app.get('/', function(req, res) {
  res.render('index')
})

app.get('/home', function(req, res){
  res.render('home')
})

app.get('/quiz', function(req, res){
  res.render('quiz')
})

app.get('/game', function(req, res){
  res.render('game');
    /*console.log(player.pattern)
    var match = matchmaker.match(player.pattern, episodes)
    console.log('MATCH = ' + match)
    var url = './' + match + '.json'
    episode = require(url)
    var i = req.body.link || 0
    var scene = episode.scenes[i]
    res.render('index', {header: scene.header, text: scene.text, choices: scene.choices})*/
})

app.post('/game', function(req, res){
    var pattern = req.body.pattern
    var current = req.body.episode
    var i = req.body.index
    url = './' + current + '.json'
    var episode = require(url)
    var scene = episode.scenes[i]
    if (!scene) {
      res.status(404).send('Episode index not found')
    }
    var bodyPartial = pug.compileFile('./views/game_partial.pug')({header: scene.header, text: scene.text, choices: scene.choices})
    res.status(200).send(bodyPartial)
    res.end()
})

//call to printer happens here
app.post('/home', function(req, res){
    console.log(req.body)
    var pattern = req.body.pattern
    var played = req.body.played
    //print.profile(pattern)    
    var match = matchmaker.match(pattern, played)
    console.log(match)
    res.status(200).send(match)
})

app.listen(app.get('port'), function() {
    console.log('Listening on port: ' + app.get('port'))
})