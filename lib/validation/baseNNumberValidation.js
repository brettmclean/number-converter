var baseNNumberUtils = require("../utils/baseNNumberUtils");

var validateDecimalNumber = function(number) {
	var numberStr = baseNNumberUtils.convertNumberTypeToString(number);

	validateNumberIsNotNegative(numberStr);
};

var validateBaseNNumber = function(number, base) {
	var numberStr = baseNNumberUtils.convertNumberTypeToString(number);

	validateNumberIsNotNegative(numberStr);
};

var validateNumberIsNotNegative = function(numberStr) {
	if(numberStr.length > 0 && numberStr.charAt(0) === "-") {
		throw new RangeError("Number cannot be negative (" + numberStr + ")");
	}
};

module.exports = {
	validateDecimalNumber: validateDecimalNumber,
	validateBaseNNumber: validateBaseNNumber
};
