const UserModel = require('../models/user');




exports.get = function(req, res){
    res.render('user/registration');
  };

  exports.post = function(req,res){
      //validation
      UserModel.create(req.body,function(err,user_instance){ //Prob should use UserModel.Save() here
          if(err){
              res.render('user/registration');
          }
          else{
            console.log("User added");
            res.render('user/welcomeuser');
          }
      })
      
  }