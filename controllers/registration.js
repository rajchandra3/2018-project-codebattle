const UserModel = require('../models/user');




exports.get = function(req, res){
    res.render('registration');
  };

  exports.post = function(req,res){
      //validation
      UserModel.create(req.body,function(err,user_instance){ //Prob should use UserModel.Save() here
          if(err){
              res.render('registration');
          }
          else{
            console.log("User added");
            res.render('welcomeuser');
          }
      })
      
  }