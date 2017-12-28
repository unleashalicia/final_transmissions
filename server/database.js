const bcrypt = require('bcrypt-nodejs');

module.exports = {
	credentials: {
		host: 'localhost',
		port: 8000,
		user: 'root',
		password: 'root',
		database: ''
	},

	crypt: {
		createHash: function(password) {
			return bcrypt.hashSync(password,  bcrypt.genSaltSync(), null);
		},
	
		checkPassword: function(submitPassword, storedPassword) {
			return bcrypt.compareSync(submitPassword, storedPassword);
		}
	}
}