const LocalStrategy = require('passport-local').Strategy;
const localConfig = require('./strategies/local');
const mysql = require('mysql');
const { credentials, crypt } = require('./database');
const connection = mysql.createConnection(credentials);

function userSearchSQL(userHandle) {
	let sql = "SELECT * FROM ?? WHERE ?? = ?";
	let inserts = ['users', 'user_name', userHandle];
	return mysql.format(sql, inserts);
}

function userCreateSQL(userinfo) {
	let { email, password, user_name } = userinfo;
	let sql = "INSERT INTO ?? (??, ??, ??, ??) VALUES (?, ?, ?, ?)";
	let inserts = ['users', 'id', 'email', 'password', 'user_name', null, email, crypt.createHash(password), user_name];

	return mysql.format(sql, inserts);
}

module.exports = {
    passportMethod: function (passport) {
        passport.serializeUser(function (user, done) {
            done(null, user);
        });

        passport.deserializeUser(function (user, done) {
            let sql = "SELECT id FROM ?? WHERE ?? = ?";
            let inserts = ['users', 'id', user];
            sql = mysql.format(sql, inserts);

            connection.query(sql,
                function (err, results, fields) {
                    done(null, results[0])
                }
            );
        });

        // create new user, sign-up
        passport.use('local-signup', new LocalStrategy(localConfig,
            function (req, userHandle, password, done) {
                process.nextTick(function () {
                    debugger;
                    let sql = userSearchSQL(userHandle);
		    console.log("This is the SQL while signing up", sql);
                    connection.query(sql, function (err, results, fields) {
                        if (err) {
                            return done(err)
                        }

                        if (results[0]) {
                            return done(null, false);
                        } else {
                            let sql = userCreateSQL(req.body);

                            connection.query(sql, function (err, results, fields) {
                                if (err) throw err;

                                return done(null, results.insertId);
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

                    if (err) {
                        return done(err);
                    }

                    if (!results[0]) {
                        return done(null, false);
                    }

                    if (!crypt.checkPassword(password, results[0].password)) {
                        return done(null, false);
                    }

					console.log('Results:', results);

                    return done(null, results[0].id);
                });
            }));
    },
    connection: connection
};
