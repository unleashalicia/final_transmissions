const path = require('path'); 

module.exports = function (app, passport) { 

	app.post('/login',
		passport.authenticate('local-signin', {
			successRedirect: '/profile',
			failureRedirect: '/signup'
		})
	);

	app.post('/signup',
		passport.authenticate('local-signup', {
			successRedirect: '/profile',
			failureRedirect: '/login'
		})
	);

	app.get('/logout', function (req, res) {
		req.logout();
		res.redirect('/');
	});
}

function isLoggedIn(req, res, next) {
	if (req.isAuthenticated()) {
		return next();
	}

	res.redirect('/');
}

