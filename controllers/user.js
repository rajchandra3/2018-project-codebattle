const bcrypt = require('bcrypt');

const User = require('../models/user');

exports.get = function(req, res){
  res.render('user/login');
};


exports.post = function(req,res){
  const username = req.body.username;
  const password = req.body.password;
  //TODO validation

  let errors = [];
  User.findOne({username: username}, function (err, user){
    if(!user){
      errors.push({param: '', msg: 'Invalid username or password', value: ''});
      res.render('user/login', {
        errors: errors
      });
    }
    else{
      bcrypt.compare(password, user.password, function(err, isMatch){
        if(err) throw err;
        if(isMatch){
          req.session.user = user;
          res.redirect('/');
        }
        else {
          errors.push({param: '', msg: 'Invalid username or password', value: ''});
          res.render('user/login', {
            errors: errors
          });
        }
      });
    }
  });
}

exports.logout = function(req, res){
  req.session.destroy(function(err) {
    if(err) throw err;
  });
  res.back();
};
