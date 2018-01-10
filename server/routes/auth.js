const path = require('path');


module.exports = function (app, passport) {

	app.post('/login',
		passport.authenticate('local-signin', {
			successRedirect: '/profile',
			failureRedirect: '/'
		})
	);

	app.post('/signup',
		passport.authenticate('local-signup', {
			successRedirect: '/profile',
			failureRedirect: '/'
		})
	);

	app.get('/logout', function (req, res) {
		req.logout();
		res.redirect('/');
	});

	app.get('/profile', isLoggedIn, (req, res) => {
	    res.render("profile",{
			username = req.sessions.passport.user[0].user_name,
			email = req.sessions.passport.user[0].email
		});
	});

	app.get('/play', isLoggedIn, (req, res) => {
	    res.sendFile(path.join(__dirname, '..', '..', 'client', 'meter-index.html'));
	});

}





function isLoggedIn(req, res, next) {
	if (req.isAuthenticated()) {
		return next();
	}

	res.redirect('/');
}
