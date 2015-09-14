var ValueError = require("../errors/ValueError");
var romanNumeralUtils = require("../utils/romanNumeralUtils");

var MIN_ROMAN_NUMERAL = 1;
var MAX_ROMAN_NUMERAL = 3999;
var MAX_ADDITIVE_NUMERAL_COUNT = 3;

var mappingsByNumeral = romanNumeralUtils.getMappingsByNumeral();

var validateDecimalNumber = function(number) {
	validateDecimalNumberRange(number);
};

var validateRomanNumerals = function(numerals) {
	validateRomanNumeralIsString(numerals);
	validateRomanNumeralValidCharacters(numerals);
	validateRomanNumeralCharacterRuns(numerals);
	validateRomanNumeralSubtractionFactor(numerals);
	validateRomanNumeralHalfSubtraction(numerals);
	validateRomanNumeralMultipleHalfNumeralsInRun(numerals);
};

var validateDecimalNumberRange = function(number) {
	if(number < MIN_ROMAN_NUMERAL || number > MAX_ROMAN_NUMERAL) {
		throw new RangeError("Number must be between " + MIN_ROMAN_NUMERAL + " and " + MAX_ROMAN_NUMERAL + " (inclusive)");
	}
};

var validateRomanNumeralIsString = function(numerals) {
	if(typeof numerals !== "string") {
		throw new TypeError("Roman numerals must be of type string (" + (typeof numerals) + " provided)");
	}
};

var validateRomanNumeralValidCharacters = function(numerals) {
	for(var i = 0; i < numerals.length; i++) {
		var numeral = numerals.charAt(i);
		if(!mappingsByNumeral[numeral]) {
			throw new ValueError("Numerals string must contain only valid roman numerals (contained \"" + numeral + "\")");
		}
	}
};

var validateRomanNumeralCharacterRuns = function(numerals) {
	var lastNumeral = null;
	var lastNumeralCount = 0;
	for(var i = 0; i < numerals.length; i++) {
		var numeral = numerals.charAt(i);
		if(numeral === lastNumeral) {
			lastNumeralCount++;
		} else {
			lastNumeral = numeral;
			lastNumeralCount = 1;
		}
		if(lastNumeralCount > MAX_ADDITIVE_NUMERAL_COUNT) {
			throw new ValueError("Numerals string must not contain " + (MAX_ADDITIVE_NUMERAL_COUNT + 1) + " \"" + lastNumeral + "\"s in a row");
		}
	}
};

var validateRomanNumeralSubtractionFactor = function(numerals) {
	var MAX_SUBTRACTION_FACTOR = 10;

	for(var i = 0; i < numerals.length - 1; i++) {
		var mapping = mappingsByNumeral[numerals.charAt(i)];
		var nextMapping = mappingsByNumeral[numerals.charAt(i + 1)];

		if((nextMapping.number / mapping.number) > MAX_SUBTRACTION_FACTOR) {
			throw new ValueError("Numerals string cannot directly subtract " + mapping.numeral +
				" from " + nextMapping.numeral + " (maximum factor of " + MAX_SUBTRACTION_FACTOR + ")");
		}
	}
};

var validateRomanNumeralHalfSubtraction = function(numerals) {
	for(var i = 0; i < numerals.length - 1; i++) {
		var mapping = mappingsByNumeral[numerals.charAt(i)];
		var nextMapping = mappingsByNumeral[numerals.charAt(i + 1)];

		if(mapping.number < nextMapping.number && numberStartsWithFive(mapping.number)) {
			throw new ValueError("Numerals string cannot subtract numbers starting with 5 (found " + mapping.numeral + nextMapping.numeral + ")");
		}
	}
};

var validateRomanNumeralMultipleHalfNumeralsInRun = function(numerals) {
	for(var i = 0; i < numerals.length - 1; i++) {
		var mapping = mappingsByNumeral[numerals.charAt(i)];
		var nextMapping = mappingsByNumeral[numerals.charAt(i + 1)];

		if(mapping.number === nextMapping.number && numberStartsWithFive(mapping.number)) {
			throw new ValueError("Numerals string cannot have multiple numbers starting with 5 in a row");
		}
	}
};

var numberStartsWithFive = function(number) {
	while(number > 10) {
		number = number / 10;
	}
	var numberStartsWithFive = number === 5;
	return numberStartsWithFive;
};

module.exports = {
	validateDecimalNumber: validateDecimalNumber,
	validateRomanNumerals: validateRomanNumerals
};
