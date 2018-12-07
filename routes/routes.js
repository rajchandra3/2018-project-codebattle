const express = require('express');
const router = express.Router();

const home_controller = require('../controllers/home');
const registration_controller = require('../controllers/registration');
const user_controller = require('../controllers/user');
const game_controller = require('../controllers/game');
const matchmaking_controller = require('../controllers/matchmaking');
//Pre route actions
router.get('*', function(req, res, next){
    res.locals.user = req.session.user || null;
    next();
})

//Home route
router.get('/', home_controller.get);
router.get('/home', home_controller.get);
router.get('/faq',home_controller.faq)

//User routes
router.get('/login', ensureLoggedOut(), user_controller.get);
router.post('/login', ensureLoggedOut(), user_controller.post);
router.get('/logout', ensureLoggedIn(), user_controller.logout);
router.get('/user/home', ensureLoggedIn(), user_controller.history);

//Registration route


router.get('/registration', ensureLoggedOut(), registration_controller.get);
router.post('/registration', ensureLoggedOut(), registration_controller.post);


//Game logic
router.get('/search_game', ensureLoggedIn(), matchmaking_controller.get);
router.get("/game",ensureLoggedIn(), game_controller.get);
router.post("/sendcode",ensureLoggedIn(), game_controller.post);


router.get('*', function(req,send){
    send.status(404)
    send.render('statuscodes/404');
})
module.exports = router;

//Checks if user session is set, if not redirects to homepage
function ensureLoggedIn(){
  return function(req, res, next){
    if (!req.session.user){
      res.redirect('/');
    }
    else{
      next();
    }
  }
}

//If user session is set redirects to homepage
function ensureLoggedOut(){
  return function(req, res, next){
    if (req.session.user){
      res.redirect('/');
    }
    else{
      next();
    }
  }
}
