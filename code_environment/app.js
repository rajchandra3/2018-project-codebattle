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
    res.send(eval(req.body.js_code).toString()) 
  });

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);
