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
		console.log('StoryID: ' + story_id,'UserId: ' + req.user.id);
		let sql = `CALL getStoryPageDetails(${req.user.id},${story_id})`;

		connection.query(sql,(err,result,fields)=>{
			console.log(result);
			res.render("story",{
				storyDetails: result[0][0],
				chapterDetails: result[1]
				// chapters: result[1],
				// storyBlurb: result[0].description,
				// startLat: result[0].start_lat,
				// startLon: result[0].start_lat,
				// timeEstimate: result[0].est_time,
				// storyImg: result[0].story_img,
				// storyTitle: result[0].name
			});
		});
	});


	app.get('/st', (req,res) => {
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
