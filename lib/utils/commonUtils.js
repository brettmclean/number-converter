var convertNumberTypeToString = function(number) {
	number = typeof number === "number" ? number.toString() : number;
	return number;
};

var inherit = function(childCtor, parentCtor) {
	childCtor.prototype = Object.create(parentCtor.prototype);
	childCtor.prototype.constructor = childCtor;
	childCtor.prototype._super = parentCtor;
	childCtor.prototype._superProto = parentCtor.prototype;
};

module.exports = {
	convertNumberTypeToString: convertNumberTypeToString,
	inherit: inherit
};
