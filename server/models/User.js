const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = mongoose.Schema({
  "name": String,
  "birthday": Date,
  "sex": String,
  "bio": Date,
  "user": String,
  "password": String,
  "cDate" : Date,
});

const saltRounds = 10;
userSchema.pre('save', function(next){
  const document = this;
  bcrypt.hash(document.password, saltRounds, function(err, hashedPassword){
    if(err){
      next(err)
    }else{
      document.password = hashedPassword;
      console.log(document.password);
      document.cDate = Date.now();
      next();
    }
  })
})

userSchema.methods.checkPassword = function(password, callback){
  bcrypt.compare(password, this.password, function(err,correct){
    console.log(correct);
    (err) ? callback(err) : callback(err, correct);
  })
}

module.exports = User = mongoose.model('User', userSchema);