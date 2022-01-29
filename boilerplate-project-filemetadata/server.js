var express = require('express');
var cors = require('cors');
var bodyParser= require('body-parser')
var multer = require('multer');
var mongodb = require('mongodb');
var mongoose = require('mongoose');
require('dotenv').config()
var app = express();

const myurl = 'mongodb+srv://dashrak14:643924Bok@cluster0.5lbcc.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';

mongoose.connect(myurl);

var Schema = mongoose.Schema;

var fileSchema = new Schema({name: String, type: String, size:[]})

var FileM = mongoose.cre

app.use(cors());
app.use(bodyParser.urlencoded({extended: true}))
app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', function (req, res) {
    res.sendFile(process.cwd() + '/views/index.html');
});

var upload = multer({ destination: "uploads/" })

app.post('/api/fileanalyse', upload.single('upfile'), function (req, res) {
  const file = req.file;
  return res.json({name: file.originalname, type: file.mimetype, size:file.size})
});

const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log('Your app is listening on port ' + port)
});
