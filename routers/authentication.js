const express = require('express');

const passport = require('../lib/passport');
// const request = require('../lib/request');
// const user = require('../db/user');

const router = new express.Router();

router.post(
	'/local/login',
	passport.authenticate('local', {
		failureRedirect: '/'
	}), (req, res) => {
		res.redirect('/');
	}
);

router.get('/local/logout', (req, res) => {
	req.logout();
	res.redirect('/');
});

// router.get('/', (req, res) => { // eslint-disable-line no-unused-vars
// 	const oauthObj = {
// 		client_id: process.env.IG_CLIENT, // eslint-disable-line camelcase
// 		client_secret: process.env.IG_SECRET, // eslint-disable-line camelcase
// 		grant_type: 'authorization_code', // eslint-disable-line camelcase
// 		redirect_uri: 'http://localhost:3000/oauth', // eslint-disable-line camelcase
// 		code: req.query.code
// 	};

// 	function onauth(err, oauthRes) {
// 		if (err) debug(err); // eslint-disable-line curly
// 		if (oauthRes.status === 200) {
// 			user.save(oauthRes.body);
// 			req.session.userId = oauthRes.body.user.id;
// 			res.redirect('/');
// 		}
// 	}

// 	request.postForm(`${process.env.IG_OAUTH}/access_token`, oauthObj, onauth);
// });

module.exports = router;
