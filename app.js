const express = require('express')
const bodyParser = require('body-parser')
const bcrypt = require('bcrypt');

const saltRounds = 10;

const app = express()


app.use('/static', express.static('static'))
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');
app.use(bodyParser.urlencoded({ extended: false }))

app.get('/', function(req, res) {
    res.render('index', {static_path: 'static',theme: process.env.THEME || 'flatly'});
});

app.post('/test', function(req, res) {
    console.log()
    bcrypt.hash(req.body.name, saltRounds, function(err, hash) {
        if (err) res.status(500).send('Something broke!')
        res.json({message:hash})
    });
});

var port = process.env.PORT || 3000;

var server = app.listen(port, function () {
    console.log('Server running at http://127.0.0.1:' + port + '/');
});
