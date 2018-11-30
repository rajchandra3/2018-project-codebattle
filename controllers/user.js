const bcrypt = require('bcrypt');

const User = require('../models/user');

exports.get = function(req, res){
  res.render('user/login');
};


exports.post = function(req,res){
  const username = req.body.username;
  const password = req.body.password;
  //TODO validation

  //Error handling...
  User.findOne({username: username}, function (err, user){
    if(!user){
      //Username doesn't exist
      res.render('user/login');
    }
    else{
      bcrypt.compare(password, user.password, function(err, isMatch){
        if(err) throw err;
        if(isMatch){
          req.session.user = user;
          res.render('user/userhome');
        }
        else {
          //Wrong password or username...
          res.render('user/login');
        }
      });
    }
  });
}

exports.logout = function(req, res){
  req.session.destroy(function(err) {
    if(err) throw err;
  });
  res.redirect('/');
};
