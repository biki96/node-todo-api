const {SHA256} = require('crypto-js');
const jwt = require('jsonwebtoken');

var data = {
  id: 10
}

var token = jwt.sign(data, '123abc');
var decoded = jwt.verify(token, '123abc');

var message = 'I ma user number 133';
var hash = SHA256(message).toString();

console.log(hash);