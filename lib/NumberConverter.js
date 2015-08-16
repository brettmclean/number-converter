var BaseNNumberMapper = require("./mappers/BaseNNumberMapper");
var RomanNumeralMapper = require("./mappers/RomanNumeralMapper");

var NumberConverter = function(fromType, toType) {

	if(typeof toType === "undefined") {
		toType = fromType;
		fromType = null;
	}

	this._fromMapper = getMapperForType(fromType);
	this._toMapper = getMapperForType(toType);
};

NumberConverter.prototype.convert = function(number) {
	return this._toMapper.fromDecimal(number);
};

NumberConverter.prototype.deconvert = function(number) {
	return this._toMapper.toDecimal(number);
};

function getMapperForType(type) {
	var mapper = null;

	switch(type) {
		case NumberConverter.ROMAN_NUMERAL:
			mapper = new RomanNumeralMapper();
			break;
		case NumberConverter.DECIMAL:
			mapper = new BaseNNumberMapper(10);
			break;
		default:
			mapper = new BaseNNumberMapper(10);
	}
	return mapper;
}

NumberConverter.ROMAN_NUMERAL = "ROMAN";
NumberConverter.DECIMAL = "DECIMAL";

module.exports = NumberConverter;
