const util = require('./utility');

const parse = {};

parse.recent = media => util.unique(util.flatten(media, 'tags'));

parse.tags = tags => tags.map(tag => ({
	name: tag.data.name,
	count: tag.data.media_count
}));

module.exports = parse;
