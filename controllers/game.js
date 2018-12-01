const request = require('request');
const Task = require('../models/task');

exports.get = function(req, res){
  Task.findOne({}, function (err, task){ //This should be randomized
    if(!task){
      console.log("error");
    }
    else{
      res.render('game/match',{task_description: task.description});
    }
  });
  };

  exports.post = function(req,res){
    const jscode = req.body.code;
    request({
        url: "http://0.0.0.0:4000/receive",
        method: "POST",
        json: true,   // <--Very important!!!
        body: {js_code: jscode}
    }, function (error, response, body){
        res.render('game/codesubmited',{evaluated_code:body});
    });
    
  }  

  