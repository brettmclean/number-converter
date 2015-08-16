function ValueError(message) {
	this.name = "ValueError";
	this.message = message || "Variable contains an invalid value";
	this.stack = (new Error()).stack;
};
ValueError.prototype = Object.create(Error.prototype);
ValueError.prototype.constructor = ValueError;

module.exports = ValueError;
