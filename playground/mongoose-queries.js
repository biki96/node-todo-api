const {ObjectID} = require('mongodb');

const {mongose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/user');


var id = '5afb4de84ce3c06523176b3e';

if(!ObjectID.isValid(id)){
  console.log('Id not valid');
}

Todo.find({
  _id: id
}).then((todos) => {
  console.log('Todos', todos);
});

Todo.findOne({
  _id: id
}).then((todo) => {
  console.log('Todo', todo);
});

Todo.findById(id).then((todo) => {
  if(!todo)
    return console.log('Id not found');
  console.log('Todo By Id', todo);
}).catch((e) => console.log(e));