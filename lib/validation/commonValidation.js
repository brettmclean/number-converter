var validateDecimalNumber = function(number) {
	validateNumberIsIntegerParsable(number);
};

var validateNumberIsIntegerParsable = function(number) {
	if(!isParsableAsInteger(number)) {
		throw new TypeError("Number must be of type number (" + (typeof number) + " provided)");
	}
};

var isParsableAsInteger = function(number) {
	var isNumberType = typeof number === "number";
	var isStringContainingNumber = typeof number === "string" && !isNaN(number);
	return isNumberType || isStringContainingNumber;
};

module.exports = {
	validateDecimalNumber: validateDecimalNumber
};
