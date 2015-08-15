var ValueError = require("../errors/ValueError");

var MIN_ROMAN_NUMERAL = 1;
var MAX_ROMAN_NUMERAL = 3999;

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

var RomanNumeralMapper = function() {
	this._numerals = "";
	this._number = 0;
};

RomanNumeralMapper.prototype.fromDecimal = function(number) {
	this._number = number;
	this._numerals = "";

	validateNumberInput(number);

	for(var i = 0; i < MAPPINGS.length; i++) {
		var numeralMapping = MAPPINGS[i];
		appendAdditiveNumerals.call(this, numeralMapping);
		appendNumeralsRequiringSubtraction.call(this, numeralMapping);
	}
	
	return this._numerals;
};

RomanNumeralMapper.prototype.toDecimal = function(numerals) {
	this._numerals = numerals;
	this._number = 0;

	validateNumeralsInput(numerals);

	for(var i = 0; i < this._numerals.length; i++) {
		var processedTwoNumerals = processNextNumerals.call(this, i);
		if(processedTwoNumerals) {
			i++;
		}
	}

	return this._number;
};

function appendAdditiveNumerals(numeralMapping) {
	var MAX_ADDITIVE_NUMERAL_COUNT = 3;
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
		var oneTenthMapping = mappingsByNumber[numeralMapping.number/10];
		if(oneTenthMapping) {
			this._numerals += oneTenthMapping.numeral + numeralMapping.numeral;
			this._number -= numeralMapping.number - oneTenthMapping.number;
		}
	}
}

function appendNumeralsWithOneFifthSubtraction(numeralMapping) {
	if(this._number >= (numeralMapping.number * 4 / 5)) {
		var oneFifthMapping = mappingsByNumber[numeralMapping.number/5];
		if(oneFifthMapping) {
			this._numerals += oneFifthMapping.numeral + numeralMapping.numeral;
			this._number -= numeralMapping.number - oneFifthMapping.number;
		}
	}
}

function validateNumberInput(number) {
	if(typeof number !== "number") {
		throw new TypeError("Number must be of type number (" + (typeof number) + " provided)");
	}

	if(number !== parseInt(number)) {
		throw new ValueError("Number must be a whole number");
	}

	if(number < MIN_ROMAN_NUMERAL || number > MAX_ROMAN_NUMERAL) {
		throw new RangeError("Number must be between " + MIN_ROMAN_NUMERAL + " and " + MAX_ROMAN_NUMERAL + " (inclusive)");
	}
}

function validateNumeralsInput(numerals) {
	for(var i = 0; i < numerals.length; i++) {
		var numeral = numerals.charAt(i);
		if(!mappingsByNumeral[numeral]) {
			throw new ValueError("Numerals string must contain only valid roman numerals (contained " + numeral + ")");
		}
	}
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

(function populateMappingHashes() {
	for(var i = 0; i < MAPPINGS.length; i++) {
		var mapping = MAPPINGS[i];
		mappingsByNumber[mapping.number] = mapping;
		mappingsByNumeral[mapping.numeral] = mapping;
	}
}());

module.exports = RomanNumeralMapper;
