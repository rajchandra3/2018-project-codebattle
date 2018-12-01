var request = require('request');


exports.post = function(req, res){
    console.log("here");
    request({
        url: "http://0.0.0.0:4000/receive",
        method: "POST",
        json: true,   // <--Very important!!!
        body: {foo: 'bar'}
    }, function (error, response, body){
        console.log(body);
    });
    res.render('home');
  }
  