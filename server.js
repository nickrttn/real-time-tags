const path = require('path');
const debug = require('debug')('express');
const express = require('express');
const session = require('express-session');

const authentication = require('./routers/authentication');
const user = require('./db/user');
const request = require('./lib/request');
const parse = require('./lib/parse');
const util = require('./lib/utility');

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
	// If we have a session id
  if (req.session.userId) {
		// Get the user from the database
    user.get(req.session.userId, user => {
			// Request their most recent media
      request.mostRecent(user.accessToken)
				.then(json => parse.recent(json.data))
				.then(tags => request.tags(user.accessToken, tags))
				.then(payload => Promise.all(util.toJSON(payload)))
				.then(json => console.log(util.filterResponses(json)))
				.then(data => res.render('pages/loggedin', {data, user}))
				.catch(err => res.render('pages/error', {err}));
    });
  } else {
    const oauthURL = `${process.env.IG_OAUTH}/authorize/?client_id=${process.env.IG_CLIENT}&redirect_uri=http://localhost:3000/oauth&response_type=code&scope=basic+public_content`;
    res.render('pages/index', {oauthURL});
  }
});

app.listen(app.get('port'), err => {
  if (err) debug(err) // eslint-disable-line curly
  debug(`listening on http://localhost:${app.get('port')}`);
})
