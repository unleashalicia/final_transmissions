const express = require('express');
const logger = require('morgan'); // how does morgan work again?
const passport = require('passport');
const session = require('express-session');
const path = require('path');

const app = express();
const PORT = 8000;

app.use(logger('dev')); // ???
app.use(express.json()); //takes the place of...
app.use(express.urlencoded()); //...body-parser
app.use(express.static('WHAT DO I PUT IN HERE?')); // ???
app.use(session({ secret: 'wishbone' })); // ???
app.use(passport.initialize()); 
app.use(passport.session()); 

require('./passport')(passport); // ???
require('./routes/auth.js')(app, passport); // ???



// landing page
app.get('/', (req, res) => {
    res.sendFile();
});

// new user sign-up
app.get('/signup', (req, res) => {
    res.sendFile();
});

// returning user login
app.get('/index', (req, res) => {
    res.sendFile();
});



function errorHandler (err, req, res, next) { 
	if (res.headersSent) {
	  return next(err);
	}
	res.status(500);
	res.send('Error, something broke!');
}

app.listen(PORT, () => {
    console.log("Let's find some ghosts on port: ", PORT);
});



//mongoose schema resources mongolabs mongo university  