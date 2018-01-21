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
			successRedirect: '/instructions',
			failureRedirect: '/'
		})
	);


	app.get('/logout', function (req, res) {
		req.logout();
		res.redirect('/');
	});


	app.get('/instructions', isLoggedIn, (req,res) => {
		res.sendFile(path.join(__dirname, '..', '..', 'client', 'instructions.html'));
	});


	app.get('/profile', isLoggedIn, (req, res) => {
		// let sql = `SELECT * FROM users WHERE id = ${req.user.id}`;

		const sql1 = `SELECT user_name, email FROM users
    				WHERE id = ${req.user.id}`

		const sql2 = `SELECT s.name, s.id FROM user_stories AS us
					JOIN stories AS s
    				ON s.id = us.story_id
    				WHERE us.id = ${req.user.id}`

		var sql1result;

		connection.query(sql1,(err,result,fields) => {
			sql1result = result;
		});
		connection.query(sql2,(err,result,fields)=>{
			console.log(result);
			res.render("profile",{
				userdata: sql1result,
				storydata: result
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


	app.get('/story/id/:id', isLoggedIn, (req, res) => {
		let story_id = req.params.id;
		let sql = `CALL getStoryPageDetails(${story_id})`;


		connection.query(sql,(err,result,fields)=>{
			console.log(result);
			res.render("story",{
				storyDetails: result[0][0],
				chapterDetails: result[1]
			});
		});
	});


	app.get('/play', isLoggedIn, (req, res) => {
	    res.sendFile(path.join(__dirname, '..', '..', 'client', 'meter-index.html'));
	});

	app.post('/actionAlt',isLoggedIn, (req, res) => {
		console.log(`Action variables: User - ${req.user.id}, Story - ${req.body.story}`);
		const sql  = `UPDATE user_stories SET state_id = state_id + 1 WHERE id = ${req.user.id} and story_id = ${req.body.story}`

		connection.query(sql, (error, data) => {
			if (!error){
				console.log('SQL update success');
				res.redirect('/play');
			} else {
				res.send('Error updating user state');
			}
		});
	});


	app.post('/action', isLoggedIn, (req, res) => {
		const query = `CALL handleUserAction(${req.user.id}, ${req.body.story}, '${req.body.action}')`;
		console.log(`Action requested by user ${req.user.id}.`);

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
