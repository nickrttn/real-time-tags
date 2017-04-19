const path = require('path');
const debug = require('debug')('express');
const express = require('express');
const session = require('express-session');

const authentication = require('./routers/authentication');
const user = require('./db/user');

require('dotenv').config();

const app = express();

// Settings
app.set('view engine', 'ejs');
app.set('port', process.env.PORT);

app.use(session({
	secret: process.env.SESSION_SECRET,
	cookie: {maxAge: 60000},
	resave: false,
	saveUninitialized: false
}));
app.use('/assets', express.static(path.join(__dirname, '/build')));
app.use('/oauth', authentication);

app.get('/', (req, res) => {
	console.log(req.session);
	if (!req.session.userId) {
		const oauthURL = `${process.env.IG_OAUTH}/authorize/?client_id=${process.env.IG_CLIENT}&redirect_uri=http://localhost:3000/oauth&response_type=code`;
		res.render('pages/index', {oauthURL});
	} else {
		user.get(req.session.userId, doc => {
			res.render('pages/loggedin.ejs', {data: doc});
		});
	}
});

app.listen(app.get('port'), err => {
	if (err) debug(err); // eslint-disable-line curly
	debug(`listening on http://localhost:${app.get('port')}`);
});
