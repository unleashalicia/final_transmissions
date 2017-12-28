const LocalStrategy = require('passport-local').Strategy;
// uppercase bc of the object constructor convention
// .Strategy is the method on the main object that is exported that way you can use the keyword, new (see below in passport.use)
const localConfig = require('./strategies/local'); 
const mysql = require('mysql');
const { credentials, crypt } = require('./database'); // bcrypt encryption algorithm 
const connection = mysql.createConnection(credentials); // connection to database, obvi

// find user profile by handle name
function userSearchSQL(userHandle) {
	let sql = "SELECT * FROM ?? WHERE ?? = ?";
	let inserts = ['users', 'email', email];
	return mysql.format(sql, inserts); 
}

// create user handle and password (email is also required)
function userCreateSQL(userHandle, password) {
	let sql = "INSERT INTO ?? (??, ??, ??) VALUES (?, ?, ?)";
	let inserts = ['users', 'id', 'email', 'password', null, email, crypt.createHash(password)];
	return mysql.format(sql, inserts);
}

module.exports = function (passport) {
	passport.serializeUser(function (user, done) { // determines, which data of the user object should be stored in the session
        done(null, user);
        // The user id (you provide as the second argument of the done function) is saved in 
        // the session and is later used to retrieve the whole object via the deserializeUser function
	});

	passport.deserializeUser(function (user, done) { // The first argument of deserializeUser corresponds to the key of the user object that was given to the done function (line 25)
        // So your whole object is retrieved with help of that key. That key here is the user id (key can be any key of the user object i.e. name,email etc). 
        // In deserializeUser that key is matched within the memory array / database or any data resource.
        let sql = "SELECT * FROM ?? WHERE ?? = ?";
		let inserts = ['users', 'id', user.insertId];
		sql = mysql.format(sql, inserts);

		connection.query(sql, 
			function (err, results, fields) { // unsure about what is happening here
				done(err, results)
			}
		);	
	});

    // create new user, sign-up
	passport.use('local-signup', new LocalStrategy(localConfig,
		function (req, email, password, done) {
			process.nextTick(function () {
				let sql = userSearchSQL(email);

				connection.query(sql, function (err, results, fields) {
					if (err) { return done(err) }

					if (results[0]) {
						return done(null, false);
					} else {
						let sql = userCreateSQL(email, password);

						connection.query(sql, function (err, results, fields) {
							if (err) throw err;

							return done(null, results);
						});
					}

				});
			});
		}));

    // regular user sign-in
	passport.use('local-signin', new LocalStrategy(localConfig,
		function (req, userHandle, password, done) { 
			let sql = userSearchSQL(userHandle);

			connection.query(sql, function (err, results, fields) {

				if (err) { return done(err); }

				if (!results[0]) { return done(null, false); }

				if (!crypt.checkPassword(password, results[0].password)) { return done(null, false); }

				return done(null, results);
			});
		}));
	
};