var validation = require("../validation/baseNNumberValidation");
var baseNNumberUtils = require("../utils/baseNNumberUtils");

var DEFAULT_BASE = 10;
var BASE_CHARACTERS = baseNNumberUtils.BASE_CHARACTERS;

var BaseNNumberMapper = function(numberBase) {
	this._numberBase = numberBase || DEFAULT_BASE;

	validation.validateBase(numberBase);
};

BaseNNumberMapper.prototype.fromDecimal = function(number) {
	validation.validateDecimalNumber(number);

	if(this._numberBase === 10) {
		return number;
	}

	var numberStr = baseNNumberUtils.convertNumberTypeToString(number);
	return convertNumberFromDecimal(numberStr, this._numberBase);
};

BaseNNumberMapper.prototype.toDecimal = function(number) {
	validation.validateBaseNNumber(number, this._numberBase);

	if(this._numberBase === 10) {
		return number;
	}

	var numberStr = baseNNumberUtils.convertNumberTypeToString(number);
	return convertNumberToDecimal(numberStr, this._numberBase);
};

function convertNumberToDecimal(numberStr, fromBase) {

	var decimalResult = 0;

	for(var i = numberStr.length - 1; i >= 0; i--) {
		var placeValue = Math.pow(fromBase, (numberStr.length - 1 - i));
		var currChar = numberStr.charAt(i);
		decimalResult += placeValue * BASE_CHARACTERS.indexOf(currChar);
	}

	return decimalResult;
}

function convertNumberFromDecimal(numberStr, toBase) {
	return numberStr;
}

module.exports = BaseNNumberMapper;
