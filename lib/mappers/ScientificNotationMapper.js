var ScientificNotationMapper = function() {
	this._exponent = 0;
	this._coefficient = 0;
};

ScientificNotationMapper.prototype.fromDecimal = function(number) {
	this._coefficient = number;
	this._exponent = 0;

	//var coefficientSign = getSignOfNumber(number);
	//var absoluteNumber = Math.abs(number);

	return this._coefficient + "e" + this._exponent;
};

ScientificNotationMapper.prototype.toDecimal = function(number) {
	this._exponent = this._coefficient = 0;
};

function getSignOfNumber(number) {
	return number < 0 ? "-" : "";
}

module.exports = ScientificNotationMapper;
