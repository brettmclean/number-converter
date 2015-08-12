var RomanNumeralMapper = require("./mappers/RomanNumeralMapper");

var NumberConverter = function(fromType, toType) {
	this._fromMapper = getMapperForType(fromType);
	this._toMapper = getMapperForType(toType);
};

NumberConverter.prototype.convert = function(number) {
};

NumberConverter.prototype.deconvert = function(number) {
};

function getMapperForType(type) {
	var mapper = null;
	switch(type) {
		case NumberConverter.ROMAN_NUMERAL:
			mapper = new RomanNumeralMapper();
			break;
	}
	return mapper;
}

NumberConverter.ROMAN_NUMERAL = "ROMAN";
NumberConverter.DECIMAL = "DECIMAL";

module.exports = NumberConverter;
