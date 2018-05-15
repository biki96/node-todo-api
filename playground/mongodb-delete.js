// const MongoClient = require('mongodb').MongoClient; 
const { MongoClient, ObjectID } = require('mongodb');

var obj = new ObjectID();


MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
  if (err) {
    return console.log('Unable to connect MongoDB server');
  }
  console.log('Connected to MongoDB server');

  //deleteMany
  // db.collection('Todos').deleteMany({ text: 'Lunch'}).then((res) => {
  //   console.log(res);
  // });

  //deliteOne
  // db.collection('Todos').deleteOne({ text: 'Lunch' }).then((res) => {
  //   console.log(res);
  // });

  //FindOneAndDelete
  db.collection('Todos').findOneAndDelete({ completed: false}).then((res) => {
    console.log(res);
  });

  // db.close();
});