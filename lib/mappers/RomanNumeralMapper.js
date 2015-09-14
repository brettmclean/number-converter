var MapperBase = require("./MapperBase");
var validation = require("../validation/romanNumeralValidation");
var romanNumeralUtils = require("../utils/romanNumeralUtils");
var commonUtils = require("../utils/commonUtils");
var inherit = commonUtils.inherit;

var MAX_ADDITIVE_NUMERAL_COUNT = 3;

var MAPPINGS = romanNumeralUtils.getNumeralMappings();

var mappingsByNumber = romanNumeralUtils.getMappingsByNumber();
var mappingsByNumeral = romanNumeralUtils.getMappingsByNumeral();

var RomanNumeralMapper = function() {
	this._super.apply(this, arguments);

	this._numerals = "";
	this._number = 0;
};
inherit(RomanNumeralMapper, MapperBase);

RomanNumeralMapper.prototype.fromDecimal = function(number) {
	this._number = this._superProto.fromDecimal.call(this, number);

	this._number = sanitizeNumber(this._number);
	this._numerals = "";

	validation.validateDecimalNumber(this._number);

	for(var i = 0; i < MAPPINGS.length; i++) {
		var numeralMapping = MAPPINGS[i];
		appendAdditiveNumerals.call(this, numeralMapping);
		appendNumeralsRequiringSubtraction.call(this, numeralMapping);
	}

	return this._numerals;
};

RomanNumeralMapper.prototype.toDecimal = function(numerals) {
	this._numerals = this._superProto.toDecimal.call(this, numerals);
	this._numerals = sanitizeNumerals(this._numerals);
	this._number = 0;

	validation.validateRomanNumerals(this._numerals);

	for(var i = 0; i < this._numerals.length; i++) {
		var processedTwoNumerals = processNextNumerals.call(this, i);
		if(processedTwoNumerals) {
			i++;
		}
	}

	return this._number;
};

function appendAdditiveNumerals(numeralMapping) {
	var numeralCount = 0;
	while(numeralCount < MAX_ADDITIVE_NUMERAL_COUNT && this._number >= numeralMapping.number) {
		this._numerals += numeralMapping.numeral;
		this._number -= numeralMapping.number;
		numeralCount += 1;
	}
}

function appendNumeralsRequiringSubtraction(numeralMapping) {
	appendNumeralsWithOneTenthSubtraction.call(this, numeralMapping);
	appendNumeralsWithOneFifthSubtraction.call(this, numeralMapping);
}

function processNextNumerals(numeralPos) {
	var twoNumeralsProcessed = false;

	var numeralMapping = getNumeralMappingForNumeralAtPosition.call(this, numeralPos);
	var nextNumeralMapping = getNumeralMappingForNumeralAtPosition.call(this, numeralPos + 1);

	if(nextNumeralMapping && nextNumeralMapping.number > numeralMapping.number) {
		this._number += (nextNumeralMapping.number - numeralMapping.number);
		twoNumeralsProcessed = true;
	} else {
		this._number += numeralMapping.number;
	}

	return twoNumeralsProcessed;
}

function appendNumeralsWithOneTenthSubtraction(numeralMapping) {
	if(this._number >= (numeralMapping.number * 9 / 10) && isNumberPowerOfTen(numeralMapping.number)) {
		var oneTenthMapping = mappingsByNumber[numeralMapping.number / 10];
		this._numerals += oneTenthMapping.numeral + numeralMapping.numeral;
		this._number -= numeralMapping.number - oneTenthMapping.number;
	}
}

function appendNumeralsWithOneFifthSubtraction(numeralMapping) {
	if(this._number >= (numeralMapping.number * 4 / 5)) {
		var oneFifthMapping = mappingsByNumber[numeralMapping.number / 5];
		if(oneFifthMapping) {
			this._numerals += oneFifthMapping.numeral + numeralMapping.numeral;
			this._number -= numeralMapping.number - oneFifthMapping.number;
		}
	}
}

function sanitizeNumber(number) {
	number = parseInt(number);

	return number;
}

function sanitizeNumerals(numerals) {
	if(typeof numerals === "string") {
		numerals = numerals.toUpperCase();
	}

	return numerals;
}

function isNumberPowerOfTen(number) {
	while(number > 1) {
		number = number / 10;
		if(number === 1) {
			return true;
		}
	}
	return false;
}

function getNumeralMappingForNumeralAtPosition(numeralPos) {
	var numeralMapping = null;

	if(numeralPos < this._numerals.length) {
		var numeralChar = this._numerals.charAt(numeralPos);
		numeralMapping = mappingsByNumeral[numeralChar];
	}

	return numeralMapping;
}

module.exports = RomanNumeralMapper;
