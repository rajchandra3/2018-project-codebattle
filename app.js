const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const expressValidator = require('express-validator');

// Init app
const app = express();

//Set config
app.use(bodyParser.json()); // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // to support URL-encoded bodies

// Load view engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// Set public folder to serve static resources
app.use(express.static(path.join(__dirname, 'public')));

//Middleware
//Express Validator
app.use(expressValidator());

//Set router
let routes = require('./routes/routes');
app.use('/', routes);

//Connect to mongoose
mongoose.connect('mongodb://localhost:27017/codebattle', { useNewUrlParser: true });
mongoose.Promise = global.Promise;
var db = mongoose.connection;

// Start server
app.listen(8080, function() {
  console.log('Server started on port 8080...');
});
