const bcrypt = require('bcrypt');

const User = require('../models/user');

exports.get = function(req, res){
  res.render('user/registration');
};

exports.post = function(req,res){
  const username = req.body.username;
  const email = req.body.email;
  const password = req.body.password;


  //Validation
  req.checkBody('username', 'Username is required').notEmpty();
  //req.checkBody('username', 'Username already exists').isUsernameAvailable();
  if(email) req.checkBody('email', 'Email is not valid').isEmail();
  req.checkBody('password', 'Password is required').notEmpty();
  let errors = req.validationErrors();

  if(errors){
    for (var i in errors){
      console.log(errors[i].msg);
    }

    res.render('user/registration', {
      errors:errors
    });
  }
  else{
    var newUser = new User({
        username:username,
        email:email,
        password:password
    });

    bcrypt.hash(newUser.password, 10, function(err, hash){
      if(err){
        console.log(err);
        return;
      }
      newUser.password = hash;
      newUser.save(function(err){
        if(err){
          console.log(err);
          return;
        }
        else{
          console.log("User added");
          res.render('user/welcomeuser');
        }
      });
    });
  }
}
