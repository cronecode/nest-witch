var express = require('express')
var app = express()
var bodyParser = require('body-parser')

app.set('port', process.env.PORT || 3000)

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.set('views', './views')
app.set('view engine', 'pug')
app.use(express.static(__dirname + '/public'))

app.get('/home/:id', function(req, res){
    var first = require('./first.js')
    var episode = first
    var i = req.params.id
    var scene = episode.scenes[i]
    console.log(scene)
    res.render('index', {header: scene.header, text: scene.text, choices: scene.choices})
})

app.listen(3000, function() {
    console.log('Listening')
})