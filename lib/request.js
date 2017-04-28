const superagent = require('superagent');
require('dotenv').config();

const endpoint = process.env.IG_ENDPOINT;
const request = {};

request.postForm = (url, json, callback) => {
	superagent.post(url).type('form').send(json).end(callback);
};

request.user = token => {
	return fetch(`${endpoint}/users/self/?access_token=${token}`) // eslint-disable-line no-undef
		.then(res => res.json());
};

request.mostRecent = (token, callback) => {
	superagent
		.get(`${endpoint}/users/self/media/recent/?access_token=${token}`)
		.end(callback);
};

request.tag = (token, tag) => {
	return fetch(`${endpoint}/tags/${tag}/?access_token=${token}`); // eslint-disable-line no-undef
};

request.tags = (token, tags) => {
	return Promise.all(tags.map(tag => request.tag(token, tag)));
};

module.exports = request;
