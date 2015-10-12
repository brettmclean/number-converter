var ScientificNotationMapper = require("./mappers/ScientificNotationMapper");
var BaseNNumberMapper = require("./mappers/BaseNNumberMapper");
var RomanNumeralMapper = require("./mappers/RomanNumeralMapper");

var NumberConverter = function(fromType, toType, options) {

	if(typeof toType !== "string") {
		options = toType;
		toType = fromType;
		fromType = null;
	}

	this._fromMapper = getMapperForType(fromType, options);
	this._toMapper = getMapperForType(toType, options);
};

NumberConverter.prototype.convert = function(number) {
	var intermediateDecimal = this._fromMapper.toDecimal(number);
	return this._toMapper.fromDecimal(intermediateDecimal);
};

NumberConverter.prototype.deconvert = function(number) {
	var intermediateDecimal = this._toMapper.toDecimal(number);
	return this._fromMapper.fromDecimal(intermediateDecimal);
};

function getMapperForType(type, options) {
	var mapper = null;
	type = type && type.toUpperCase();

	switch(type) {
		case NumberConverter.ROMAN_NUMERAL:
			mapper = new RomanNumeralMapper();
			break;
		case NumberConverter.BINARY:
			mapper = new BaseNNumberMapper(2, options);
			break;
		case NumberConverter.OCTAL:
			mapper = new BaseNNumberMapper(8, options);
			break;
		case NumberConverter.DECIMAL:
			mapper = new BaseNNumberMapper(10, options);
			break;
		case NumberConverter.HEXADECIMAL:
			mapper = new BaseNNumberMapper(16, options);
			break;
		case NumberConverter.SCIENTIFIC_NOTATION:
			mapper = new ScientificNotationMapper();
			break;
		default:
			mapper = new BaseNNumberMapper(10, options);
	}
	return mapper;
}

NumberConverter.ROMAN_NUMERAL = "ROMAN";
NumberConverter.BINARY = "BINARY";
NumberConverter.OCTAL = "OCTAL";
NumberConverter.DECIMAL = "DECIMAL";
NumberConverter.HEXADECIMAL = "HEXADECIMAL";
NumberConverter.SCIENTIFIC_NOTATION = "SCIENTIFIC";

module.exports = NumberConverter;
