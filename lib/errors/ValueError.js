function ValueError(message) {
	Error.apply(this, arguments);
};
ValueError.prototype = Object.create(Error.prototype);
ValueError.prototype.constructor = ValueError;

module.exports = ValueError;
