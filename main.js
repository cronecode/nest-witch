var express = require('express')
var app = express()
var bodyParser = require('body-parser')
var episodes = require('./episodeIndex')
var matchmaker = require('./matchmaker')
var profile = require('./profile')

app.set('port', process.env.PORT || 3000)

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use(express.static(__dirname + '/public'))

app.get('/', function(req, res) {
  //profile.print(testPattern, testEquipped)
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
      res.status(404).send('Episode index not found')}
    res.status(200).send({header: scene.header, text: scene.text, choices: scene.choices})
    res.end()
})

//call to printer happens here
app.post('/home', function(req, res){
    var pattern = req.body.pattern
    var played = req.body.played
    //var played = req.body.played
    //if (played){
      //profile.print(pattern)
    //}   
    var match = matchmaker.match(pattern, played)
    res.status(200).send(match)
})

app.listen(app.get('port'), function() {
    console.log('Listening on port: ' + app.get('port'))
})