const express = require('express')
const app = express()
const cors = require('cors')
const bodyParser = require("body-parser");
const mongodb = require('mongodb')
const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const ExerciseM = require("./models/exerciseSchema").ExerciseModel;
const UserM = require("./models/userSchema").UserModel;
const LogM = require("./models/logSchema").LogModel;

mongoose.connect('mongodb+srv://dashrak14:643924Bok@cluster0.5lbcc.mongodb.net/myFirstDatabase?retryWrites=true&w=majority')

require('dotenv').config()

app.use(bodyParser.urlencoded({extended: false}));

app.use(cors())

app.use(express.static('public'))
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html')
});



app.post('/api/users', (req,res)=>{
  const newUser = new UserM({username: req.body.username});
  console.log(req.body.username);
  newUser.save((err, savedUser)=>{
    if(err)
      console.log(err);
    return res.json(savedUser);
  })
});

app.post('/api/users/:_id/exercises', (req,res)=>{
  console.log(req.params._id);
  const user = UserM.findById(req.params._id, (err, result)=>{
    console.log(result.username);
    console.log(req.body.date);
    var newDate = req.body.date === '' || req.body.date == null ? new Date().toDateString() : new Date(req.body.date).toDateString();
    const newEx = new ExerciseM({username: result.username,
    description: req.body.description,
    duration: Number(req.body.duration),
    date: newDate
    });
    console.log(newEx);
    newEx.save((err, savedEx)=>{
      if(err)
        console.log(err);
      return res.json({_id: result._id, username: result.username, date: savedEx.date, duration: savedEx.duration, description: savedEx.description});
    })
  });
});

app.get('/api/users', (req,res)=>{
  const users = UserM.find({}).then(function(users){
    res.send(users);
  })
});

app.get('/api/users/:_id/logs', (req,res)=>{
  const exList = [];

  let response = {};

  var fromParam = req.query.from;
  var toParam = req.query.to;
  var limitParam = req.query.limit;

  if(fromParam != null){
    var fromDate = new Date(fromParam);
  }
  if(toParam != null){
    var toDate = new Date(toParam);
  }
  if(limitParam != null){
    var limit = Number(limitParam);
  }

  const userQ = UserM.findById(req.params._id, (err, user)=>{
    if(err)
      return res.json({error: err});
    const exQ = ExerciseM.find({username: user.username}).then((exercises)=>{

      exercises = exercises.filter(x => x.date < )

      exercises.forEach(ex => {
        if(ex.date == null || ex.date == 'Invalid Date')
          ex.date = new Date().toDateString();
        let exDate = new Date(ex.date);
        if(fromDate != null && fromDate != undefined){
          if(toDate != null && toDate != undefined){
            if(exDate <= toDate && exDate >= fromDate){
              exList.push({description: ex.description, duration: ex.duration, date: new Date(ex.date).toDateString()});
            }
          }else{
             if(exDate >= fromDate){
              exList.push({description: ex.description, duration: ex.duration, date: new Date (ex.date).toDateString()});
            }
          }
        }else{
          if(toDate != null && toDate != undefined){
            if(exDate <= toDate){
              exList.push({description: ex.description, duration: ex.duration, date: new Date(ex.date).toDateString()});
            }
          }else{
            exList.push({description: ex.description, duration: ex.duration, date: new Date(ex.date).toDateString()});
          }
        }
      })

      exList.forEach(ex => {
        if(ex.date == null || ex.date == 'Invalid Date')
          ex.date = new Date().toDateString();
      });
      

      responseObject = limit != null && limit != undefined ? {_id: user._id, username: user.username, count: exercises.length,log: exList.slice(0,limit)} : {_id: user._id, username: user.username, count: exercises.length,log: exList};

      console.log(responseObject);
      return res.json(responseObject);
    });
  });
});

const listener = app.listen(process.env.PORT || 3000, () => {
  console.log('Your app is listening on port ' + listener.address().port)
})
