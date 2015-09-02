var MapperBase = function() {

};

MapperBase.prototype.fromDecimal = function(number) {
	return number;
};

MapperBase.prototype.toDecimal = function(otherValue) {
	return otherValue;
};

module.exports = MapperBase;
