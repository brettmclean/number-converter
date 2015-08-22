var ValueError = require("../errors/ValueError");
var baseNNumberUtils = require("../utils/baseNNumberUtils");

var BASE_CHARACTERS = baseNNumberUtils.BASE_CHARACTERS;
var MIN_NUMBER_BASE = 2;
var MAX_NUMBER_BASE = BASE_CHARACTERS.length;

var validateBase = function(numberBase) {
	validateBaseRange(numberBase);
};

var validateDecimalNumber = function(number) {
	var numberStr = baseNNumberUtils.convertNumberTypeToString(number);

	validateNumberIsNotNegative(numberStr);
};

var validateBaseNNumber = function(number, base) {
	var numberStr = baseNNumberUtils.convertNumberTypeToString(number);

	validateNumberIsNotNegative(numberStr);
	validateCharactersAreValidForBase(numberStr, base);
};

var validateBaseRange = function(numberBase) {
	if(numberBase < MIN_NUMBER_BASE || numberBase > MAX_NUMBER_BASE) {
		throw new RangeError("Number base must be between " + MIN_NUMBER_BASE + " and " + MAX_NUMBER_BASE + " (found " + numberBase + ")");
	}
}

var validateNumberIsNotNegative = function(numberStr) {
	if(numberStr.length > 0 && numberStr.charAt(0) === "-") {
		throw new RangeError("Number cannot be negative (" + numberStr + ")");
	}
};

var validateCharactersAreValidForBase = function(numberStr, numberBase) {

	for(var i = 0; i < numberStr.length; i++) {
		var char = numberStr.charAt(i);
		var charIndex = BASE_CHARACTERS.indexOf(char);
		if(charIndex >= numberBase) {
			throw new ValueError("Base " + numberBase + " number cannot contain " + char);
		}
	}
}

module.exports = {
	validateBase: validateBase,
	validateDecimalNumber: validateDecimalNumber,
	validateBaseNNumber: validateBaseNNumber
};
