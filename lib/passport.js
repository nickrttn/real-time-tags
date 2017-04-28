// Borrows code from: https://github.com/passport/express-4.x-local-example/blob/master/server.js
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const user = require('../db/user');

passport.use(new LocalStrategy((username, password, callback) => {
	user.login(username, password, (err, user) => {
		if (err) {
			return callback(err);
		}

		if (!user) {
			return callback(null, false);
		}

		if (user.password !== password) {
			return callback(null, false);
		}

		return callback(null, user);
	});
}));

passport.serializeUser((user, callback) => {
	callback(null, user._id);
});

passport.deserializeUser((id, callback) => {
	user.get(id, (err, user) => {
		if (err) {
			return callback(err);
		}

		callback(null, user);
	});
});

module.exports = passport;
