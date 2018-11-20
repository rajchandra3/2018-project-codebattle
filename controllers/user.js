const UserModel = require('../models/user');

exports.get = function(req, res){
    res.render('user/login');
  };

  exports.post = function(req,res){
    //Need to check if password is matched with hashed password
    //Error handling...
  UserModel.find({'username': req.body.username}, 'username email password', function (err, tempUser){
      console.log(tempUser);
      if(tempUser.length!=0){
        if(tempUser[0].password == req.body.password){
            res.render('user/userhome');
            //set session
            return
        }
      }
    //Wrong password or username...    
    res.render('user/login');
  })
}