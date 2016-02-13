var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var logger = require('morgan');
var request = require('request');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

app.get('/', function(req, res) {
  res.json({ SUCCESS: true });
});

var server = app.listen(3000, function() {
  console.log('Express server running...');
});
