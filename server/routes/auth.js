const path = require('path');
const mysql = require('mysql');
const { credentials } = require('../database');
const connection = mysql.createConnection(credentials);

module.exports = function (app, passport) {

	app.post('/login',
		passport.authenticate('local-signin', {
			successRedirect: '/profile',
			failureRedirect: '/login'
		})
	);


	app.post('/signup',
		passport.authenticate('local-signup', {
			successRedirect: '/instructions',
			failureRedirect: '/signup'
		})
	);


	app.get('/logout', function (req, res) {
		req.logout();
		res.redirect('/');
	});


	app.get('/instructions', isLoggedIn, (req,res) => {
		res.sendFile(path.join(__dirname, '..', '..', 'client', 'instructions.html'));
	});

	app.get('/', (req, res) => {
		if (req.isAuthenticated()){
			res.redirect('/profile');
		} else {
			res.sendFile(path.join(__dirname,'..','..', 'client', 'index.html'));
		}
	});


	app.get('/profile', isLoggedIn, (req, res) => {
		const user_profile_data = `SELECT user_name, email FROM users
    				WHERE id = ${req.user.id}`;

		const user_story_data = `SELECT s.name, s.id FROM user_stories AS us
					JOIN stories AS s
    				ON s.id = us.story_id
    				WHERE us.id = ${req.user.id}`;

		var user_profile_results;

		connection.query(user_profile_data, (err,result,fields) => {
			user_profile_results = result;
		});
		connection.query(user_story_data, (err,result,fields)=>{
			res.render("profile",{
				userdata: user_profile_results,
				storydata: result
			});
		});
	});


	app.get('/library', isLoggedIn, (req, res) => {
		let sql = `SELECT s.*, us.state_id FROM stories AS s 
					LEFT JOIN user_stories AS us 
					ON s.id = us.story_id AND us.id = ?`;
		let user = req.user.id;

		connection.query(sql, user, (err,result,fields)=>{
			res.render("library",{
				storydata: result
			});
		});
	});


	app.get('/story/id/:id', isLoggedIn, (req, res) => {
		let story_id = req.params.id;
		let sql = `CALL getStoryPageDetails(${story_id})`;


		connection.query(sql,(err,result,fields)=>{
			res.render("story",{
				storyDetails: result[0][0],
				chapterDetails: result[1]
			});
		});
	});


	app.get('/play', isLoggedIn, (req, res) => {
	    res.sendFile(path.join(__dirname, '..', '..', 'client', 'meter-index.html'));
	});


	app.post('/action', isLoggedIn, (req, res) => {
		const query = `CALL handleUserAction(${req.user.id}, ${req.body.story}, '${req.body.action}')`;

		connection.query(query, function(error, data){

			if (!error){
				res.redirect('/play');
			} else {
				res.send("there was an error");
			}
		});
	});

}



function isLoggedIn(req, res, next) {
	if (req.isAuthenticated()) {
		return next();
	}
	res.redirect('/');
}
