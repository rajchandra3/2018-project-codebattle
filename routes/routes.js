const express = require('express');
const router = express.Router();

const home_controller = require('../controllers/home');
const registration_controller = require('../controllers/registration');
const user_controller = require('../controllers/user');

// Home route
router.get('/', home_controller.get);
router.get('/home', home_controller.get);

//Login routes
router.get('/login', user_controller.get); 
router.post('/login',user_controller.post);

//Registration route
router.get('/registration',registration_controller.get);
router.post('/registration',registration_controller.post);

module.exports = router;
