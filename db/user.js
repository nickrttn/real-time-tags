const db = require('./create');

const user = {};

// Creates and returns a user, or simply returns it
user.login = (username, password, callback) => {
	db.get(username, (err, doc) => {
		if (err) {
			if (err.status === 404) {
				return db.put({_id: username, username, password}, (err, res) => {
					if (err) callback(err, null); // eslint-disable-line curly
					db.get(res.id, callback); // eslint-disable-line curly
				});
			}

			return callback(err, null);
		}

		callback(err, doc);
	});
};

user.get = (id, callback) => db.get(id, callback);

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
