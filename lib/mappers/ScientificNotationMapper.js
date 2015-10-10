var MapperBase = require("./MapperBase");
var commonUtils = require("../utils/commonUtils");
var inherit = commonUtils.inherit;

var DIGITS = "0123456789";
var SN_REGEX = /^\+?(-?[\d\.]+)[e|x|\*](?:10\^|10\*\*)?\+?(-?\d+)$/i;

var ScientificNotationMapper = function() {
	this._super.apply(this, arguments);

	this._exponent = 0;
	this._coefficient = 0;
};
inherit(ScientificNotationMapper, MapperBase);

ScientificNotationMapper.prototype.fromDecimal = function(number) {
	this._coefficient = this._superProto.fromDecimal.call(this, number);
	this._exponent = 0;

	return convertDecimalToScientificNotation.call(this);
};

ScientificNotationMapper.prototype.toDecimal = function(sNotation) {
	this._superProto.toDecimal.apply(this, arguments);
	this._exponent = this._coefficient = 0;

	sNotation = removeWhitespace(sNotation);
	var snParts = SN_REGEX.exec(sNotation);
	this._coefficient = parseFloat(snParts[1]);
	this._exponent = parseInt(snParts[2]);

	return this._coefficient * Math.pow(10, this._exponent);
};

function convertDecimalToScientificNotation() {
	var digitCount = countDigits(this._coefficient);
	determineCoefficientAndExponent.call(this);
	return formatCoefficient(this._coefficient, digitCount) + "e" + this._exponent;
}

function determineCoefficientAndExponent() {
	this._coefficient = convertStringTypeToNumber(this._coefficient);

	if(this._coefficient) {
		while(this._coefficient >= 10 || this._coefficient <= -10) {
			this._coefficient = this._coefficient / 10;
			this._exponent++;
		}

		while(this._coefficient < 1 && this._coefficient > -1) {
			this._coefficient = this._coefficient * 10;
			this._exponent--;
		}
	}
}

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

function convertStringTypeToNumber(numberStr) {
	if(typeof numberStr === "string") {
		return parseFloat(numberStr);
	}
	return numberStr;
}

function stripZerosFromEnds(numberStr) {
	numberStr = numberStr.replace(/^(-)?0+/, "$1");
	numberStr = numberStr.replace(/\.?0+$/, "");
	return numberStr || "0";
}

function removeWhitespace(numberStr) {
	return numberStr.replace(/\s/g, "");
}

function isDigit(char) {
	return DIGITS.indexOf(char) > -1;
}

module.exports = ScientificNotationMapper;
