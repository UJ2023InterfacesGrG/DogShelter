var express = require('express');
var router = express.Router();
var fs = require('fs');
const usersData = require('./data/users');
const bcrypt = require('bcryptjs');

/* GET home page. */
router.get('/:var(home)?', function(req, res, next) {
  res.render('home');
});

/* GET walk page. */
router.get('/walk', function(req, res, next) {
  res.render('walk');
});

/* GET login page. */
router.get('/login', function(req, res, next) {
  console.log(usersData);
  const user = req.session.user || null;

  // Check if user is defined before accessing properties
  if (user) {
    res.redirect('home');
  } else {
    res.render('login');
  }
});

/* POST login page. */
router.post('/login', function(req, res, next) {
  const { email, password } = req.body;
  console.log('Received credentials:', email, password);

  const user = usersData.find(user => user.email === email);
  console.log('Found user:', user);

  if (user && bcrypt.compareSync(password, user.password)) {
    // Store user information in the request object
    req.session.user = {
      name: user.name,
      surname: user.surname,
      email: user.email,
      phone: user.phone
    };
    res.redirect('/user/myWalks')
  } else {
    console.log('Login failed');
    res.status(401).json({ message: 'Invalid credentials' });
  }
});

/* GET register page. */
router.get('/register', function(req, res, next) {
  const user = req.session.user || null;

  // Check if user is defined before accessing properties
  if (user) {
    res.redirect('home');
  } else {
    res.render('register');
  }
});

/* POST register page. */
router.post('/register', function(req, res, next) {
  const { email, password } = req.body;
  console.log('Received credentials:', email, password);

  const user = usersData.find(user => user.email === email);

  if (!user) {
    // Store user information in the request object
    req.session.user = {
      name: null,
      surname: null,
      email: email,
      phone: null
    };
    usersData.push({
      name: null,
      surname: null,
      email: email,
      password: bcrypt.hashSync(password, 10),
      phone: null
    });
    res.redirect('/user/myWalks')
  } else {
    console.log('Registration failed');
    res.status(401).json({ message: 'Already created account with given e-mail address' });
  }
});

/* GET mywalks page. */
router.get('/user/myWalks', function(req, res, next) {
  const user = req.session.user || null;
  // Check if user is defined before accessing properties
  if (user) {
    res.render('mywalks');
  } else {
    res.redirect('/login');
  }
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

// Endpoint to Get a logout
router.get('/user/logout',(req,res) => {
  req.session.destroy();
  res.redirect('/');
});

module.exports = router;
