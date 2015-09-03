var validateDecimalNumber = function(number) {
	validateDecimalNumberType(number);
};

var validateDecimalNumberType = function(number) {
	if(typeof number !== "number") {
		throw new TypeError("Number must be of type number (" + (typeof number) + " provided)");
	}
};

module.exports = {
	validateDecimalNumber: validateDecimalNumber
};
