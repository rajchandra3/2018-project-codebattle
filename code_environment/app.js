'use strict';

const express = require('express');
const bodyParser = require('body-parser');

// Constants
const PORT = 80;
const HOST = '0.0.0.0';

// App
const app = express();
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send('Hello world\n');
});

app.post('/receive', (req, res) => {

  //test all different inputs with the outputs
    var jscode = req.body.js_code;
    var input = req.body.input;
    var output = req.body.output;
    var ok = true;
    var errormessage = "";
    try{
      for(var i = 0;i<input.length;i++){
        var evaluated_code = eval(jscode + "answer("+input[i] + ");");
        if((evaluated_code != output[i])){
          ok = false;
        }
      }
    }catch(e){
      if(e.message != "Cannot read property 'toString' of undefined" ){
        errormessage = e.message;
        ok = false;
      }  
    }
    res.json(
      {
        "message": errormessage,
        "ok": ok
      }
      ); 
  });

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);
