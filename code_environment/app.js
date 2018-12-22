

const express = require('express');
const bodyParser = require('body-parser');
const cp = require('child_process');

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
    var child = cp.fork('./evaluate.js');
    var jscode = req.body.js_code;
    var input = req.body.input;
    var output = req.body.output; 
    var ok = false;
    var message = "";
      var ended = false;
      var temp = {
        input: input,
        jscode: jscode,
        output: output
      }
      child.on('message', function(m) {
        if(typeof m == "boolean"){
          ok = m;
          message = "";
        }else if(typeof m == "string"){
          message = m;
          ok = false;
        }
        ended = true;
        res.json(
          {
            "message": message,
            "ok": ok
          }
          ); 
      });

      child.send(temp);
      setTimeout(function(){ 
        if(ended!=true){
          child.kill('SIGINT');
          res.json(
            {
              message: "Timeout Error: Your code didn't terminate at all or in less than 1000 ms.",
              ok: false
            }
            ); 
        }

        }, 1000);

  }); 

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);
