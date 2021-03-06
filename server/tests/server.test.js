const expect = require('expect');
// const mocha = require('mocha');
const request = require('supertest');
const {ObjectID} = require('mongodb');

const {app} = require('./../server');
const {Todo} = require('./../models/todo');
const { todos, populateTodos, users, populateUsers} = require('./seed/seed');

// beforeEach((done) => {
//   Todo.remove({}).then(() => done());
// });

beforeEach(populateUsers);
beforeEach(populateTodos);

describe('POST /todos', () => {
  it('should create a new todo', (done) => {
    var text = 'Test todo test';

    request(app)
      .post('/todos')
      .send({text})
      .expect(200)
      .expect((res) => {
        expect(res.body.text).toBe(text);
      })
      .end((err, res) => {
        if(err)
          return done(err);
        Todo.find({text}).then((todos) => {
          expect(todos.length).toBe(1);
          expect(todos[0].text).toBe(text);
          done();
        }).catch((e) => done(e));  
      });
  });

  // it('should not create todo with invalid body data', (done) => {
  //   request(app)
  //   .post('/todos')
  //   .send({})
  //   .expect(400)
  //   .end((err, res) => {
  //     if(err)
  //       return done(err);
  //     Todo.find().then((todos) => {
  //       expect(todos.length).toBe(2);
  //       done();
  //     }).catch((e) => done(e));
  //   });
  // });
});

describe('GET /todos', () => {
  it('should get all todos', (done) => {
    request(app)
      .get('/todos')
      .expect(200)
      .expect((res) => {
        expect(res.body.todos.length).toBe(2);
      })
      .end(done);
  });
});

describe('GET /todos/:id', () => {

  it('should return doc', (done) => {
    request(app)
      .get(`/todos/${todos[0]._id.toHexString()}`)
      .expect(200)
      .expect((res) => {
        expect(res.body.todo.text).toBe(todos[0].text);
      })
      .end(done);
  });

  it('shuld return 404 if todo not found', (done) => {
    var hexId = new ObjectID().toHexString();

    request(app)
      .get(`/todos/${hexId}`)
      .expect(404)
      .end(done);
  });

  it('should return 404 for non-object ids', (done) => {
    request(app)
      .get('/todos/123abc')
      .expect(404)
      .end(done);
  });
});

describe('DELETE /todos/:id', () => {
  it('should remove todo', (done) => {
    var hexId = todos[1]._id.toHexString();

    request(app)
      .delete(`/todos/${hexId}`)
      .expect(200)
      .expect((res) => {
        expect(res.body.todo._id).toBe(hexId);
      }).end((err, res) => {
        if(err)
          return done(err);
        Todo.findById(hexId).then((todo) => {
          expect(todo).toNotExist();
          done();
        }).catch((e) => {
          dene();
        });
      });
  });

  it('should return 404 if todo not found', (done) => {
    var hexId = new ObjectID().toHexString();

    request(app)
      .delete(`/todos/${hexId}`)
      .expect(404)
      .end(done);
  });

  it('should return 404 if object id invalid', (done) => {
    request(app)
      .delete('/todos/123abc')
      .expect(404)
      .end(done);
  });
});

describe('PATCH /todos/:id', () => {
  // it('should update todo', (done) => {
  //   var hexId = todos[1]._id.toHexString();
  //   var text = 'This should be a new text'; 

  //   request(app)
  //     .patch(`/todos/${hexId}`)
  //     .send({
  //       completed: true,
  //       text
  //     })
  //     .expect(200)
  //     .expect((res) => {
  //       expect(res.body.todo.text).toBe(text);
  //       expect(res.body.completed).toBe(true);
  //       expect(res.body.completedAt).toBe('number');
  //     })
  //     .end(done);
  // });

  // it('should clear completedAd when todo is not completed', (done) => {
  //   var hexId = todos[0]._id.toHexString();
  //   var text = 'This should be a new text@@'; 

  //   request(app)
  //     .patch(`/todos/${hexId}`)
  //     .send({
  //       completed: false,
  //       text
  //     })
  //     .expect(200)
  //     .expect((res) => {
  //       expect(res.body.todo.text).toBe(text);
  //       expect(res.body.completed).toBe(false);
  //       expect(res.body.completedAt).toNotExist();
  //     })
  //     .end(done);
  // });

});