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

var fn = pug.compileFile('./views/index.pug')

app.get('/', function(req, res){
    console.log(player.pattern)
    var match = matchmaker.match(player.pattern, episodes)
    console.log('MATCH = ' + match)
    var url = './' + match + '.json'
    episode = require(url)
    var i = req.body.link || 0
    var scene = episode.scenes[i]
    res.render('index', {header: scene.header, text: scene.text, choices: scene.choices})
})

app.post('/', function(req, res){
    var quality = req.body.quality
    player.record(quality)
    var i = req.body.link
    var scene = episode.scenes[i]
    var html = fn({header: scene.header, text: scene.text, choices: scene.choices})
    res.status(200).send(html)
    res.end()
})

app.listen(app.get('port'), function() {
    console.log('Listening on port: ' + app.get('port'))
})
