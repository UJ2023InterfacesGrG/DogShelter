var express = require('express');
var router = express.Router();
var fs = require('fs');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('home');
});

/* GET home page. */
router.get('/home', function(req, res, next) {
  res.render('home');
});

/* GET walk page. */
router.get('/walk', function(req, res, next) {
  res.render('walk');
});

/* GET login page. */
router.get('/login', function(req, res, next) {
  res.render('login');
});

/* GET register page. */
router.get('/register', function(req, res, next) {
  res.render('register');
});

/* GET mywalks page. */
router.get('/myWalks', function(req, res, next) {
  res.render('mywalks');
});

/* GET found page. */
router.get('/found', function(req, res, next) {
  res.render('recently_found');
});

/* GET news page. */
router.get('/news', function(req, res, next) {
  res.render('news');
});

/* GET success page. */
router.get('/success', function(req, res, next) {
  res.render('walk_success');
});

/* GET supportUs page. */
router.get('/supportUs', function(req, res, next) {
  res.render('supportus');
});

/* GET contact page. */
router.get('/contact', function(req, res, next) {
  res.render('contact');
});

/* GET reserveWalk page. */
router.get('/reserveWalk', function(req, res, next) {
  res.render('reserve_walk');
});

// Endpoint to Get a list of dogs
router.get('/ourDogs', function(req, res){
  fs.readFile(__dirname + "/" + "data/dogs.json", 'utf8', function(err, data){
    try {
      // Parse the JSON data
      const jsonData = JSON.parse(data);
      console.log(jsonData.dog1)
      // Pass the 'dogs' array to the EJS template
      res.render('ourdogs', { dogs: jsonData });
    } catch (error) {
      console.error('Error parsing JSON:', error);
      res.status(500).send('Internal Server Error');
    }
  });
})

module.exports = router;
