const util = require('./utility');

const parse = {};

parse.recent = media => {
	console.log(media);
	let tags = util.flatten(media, 'tags');
	tags = util.unique(tags);
	return tags;
};

parse.tags = tags => tags.map(tag => ({
	name: tag.data.name,
	count: tag.data.media_count
}));

module.exports = parse;
