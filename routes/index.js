var express = require('express');
var router = express.Router();
var fs = require('fs');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});


// Endpoint to Get a list of users
router.get('/getDogs', function(req, res){
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
