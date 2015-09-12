var MapperBase = require("./MapperBase");
var validation = require("../validation/baseNNumberValidation");
var baseNNumberUtils = require("../utils/baseNNumberUtils");
var commonUtils = require("../utils/commonUtils");
var inherit = commonUtils.inherit;

var DEFAULT_BASE = 10;
var BASE_CHARACTERS = baseNNumberUtils.BASE_CHARACTERS;
var FRACTIONAL_TOLERANCE = Math.pow(10, -6);

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

	var parts = numberStr.split(".");
	var integerPart = parts[0];
	var fractionalPart = parts[1];

	var decimalNumber = convertIntegerPartToDecimal(integerPart, fromBase) +
		convertFractionalPartToDecimal(fractionalPart, fromBase);

	return decimalNumber;
}

function convertNumberFromDecimal(numberStr, toBase) {

	var decimalNumber = parseFloat(numberStr);

	var integerPart = Math.floor(decimalNumber);
	var fractionalPart = decimalNumber - integerPart;

	var result = convertIntegerPartToBaseN(integerPart, toBase);
	var fractionalResult = convertFractionalPartToBaseN(fractionalPart, toBase);

	if(fractionalResult) {
		result += "." + fractionalResult;
	}

	return result;
}

function convertIntegerPartToDecimal(integerPart, fromBase) {
	var result = 0;
	for(var i = 0; i < integerPart.length; i++) {
		var placeValue = Math.pow(fromBase, (integerPart.length - 1 - i));
		var currChar = integerPart.charAt(i);
		result += placeValue * BASE_CHARACTERS.indexOf(currChar);
	}
	return result;
}

function convertFractionalPartToDecimal(fractionalPart, fromBase) {
	var result = 0;
	if(fractionalPart) {
		for(var i = 0; i < fractionalPart.length; i++) {
			var placeValue = Math.pow(fromBase, -i - 1);
			var currChar = fractionalPart.charAt(i);
			result += placeValue * BASE_CHARACTERS.indexOf(currChar);
		}
	}
	return result;
}

function convertIntegerPartToBaseN(integerPart, toBase) {
	var result = "";
	var currPlaceValue = 1;
	while(currPlaceValue <= integerPart / toBase) {
		currPlaceValue *= toBase;
	}

	while(currPlaceValue >= 1) {
		var quotient = Math.floor(integerPart / currPlaceValue);
		var remainder = integerPart % currPlaceValue;

		result += BASE_CHARACTERS.charAt(quotient);

		integerPart = remainder;
		currPlaceValue /= toBase;
	}

	return result;
}

function convertFractionalPartToBaseN(fractionalPart, toBase) {
	var result = "";

	var exponent = -1;
	var currPlaceValue;
	while(fractionalPart > FRACTIONAL_TOLERANCE) {
		currPlaceValue = Math.pow(toBase, exponent);
		if(currPlaceValue <= fractionalPart) {
			fractionalPart -= currPlaceValue;
			result += "1";
		} else {
			result += "0";
		}
		exponent--;
	}

	return result;
}

module.exports = BaseNNumberMapper;
