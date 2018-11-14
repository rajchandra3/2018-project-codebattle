const UserModel = require('../models/user');




exports.get = function(req, res){
    res.render('registration');
  };

  exports.post = function(req,res){
      //validation
      UserModel.create(req.body,function(err,user_instance){
          if(err){
              console.log(err);
          }
          else{
            console.log("User added");
          }
      })
      res.render('home');

  }