// const MongoClient = require('mongodb').MongoClient; 
const {MongoClient, ObjectID} = require('mongodb'); 

var obj = new ObjectID();


MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
  if (err){
    return console.log('Unable to connect MongoDB server');
  }
  console.log('Connected to MongoDB server');

  // db.collection('Todos').insertOne({
  //   text: 'Something to do',
  //   completed: false
  // }, (err, results) => {
  //   if(err){
  //     return console.log('Unable to insert todo', err);
  //   }
  //   console.log(JSON.stringify(results.ops, undefined, 2));
  // });

  db.collection('Users').insertOne({
    name: 'Milos',
    age: 22,
    location: 'Belegrade'
  }, (err, res) => {
    if(err)
     return console.log('Unable to insert into todo', err);
    console.log(JSON.stringify(res.ops, undefined, 2));
  })

  db.close();
});