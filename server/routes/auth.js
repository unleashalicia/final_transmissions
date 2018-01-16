const path = require('path');
const mysql = require('mysql');
const { credentials } = require('../database');
const connection = mysql.createConnection(credentials);

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
		let sql = `SELECT * FROM users WHERE id = ${req.user.id}`;
		connection.query(sql,(err,result,fields)=>{
			res.render("profile",{
				username: result[0].user_name,
				email: result[0].email
			});
		});
	});

	app.get('/library', isLoggedIn, (req, res) => {
		let sql = `SELECT * FROM stories`;

		connection.query(sql,(err,result,fields)=>{
			res.render("library",{
				storydata: result
			});
		});
	});

	//example: ghost.brianmevans.com/story/id/5
	app.get('/story/id/:id', isLoggedIn, (req, res) => {
		let story_id = req.params.id;
		let sql = `CALL getStoryPageDetails(${req.user.id},${story_id})`;

		connection.query(sql,(err,result,fields)=>{
			//chapters will be 'results[1][0].chapter_name' for example
			res.render("story",{
				chapters: results[1],
				storyBlurb: results[0].description,
				startLat: results[0].start_lat,
				startLon: results[0].start_lat,
				timeEstimate: results[0].est_time,
				storyImg: results[0].story_img,
				storyTitle: results[0].name
			});
		});
	});


	app.get('/st/', (req,res) => {
		res.sendFile(path.join(__dirname, '..', '..', 'client', 'story.html'));
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
