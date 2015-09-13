function ValueError(message) {
	this.name = "ValueError";
	this.message = message || /* istanbul ignore next */ "Variable contains an invalid value";
	this.stack = (new Error()).stack;
}
ValueError.prototype = Object.create(Error.prototype);
ValueError.prototype.constructor = ValueError;

module.exports = ValueError;
