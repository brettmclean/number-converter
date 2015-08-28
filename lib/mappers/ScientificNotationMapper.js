var commonUtils = require("../utils/commonUtils");

var DIGITS = "0123456789";

var ScientificNotationMapper = function() {
	this._exponent = 0;
	this._coefficient = 0;
};

ScientificNotationMapper.prototype.fromDecimal = function(number) {
	this._coefficient = number;
	this._exponent = 0;

	var digitCount = countDigits(number);

	while(this._coefficient >= 10) {
		this._coefficient = this._coefficient / 10;
		this._exponent++;
	}

	return formatCoefficient(this._coefficient, digitCount) + "e" + this._exponent;
};

ScientificNotationMapper.prototype.toDecimal = function(number) {
	this._exponent = this._coefficient = 0;
};

function formatCoefficient(coefficient, digitCount) {
	var coefficientStr = commonUtils.convertNumberTypeToString(coefficient);
	coefficientStr = stripZerosFromEnds(coefficientStr);

	var result = "";
	for(var i = 0; i < coefficientStr.length && digitCount > 0; i++) {
		var char = coefficientStr.charAt(i);
		if(isDigit(char)) {
			digitCount--;
		}
		result += char;
	}

	return result;
}

function countDigits(number) {
	var digitCount = 0;

	var numberStr = commonUtils.convertNumberTypeToString(number);
	numberStr = stripZerosFromEnds(numberStr);

	for(var i = 0; i < numberStr.length; i++) {
		if(isDigit(numberStr.charAt(i))) {
			digitCount++;
		}
	}

	return digitCount;
}

function getSignOfNumber(number) {
	return number < 0 ? "-" : "";
}

function stripZerosFromEnds(numberStr) {
	return numberStr.replace(/^0+/, "").replace(/\.?0+$/, "")
}

function isDigit(char) {
	return DIGITS.indexOf(char) > -1;
}

module.exports = ScientificNotationMapper;
