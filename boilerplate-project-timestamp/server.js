// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

const getTimestamp = date => ({
  unix: date.getTime(),
  utc: date.toUTCString()
});

function isValidDate(d) {
  return d instanceof Date && !isNaN(d);
}

app.get('/api', function(req, res, next){
  console.log(Number(req.params.date));

  let timestamp;

  timestamp = getTimestamp(new Date());
  
  res.json(timestamp);
});

app.get('/api/:date', function(req, res, next){
  console.log(Number(req.params.date));

  let timestamp;
  const date_string = req.params.date
  console.log(date_string);

  /// Este if es al pedo probablemente, no viene undefined ni vacio por este endpoint
  const date = !isNaN(date_string)
    ? new Date(parseInt(date_string))
    : new Date(date_string);

  if (!isNaN(date.getTime())) {
    timestamp = getTimestamp(date);
  } else {
    timestamp = {
      error: "invalid date"
    };
  }

   res.json(timestamp);
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
