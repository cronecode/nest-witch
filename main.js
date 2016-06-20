var express = require('express')
var app = express()
var bodyParser = require('body-parser')
var pug = require('pug')
<<<<<<< HEAD
var record = require('./records')
=======
>>>>>>> f765e112b4d79cde695ebc31ba9079f9b4308dc3

app.set('port', process.env.PORT || 3000)

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.set('views', './views')
app.set('view engine', 'pug')
app.use(express.static(__dirname + '/public'))

var fn = pug.compileFile('./views/index.pug')

app.get('/', function(req, res){
    var first = require('./first.json')
    var episode = first
    var i = req.body.link || 0
    var scene = episode.scenes[i]
    console.log(scene)
    res.render('index', {header: scene.header, text: scene.text, choices: scene.choices})
})

<<<<<<< HEAD

=======
>>>>>>> f765e112b4d79cde695ebc31ba9079f9b4308dc3
app.post('/', function(req, res){
    var first = require('./first.json')
    var episode = first
    console.log(req.body)
    var quality = req.body.quality
<<<<<<< HEAD
    record(quality)
=======
    console.log(quality)
>>>>>>> f765e112b4d79cde695ebc31ba9079f9b4308dc3
    var i = req.body.link
    var scene = episode.scenes[i]
    console.log(scene)
    var html = fn({header: scene.header, text: scene.text, choices: scene.choices})
    res.status(200).send(html)
    res.end()
<<<<<<< HEAD

})


=======
})

>>>>>>> f765e112b4d79cde695ebc31ba9079f9b4308dc3
app.listen(app.get('port'), function() {
    console.log('Listening on port: ' + app.get('port'))
})
