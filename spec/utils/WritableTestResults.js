var Writable = require("stream").Writable;
var StringDecoder = require("string_decoder").StringDecoder;
var util = require("util");

var decoder = new StringDecoder();

var WritableTestResults = function() {
	Writable.call(this);

	this._data = "";
};
util.inherits(WritableTestResults, Writable);

WritableTestResults.prototype.getData = function() {
	return this._data;
};

WritableTestResults.prototype._write = function(chunk, encoding, callback) {
	if(encoding === "buffer") {
		this._data += decoder.write(chunk);
	}
	callback();
};

module.exports = WritableTestResults;
