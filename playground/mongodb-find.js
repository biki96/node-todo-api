// const MongoClient = require('mongodb').MongoClient; 
const {MongoClient, ObjectID} = require('mongodb'); 

var obj = new ObjectID();


MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
  if (err){
    return console.log('Unable to connect MongoDB server');
  }
  console.log('Connected to MongoDB server');

  // db.collection('Todos').find({
  //   _id:new ObjectID('5afabcd658dda82cb56a5828')
  // }).toArray().then((docs) => {
  //   console.log('Todos:');
  //   console.log(JSON.stringify(docs, undefined, 2));
  // }, (err) => {
  //   if(err)
  //     console.log('Unable to fetch todos.', err);
  // });
 
  db.collection('Todos').find().count().then((count) => {
    console.log('Todos count: ', count);
    console.log(JSON.stringify(docs, undefined, 2));
  }, (err) => {
    if (err)
      console.log('Unable to fetch todos.', err);
  });

  // db.close();
});