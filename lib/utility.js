const util = {};

util.flatten = (arr, key) => {
	return arr.reduce((acc, item) => acc.concat(item[key]), []);
};

util.unique = arr => {
	const prims = {boolean: {}, number: {}, string: {}};
	const objs = [];
	const has = {}.hasOwnProperty;

	return arr.filter(item => {
		const type = typeof item;
		if (type in prims) {
			return has.call(prims[type], item) ? false : (prims[type][item] = true);
		} else {
			return objs.indexOf(item) >= 0 ? false : objs.push(item);
		}
	});
};

module.exports = util;
