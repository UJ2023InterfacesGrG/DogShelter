var express = require('express');
var router = express.Router();
var fs = require('fs');
const path = require('path');
const users = fs.readFileSync(__dirname + "/../data/users.json", 'utf8');
const usersData = JSON.parse(users);
const bcrypt = require('bcryptjs');

/* GET home page. */
router.get('/:var(home)?', function(req, res, next) {
  res.render('home');
});

/* GET walk page. */
router.get('/walk', function(req, res, next) {
  fs.readFile(__dirname + "/../" + "data/dogs.json", 'utf8', function(err, dogdata)
  {
    try {
      const jsonDogData = JSON.parse(dogdata);
      fs.readFile(__dirname + "/../" + "data/reservations.json", 'utf8', function(err, reservationdata)
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
  if (req.query.dog && req.query.id)
    req.session.originalURL = `/walk?param=yes&dog=${req.query.dog}&id=${req.query.id}`;
  
  console.log(usersData);
  const user = req.session.user || null;

  // Check if user is defined before accessing properties
  if (user) {
    res.redirect('home');
  } else {
    res.render('login', { message: null });
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
    const originalURL = req.session.originalURL || '/user/myWalks';
    delete req.session.originalURL;
    console.log(originalURL);
    res.redirect(originalURL);
  } else {
    console.log('Login failed');
    let message = 'Niepoprawne dane';
    res.render('login', { message: message })
  }
});

/* GET register page. */
router.get('/register', function(req, res, next) {
  const user = req.session.user || null;

  // Check if user is defined before accessing properties
  if (user) {
    res.redirect('home');
  } else {
    res.render('register', { message: null });
  }
});

/* POST register page. */
router.post('/register', function(req, res, next) {
  const { name, surname, phone, email, password } = req.body;
  console.log('Received credentials:', name, surname, phone, email, password);

  const user = usersData.find(user => user.email === email);

  if (!user) {
    // Store user information in the request object
    req.session.user = {
      name: name,
      surname: surname,
      email: email,
      phone: phone
    };
    usersData.push({
      name: name,
      surname: surname,
      email: email,
      password: bcrypt.hashSync(password, 10),
      phone: null
    });

    // Saving new user to file
    const jsonString = JSON.stringify(usersData, null, 2);
    fs.writeFile(__dirname + '/../data/users.json', jsonString, 'utf8', (err) => {
      if (err) {
        console.error('Error writing JSON file:', err);
      } else {
        console.log('Array saved to JSON file successfully!');
      }
    });

    const originalURL = req.session.originalURL || '/user/myWalks';
    delete req.session.originalURL;
    res.redirect(originalURL);
  } else {
    console.log('Registration failed');
    let message = 'Konto o podanym adresie e-mail już istnieje';
    res.render('register', { message: message })
  }
});

/* GET mywalks page. */
router.get('/user/myWalks', function(req, res, next) {
  const user = req.session.user || null;
  // Check if user is defined before accessing properties
  if (user) {
	fs.readFile(__dirname + "/../" + "data/dogs.json", 'utf8', function(err, dogdata)
	  {
		try {
		  const jsonDogData = JSON.parse(dogdata);
		  fs.readFile(__dirname + "/../" + "data/reservations.json", 'utf8', function(err, reservationdata)
		  {
			try {
			  const jsonReservationData = JSON.parse(reservationdata);
			  
			  //console.log(jsonReservationData.dog1)
			  res.render('mywalks', { dogs: jsonDogData, reservations: jsonReservationData, url: req.url });
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
	}
	else {
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
router.get('/success', async (req, res) => {
  const { dog, id, email, tel } = req.query;

  try {
    const filePath = path.join(__dirname, '..', 'data', 'reservations.json');
    const reservationsData = await fs.promises.readFile(filePath, 'utf8');
    const reservations = JSON.parse(reservationsData);

    let Success = true;

    if (reservations[dog]?.[id]?.takenby) {
      if (!(reservations[dog][id].takenby === email || reservations[dog][id].takenby === tel)) {
        Success = false;
      }
    } else {
      reservations[dog][id].takenby = email || tel;
      await fs.promises.writeFile(filePath, JSON.stringify(reservations, null, '\t'), 'utf8');
    }

    res.render('walk_success', { Success });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).send('Internal Server Error');
  }
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
  fs.readFile(__dirname + "/../" + "data/dogs.json", 'utf8', function(err, dogdata)
  {
    try {
      const jsonDogData = JSON.parse(dogdata);
      fs.readFile(__dirname + "/../" + "data/reservations.json", 'utf8', function(err, reservationdata)
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
  fs.readFile(__dirname + "/../" + "data/dogs.json", 'utf8', function(err, data){
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

  // Saving changes
  const jsonString = JSON.stringify(usersData, null, 2);
  fs.writeFile(__dirname + '/../data/users.json', jsonString, 'utf8', (err) => {
    if (err) {
      console.error('Error writing JSON file:', err);
    } else {
      console.log('Array saved to JSON file successfully!');
    }
  });

  res.redirect('/user/myData');
});

// Endpoint to cancelling a walk
router.post('/user/myWalks/cancel',(req,res) => {
  const dog = req.query.dog;
  const reservation = req.query.reservation;

  try {
    let reservationdata = fs.readFileSync(__dirname + '/../data/reservations.json', 'utf8');
    const reservations = JSON.parse(reservationdata);
    
    delete reservations[dog][reservation].takenby;

    fs.writeFileSync(__dirname + '/../data/reservations.json', JSON.stringify(reservations, null, 2), 'utf8');

    res.send('Success');
  } catch (error) {
    console.error('Error parsing JSON:', error);
    res.status(500).send('Internal Server Error');
  }
});

// Endpoint to Get a logout
router.get('/user/logout',(req,res) => {
  req.session.destroy();
  res.redirect('/');
});

module.exports = router;