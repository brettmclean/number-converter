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
	
};

RomanNumeralMapper.prototype.fromDecimal = function(number) {
	var numerals = "";

	for(var i = 0; i < mappings.length; i++) {
		var mapping = mappings[i];
		var numeralCount = 0;
		while(true) {
			if(numeralCount >= 3 || number < mapping.number) {
				break;
			}
			numerals += mapping.numeral;
			number -= mapping.number;
			numeralCount += 1;
		}

		if(mapping.number.toString().charAt(0) === "1" && number >= (mapping.number * 9 / 10)) {
			var oneTenthMapping = mappingsByNumber[mapping.number/10];
			if(oneTenthMapping) {
				numerals += oneTenthMapping.numeral + mapping.numeral;
				number -= mapping.number - oneTenthMapping.number;
			}
		} else if(number >= (mapping.number * 4 / 5)) {
			var oneFifthMapping = mappingsByNumber[mapping.number/5];
			if(oneFifthMapping) {
				numerals += oneFifthMapping.numeral + mapping.numeral;
				number -= mapping.number - oneFifthMapping.number;
			}
		}
	}
	
	return numerals;
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

(function populateMappingHashes() {
	for(var i = 0; i < mappings.length; i++) {
		var mapping = mappings[i];
		mappingsByNumber[mapping.number] = mapping;
		mappingsByNumeral[mapping.numeral] = mapping;
	}
}());

module.exports = RomanNumeralMapper;
