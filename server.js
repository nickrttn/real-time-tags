const path = require('path');
const debug = require('debug')('express');
const express = require('express');
const session = require('express-session');

const authentication = require('./routers/authentication');

const passport = require('./lib/passport');
// const user = require('./db/user');
// const request = require('./lib/request');
// const parse = require('./lib/parse');
// const util = require('./lib/utility');

require('dotenv').config();

const app = express();

// Settings
app.set('view engine', 'ejs');
app.set('port', process.env.PORT);

app.use(require('cookie-parser')());
app.use(require('body-parser').urlencoded({extended: true}));
app.use(require('express-session')({
	secret: process.env.SESSION_SECRET,
	cookie: {maxAge: 60000},
	resave: false,
	saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

app.use('/assets', express.static(path.join(__dirname, '/build')));
app.use('/auth', authentication);

app.get('/', (req, res) => {
	const oauthURL = `${process.env.IG_OAUTH}/authorize/?client_id=${process.env.IG_CLIENT}&redirect_uri=http://localhost:3000/oauth&response_type=code&scope=basic+public_content`;
	res.render('pages/index', {user: req.user, oauthURL});
});

app.listen(app.get('port'), err => {
	if (err) debug(err); // eslint-disable-line curly
	debug(`listening on http://localhost:${app.get('port')}`);
});
