
const Task = require('../models/task');

exports.get = function(req, res){
  Task.findOne({}, function (err, task){
    if(!task){
      console.log("error");
    }
    else{
      res.render('game/match',{task_description: task.description});
    }
  });
 
  };

  