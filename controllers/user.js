const bcrypt = require('bcrypt');

const User = require('../models/user');

exports.get = function(req, res){
    res.render('login');
  };

exports.post = function(req,res){
  const username = req.body.username;
  const password = req.body.password;
  //TODO validation

  //Error handling...
  User.findOne({username: username}, function (err, user){
    if(!user){
      //Username doesn't exist
      res.render('login');
    }
    else{
      bcrypt.compare(password, user.password, function(err, isMatch){
        if(err) throw err;
        if(isMatch){
          //TODO ---------------start session------------
          res.render('userhome')
        }
        else {
          //Wrong password or username...
          res.render('login');
        }
      });
    }
  });
}
