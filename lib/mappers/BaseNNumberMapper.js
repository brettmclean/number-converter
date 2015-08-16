var DEFAULT_BASE = 10;

var BaseNNumberMapper = function(numberBase) {
	this._numberBase = numberBase;
};

BaseNNumberMapper.prototype.fromDecimal = function(number) {
	return convertNumber(DEFAULT_BASE, this._numberBase, number);
};

BaseNNumberMapper.prototype.toDecimal = function(number) {
	return convertNumber(this._numberBase, DEFAULT_BASE, number);
};

function convertNumber(fromBase, toBase, number) {
	return number;
}

module.exports = BaseNNumberMapper;
