var express = require('express');
var app = express();
var cssPath = __dirname + '/public';
var bodyParser = require("body-parser");

app.use('/public', express.static(cssPath));
///Para usar middleware a nivel raiz, uso app.use, si no en algo especifico, como app.get, app.post

app.use(function(req, res, next){
  console.log(req.method + ' ' + req.path + ' - '+ req.ip);
  next();
});
app.use(bodyParser.urlencoded({extended: false}));

app.get('/', function(req, res){
  var path = __dirname + '/views/index.html'
  res.sendFile(path);
})

var msg = {
  "message": "Hello json"
}

app.get('/json', function(req, res){
  var mensaje;
  if(process.env['MESSAGE_STYLE'] === 'uppercase'){
    mensaje = 'HELLO JSON';
  }else{
    mensaje = 'Hello json';
  }
  msg.message = mensaje;
  res.json(msg);
})


app.get('/now', function(req, res, next){
  req.time = new Date().toString();
  next();
}, function(req, res){
  res.json({time: req.time});
});

app.get('/:word/echo', function(req, res){
  res.json({echo: req.params.word})
});

app.post('/name', function(req, res){
  res.json({name: req.body.first + ' ' + req.body.last})
})


console.log("Hello World");






































module.exports = app;
