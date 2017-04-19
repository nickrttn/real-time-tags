const path = require('path');
const https = require('https');
const request = require('request');
const debug = require('debug')('express');
const express = require('express');

require('dotenv').config();

const app = express();

// Settings
app.set('view engine', 'ejs');
app.set('port', process.env.PORT);

// Static file serving
app.use('/assets', express.static(path.join(__dirname, '/build')));

app.get('/', (req, res) => {
	const oauthURL = `${process.env.IG_OAUTH}/authorize/?client_id=${process.env.IG_CLIENT}&redirect_uri=http://localhost:3000/oauth&response_type=code`;
	res.render('pages/index', {oauthURL});
});

app.get('/oauth', (req, res) => {
	request.post({
		url: `${process.env.IG_OAUTH}/access_token`,
		json: true,
		form: {
			client_id: process.env.IG_CLIENT, // eslint-disable-line camelcase
			client_secret: process.env.IG_SECRET, // eslint-disable-line camelcase
			grant_type: 'authorization_code', // eslint-disable-line camelcase
			redirect_uri: 'http://localhost:3000/oauth', // eslint-disable-line camelcase
			code: req.query.code
		}
	}, (err, res, body) => {
		if (err) debug(err);
		debug(res, body);
	});
});

app.listen(app.get('port'), (err) => {
	if (err) debug(err); // eslint-disable-line curly
	debug(`listening on http://localhost:${app.get('port')}`);
});
