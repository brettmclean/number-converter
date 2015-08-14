var mappings = [
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

	for(var i = 0; i < mappings.length; i++) {
		var numeralMapping = mappings[i];
		appendAdditiveNumerals.call(this, numeralMapping);
		appendNumeralsRequiringSubtraction.call(this, numeralMapping);
	}
	
	return this._numerals;
};

RomanNumeralMapper.prototype.toDecimal = function(numerals) {
	var result = 0;

	for(var i = 0; i < numerals.length; i++) {
		if(numeralsStr.charAt(i) === "I") {
			result++;
		}
	}

	return result;
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

function isNumberPowerOfTen(number) {
	while(number > 1) {
		number = number / 10;
		if(number === 1) {
			return true;
		}
	}
	return false;
}

(function populateMappingHashes() {
	for(var i = 0; i < mappings.length; i++) {
		var mapping = mappings[i];
		mappingsByNumber[mapping.number] = mapping;
		mappingsByNumeral[mapping.numeral] = mapping;
	}
}());

module.exports = RomanNumeralMapper;
