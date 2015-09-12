var MapperBase = require("./MapperBase");
var validation = require("../validation/baseNNumberValidation");
var baseNNumberUtils = require("../utils/baseNNumberUtils");
var commonUtils = require("../utils/commonUtils");
var inherit = commonUtils.inherit;

var DEFAULT_BASE = 10;
var BASE_CHARACTERS = baseNNumberUtils.BASE_CHARACTERS;
var FRACTIONAL_TOLERANCE = Math.pow(10, -6);

var BaseNNumberMapper = function(numberBase, options) {

	if(typeof numberBase === "number") {
		validation.validateBase(numberBase);
	} else {
		options = numberBase;
		numberBase = null;
	}

	this._super.apply(this, [options]);

	parseOptions.call(this, options);
	this._numberBase = numberBase || DEFAULT_BASE;
};
inherit(BaseNNumberMapper, MapperBase);

BaseNNumberMapper.prototype.fromDecimal = function(number) {
	number = this._superProto.fromDecimal.apply(this, arguments);

	validation.validateDecimalNumber(number);

	if(this._numberBase === 10) {
		return number;
	}

	var numberStr = commonUtils.convertNumberTypeToString(number);
	return convertNumberFromDecimal.call(this, numberStr, this._numberBase);
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
	return convertNumberToDecimal.call(this, numberStr, this._numberBase);
};

function convertNumberToDecimal(numberStr, fromBase) {

	var parts = numberStr.split(".");
	var integerPart = parts[0];

	var decimalNumber = convertIntegerPartToDecimal(integerPart, fromBase);

	if(this._allowFractionalBaseN) {
		var fractionalPart = parts[1];
		decimalNumber += convertFractionalPartToDecimal(fractionalPart, fromBase);
	}

	return decimalNumber;
}

function convertNumberFromDecimal(numberStr, toBase) {

	var decimalNumber = parseFloat(numberStr);

	var integerPart = Math.floor(decimalNumber);
	var fractionalPart = decimalNumber - integerPart;

	var result = convertIntegerPartToBaseN(integerPart, toBase);

	if(this._allowFractionalBaseN) {
		var fractionalResult = convertFractionalPartToBaseN(fractionalPart, toBase);
		if(fractionalResult) {
			result += "." + fractionalResult;
		}
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
	for(var i = 0; i < fractionalPart.length; i++) {
		var placeValue = Math.pow(fromBase, -i - 1);
		var currChar = fractionalPart.charAt(i);
		result += placeValue * BASE_CHARACTERS.indexOf(currChar);
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

		var char = "0";
		if(currPlaceValue <= fractionalPart) {
			var quotient = Math.floor(fractionalPart / currPlaceValue);
			char = BASE_CHARACTERS.charAt(quotient);
			fractionalPart -= currPlaceValue * quotient;
		}
		result += char;

		exponent--;
	}

	return result;
}

function parseOptions(options) {
	options = options || {};
	this._allowFractionalBaseN = options.fractionalBaseN || false;
}

module.exports = BaseNNumberMapper;
