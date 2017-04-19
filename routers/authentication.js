const debug = require('debug')('express');
const express = require('express');
const request = require('request');
const user = require('../db/user');

const router = new express.Router();

router.get('/', (req, res) => { // eslint-disable-line no-unused-vars
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
	}, (err, postRes, body) => {
		if (err) debug(err); // eslint-disable-line curly
		user.save(body);
		req.session.userId = body.user.id;
		res.redirect('/');
	});
});

module.exports = router;
