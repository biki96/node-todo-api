// const MongoClient = require('mongodb').MongoClient; 
const { MongoClient, ObjectID } = require('mongodb');

var obj = new ObjectID();


MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
  if (err) {
    return console.log('Unable to connect MongoDB server');
  }
  console.log('Connected to MongoDB server');

  //findOndAndUpdate
  db.collection('Todos').findOneAndUpdate({ _id: new ObjectID('5afabcd658dda82cb56a5828')}, {
    $set: {
      completed: true
    }
  }, {
    returnOriginal: false
  }).then((res) => {
    console.log(res);
  });

  // db.close();
});