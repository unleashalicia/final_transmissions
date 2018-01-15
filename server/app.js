const express = require('express');
const logger = require('morgan');
const passport = require('passport');
const session = require('express-session');
const path = require('path');

const app = express();
const PORT = 8000;

app.set("view engine","pug");
app.set("views",path.join(__dirname, "views"));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use('/assets', express.static(path.join(__dirname, '..', 'client', 'assets')));
app.use(session({ secret: 'wishbone' }));
app.use(passport.initialize());
app.use(passport.session());

const {passportMethod, connection} = require('./passport');

passportMethod(passport);
require('./routes/auth.js')(app, passport);


app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname,'..', 'client', 'index.html'));
});


app.get('/signup', (req, res) => {
    res.sendFile(path.join(__dirname,'..', 'client', 'signup.html'));
});


app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname,'..', 'client', 'login.html'));
});

app.get('/library', (req,res) => {
    res.sendFile(path.join(__dirname,'..', 'client', 'library.html'));
})





app.post('/state', (req, res)=>{
    let output = {
        success: false,
        data: null,
        errors: null
    };

    console.log(req);


    const query = `CALL getUserStateDetails(${req.user.id}, ${req.body.story})`;

    connection.query(query, function(error, data){

        if (!error){
            let formattedData = formatStateData(data);

            output.success = true;
            output.data = formattedData;
        } else {
            output.errors = error; // will change this when no longer testing
        }

        res.send(output);
    });
});

app.post('/action', (req, res) => {
    let output = {
        success: false,
        data: null,
        errors: null
    };

    const query = `CALL handleUserAction(${req.user.id}, ${req.body.story}, '${req.body.action}')`;

    connection.query(query, function(error, data){

        if (!error){
            let formattedData = formatStateData(data);

            output.success = true;
            output.data = formattedData;
        } else {
            output.errors = "there was an error";
        }

        res.send(output);
    });
});





function formatStateData(data) {
    let semiFormattedData = [];
    let fullyFormattedData = [];

    for (let i = 0; i < data.length - 1; i++) {
        semiFormattedData.push(data[i]);
    }
    for (let i = 0; i < semiFormattedData.length; i++) {
        fullyFormattedData.push(semiFormattedData[i][0]);
    }

    return fullyFormattedData;
}



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
