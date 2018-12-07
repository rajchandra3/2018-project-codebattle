const bcrypt = require('bcrypt');

const User = require('../models/user');
const Match = require('../models/match');

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


exports.history = function(req, res){
  Match.
    find().
    populate('player1').
    populate('player2').
    populate('winner').
    or([{'player1': req.session.user._id}, {'player2': req.session.user._id}]).
    where('active').equals(false).
    sort('-starttime').
    exec(function(err,matches){ //Matches now contains all the matches for that user:
      var wins = 0;
      var loss = 0;
      var preview = []
      
      for(var i = 0; i<matches.length;i++){
        var gamewinner = "";
        if(matches[i].winner == null){
          gamewinner = "no one"
          loss++;
        }else{
          gamewinner = matches[i].winner.username;
          if(matches[i].winner._id == req.session.user._id ){
            wins++;
          }else{
            loss++;
          }
        }

        if(matches[i].player1._id == req.session.user._id){ //If the user is user1

             preview.push({
              winner: gamewinner,
              user_time: matches[i].player1time.toString(),
              user_correct: matches[i].player1correct,
              opponent: matches[i].player2.username,
              opponent_time: matches[i].player2time.toString(),
              opponent_correct: matches[i].player2correct
            });
        }
        else if(matches[i].player2._id == req.session.user._id){
           preview.push({
            winner: gamewinner,
            user_time: matches[i].player2time.toString(),
            user_correct: matches[i].player2correct,
            opponent: matches[i].player1.username,
            opponent_time: matches[i].player1time.toString(),
            opponent_correct: matches[i].player1correct
          });
        }
      }
      res.render('user/history', {wins: wins, lost: loss,matchhistory: preview});
    });

  
};
