var validation = require("../validation/baseNNumberValidation");
var baseNNumberUtils = require("../utils/baseNNumberUtils");

var DEFAULT_BASE = 10;
var BASE_CHARACTERS = baseNNumberUtils.BASE_CHARACTERS;

var BaseNNumberMapper = function(numberBase) {
	this._numberBase = numberBase || DEFAULT_BASE;

	validation.validateBase(numberBase);
};

BaseNNumberMapper.prototype.fromDecimal = function(number) {
	validation.validateDecimalNumber(number);

	var numberStr = baseNNumberUtils.convertNumberTypeToString(number);

	return convertNumber(DEFAULT_BASE, this._numberBase, number);
};

BaseNNumberMapper.prototype.toDecimal = function(number) {
	validation.validateBaseNNumber(number, this._numberBase);

	var numberStr = baseNNumberUtils.convertNumberTypeToString(number);

	return convertNumber(this._numberBase, DEFAULT_BASE, number);
};

function convertNumber(fromBase, toBase, number) {
	return number;
}

module.exports = BaseNNumberMapper;
