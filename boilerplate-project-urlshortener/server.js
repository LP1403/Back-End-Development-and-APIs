require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const mongo = require('mongodb');
const mongoose = require('mongoose');
const URLModel = require("./models/url").URLModel;
let valid = require('valid-url');

mongoose.connect('mongodb+srv://dashrak14:643924Bok@cluster0.5lbcc.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true });

var bodyParser = require("body-parser");


const dns = require('dns');
const url = require('url');

// Basic Configuration
const port = process.env.PORT || 3000;


app.use(bodyParser.urlencoded({extended: false}));

app.use(cors());

app.use('/public', express.static(`${process.cwd()}/public`));

app.get('/', function(req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});


// Your first API endpoint
app.get('/api/hello', function(req, res) {
  res.json({ greeting: 'hello API' });
});

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

app.post('/api/shorturl', async function(req, res) {
  const url = req.body.url;
  let inputShort = 1;
  var expression = /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/gi;

  var regex = new RegExp(expression);
  
  if(!url.match(regex)){
    res.json({error: 'invalid url'});
    return;
  }

   const parsedUrl = url.replace(/^(?:https?:\/\/)?(?:www\.)?/i, "").split('/')[0];

  const validation = dns.lookup(parsedUrl, (error, address)=>{
    if(!address){
      res.json({error: 'invalid url'});
    }else{
        const newUrl = new URLModel({url: url});
        newUrl.save((err,savedUrl)=>{
          res.json({ original_url: savedUrl.url,
          short_url: savedUrl.id})
        })
    }
  })


  // if(!valid.isUri(url)){
  //   res.json({error: 'invalid url'});
  //   return;
  // }

  


  // URLModel.findOne({})
  //   .sort({short_url: 'desc'})
  //   .exec(function (err, result){
  //     if(!err && result != undefined){
  //       inputShort = result.short_url + 1;
  //     }else{
  //       console.log(err);
  //     }
  //     if(!err){
  //       URLModel.findOneAndUpdate(
  //         {original_url: url},
  //         {original_url: url, short_url: inputShort},
  //         {new: true, upsert: true, useFindAndModify: false},
  //         function (err, savedUrl){
  //           if(!err && result != undefined){
  //             res.json({ original_url: savedUrl.original_url, short_url: savedUrl.short_url})
  //           }else{
  //             console.log(err);
  //             return res.json({error: 'invalid url'});
  //           }
  //       })
  //     }
  // });
});

app.get('/api/shorturl/:short_url', function(req, res) {
  const url = req.params.short_url;
  console.log(url)
  const urlParams = URLModel.findById(url,
  (err, result)=>{
    if(!result){
      return res.json({error: 'Url does not exist'})
    }else{
      res.redirect(result.url);
    }
  })
});



app.listen(port, function() {
  console.log(`Listening on port ${port}`);
});
