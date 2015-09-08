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
	number = this._superProto.toDecimal.apply(this, arguments);

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

	var parts = numberStr.split(".");
	var integerPart = parts[0];
	var fractionalPart = parts[1];

	var i;
	var placeValue;
	var currChar;

	for(i = 0; i < integerPart.length; i++) {
		placeValue = Math.pow(fromBase, (integerPart.length - 1 - i));
		currChar = numberStr.charAt(i);
		decimalResult += placeValue * BASE_CHARACTERS.indexOf(currChar);
	}

	if(fractionalPart) {
		for(i = 0; i < fractionalPart.length; i++) {
			placeValue = Math.pow(fromBase, -i - 1);
			currChar = fractionalPart.charAt(i);
			decimalResult += placeValue * BASE_CHARACTERS.indexOf(currChar);
		}
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
		var quotient = Math.floor(decimalNumber / currPlaceValue);
		var remainder = decimalNumber % currPlaceValue;

		result += BASE_CHARACTERS.charAt(quotient);

		decimalNumber = remainder;
		currPlaceValue /= toBase;
	}

	return result;
}

module.exports = BaseNNumberMapper;
