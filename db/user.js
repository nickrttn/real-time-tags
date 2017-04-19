const db = require('./create');

const user = {};

user.get = (userId, callback) => {
	db.get(userId, (err, doc) => {
		if (err) throw err; // eslint-disable-line curly
		callback(doc);
	});
};

user.save = json => {
	db.upsert(json.user.id, doc => {
		return doc.rev ? {
			_id: json.user.id,
			_rev: doc.rev,
			accessToken: json.access_token,
			username: json.user.username,
			profilePicture: json.user.profile_picture,
			fullName: json.user.full_name,
			bio: json.user.bio,
			website: json.user.website
		} : {
			_id: json.user.id,
			accessToken: json.access_token,
			username: json.user.username,
			profilePicture: json.user.profile_picture,
			fullName: json.user.full_name,
			bio: json.user.bio,
			website: json.user.website
		};
	}, err => {
		if (err) throw err; // eslint-disable-line curly
	});
};

module.exports = user;
