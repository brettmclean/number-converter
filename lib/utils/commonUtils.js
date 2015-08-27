var convertNumberTypeToString = function(number) {
	number = typeof number === "number" ? number.toString() : number;
	return number;
};

module.exports = {
	convertNumberTypeToString: convertNumberTypeToString
};
