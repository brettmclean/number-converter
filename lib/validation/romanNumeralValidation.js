var ValueError = require("../errors/ValueError");

var MIN_ROMAN_NUMERAL = 1;
var MAX_ROMAN_NUMERAL = 3999;
var MAX_ADDITIVE_NUMERAL_COUNT = 3;

var MAPPINGS = [
	{ number: 1000, numeral: "M" },
	{ number: 500, numeral: "D" },
	{ number: 100, numeral: "C" },
	{ number: 50, numeral: "L" },
	{ number: 10, numeral: "X" },
	{ number: 5, numeral: "V" },
	{ number: 1, numeral: "I" }
];

var mappingsByNumber = {};
var mappingsByNumeral = {};

var validateDecimalNumber = function(number) {
	if(typeof number !== "number") {
		throw new TypeError("Number must be of type number (" + (typeof number) + " provided)");
	}

	if(number !== parseInt(number)) {
		throw new ValueError("Number must be a whole number");
	}

	if(number < MIN_ROMAN_NUMERAL || number > MAX_ROMAN_NUMERAL) {
		throw new RangeError("Number must be between " + MIN_ROMAN_NUMERAL + " and " + MAX_ROMAN_NUMERAL + " (inclusive)");
	}
};

var validateRomanNumerals = function(numerals) {
	for(var i = 0; i < numerals.length; i++) {
		var numeral = numerals.charAt(i);
		if(!mappingsByNumeral[numeral]) {
			throw new ValueError("Numerals string must contain only valid roman numerals (contained \"" + numeral + "\")");
		}
	}

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
			throw new ValueError("Numerals string must not contain " + (MAX_ADDITIVE_NUMERAL_COUNT+1) + " \"" + lastNumeral + "\"s in a row");
		}
	}
};

(function populateMappingHashes() {
	for(var i = 0; i < MAPPINGS.length; i++) {
		var mapping = MAPPINGS[i];
		mappingsByNumber[mapping.number] = mapping;
		mappingsByNumeral[mapping.numeral] = mapping;
	}
}());

module.exports = {
	validateDecimalNumber: validateDecimalNumber,
	validateRomanNumerals: validateRomanNumerals
};
