const Match = require('../models/match');
const Task = require('../models/task');

var globalqueue = [];
var match = false;
exports.get = function(req, res){
    if(!globalqueue.includes(req.session.user._id)){
        if(globalqueue.length>0){
            //make game with first and this player
            Task.count().exec(function (err, count){
                var random = Math.floor(Math.random() * count)
                Task.findOne({}, function (err, task){
                    if(!task){
                      console.log("Could not load any task!!!");
                    }
                    else{
                        var newMatch = new Match({
                            player1: globalqueue[0],
                            player2: req.session.user._id,
                            taskID: task._id,
                            active: true
                        });
                        globalqueue.shift(0);
                        newMatch.save(function(err){
                            if(err){
                              console.log(err);
                              return;
                            }
                            //Redirect to active game pages...
                            res.redirect('/user/activegames');
                          });
                    }
                }).skip(random); 
    
            });
        }else{  //Is the only one in queue
            globalqueue.push(req.session.user._id);
            res.render('home', {
                infos: [{param: '', msg: "You are now added to the queue, when someone joins your game you will find the game at the 'Active Games' page. Good Luck! ", value: ''}]
              }) 
            //redirect to some page with info about that the user is in queue.
        }
    }else{
        res.render('home', {
            errors: [{param: '', msg: "You are already in the queue, please wait until someone join. You can find your active games at the 'Active Games' page.", value: ''}]
          }) 
        //Already in queue just waiting for player
        //redirect to some page with info about that the user is in queue.
    }
  };
