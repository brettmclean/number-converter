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
	this._numbersPerRead = options.numbersPerRead || 1;
};
util.inherits(ReadableTestData, Readable);

ReadableTestData.prototype._read = function() {
	var lineEnding = this._useWindowsLineEndings ? "\r\n" : "\n";

	var outputStr = "";

	for(var i = 0; i < this._numbersPerRead; i++) {
		if(this._streamIndex < this._data.length) {
			var str = this._data[this._streamIndex];
			outputStr += str + lineEnding;
			this._streamIndex++;
		}
	}

	if(outputStr) {
		this.push(outputStr);
	}

	if(this._streamIndex >= this._data.length) {
		this.push(null);
	}

};

module.exports = ReadableTestData;
