var express = require('express');
var mongoose = require('mongoose');
var app = express();
var bodyParser = require('body-parser')
const router = express.Router();
var cors = require('cors')
const trick_router = require('./routes/trick');
const combo_router = require('./routes/combo');

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cors())

app.get('/', function (req, res) {
  res.send('Hello World!');
});

setTimeout(() =>
{ 
  mongoose.connect("mongodb://mongo:27017/kendamacombo", [], function(error) {
    if ( error !== null ) {
        console.log(error);
    }
});

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log("Connected to Database");
});

}, 15000);


app.use('/trick', trick_router);
app.use('/combo', combo_router);

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});