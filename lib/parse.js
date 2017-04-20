const util = require('./utility');

const parse = {};

parse.tags = media => {
	let tags = util.flatten(media, 'tags');
	tags = util.unique(tags);
	return tags;
};

module.exports = parse;
