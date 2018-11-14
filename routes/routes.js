const express = require('express');
const router = express.Router();

const home_controller = require('../controllers/home');
const registration_controller = require('../controllers/registration');

// Home route
router.get('/', home_controller.get);
router.get('/home', home_controller.get);

//Login routes
router.get('/login', function(req, res) {
  res.render('login');
});

//Registration route
router.get('/registration',registration_controller.get);
router.post('/registration',registration_controller.post);

module.exports = router;
