const express = require('express');
const router = express.Router();

const home_controller = require('../controllers/home');

// Home route
router.get('/', home_controller.get);
router.get('/home', home_controller.get);

//Login routes
router.get('/login', function(req, res) {
  res.render('login');
});

module.exports = router;
