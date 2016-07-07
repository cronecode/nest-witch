var express = require('express')
var app = express()
var bodyParser = require('body-parser')

app.set('port', process.env.PORT || 3000)

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use(express.static(__dirname + '/public'))

app.get('/', function(req, res){
    render('index')
})

app.post('/', function(req, res){
    var print = require('./print')
    var blueprint = req.body.blueprint
    console.log(print.ruler(blueprint))
})


app.listen(app.get('port'), function() {
    console.log('Listening on port: ' + app.get('port'))
})