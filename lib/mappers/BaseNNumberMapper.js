var MapperBase = require("./MapperBase");
var validation = require("../validation/baseNNumberValidation");
var baseNNumberUtils = require("../utils/baseNNumberUtils");
var commonUtils = require("../utils/commonUtils");
var inherit = commonUtils.inherit;

var DEFAULT_BASE = 10;
var BASE_CHARACTERS = baseNNumberUtils.BASE_CHARACTERS;

var BaseNNumberMapper = function(numberBase) {
	this._super.apply(this, arguments);

	this._numberBase = numberBase || DEFAULT_BASE;

	validation.validateBase(numberBase);
};
inherit(BaseNNumberMapper, MapperBase);

BaseNNumberMapper.prototype.fromDecimal = function(number) {
	number = this._superProto.fromDecimal.apply(this, arguments);

	validation.validateDecimalNumber(number);

	if(this._numberBase === 10) {
		return number;
	}

	var numberStr = commonUtils.convertNumberTypeToString(number);
	return convertNumberFromDecimal(numberStr, this._numberBase);
};

BaseNNumberMapper.prototype.toDecimal = function(number) {
	number = this._superProto.fromDecimal.apply(this, arguments);

	if(!number) {
		return 0;
	}

	validation.validateBaseNNumber(number, this._numberBase);

	if(this._numberBase === 10) {
		return number;
	}

	var numberStr = commonUtils.convertNumberTypeToString(number);
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

	var decimalNumber = parseInt(numberStr);

	var result = "";

	var currPlaceValue = 1;
	while(currPlaceValue <= decimalNumber / toBase) {
		currPlaceValue *= toBase;
	}

	while(currPlaceValue >= 1) {
		var quotient = parseInt(decimalNumber / currPlaceValue);
		var remainder = decimalNumber % currPlaceValue;

		result += BASE_CHARACTERS.charAt(quotient);

		decimalNumber = remainder;
		currPlaceValue /= toBase;
	}

	return result;
}

module.exports = BaseNNumberMapper;
