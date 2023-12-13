var express = require('express');
var router = express.Router();
var fs = require('fs');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('home');
});

/* GET walk page. */
router.get('/walk', function(req, res, next) {
  res.render('chcesz_wyprowadzic');
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
  res.render('ostatnio_znalezione');
});

/* GET success page. */
router.get('/success', function(req, res, next) {
  res.render('spacer_udany');
});

/* GET reserveWalk page. */
router.get('/reserveWalk', function(req, res, next) {
  res.render('zarezerwuj_spacer');
});

// Endpoint to Get a list of dogs
router.get('/ourDogs', function(req, res){
  fs.readFile(__dirname + "/" + "data/data.json", 'utf8', function(err, data){
    try {
      // Parse the JSON data
      const jsonData = JSON.parse(data);

      // Pass the 'dogs' array to the EJS template
      res.render('ourdogs', { listOfDogs: jsonData.dogs });
    } catch (error) {
      console.error('Error parsing JSON:', error);
      res.status(500).send('Internal Server Error');
    }
  });
})

module.exports = router;
