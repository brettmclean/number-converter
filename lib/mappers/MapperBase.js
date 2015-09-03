var commonValidation = require("../validation/commonValidation");

var MapperBase = function() {

};

MapperBase.prototype.fromDecimal = function(number) {
	commonValidation.validateDecimalNumber(number);
	return number;
};

MapperBase.prototype.toDecimal = function(otherValue) {
	return otherValue;
};

module.exports = MapperBase;
