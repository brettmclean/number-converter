var mappings = [
	{ number: 1000, numeral: "M" },
	{ number: 500, numeral: "D" },
	{ number: 100, numeral: "C" },
	{ number: 50, numeral: "L" },
	{ number: 10, numeral: "X" },
	{ number: 5, numeral: "V" },
	{ number: 1, numeral: "I" }
];

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

function getNumeralFromNumber(number) {
	var numeral = "";

	for(var i = 0; i < mappings.length; i++) {
		if(mappings[i].number === number) {
			numeral = mappings[i].numeral;
		}
	}

	return numeral;
}

function getNumberFromNumeral(numeral) {
	var number = 0;

	for(var i = 0; i < mappings.length; i++) {
		if(mappings[i].numeral === numeral) {
			number = mappings[i].number;
		}
	}

	return number;
}

module.exports = RomanNumeralMapper;

