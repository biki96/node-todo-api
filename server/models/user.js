const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const _ = require('lodash');
const bcrypt = require('bcryptjs');

var UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    minlength: 1,
    trim: true,
    unique: true,
    validate: {
      validator: (value) => {
        return validator.isEmail(value);
        //moglo i ovako: validator: validator.isEmail
      },
      message: '{VALUE} is not a valid email'
    }
  },
  password: {
    type: String,
    require: true,
    minlength: 6,
  },
  tokens: [{
    access: {
      type: String,
      require: true
    },
    token: {
      type: String,
      require: true
    }
  }]
});

UserSchema.methods.toJSON = function () {
  var user = this;
  var userObject = user.toObject();

  return _.pick(userObject, ['_id', 'email']);
};

UserSchema.methods.generateAuthToken = function() {
  var user = this;
  var access = 'auth';
  var token = jwt.sign({_id: user._id.toHexString(), access}, 'abc').toString();
  user.tokens.push({access, token});

  return user.save().then(() => {
    return token;
  });
};

UserSchema.statics.findByToken = function(token) {
  var User = this;
  var decoded;
  var sicret = 'abc'
  try {
    decoded = jwt.verify(token, sicret);
  } catch (error) {
    // return new Promise((resolve, reject) => {
    //   reject();
    return Promise.reject();
  }
  return User.findOne({
    '_id': decoded._id,
    'tokens.token': token,
    'tokens.access': 'auth'
  });
};
//dogadjaj koji ce da se izvrsi pre 'save' dogadjaja
//zovemo f-ju sa next arg, da nemamo metoda se ne bi zavrsila => program pada
//
UserSchema.pre('save', function(next){
  var user = this; //pristupamo individualnom dokumentu(koloni)
  if(user.isModified('password')){   //proveravamo da li je sifra modifikovana, prima pr. pass i vraca T/F
    bcrypt.genSalt(10, (err, salt) => { //generisemo salt (dodaje se na sifru)
      bcrypt.hash(user.password, salt, (err, hash) => { //uzimamo pass, dodajemo salt i hesiramo
        user.password = hash; //stavljamo hesiranu vrednost
        next(); //zavrsavamo metodu
      });
    });
  }else{
    next();
  }
});

var User = mongoose.model('User', UserSchema);

module.exports = {User};