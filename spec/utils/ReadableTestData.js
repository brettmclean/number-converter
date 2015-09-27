var Readable = require("stream").Readable;
var util = require("util");

var ReadableTestData = function(testData) {
	Readable.call(this);

	this._data = null;
	if(typeof testData === "string") {
		this._data = [testData];
	} else if(Array.isArray(testData)) {
		this._data = testData;
	}
};
util.inherits(ReadableTestData, Readable);

ReadableTestData.prototype._read = function() {
	if(this._data) {
		var str = this._data.join("\n") + "\n";
		this.push(str);
	}
	this.push(null);
};

module.exports = ReadableTestData;
