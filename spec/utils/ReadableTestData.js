var Readable = require("stream").Readable;
var util = require("util");

var ReadableTestData = function(testData, options) {
	Readable.call(this);

	this._data = null;
	this._streamIndex = 0;
	if(typeof testData === "string") {
		this._data = [testData];
	} else if(Array.isArray(testData)) {
		this._data = testData;
	} else {
		this._data = [];
	}

	options = options || {};
	this._useWindowsLineEndings = options.windowsLineEndings || false;
};
util.inherits(ReadableTestData, Readable);

ReadableTestData.prototype._read = function() {
	var lineEnding = this._useWindowsLineEndings ? "\r\n" : "\n";

	if(this._streamIndex < this._data.length) {
		var str = this._data[this._streamIndex];
		this.push(str + lineEnding);
		this._streamIndex++;
	} else {
		this.push(null);
	}
};

module.exports = ReadableTestData;
