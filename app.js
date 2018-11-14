const express = require('express');
const path = require('path');

// Init app
const app = express();

// Load view engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// Set public folder to serve static resources
app.use(express.static(path.join(__dirname, 'public')));

// Home route
app.get('/', function(req, res) {
  res.render('index');
});

// Start server
app.listen(8080, function() {
  console.log('Server started on port 8080...');
});
