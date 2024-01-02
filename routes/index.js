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
  fs.readFile(__dirname + "/" + "data/dogs.json", 'utf8', function(err, dogdata)
  {
    try {
      const jsonDogData = JSON.parse(dogdata);
      fs.readFile(__dirname + "/" + "data/reservations_test.json", 'utf8', function(err, reservationdata)
	  {
		try {
		  const jsonReservationData = JSON.parse(reservationdata);
		  
		  //console.log(jsonReservationData.dog1)
		  res.render('walk', { dogs: jsonDogData, reservations: jsonReservationData, url: req.url });
		} catch (error) {
		  console.error('Error parsing JSON:', error);
		  res.status(500).send('Internal Server Error');
		}
	  });
    } catch (error) {
      console.error('Error parsing JSON:', error);
      res.status(500).send('Internal Server Error');
    }
  });
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

/* GET news closed page. */
router.get('/newsClosed', function(req, res, next) {
  res.render('news_closed');
});

/* GET news food page. */
router.get('/newsFood', function(req, res, next) {
  res.render('news_food');
});

/* GET news dog day page. */
router.get('/newsDogDay', function(req, res, next) {
  res.render('news_dog_day');
});

/* GET news open day page. */
router.get('/newsOpenDay', function(req, res, next) {
  res.render('news_open_day');
});

/* GET news volunteers page. */
router.get('/newsVolunteers', function(req, res, next) {
  res.render('news_volunteers');
});

/* GET success page. */
router.get('/success', function(req, res, next) {
  fs.readFile(__dirname + "/" + "data/dogs.json", 'utf8', function(err, dogdata)
  {
    try {
      const jsonDogData = JSON.parse(dogdata);
      fs.readFile(__dirname + "/" + "data/reservations_test.json", 'utf8', function(err, reservationdata)
	  {
		try {
		  const jsonReservationData = JSON.parse(reservationdata);
		  
		  //console.log(jsonReservationData.dog1)
		  res.render('walk_success', { dogs: jsonDogData, reservations: jsonReservationData, url: req.url, fs: fs});
		} catch (error) {
		  console.error('Error parsing JSON:', error);
		  res.status(500).send('Internal Server Error');
		}
	  });
    } catch (error) {
      console.error('Error parsing JSON:', error);
      res.status(500).send('Internal Server Error');
    }
  });
});
/* GET supportUs page. */
router.get('/supportUs', function(req, res, next) {
  res.render('supportus');
});

/* GET contact page. */
router.get('/contact', function(req, res, next) {
  res.render('contact');
});

router.get('/reserveWalk', function(req, res){
  fs.readFile(__dirname + "/" + "data/dogs.json", 'utf8', function(err, dogdata)
  {
    try {
      const jsonDogData = JSON.parse(dogdata);
      fs.readFile(__dirname + "/" + "data/reservations_test.json", 'utf8', function(err, reservationdata)
	  {
		try {
		  const jsonReservationData = JSON.parse(reservationdata);
		  
		  //console.log(jsonReservationData.dog1)
		  res.render('reserve_walk', { dogs: jsonDogData, reservations: jsonReservationData, url: req.url });
		} catch (error) {
		  console.error('Error parsing JSON:', error);
		  res.status(500).send('Internal Server Error');
		}
	  });
    } catch (error) {
      console.error('Error parsing JSON:', error);
      res.status(500).send('Internal Server Error');
    }
  });
})

// Endpoint to Get a list of dogs
router.get('/ourDogs', function(req, res){
  fs.readFile(__dirname + "/" + "data/dogs.json", 'utf8', function(err, data){
    try {
      // Parse the JSON data
      const jsonData = JSON.parse(data);
      console.log(jsonData.dog1)
      // Pass the 'dogs' array to the EJS template
      res.render('ourdogs', { dogs: jsonData, url: req.url });
    } catch (error) {
      console.error('Error parsing JSON:', error);
      res.status(500).send('Internal Server Error');
    }
  });
})

router.get('/user/myData', function(req, res, next) {
  const user = req.session.user || null;
  // Check if user is defined before accessing properties
  if (user) {
    res.render('my_data');
  } else {
    res.redirect('/login');
  }
});

router.post('/user/update', function(req, res, next) {
  const { name, surname, phone, email, password } = req.body;
  console.log('Received new data:', name, surname, phone, email, password);
  
  var userIndex;
  for (var i = 0; i < usersData.length; i++){
    if(usersData[i].email === req.session.user.email){
      userIndex = i;
      break;
    }
  }

  if (name) {
    req.session.user.name = name;
    usersData[userIndex].name = name;
  }

  if (surname) {
    req.session.user.surname = surname;
    usersData[userIndex].surname = surname;
  }

  if (phone) {
    req.session.user.phone = phone;
    usersData[userIndex].phone = phone;
  }

  if (email) {
    req.session.user.email = email;
    usersData[userIndex].email = email;
  }

  if (password) {
    usersData[userIndex].password = bcrypt.hashSync(password, 10);
  }

  res.redirect('/user/myData');
});

// Endpoint to Get a logout
router.get('/user/logout',(req,res) => {
  req.session.destroy();
  res.redirect('/');
});

module.exports = router;