
require('dotenv').config();
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const url = process.env.MONGO_URI;

mongoose.connect('mongodb+srv://dashrak14:643924Bok@cluster0.5lbcc.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true });

const personSchema = new Schema({
  name: { type: String, required: true },
  age: Number,
  favoriteFoods: [String]
});

let Person = mongoose.model("Person", personSchema);


const createAndSavePerson = (done) => {
  var person = new Person({name: "Lucas Perez", age: 23, favoriteFoods: ["Caca", "Pis", "Vomito"]});
  person.save(function(err, data){
    if (err) return console.error(err);
      done(null, data)
  });
};

var arrayOfPeople = [
  {name: "Lucas Perez", age: 23, favoriteFoods: ["Caca", "Pis", "Vomito"]},
  {name: "Sol", age: 21, favoriteFoods: ["Higado"]},
  {name: "Juan", age: 30, favoriteFoods: ["Pizza"]}
];

const createManyPeople = (arrayOfPeople, done) => {
  Person.create(arrayOfPeople, function(err, people){
    if (err) return console.error(err);
    done(null, people);
  })
};

const findPeopleByName = (personName, done) => {
  Person.find({name: personName}, function(err, person){
    if (err) return console.error(err);
    done(null, person);
  })
};

const findOneByFood = (food, done) => {
  Person.findOne({favoriteFoods: food}, function(err, personFound){
      if (err) return console.error(err);
      done(null, personFound);
  })
};

const findPersonById = (personId, done) => {
  Person.findOne({_id: personId}, function(err, personFound){
    if (err) return console.error(err);
    done(null, personFound);
  })
};

const findEditThenSave = (personId, done) => {
  const foodToAdd = "hamburger";
  Person.findById(personId, (err, person) => {
    if(err) return console.log(err); 

    person.favoriteFoods.push(foodToAdd);

    person.save((err, updatedPerson) => {
      if(err) return console.log(err);
      done(null, updatedPerson)
    })
  })
};

const findAndUpdate = (personName, done) => {
  const ageToSet = 20;
  Person.findOneAndUpdate({name: personName}, {age: ageToSet}, {new: true}, function(err, personFound){
    if(err) return console.log(err);
    done(null, personFound)
  })
};

const removeById = (personId, done) => {
  Person.findByIdAndRemove(personId,function(err, personDelete){
    if(err) return console.log(err);
    done(null, personDelete)
  })
};

const removeManyPeople = (done) => {
  const nameToRemove = "Mary";
  Person.remove({name: nameToRemove}, function(err, personDelete){
    if(err) return console.log(err);
    done(null, personDelete);
  })
};

const queryChain = (done) => {
  const foodToSearch = "burrito";
  Person.find({favoriteFoods: foodToSearch})
  .sort({name:1})
  .limit(2)
  .select({age: 0})
  .exec(function(err, data){
    if(err) return console.log(err);
    done(null, data);
  })
};

/** **Well Done !!**
/* You completed these challenges, let's go celebrate !
 */

//----- **DO NOT EDIT BELOW THIS LINE** ----------------------------------

exports.PersonModel = Person;
exports.createAndSavePerson = createAndSavePerson;
exports.findPeopleByName = findPeopleByName;
exports.findOneByFood = findOneByFood;
exports.findPersonById = findPersonById;
exports.findEditThenSave = findEditThenSave;
exports.findAndUpdate = findAndUpdate;
exports.createManyPeople = createManyPeople;
exports.removeById = removeById;
exports.removeManyPeople = removeManyPeople;
exports.queryChain = queryChain;
