const express = require('express');
const router = express.Router();



const home_controller = require('../controllers/home');
const registration_controller = require('../controllers/registration');
const user_controller = require('../controllers/user');
const game_controller = require('../controllers/game');
const matchmaking_controller = require('../controllers/matchmaking');

const picFilter = function(req, file, cb){
  if(file.mimetype == 'image/jpeg' || file.mimetype == 'image/png'){
    cb(null,true)
  }
  else{
    cb(null,false)
  }
}

const multer = require('multer');
const upload = multer({dest: 'uploads/', fileFilter: picFilter, limits: {
  fileSize: 1024 * 1024 * 10
}}); 




//Pre route actions
router.get('*', function(req, res, next){
    res.locals.user = req.session.user || null;
    next();
})
router.post('*', function(req, res, next){
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
router.get('/user/history', ensureLoggedIn(), user_controller.history);
router.get('/user/activegames', ensureLoggedIn(), user_controller.activegames);
router.get('/user/profile', ensureLoggedIn(), user_controller.profile);
router.post('/user/update', ensureLoggedIn(), upload.single('picture'),  user_controller.update);

//Registration route
router.get('/registration', ensureLoggedOut(), registration_controller.get);
router.post('/registration', ensureLoggedOut(), registration_controller.post);

//Game logic
router.get('/search_game', ensureLoggedIn(), matchmaking_controller.get);
router.post("/game",ensureLoggedIn(), game_controller.game);
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
