var Readable = require("stream").Readable;
var util = require("util");

var ReadableTestData = function(testData, options) {
	Readable.call(this);

	this._data = null;
	if(typeof testData === "string") {
		this._data = [testData];
	} else if(Array.isArray(testData)) {
		this._data = testData;
	}

	options = options || {};
	this._useWindowsLineEndings = options.windowsLineEndings || false;
};
util.inherits(ReadableTestData, Readable);

ReadableTestData.prototype._read = function() {
	var lineEnding = this._useWindowsLineEndings ? "\r\n" : "\n";

	if(this._data) {
		var str = this._data.join(lineEnding) + lineEnding;
		this.push(str);
	}
	this.push(null);
};

module.exports = ReadableTestData;
