var express = require('express')
var app = express()
var bodyParser = require('body-parser')
var pug = require('pug')
var episodes = require('./episodeIndex')
var matchmaker = require('./matchmaker')
var player = require('./player')
var episode

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
    var i = req.body.choice.index || 0
    var name = req.body.episode
    var url = './' + name + '.json'
    var episode = require(url)
    if (!episode) {
      name = matchmaker.match(null, episodes);
      url = './' + name + '.json'
      episode = require(url)
    }
    var scene = episode.scenes[i]
    if (!scene) {
      res.status(404).send('Episode index not found')
    }
    var bodyPartial = pug.compileFile('./views/game_partial.pug')({header: scene.header, text: scene.text, choices: scene.choices})
    res.status(200).send(bodyPartial)
    res.end()
})

app.listen(app.get('port'), function() {
    console.log('Listening on port: ' + app.get('port'))
})
